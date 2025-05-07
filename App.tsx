import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5, MaterialIcons, Ionicons } from "@expo/vector-icons";

import RiderHomeScreen from "./src/app/screens/RiderHomeScreen";
import RideRequestScreen from "./src/app/screens/RideRequestScreen";
import ActiveRideScreen from "./src/app/screens/ActiveRideScreen";
import RideCompleteScreen from "./src/app/screens/RideCompleteScreen";
import EarningsScreen from "./src/app/screens/EarningsScreen";
import RiderProfileScreen from "./src/app/screens/RiderProfile";
import { UserProvider } from "./src/app/utils/UserContext";
import RegistrationScreen from "./src/app/screens/RegistrationScreen";
import WelcomeScreen from "./src/app/screens/WelcomeScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#606c38",
        tabBarInactiveTintColor: "#6c757d",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
        tabBarStyle: {
          backgroundColor: "#fefae0",
          borderTopColor: "#e9ecef",
          paddingTop: 5,
          paddingBottom: 5,
          height: 60,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={RiderHomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Earnings"
        component={EarningsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="money-bill-wave" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={RiderProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#fefae0" },
          }}
        >
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Registration" component={RegistrationScreen} />
          <Stack.Screen name="Main" component={MainTabs} />
          <Stack.Screen name="RideRequest" component={RideRequestScreen} />
          <Stack.Screen name="AcceptedRide" component={ActiveRideScreen} />
          <Stack.Screen name="ActiveRide" component={ActiveRideScreen} />
          <Stack.Screen name="RideComplete" component={RideCompleteScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
