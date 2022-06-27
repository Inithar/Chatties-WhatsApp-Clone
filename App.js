import React, { useState, useEffect } from "react";
import { Text, LogBox } from "react-native";
import { useAssets } from "expo-asset";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SignIn from "./screens/SignIn";
import ContextWrapper from "./context/ContextWrapper";
import Profile from "./screens/Profile";
import Chats from "./screens/Chats";
import Photo from "./screens/Photo";
import { Ionicons } from "@expo/vector-icons";
import Contacts from "./screens/Contacts";
import Chat from "./screens/Chat";
import ChatHeader from "./components/ChatHeader";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./theme";
import { t } from "./lang";

// Ignores two errors, caused by firebase. They are ignored because nothing can be done about them at the moment.
LogBox.ignoreLogs([
  "Setting a timer",
  "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
]);

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

function App() {
  const [currUser, setCurrUser] = useState(null);

  // Subscribe to firebase, listen when user signs in or signs out from application
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrUser(user);
      }
    });
    return () => unsubscribe();
  }, []);

  // If we don't have a user show sign in screen.
  // If there is a user, but don't have display name show profile screen, otherwise show home screen.
  return (
    <NavigationContainer>
      {!currUser ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="signIn" component={SignIn} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#075E54",
              shadowOpacity: 0,
              elevation: 0,
            },
            headerTintColor: "white",
            headerBackTitle: t("Back"),
          }}
        >
          {!currUser.displayName && (
            <Stack.Screen
              name="profile"
              component={Profile}
              options={{ headerShown: false }}
            />
          )}

          <Stack.Screen
            name="home"
            component={Home}
            options={{ title: t("Messages") }}
          />

          <Stack.Screen
            name="contacts"
            component={Contacts}
            options={{ title: t("Select Contacts") }}
          />

          <Stack.Screen
            name="chat"
            component={Chat}
            options={{ headerTitle: (props) => <ChatHeader {...props} /> }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

// Tab navigation component
function Home() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        return {
          tabBarLabel: () => {
            if (route.name === "photo") {
              return <Ionicons name="camera" size={20} color="white" />;
            } else {
              return (
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  {route.name.toLocaleUpperCase()}
                </Text>
              );
            }
          },
          tabBarShowIcon: true,
          tabBarLabelStyle: {
            color: "white",
          },
          tabBarIndicatorStyle: {
            backgroundColor: "white",
          },
          tabBarStyle: {
            backgroundColor: "#075E54",
          },
        };
      }}
      initialRouteName="chats"
    >
      <Tab.Screen name="photo" component={Photo} />
      <Tab.Screen name="chats" component={Chats} />
    </Tab.Navigator>
  );
}

// Pre-load assets and return App
export default function Main() {
  const [assets] = useAssets(
    require("./assets/icon-square.png"),
    require("./assets/chatbg.png"),
    require("./assets/user-icon.png"),
    require("./assets/welcome-img.png")
  );

  if (!assets) {
    return <Text>Loading ..</Text>;
  }

  return (
    <ContextWrapper>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ContextWrapper>
  );
}
