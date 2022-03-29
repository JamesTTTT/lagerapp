import { StatusBar } from 'expo-status-bar';
import { Image,StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Stock from './components/Stock.tsx';
import warehouse from './assets/warehouse.jpg';

//6c76592d46c196c26798a89f1090c4c7

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.base}>
        <Text style={{color: '#33c', fontSize: 42}}>Lager-Appen</Text>
        <Image source={warehouse} style={{ width: 320, height: 240 }} />
        <Stock />
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  base: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 12,
    paddingRight: 12,
  }
});


