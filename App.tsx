import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { useEffect, useState} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Home from "./components/Home";
import Pick from "./components/Pick";
import Deliveries from './components/Deliveries';
import Invoices from './components/Invoices/Invoices';
import Ship from './components/ship/Ship';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Base, Typography } from './styles';

import Auth from "./components/Auth/Auth";
import authModel from "./models/auth";
import FlashMessage from 'react-native-flash-message';

//6c76592d46c196c26798a89f1090c4c7
const Tab = createBottomTabNavigator();
const routeIcons = {
  "Lager": "home",
  "Plock": "list",
  "Inleveranser": "cube",
  "Logga in": "key",
  "Faktura": "cash-outline",
  "Skicka": "mail",
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  const [products, setProducts] = useState([]);

  useEffect(async () => {
    setIsLoggedIn(await authModel.loggedIn())
  }, []);

  return (
      <SafeAreaView style={Base.container}>
        <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
        let iconName = routeIcons[route.name] || "alert";
      
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#3C6478',
      tabBarInactiveTintColor: 'gray',
    })}
  >
    <Tab.Screen name="Lager">
      {() => <Home products={products} setProducts={setProducts}/>
      }
    </Tab.Screen>
    <Tab.Screen name="Plock">
      {()=> <Pick setProducts={setProducts}/>}
    </Tab.Screen>
    <Tab.Screen name="Inleveranser">
    {() => <Deliveries setProducts={setProducts}/>}
    </Tab.Screen>
    <Tab.Screen name="Skicka">
        {() => <Ship/>}
      </Tab.Screen>
    {isLoggedIn ?
      <Tab.Screen name="Faktura">
        {() => <Invoices setIsLoggedIn={setIsLoggedIn}/>}
      </Tab.Screen> :
      <Tab.Screen name="Logga in">
        {() => <Auth setIsLoggedIn={setIsLoggedIn} />}
      </Tab.Screen>
    }
  </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    <FlashMessage position="top"/>
    </SafeAreaView>
  );
}


