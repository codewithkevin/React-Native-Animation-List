import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Animated,
  ScrollView,
  Image,
  Platform,
  StatusBar,
} from "react-native";

const HEADER_HEIGHT =
  Platform.OS === "ios" ? 115 : 70 + StatusBar.currentHeight;

const DATA = [
  { id: 1, uri: require("./assets/adaptive-icon.png") },
  { id: 2, uri: require("./assets/adaptive-icon.png") },
  { id: 3, uri: require("./assets/adaptive-icon.png") },
  { id: 4, uri: require("./assets/adaptive-icon.png") },
  { id: 5, uri: require("./assets/adaptive-icon.png") },
  { id: 6, uri: require("./assets/adaptive-icon.png") },
  { id: 7, uri: require("./assets/adaptive-icon.png") },
  { id: 8, uri: require("./assets/adaptive-icon.png") },
  { id: 9, uri: require("./assets/adaptive-icon.png") },
  { id: 10, uri: require("./assets/adaptive-icon.png") },
  { id: 11, uri: require("./assets/adaptive-icon.png") },
  { id: 12, uri: require("./assets/adaptive-icon.png") },
  { id: 13, uri: require("./assets/adaptive-icon.png") },
  { id: 14, uri: require("./assets/adaptive-icon.png") },
  { id: 15, uri: require("./assets/adaptive-icon.png") },
  { id: 16, uri: require("./assets/adaptive-icon.png") },
  { id: 17, uri: require("./assets/adaptive-icon.png") },
  { id: 18, uri: require("./assets/adaptive-icon.png") },
  { id: 19, uri: require("./assets/adaptive-icon.png") },
  { id: 20, uri: require("./assets/adaptive-icon.png") },
  { id: 21, uri: require("./assets/adaptive-icon.png") },
  { id: 23, uri: require("./assets/adaptive-icon.png") },
];

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
        <Text style={{ fontWeight: 400 }}>Header</Text>
      </Animated.View>
      <Animated.ScrollView
        bounces={false}
        scrollEventThrottle={16}
        onScroll={handleScroll}
        style={{ paddingTop: HEADER_HEIGHT }}
      >
        {DATA.map((image) => (
          <View
            key={image.id}
            style={{
              height: 400,
              margin: 20,
              backgroundColor: "green",
              borderRadius: 30,
            }}
          >
            <Image
              source={image.uri}
              style={{ flex: 1, height: null, width: null }}
            />
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightblue",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  item: {
    justifyContent: "center",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});

export default AirbnbHeaderAnimation;
