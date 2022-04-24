import { createNativeStackNavigator } from "@react-navigation/native-stack";

import InvoiceList from './InvoicesList'
import InvoiceForm from './InvoicesForm'

const Stack = createNativeStackNavigator();

export default function Invoices(props) {
    return (
        <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="List">
                {(screenProps) => <InvoiceList { ...screenProps} 
                setIsLoggedIn = {props.setIsLOggedIn} />}
            </Stack.Screen>
            <Stack.Screen name="Form" component={InvoiceForm}/>
        </Stack.Navigator>
    );
};
