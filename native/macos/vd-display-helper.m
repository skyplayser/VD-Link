// vd-display-helper – creates one virtual monitor on macOS and keeps it alive
// until stdin closes (= VD-Link quits) or SIGTERM arrives.
//
// Uses CoreGraphics' CGVirtualDisplay classes. These are private Apple API
// (also used by the MIT-licensed DeskPad and by BetterDisplay); they work outside
// the Mac App Store but may change with macOS updates.
//
// Usage: vd-display-helper --name "VD-Link Wall 1" --width 1920 --height 1080 [--hz 60] [--serial 1]
// Prints one JSON line: {"event":"ready","displayID":...,"width":...,"height":...}

#import <Foundation/Foundation.h>
#import <CoreGraphics/CoreGraphics.h>
#include <signal.h>

@class CGVirtualDisplay;

@interface CGVirtualDisplayDescriptor : NSObject
@property (retain, nonatomic) dispatch_queue_t queue;
@property (retain, nonatomic) NSString *name;
@property (nonatomic) unsigned int maxPixelsHigh;
@property (nonatomic) unsigned int maxPixelsWide;
@property (nonatomic) CGSize sizeInMillimeters;
@property (nonatomic) unsigned int productID;
@property (nonatomic) unsigned int vendorID;
@property (nonatomic) unsigned int serialNum;
@property (copy, nonatomic) void (^terminationHandler)(id, CGVirtualDisplay *);
@end

@interface CGVirtualDisplayMode : NSObject
@property (readonly, nonatomic) unsigned int width;
@property (readonly, nonatomic) unsigned int height;
@property (readonly, nonatomic) double refreshRate;
- (instancetype)initWithWidth:(unsigned int)width height:(unsigned int)height refreshRate:(double)refreshRate;
@end

@interface CGVirtualDisplaySettings : NSObject
@property (retain, nonatomic) NSArray<CGVirtualDisplayMode *> *modes;
@property (nonatomic) unsigned int hiDPI;
@end

@interface CGVirtualDisplay : NSObject
@property (readonly, nonatomic) unsigned int displayID;
- (instancetype)initWithDescriptor:(CGVirtualDisplayDescriptor *)descriptor;
- (BOOL)applySettings:(CGVirtualDisplaySettings *)settings;
@end

static void fail(const char *msg) {
  printf("{\"event\":\"error\",\"message\":\"%s\"}\n", msg);
  fflush(stdout);
  exit(2);
}

int main(int argc, const char *argv[]) {
  @autoreleasepool {
    NSString *name = @"VD-Link Wall";
    unsigned int width = 1920, height = 1080, serial = 1;
    double hz = 60;
    for (int i = 1; i + 1 < argc; i += 2) {
      NSString *k = [NSString stringWithUTF8String:argv[i]];
      const char *v = argv[i + 1];
      if ([k isEqualToString:@"--name"]) name = [NSString stringWithUTF8String:v];
      else if ([k isEqualToString:@"--width"]) width = (unsigned int)atoi(v);
      else if ([k isEqualToString:@"--height"]) height = (unsigned int)atoi(v);
      else if ([k isEqualToString:@"--hz"]) hz = atof(v);
      else if ([k isEqualToString:@"--serial"]) serial = (unsigned int)atoi(v);
    }
    if (width < 64 || height < 64 || width > 8192 || height > 8192) fail("invalid size");
    if (NSClassFromString(@"CGVirtualDisplay") == nil) fail("CGVirtualDisplay not available on this macOS");

    CGVirtualDisplayDescriptor *desc = [[CGVirtualDisplayDescriptor alloc] init];
    desc.queue = dispatch_get_main_queue();
    desc.name = name;
    desc.maxPixelsWide = width;
    desc.maxPixelsHigh = height;
    desc.sizeInMillimeters = CGSizeMake(width * 25.4 / 96.0, height * 25.4 / 96.0);
    desc.vendorID = 0x5644;  // "VD"
    desc.productID = 0x4C00 + serial;
    desc.serialNum = serial;
    desc.terminationHandler = ^(id a, CGVirtualDisplay *d) {
      printf("{\"event\":\"terminated\"}\n");
      fflush(stdout);
      exit(0);
    };

    CGVirtualDisplay *display = [[CGVirtualDisplay alloc] initWithDescriptor:desc];
    if (!display || display.displayID == 0) fail("could not create virtual display");

    CGVirtualDisplaySettings *settings = [[CGVirtualDisplaySettings alloc] init];
    settings.hiDPI = 0;
    settings.modes = @[ [[CGVirtualDisplayMode alloc] initWithWidth:width height:height refreshRate:hz] ];
    if (![display applySettings:settings]) fail("could not apply display mode");

    printf("{\"event\":\"ready\",\"displayID\":%u,\"width\":%u,\"height\":%u,\"hz\":%.0f}\n",
           display.displayID, width, height, hz);
    fflush(stdout);

    signal(SIGTERM, SIG_DFL);
    // Parent process gone (stdin EOF) → remove display by exiting.
    dispatch_async(dispatch_get_global_queue(QOS_CLASS_UTILITY, 0), ^{
      char buf[256];
      while (fgets(buf, sizeof buf, stdin)) {
      }
      exit(0);
    });
    (void)display;  // keep strong reference for the process lifetime
    dispatch_main();
  }
  return 0;
}
