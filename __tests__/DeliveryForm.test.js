import { render } from "@testing-library/react-native";
import DeliveryForm from "../components/DeliveryForm";

test('test that the header Ny inleverans exists', async () => {
    const { getByText } = render(<DeliveryForm />);
    const header = await getByText('Ny inleverans');

    expect(header).toBeDefined();
});

test('test that the label Antal exists', async () => {
    const { getByText } = render(<DeliveryForm />);
    const label = await getByText('Antal');

    expect(label).toBeDefined();
});

test('test that the label kommentar exists', async () => {
    const { getByText } = render(<DeliveryForm />);
    const label = await getByText('Kommentar');

    expect(label).toBeDefined();
});