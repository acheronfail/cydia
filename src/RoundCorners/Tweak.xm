#import <UIKit/UIKit.h>

// Overlay window which has the round corners
@interface OverlayWindow : UIWindow <UIAlertViewDelegate> {}
@end

// Global instance of the overlay window
static OverlayWindow *_overlayWindow;

// OverlayWindow implementation
@implementation OverlayWindow
- (UIView *) hitTest:(CGPoint)point withEvent:(UIEvent *)event { return NULL; }
@end

// initialises and configures the overlay window
static void initOverlayWindow() {
  if ([[[UIDevice currentDevice] systemVersion] floatValue] >= 9.0f) {
    _overlayWindow = [[OverlayWindow alloc] init];
  } else {
    _overlayWindow = [[OverlayWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  }

  // We need an alpha value here otherwise touches fall through
  [_overlayWindow setBackgroundColor:[UIColor clearColor]];
  [_overlayWindow setWindowLevel:UIWindowLevelStatusBar + 250];
  _overlayWindow.userInteractionEnabled = false;
  _overlayWindow.opaque = true;

  CGFloat cornerRadius = 20.0f;
  CGFloat borderWidth = cornerRadius / 2.0f;

  [_overlayWindow.layer setCornerRadius:cornerRadius];
  _overlayWindow.frame = CGRectInset(_overlayWindow.frame, -borderWidth, -borderWidth);
  _overlayWindow.layer.borderColor = [UIColor blackColor].CGColor;
  _overlayWindow.layer.borderWidth = borderWidth;

  [_overlayWindow makeKeyAndVisible];
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
