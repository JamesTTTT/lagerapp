import { StatusBar } from 'expo-status-bar';
import { Image,StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Stock from './components/Stock.tsx';
import logo from './assets/logo.png';

//6c76592d46c196c26798a89f1090c4c7

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <View style={styles.base}>
        <Image source={logo} style={{ width: 320, height: 240 }} />
        <Stock />
        <StatusBar style="auto" />
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  base: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: '#eeeeee',
    paddingLeft: 12,
    paddingRight: 12,
  }
});


