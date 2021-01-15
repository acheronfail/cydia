//
// Includes
//
#import "Activator/libactivator.h"

%hook SBHomeHardwareButton
-(bool) gestureRecognizerShouldBegin:(id)arg1 {
  return FALSE;
}
%end

%hook SBControlCenterController
-(bool) _shouldAllowControlCenterGesture {
  return FALSE;
}
%end


//
// ScreenLockerWindow interface
//
@interface ScreenLockerWindow : UIWindow <LAListener, UIAlertViewDelegate> {
}
@end

//
// Static instances
//
static ScreenLockerWindow *SL;

//
// ScreenLockerWindow implementation
//
@implementation ScreenLockerWindow

- (void)activator:(LAActivator *)activator
       receiveEvent:(LAEvent *)event
    forListenerName:(NSString *)listenerName {
  if (self.hidden) {
    if ([listenerName
            isEqualToString:@"com.jontelang.screenlocker.invisible"]) {
      SL.layer.borderWidth = 0;
    } else {
      SL.layer.borderWidth = 4;
    }
    [self makeKeyAndVisible];
    [event setHandled:YES];
  } else {
    [self setHidden:YES];
    [event setHandled:YES];
  }
}

@end

//
// Creates the actual Activator listener object
//
static void createListener() {
  if ([[[UIDevice currentDevice] systemVersion] floatValue] >= 9.0f) {
    SL = [[ScreenLockerWindow alloc] init];
  } else {
    SL =
        [[ScreenLockerWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  }

  [SL setBackgroundColor:[UIColor colorWithRed:0 green:0 blue:0 alpha:0.05]];
  [SL setWindowLevel:UIWindowLevelStatusBar + 250];
  SL.layer.borderColor =
      [[UIColor redColor] colorWithAlphaComponent:0.25f].CGColor;
  SL.userInteractionEnabled = YES;
  SL.exclusiveTouch = YES;
  [[LAActivator sharedInstance] registerListener:SL
                                         forName:@"com.jontelang.screenlocker"];
  [[LAActivator sharedInstance]
      registerListener:SL
               forName:@"com.jontelang.screenlocker.invisible"];
}

//
// Constructor
//
%ctor {
  CFNotificationCenterAddObserver(
      CFNotificationCenterGetLocalCenter(), NULL,
      (CFNotificationCallback)createListener,
      (CFStringRef)UIApplicationDidFinishLaunchingNotification, NULL,
      CFNotificationSuspensionBehaviorCoalesce);
}
