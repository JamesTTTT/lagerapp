import { Text, Button,View,ScrollView } from "react-native";
import { useEffect,useState } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import {Base, Typography, Forms} from "../styles"
import config from "./../config/config.json";
import deliveries from "../models/deliveries";
export default function DeliveriesList({route, navigation }) {

    const { reload } = route.params ||false;
    const [deliveryList, setDeliveryList] = useState([]);

    if(reload) {
        reloadDeliveires();
    }

    async function reloadDeliveires() {
        setDeliveryList( await deliveries.getDeliveries());
    }

    useEffect(() => {
        fetch(`${config.base_url}/deliveries?api_key=${config.api_key}`)
          .then(response => response.json())
          .then(result => setDeliveryList(result.data));
    }, []);

    const listOfDeliveries = deliveryList.map((item, index) => {
            return <Text key={index} style={Forms.input}>
               Produkt: {item.product_name}{"\n"}
               Antal: {item.amount}{"\n"}
               Leverans datumn: {item.delivery_date}{"\n"}
               Kommentar: {item.comment}
            </Text>;
        });

    return (
        <SafeAreaView style={Base.container}>
        <View style={Base.delivery}>
            <ScrollView>
            <Text style={Typography.header2}>Inleveranser</Text>
            {listOfDeliveries}
            <Button
                title="Skapa ny inleverans"
                onPress={() => {
                    navigation.navigate('Form');
                }}
            />
            </ScrollView>
        </View>
        </SafeAreaView>
    );
}
