import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ScrollView, SafeAreaView } from 'react-native';

import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ClerkProvider , SignedIn , SignedOut } from '@clerk/clerk-expo';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from './pages/Home';
import CommentScreen from './pages/Comment';

import Login from './pages/Login';

const CLERK_PUBLISHABLE_KEY="pk_test_cGV0LXNoaW5lci0yNy5jbGVyay5hY2NvdW50cy5kZXYk";

const Stack=createNativeStackNavigator();
// const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <SignedIn>
        <PaperProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name='Home' component={HomeScreen}/>
              <Stack.Screen name='Comments' component={CommentScreen}/>
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </SignedIn>
      <SignedOut>
        <Login></Login>
      </SignedOut>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
