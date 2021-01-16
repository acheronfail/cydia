# Locker

A tweak which:

* disables the home button
* disables swipe for Control Center
* disables swipe for Notification Center
* disables swipe up for App Switcher
* disables touches on the screen

This was mainly built with the purpose of giving an iPad to a young child and not allowing them to change the app or quit, etc. Basically turns the device into a Kiosk.

## Usage

After you've installed the tweak, you can assign an Activator action to start/stop this tweak. **I recommend you pick something that uses the Volume buttons** since the screen and the home buttons will be disabled.

**ONE MORE TIME**: Be _careful_ about the action you choose for activating this tweak, since this tweak _completely disables your home button and swipe gestures_. I highly recommend you setup your device so you can SSH into it. This will be useful if you completely ignore all of this advice and set a home-button-related action to enabled this tweak!

## How to "unblock" the device

If you can SSH into your device, a few useful commands may be:

* `apt remove com.acheronfail.locker` (remove the tweak)
* `killall -9 SpringBoard` (restart Springboard, also called "Respring". You'll need to run this after uninstalling)
* `activator send libactivator.system.homebutton` (run activator commands from the terminal)

If you _can't_ SSH into your device, then you don't have a lot of options left. If you're using a tethered jailbreak you could restart (thus removing the jailbreak, and thereby this tweak).
Some jailbreaks (like checkra1n) automatically enable a SSH server over USB, see their documentation for details.

### Other Notes

Originally forked from: https://github.com/jontelang/ScreenLocker though much has been removed and added, and it doesn't really resemble that tweak anymore! xD
