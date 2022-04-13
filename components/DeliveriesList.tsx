import { Text, Button,View } from "react-native";
import {Base, Typography} from "../styles"
export default function DeliveriesList({ navigation }) {
    
    return (
        <View style={Base.base}>
            <Text style={Typography.header2}>Inleveranser</Text>
            {listOfDeliveries}
            <Button
                title="Skapa ny inleverans"
                onPress={() => {
                    navigation.navigate('Form');
                }}
            />
        </View>
    );
}
