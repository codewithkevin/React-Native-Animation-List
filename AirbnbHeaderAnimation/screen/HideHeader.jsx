import React, { useRef, useState } from "react";
import { Animated, FlatList, StyleSheet, Text, View } from "react-native";

const DATA = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 },
  { id: 10 },
];

const Header_Max_Height = 130;
const Header_Min_Height = 0; // Set to 0 to hide header
const Scroll_Distance = Header_Max_Height - Header_Min_Height;

const DynamicHeader = ({ value }: any) => {
  const [visible, setVisible] = useState(true);

  const animatedHeaderTranslate = value.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: [0, -Scroll_Distance],
    extrapolate: "clamp",
  });

  const toggleHeader = () => {
    setVisible(!visible);
  };

  return (
    <Animated.View
      style={[
        styles.header,
        {
          transform: [{ translateY: animatedHeaderTranslate }],
          opacity: visible ? 1 : 0,
        },
      ]}
    >
      <Text style={styles.title}>Header Content</Text>
    </Animated.View>
  );
};

const App = () => {
  const scrollOffsetY = useRef(new Animated.Value(0)).current;

  const renderCard = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.subtitle}>({item.id})</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderCard}
        keyExtractor={(item) => item.id.toString()}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
          {
            useNativeDriver: false,
          }
        )}
      />
      <DynamicHeader value={scrollOffsetY} />
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
    left: 0,
    right: 0,
    paddingTop: 25,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#181D31",
    height: Header_Max_Height,
    zIndex: 1000,
  },
  title: {
    color: "#ffff",
    fontWeight: "bold",
    fontSize: 20,
  },
  card: {
    height: 100,
    backgroundColor: "#E6DDC4",
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  subtitle: {
    color: "#181D31",
    fontWeight: "bold",
  },
});

export default App;
