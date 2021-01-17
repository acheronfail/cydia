#import <Cephei/HBPreferences.h>
#import "Activator/libactivator.h"

// Overlay window which takes all touches
@interface OverlayWindow : UIWindow <LAListener, UIAlertViewDelegate> {}
@end

// Global instance of the overlay window
static OverlayWindow *SL;
// Whether or not the tweak is enabled
static BOOL isEnabled;

// OverlayWindow implementation
@implementation OverlayWindow
// Handle events from Activator
- (void)activator:(LAActivator *)activator
     receiveEvent:(LAEvent *)event
  forListenerName:(NSString *)listenerName
{
  if (self.hidden) {
    NSLog(@"[Locker]: Enabling");
    isEnabled = true;
    if ([listenerName isEqualToString:@"com.acheronfail.locker.invisible"]) {
      SL.layer.borderWidth = 0;
    } else {
      SL.layer.borderWidth = 4;
    }
    [self makeKeyAndVisible];
    [event setHandled:YES];
  } else {
    NSLog(@"[Locker]: Disabling");
    isEnabled = false;
    [self setHidden:YES];
    [event setHandled:YES];
  }
}

@end

// disables home button
%hook SBHomeHardwareButton
-(BOOL) gestureRecognizerShouldBegin:(id)arg1 { return isEnabled ? false : %orig(arg1); }
%end

// disables gesture to show control center
%hook SBControlCenterController
-(BOOL) _shouldAllowControlCenterGesture { return isEnabled ? false : %orig; }
%end

// cancels all "swipe up for app switcher" events
%hook SBGestureSwitcherModifierEvent
-(BOOL) isCanceled { return isEnabled ? true : %orig; }
-(BOOL) isGestureEvent { return isEnabled ? false : %orig; }
%end

// seems to disable all swipe-in gestures; does seem to cause a crash when swiping
// up on the home screen (the apps) however. Doesn't do so within apps, so not a huge deal
%hook SBSystemGestureManager
-(BOOL) areSystemGesturesDisabledForAccessibility { return isEnabled ? true : %orig; }
%end

// disable changing the volume
%hook SBVolumeControl
-(void) increaseVolume { if (!isEnabled) %orig; }
-(void) decreaseVolume { if (!isEnabled) %orig; }
%end

// creates the Activator listener object
static void createListener() {
  if ([[[UIDevice currentDevice] systemVersion] floatValue] >= 9.0f) {
    SL = [[OverlayWindow alloc] init];
  } else {
    SL = [[OverlayWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  }

  // We need an alpha value here otherwise touches fall through
  [SL setBackgroundColor:[UIColor colorWithRed:0 green:0 blue:0 alpha:0.0001]];
  [SL setWindowLevel:UIWindowLevelStatusBar + 250];
  SL.layer.borderColor = [[UIColor redColor] colorWithAlphaComponent:0.25f].CGColor;
  SL.userInteractionEnabled = YES;
  SL.exclusiveTouch = YES;

  [[LAActivator sharedInstance] registerListener:SL forName:@"com.acheronfail.locker"];
  [[LAActivator sharedInstance] registerListener:SL forName:@"com.acheronfail.locker.invisible"];
}

//
// Constructor
//
%ctor {
  // create Activator listener on start
  CFNotificationCenterAddObserver(
      CFNotificationCenterGetLocalCenter(), NULL,
      (CFNotificationCallback)createListener,
      (CFStringRef)UIApplicationDidFinishLaunchingNotification, NULL,
      CFNotificationSuspensionBehaviorCoalesce);

  // register app settings
  HBPreferences *preferences = [[HBPreferences alloc] initWithIdentifier:@"com.acheronfail.locker"];
  [preferences registerBool:&isEnabled default:false forKey:@"_isEnabled"];
}
