import { useState, useEffect } from 'react';
import { View, Text, Button } from "react-native";
import orders from '../models/orders';
import config from "./../config/config.json";

export default function OrderList({route, navigation }) {
    const { reload } = route.params ||false;
    const [allOrders, setAllOrders] = useState([]);

    if(reload) {
        reloadOrders();
    }

    async function reloadOrders() {
        setAllOrders( await orders.getOrders());
    }


    useEffect(() => {
        fetch(`${config.base_url}/orders?api_key=${config.api_key}`)
          .then(response => response.json())
          .then(result => setAllOrders(result.data));
    }, []);

    const listOfOrders = allOrders
        .filter(order => order.status === "Ny")
        .map((order, index) => {
            return <Button
                title={order.name}
                key={index}
                onPress={() => {
                    navigation.navigate('Details', {
                        order: order
                    });
                }}
            />
        });

    return (
        <View>
            <Text>Ordrar redo att plockas</Text>
            {listOfOrders}
        </View>
    );
}