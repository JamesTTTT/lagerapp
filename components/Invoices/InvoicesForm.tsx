import { Platform, ScrollView, Text, TextInput, Button, View, } from "react-native";
import {Base, Typography, Forms} from '../../styles'
import DateTimePicker from '@react-native-community/datetimepicker';

import invoiceModel from "../../models/invoices";
import ordersModel from "../../models/orders";

import Invoice from "../../interfaces/invoice";
import Order from "../../interfaces/order";
import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";

export default function InvoicesForm({navigation, route }) {
    const [invoice, setInvoice] = useState<Partial<Invoice>>({});
    const [currentOrder, setCurrentOrder] = useState<Order[]>([]);
    
    async function createInvoice() {
        await invoiceModel.createInvoice(invoice);
        navigation.navigate("List", {reload: true});
    }

    return (
        <ScrollView contentContainerStyle={{ ...Base.base }}>
            <Text style={{ ...Typography.label }}>Ny faktura</Text>
            <OrderDropDown
                invoice={invoice}
                setInvoice={setInvoice}
                currentOrder={currentOrder}
                setCurrentOrder={setCurrentOrder}
            />

        <Text style={{ ...Typography.label }}>Faktura Förfallodatumn</Text>
        <DateDropDown
                invoice={invoice}
                setInvoice={setInvoice}/>

        <Button
            title="Skapa Faktura"
            onPress={() => {
                createInvoice()
            }}
        />
        </ScrollView>
    )
}

function zeroPad(number: number): string {
    if (number < 10){
        return "0" + number;
    }
    return "" + number;
}

function formatDate(date: Date): string {
    return `${date.getFullYear()}-${zeroPad(date.getMonth())}
    -${zeroPad(date.getDate())}`;
}

function OrderDropDown(props) {
    const [orders, setOrders] = useState<Order[]>([]);
    let orderHash: any = {};

    useEffect(async () => {
        setOrders(await ordersModel.getOrders());
    }, []);

    const ordersList = orders.filter(order => order.status == "Packad")
    .map((order, index) => {
        orderHash[order.id] = order;
        return <Picker.Item key = {index} label = {order.name} value = {order.id} />;

    });
    return (
        <Picker
            selectedValue={props.invoice?.order_id}
            onValueChange={(itemValue) => {
                props.setInvoice({ ...props.invoice, order_id: itemValue });
                props.setCurrentOrder(orderHash[itemValue]);
            }}>
            {ordersList}
        </Picker>
    );
}

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

                        props.setInvoice({
                            ...props.delivery,
                            creation_date: date.toLocaleDateString('se-SV'),
                        });

                        setShow(false);
                    }}
                    value={dropDownDate}
                />
            )}
        </View>
    );
}

