import { useEffect,useState } from "react";
import invoiceModel from "../../models/invoices";
import Invoice from '../../interfaces/invoice';
import {Base, Typography } from '../../styles';
import storage from "../../models/storage";
import Invoices from "./Invoices";
import { DataTable } from "react-native-paper";
import { ScrollView,Button,Text } from "react-native";

export default function InvoiceList({ route, navigation, setIsLoggedIn }) {
    const { reload } = route.params || false;
    const [allInvoices, setAllInvoices] = useState<Invoice>([]);

    async function reloadInvoices() {
        setAllInvoices(await invoiceModel.getInvoices());
    }

    if(reload) {
        reloadInvoices();
    }

    useEffect(() => {
        reloadInvoices();
    }, []);

    async function logOut() {
        storage.deleteToken();
        setIsLoggedIn(false);
    }

    const invoicesRows = allInvoices.map((invoice, index) => {
        return (
            <DataTable.Row key = {index}>
                <DataTable.Cell>{invoice.name}</DataTable.Cell>
                <DataTable.Cell numeric>{invoice.total_price}</DataTable.Cell>
                <DataTable.Cell>{invoice.due_date}</DataTable.Cell>
            </DataTable.Row>
        );
    });

    return (
        <ScrollView>
            <Text style={Typography.header2}>Fakturor</Text>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Namn</DataTable.Title>
                    <DataTable.Title numeric>Pris</DataTable.Title>
                    <DataTable.Title numeric>Förfallodatumn</DataTable.Title>
                </DataTable.Header>
                {invoicesRows}
            </DataTable>
            <Button
            title ="Ny faktura"
            onPress={async ()=> {
                navigation.navigate('Form')
            }}
            />     
            <Button
            title ="Logga ut"
            onPress={async ()=> {
                await logOut()
            }}
            />
        </ScrollView>
    );
}
