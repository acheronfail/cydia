THEOS_PACKAGE_DIR=../../debs
TARGET=:clang
ARCHS = armv7 armv7s arm64

include $(THEOS)/makefiles/common.mk

TWEAK_NAME = RoundCorners
RoundCorners_FILES = Tweak.xm
RoundCorners_FRAMEWORKS = UIKit

include $(THEOS_MAKE_PATH)/tweak.mk

after-install::
	install.exec "killall -9 SpringBoard"
