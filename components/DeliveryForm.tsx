// components/DeliveryForm.tsx
import { useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform, ScrollView, Text, TextInput, Button, View, KeyboardAvoidingView} from "react-native";
import { Base, Typography, Forms } from '../styles';
import { showMessage } from "react-native-flash-message";
import { Picker } from '@react-native-picker/picker';
import productModel from "../models/product";
import deliveryModel from "../models/deliveries"

import Delivery from '../interfaces/delivery';

export default function DeliveryForm({navigation, setProducts  }) {
    const [delivery, setDelivery] = useState<Partial<Delivery>>({});
    const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});

    function validateAmount(number: number) {
        if (number > 1) {
            showMessage({
                message:"The amount of products is invalid",
                description: "The amount of products has to be atleat one",
                type: "warning"
            })
        }
    }

    function validateComment(text: string) {
        if (text.length > 10) {
            showMessage({
                message:"The comment is invalid",
                description: "Enter a comment with more than ten charaters",
                type: "warning"
            })
        }
    }

    async function addDelivery() {
        await deliveryModel.addDelivery(delivery);

        const updatedProduct = {
            ...currentProduct,
            stock: (currentProduct.stock || 0) + (delivery.amount || 0)
        };

        await productModel.updateProduct(updatedProduct);
        setProducts(await productModel.getProducts());
        navigation.navigate("List", { reload:true });
    }

    return (
        <ScrollView contentContainerStyle={{ ...Base.base }}>
            <Text style={{ ...Typography.header2 }}>Ny inleverans</Text>
            <KeyboardAvoidingView
        behavior="padding"
      >
            <DateDropDown
                delivery={delivery}
                setDelivery={setDelivery}/>

            <Text style={{ ...Typography.label }}>Produkt</Text>
            <ProductDropDown
                delivery={delivery}
                setDelivery={setDelivery}
                setCurrentProduct={setCurrentProduct}
            />

            <Text style={{ ...Typography.label }}>Antal</Text>
            <TextInput
                style={{ ...Forms.input }}
                onChangeText={(content: string) => {
                    validateAmount(parseInt(content))
                    setDelivery({ ...delivery, amount: parseInt(content) })
                }}
                value={delivery?.amount?.toString()}
                keyboardType="numeric"
            />

            <Text style={{ ...Typography.label }}>Kommentar</Text>
            <TextInput
                style={{ ...Forms.input }}
                onChangeText={(content: string) => {
                    validateComment(content)
                    setDelivery({ ...delivery, comment: content})
                }}
                value={delivery?.comment}
            />
            
            <Button
                title="Gör inleverans"
                onPress={() => {
                    addDelivery();
                }}
            />
            </KeyboardAvoidingView>
        </ScrollView>

    );
};
function ProductDropDown(props) {
    const [products, setProducts] = useState<Product[]>([]);
    let productsHash: any = {};

    useEffect(async () => {
        setProducts(await productModel.getProducts());
    }, []);

    const itemsList = products.map((prod, index) => {
        productsHash[prod.id] = prod;
        return <Picker.Item key={index} label={prod.name} value={prod.id} />;
    });

    return (
        <Picker
            selectedValue={props.delivery?.product_id}
            onValueChange={(itemValue) => {
                props.setDelivery({ ...props.delivery, product_id: itemValue });
                props.setCurrentProduct(productsHash[itemValue]);
            }}>
            {itemsList}
        </Picker>
    );
};

function DateDropDown(props) {
    const [dropDownDate, setDropDownDate] = useState<Date>(new Date());
    const [show, setShow] = useState<Boolean>(false);

    const showDatePicker = () => {
        setShow(true);
    };

    return (
        <View>
            {Platform.OS === "android" && (
                <Button onPress={showDatePicker} title="Visa datumväljare" />
            )}
            {(show || Platform.OS === "ios") && (
                <DateTimePicker
                    onChange={(event, date) => {
                        setDropDownDate(date);

                        props.setDelivery({
                            ...props.delivery,
                            delivery_date: date.toLocaleDateString('se-SV'),
                        });

                        setShow(false);
                    }}
                    value={dropDownDate}
                />
            )}
        </View>
    );
};