import { useState, useEffect } from 'react';
import { View, Text, Button } from "react-native";
import orders from '../../models/orders';
import config from "../../config/config.json";
import { Typography,Base } from '../../styles';

export default function ShipList({ navigation, route }) {
    const [allOrders, setAllOrders] = useState([]);
    const { reload } = route.params || true;


    useEffect(() => {
        fetch(`${config.base_url}/orders?api_key=${config.api_key}`)
          .then(response => response.json())
          .then(result => setAllOrders(result.data));
    }, []);

    const listOfOrders = allOrders
    .filter(order => order.status === "Packad")
    .map((order, index) => {
        return <Button
            title={order.name}
            key={index}
            onPress={() => {
                navigation.navigate('Order', {
                    order: order
                });
            }}
        />
    });

    return (
        <View style={Base.base}>
            <Text style={Typography.label}>Färdiga Ordrar som ska skickas</Text>
            {listOfOrders}
        </View>
    )
}