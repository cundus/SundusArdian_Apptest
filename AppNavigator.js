import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />{" "}
      <Tab.Screen name="Settings" component={SettingsScreen} />{" "}
    </Tab.Navigator>
  );
}
const { Navigator, Screen } = createStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Navigator headerMode="none">
      {/* <Screen name="Home" component={HomeScreen} />
      <Screen name="Details" component={DetailsScreen} /> */}
    </Navigator>
  </NavigationContainer>
);

export default AppNavigator;
