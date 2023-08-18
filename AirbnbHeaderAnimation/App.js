import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Animated,
  Image,
  Platform,
  StatusBar,
} from "react-native";

const HEADER_HEIGHT =
  Platform.OS === "ios" ? 115 : 70 + StatusBar.currentHeight;

const DATA = Array.from({ length: 23 }, (_, index) => ({
  id: index + 1,
  uri: require("./assets/adaptive-icon.png"),
}));

const AirbnbHeaderAnimation = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const diffClampScrollY = Animated.diffClamp(scrollY, 0, HEADER_HEIGHT);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  const headerY = diffClampScrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: "clamp",
  });

  const renderImageItem = ({ item }) => (
    <View
      key={item.id}
      style={{
        height: 400,
        margin: 20,
        backgroundColor: "green",
        borderRadius: 30,
      }}
    >
      <Image source={item.uri} style={{ flex: 1, height: null, width: null }} />
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: HEADER_HEIGHT,
          backgroundColor: "blue",
          zIndex: 1000,
          elevation: 1000,
          transform: [{ translateY: headerY }],
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 45,
        }}
      >
        <Text style={{ fontWeight: "400" }}>Header</Text>
      </Animated.View>
      <FlatList
        bounces={false}
        data={DATA}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderImageItem}
        scrollEventThrottle={16}
        onScroll={handleScroll}
        style={{ paddingTop: HEADER_HEIGHT }}
      />
    </View>
  );
};

export default AirbnbHeaderAnimation;
