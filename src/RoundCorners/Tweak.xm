#import <UIKit/UIKit.h>

// Overlay window which has the round corners
@interface OverlayWindow : UIWindow <UIAlertViewDelegate> {}
@end

// Global instance of the overlay window
static OverlayWindow *_overlayWindow;

// OverlayWindow implementation
@implementation OverlayWindow
@end

// initialises and configures the overlay window
static void initOverlayWindow() {
  if ([[[UIDevice currentDevice] systemVersion] floatValue] >= 9.0f) {
    _overlayWindow = [[OverlayWindow alloc] init];
  } else {
    _overlayWindow = [[OverlayWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  }

  // We need an alpha value here otherwise touches fall through
  [_overlayWindow setBackgroundColor:[UIColor colorWithRed:0 green:0 blue:0 alpha:0.0]];
  [_overlayWindow setWindowLevel:UIWindowLevelStatusBar + 250];
  _overlayWindow.userInteractionEnabled = true;
  _overlayWindow.opaque = true;

  [_overlayWindow.layer setCornerRadius:20.0f];
  [_overlayWindow.layer setMasksToBounds:YES];
  _overlayWindow.layer.borderColor = [[UIColor blackColor] colorWithAlphaComponent:1.0f].CGColor;
}

//
// Constructor
//
%ctor {
  CFNotificationCenterAddObserver(
      CFNotificationCenterGetLocalCenter(), NULL,
      (CFNotificationCallback)initOverlayWindow,
      (CFStringRef)UIApplicationDidFinishLaunchingNotification, NULL,
      CFNotificationSuspensionBehaviorCoalesce);
}
