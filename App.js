import React from "react";
import { NativeBaseProvider, Box } from "native-base";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

import Home from "./src/screens/Home";
import { AppContextProvider } from "./src/context/AppContext";
import Detail from "./src/screens/Detail";
import Favorite from "./src/screens/Favorite";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs({ navigation, route }) {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: "#3D56B2",
        },
        headerTintColor: "white",
        headerTitleAlign: "center",
        tabBarActiveTintColor: "#3D56B2",
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "ios-home" : "ios-home-outline";
          } else if (route.name === "Favorite") {
            iconName = focused ? "heart" : "heart-outline";
          } else {
            iconName = focused
              ? "ios-document-text"
              : "ios-document-text-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: "Contact App IDStar",
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={Favorite}
        options={{
          headerTitle: "Favorite Contact",
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <AppContextProvider>
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Main"
              component={Tabs}
              options={{
                headerShown: false,
                headerStyle: {
                  backgroundColor: "#f368e0",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />
            <Stack.Screen
              name="Detail"
              component={Detail}
              options={{
                title: "Contact Detail",
                headerStyle: {
                  backgroundColor: "#5C7AEA",
                  elevation: 0,
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </AppContextProvider>
  );
}
