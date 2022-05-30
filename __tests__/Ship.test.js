import { render } from '@testing-library/react-native';
import ShipOrder from '../components/Ship/ShipOrder';

const testroute = {
    "params": {
        "order": {
            "id": 3333,
            "name": "Johan Ek",
            "address": "Kungsmarksvägen 73",
            "zip": "37144",
            "city": "Karlskrona",
            "country": "Sweden",
            "status": "Packad",
            "status_id": 200,
            "order_items": [],
        },
    },
};

test('test that ShipOrder contains the Skicka order header ', async() => {
    
    const { getByText } = render(<ShipOrder route={testroute} />)
    const header = await getByText("Skicka order");

    expect(header).toBeDefined();

})

test('test that ShipOrder contains the correct order details ', async() => {
    
    const { getByText } = render(<ShipOrder route={testroute} />)
    const adress = await getByText("Kungsmarksvägen 73", { exact: false });
    const city = await getByText("Karlskrona", { exact: false });

    expect(adress).toBeDefined();
    expect(city).toBeDefined();
})