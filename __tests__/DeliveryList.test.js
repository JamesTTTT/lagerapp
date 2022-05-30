import { render } from "@testing-library/react-native";
import DeliveryList from "../components/DeliveriesList";

jest.mock("../components/Deliveries", ()=>"Deliveries");

test('test that DeliveryList contains add delivery button ', async() => {
    
    const { getByText } = render(<DeliveryList route={true} />)
    const btn = await getByText("Skapa ny inleverans")

    expect(btn).toBeDefined();
})

test('test that DeliveryList contains header inleveranser ', async() => {
    
    const { getByText } = render(<DeliveryList route={true} />)
    const header = await getByText("Inleveranser")

    expect(header).toBeDefined();
})