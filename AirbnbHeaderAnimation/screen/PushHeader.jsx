import React, { useRef } from "react";
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
const Header_Min_Height = 100;
const Scroll_Distance = Header_Max_Height - Header_Min_Height;

const DynamicHeader = ({ value }: any) => {
  const animatedHeaderHeight = value.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: [Header_Max_Height, Header_Min_Height],
    extrapolate: "clamp",
  });

  const animatedHeaderColor = value.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: ["#181D31", "#678983"],
    extrapolate: "clamp",
  });

  return (
    <View>
      <Animated.View
        style={[
          styles.header,
          {
            height: animatedHeaderHeight,
            backgroundColor: animatedHeaderColor,
          },
        ]}
      >
        <Text style={styles.title}>Header Content</Text>
      </Animated.View>
    </View>
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
      <DynamicHeader value={scrollOffsetY} />
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
