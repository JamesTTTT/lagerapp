import { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Base, Typography } from "../../styles";

import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import * as Location from 'expo-location';

import getCoordinates from "../../models/nominatim";

export default function ShipOrder({ route }){
    const { order } = route.params;
    const [marker, setMarker] = useState(null);
    const [locationMarker, setLocationMarker] = useState(null);

    useEffect(() => {
        (async () => {
            const result = await getCoordinates(`${order.adress},${order.city}`)
            console.log(result)

            setMarker(<Marker
                coordinate={{latitude: parseFloat(result[0].lat), longitude: parseFloat(result[0].lon)}}
                title={result[0].display_name}
            />);

        })();
    }, [])

    useEffect(() => {
        (async () => {
            const {status} = await Location.requestBackgroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMessage("Permission to access location was denied")
                return;
            }

            const currentLocation = await Location.getCurrentPositionAsync({});
            setLocationMarker(<Marker
                coordinate={{
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude
                }}
                title="Min Plats"
                pinColor="green"
                />);

        })();
    }, [])

    return (
        <View style={styles.container}>
            <Text style={Typography.header2}>Skicka Order</Text>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude:56.162,
                    longitude:15.5869,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1
                }}
            />
            {marker}
            {locationMarker}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});
