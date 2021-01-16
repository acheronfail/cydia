THEOS_PACKAGE_DIR=../../debs
TARGET=:clang
ARCHS = armv7 armv7s arm64

include $(THEOS)/makefiles/common.mk
include $(THEOS_MAKE_PATH)/tweak.mk

TWEAK_NAME = Locker
Locker_FILES = Tweak.xm
Locker_FRAMEWORKS = UIKit
Locker_LIBRARIES = activator
Locker_EXTRA_FRAMEWORKS += Cephei

after-install::
	install.exec "killall -9 SpringBoard"
