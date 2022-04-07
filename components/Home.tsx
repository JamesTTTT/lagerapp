import { StatusBar } from 'expo-status-bar';
import { Image,StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Stock from './Stock';
import logo from '../assets/logo.png';
import { Base, Typography } from '../styles';

export default function Home({route, products, setProducts}) {
    return (
      <SafeAreaView style={Base.container}>
        <View style={Base.base}>
          <Image source={logo} style={{ width: 150, height: 120 }} />
          <ScrollView>
          <Stock products={products} setProducts={setProducts}/>
          <StatusBar style="auto" />
          </ScrollView>
        </View>
      </SafeAreaView>
    );
}

