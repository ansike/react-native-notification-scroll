import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
  type LayoutChangeEvent,
} from 'react-native';
import { pxToDp, sleep } from './utls';

type RNNotificationBarProps = {
  /* notification array */
  notices: string[];
  /* horn icon */
  horn?: React.ReactNode;
  /* notification width */
  width?: number;
  /* notification height */
  height?: number;
  /* notification text style */
  _textStyle?: StyleProp<TextStyle>;
  /* notification background style */
  _backStyle?: StyleProp<ViewStyle>;
};

// the segment between two notifications
const MarginRight = 20;
// the slide speed of the notification
const Speed = 20;

const RNNotificationBar = ({
  notices = [],
  width = pxToDp(678),
  height = pxToDp(64),
  horn,
  _backStyle,
  _textStyle,
}: RNNotificationBarProps) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [containerWidth, setContainerWidth] = useState(0);
  const [childWidth, setChildWidth] = useState(0);

  const stepLength = (notices.length - 1) * MarginRight;
  const animatedRef = useRef(false);

  useEffect(() => {
    // dom render and content width bigger than box width
    if (
      containerWidth &&
      childWidth &&
      childWidth + stepLength > containerWidth
    ) {
      startAnimation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerWidth, childWidth, stepLength]);

  const startAnimation = async () => {
    const length = childWidth - containerWidth + stepLength;
    const duration = Math.floor(length / Speed) * 1000;
    await sleep(300);
    while (animatedRef.current) {
      await sleep(300);
    }
    animatedRef.current = true;
    Animated.timing(animatedValue, {
      toValue: -length, // move left length
      duration, // continue time
      useNativeDriver: true,
      easing: Easing.linear,
    }).start(async () => {
      animatedRef.current = false;
      // finish and restart
      await sleep(500);
      animatedValue.setValue(0);
      startAnimation();
    });
  };

  const handleContainerLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  const handleChildLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setChildWidth((prevWidth) => prevWidth + width);
  };

  const animatedStyle = {
    transform: [
      {
        translateX: animatedValue,
      },
    ],
  };

  return (
    <View style={[styles.box, { width, height }]}>
      <View style={[styles.backgroud, { width, height }, _backStyle]} />
      {horn ? (
        horn
      ) : (
        <Image
          alt="notification"
          style={styles.icon}
          source={require('./assets/horn.png')}
        />
      )}
      <View style={styles.textBox} onLayout={handleContainerLayout}>
        {notices.length ? (
          <Animated.View
            key={notices.join(',')}
            style={[styles.slideBox, animatedStyle]}
          >
            {notices.map((text, idx) => {
              return (
                <Text
                  numberOfLines={1}
                  key={idx}
                  style={[styles.text, _textStyle]}
                  onLayout={handleChildLayout}
                >
                  {text}
                </Text>
              );
            })}
          </Animated.View>
        ) : (
          <Text style={[styles.text]}>No notifications at the moment</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: pxToDp(20),
    paddingLeft: pxToDp(24),
    paddingRight: pxToDp(24),
    justifyContent: 'space-between',
    position: 'relative',
  },
  backgroud: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: pxToDp(20),
    backgroundColor: 'rgba(253, 119, 1, 0.08)',
  },
  icon: {
    width: pxToDp(34),
    height: pxToDp(30),
    marginRight: pxToDp(12),
  },
  textBox: {
    flex: 1,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  slideBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#FD7701',
    fontSize: pxToDp(26),
    alignItems: 'center',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    marginRight: MarginRight,
  },
});

export { RNNotificationBar };
