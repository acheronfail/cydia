TARGET=:clang
ARCHS = armv7 armv7s arm64

include $(THEOS)/makefiles/common.mk

TWEAK_NAME = Locker
Locker_FILES = Tweak.xm
Locker_FRAMEWORKS = UIKit
Locker_LIBRARIES = activator
Locker_EXTRA_FRAMEWORKS += Cephei

include $(THEOS_MAKE_PATH)/tweak.mk

after-install::
	install.exec "killall -9 SpringBoard"
