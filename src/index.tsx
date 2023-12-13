import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, Image, StyleSheet, Text, View } from "react-native";
import { sleep, getPxToDp } from "./utls";

type RNNotificationScrollProps = {
  // message content array
  notices: string[];
  // The size of draft. default 750
  draftSize?: number;
  // The interval between messages. default 20
  marginRight?: number;
  // The speed of message. default 20
  speed?: number;
};
const RNNotificationScroll = ({
  notices = [],
  marginRight = 20,
  speed = 20,
  draftSize = 750,
}: RNNotificationScrollProps) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [containerWidth, setContainerWidth] = useState(0);
  const [childWidth, setChildWidth] = useState(0);
  const extraLength = notices.length * marginRight;
  const animatedRef = useRef(false);
  const pxToDp = getPxToDp(draftSize);

  useEffect(() => {
    if (containerWidth && childWidth) {
      startAnimation();
    }
  }, [containerWidth, childWidth]);

  const styles = StyleSheet.create({
    box: {
      width: pxToDp(678),
      height: pxToDp(62),
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "rgba(46, 92, 222, 0.08)",
      borderRadius: pxToDp(20),
      paddingLeft: pxToDp(24),
      paddingRight: pxToDp(24),
      justifyContent: "space-between",
    },
    icon: {
      width: pxToDp(28),
      height: pxToDp(28),
      marginRight: pxToDp(18),
    },
    textBox: {
      overflow: "hidden",
      flexDirection: "row",
      width: pxToDp(584),
    },
    slideBox: {
      width: pxToDp(10000),
      flexDirection: "row",
    },
    text: {
      minWidth: pxToDp(584),
      color: "#2E5CDE",
      fontSize: pxToDp(26),
      fontWeight: "bold",
      alignItems: "center",
      flexWrap: "nowrap",
      flexDirection: "row",
    },
  });

  const startAnimation = async () => {
    const length = childWidth - containerWidth + extraLength;
    const duration = Math.floor(length / speed) * 1000;
    await sleep(300);
    while (animatedRef.current) {
      await sleep(300);
    }
    animatedRef.current = true;
    Animated.timing(animatedValue, {
      toValue: -length, // 向左移动的距离
      duration, // 动画持续时间
      useNativeDriver: true,
      easing: Easing.linear,
    }).start(async () => {
      animatedRef.current = false;
      // 动画完成后重新开始
      await sleep(1000);
      animatedValue.setValue(0);
      startAnimation();
    });
  };

  const handleContainerLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  const handleChildLayout = (event) => {
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
    <View style={styles.box}>
      <Image
        alt="notification"
        style={styles.icon}
        source={require("~/img/v2/horn.png")}
      />
      <View style={styles.textBox} onLayout={handleContainerLayout}>
        {notices.length ? (
          <Animated.View
            key={notices.join(",")}
            style={[styles.slideBox, animatedStyle]}
          >
            {notices.map((text, idx) => {
              return (
                <Text
                  numberOfLines={1}
                  key={idx}
                  style={[styles.text, { marginRight }]}
                  onLayout={handleChildLayout}
                >
                  {text}
                </Text>
              );
            })}
          </Animated.View>
        ) : (
          <Text>No notifications at the moment</Text>
        )}
      </View>
    </View>
  );
};

export default RNNotificationScroll;
