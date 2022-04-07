import { View, Text, Button } from "react-native";
import {useEffect, useState} from 'react'
import orderModel from "../models/orders";
import products from "../models/product";
import { CurrentRenderContext } from "@react-navigation/native";
import { Base, Typography } from '../styles';

export default function PickList({ route, navigation, setProducts }) {
    const { order } = route.params;
    const [productsList, setProductsList] = useState([]);

    useEffect(async () => {
        setProductsList(await products.getProducts());
    }, []);

    async function pick() {
        await orderModel.pickOrder(order);
        setProducts(await products.getProducts());
        navigation.navigate("List", {reload:true});
    }

    const productsHash = productsList.reduce((hash, current) => ({...hash,
    [current.id]: current.stock }), {});

    let allInStock = true;

    const orderItemsList = order.order_items.map((item, index) => {
        if (productsHash[item.product_id] < item.amount){
            allInStock = false;
        }
        
        return <Text
                key={index}
                >
                    {item.name} - {item.amount} - {item.location}
            </Text>;
    });

    return (
        <View>
            <Text style={Typography.header3}>{order.name}</Text>
            <Text>{order.address}</Text>
            <Text>{order.zip} {order.city}</Text>

            <Text style={Typography.altnormal}>Produkter:</Text>

            {orderItemsList}
            {allInStock
                ? <Button title="Plocka order" onPress={pick} />
                : <Text>Det finns inte tillräckligt
                     med varor för att utföra packning
                    </Text>
            }

            
        </View>
    )
};
