import config from "../config/config.json"
import Delivery from "../interfaces/delivery";

const deliveries = {
    getDeliveries: async function getDeliveries() {
        const response = await fetch(`${config.base_url}/deliveries?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    },
    addDelivery: async function addDelivery(delivery) {
        delivery.api_key = config.api_key

        await fetch(`${config.base_url}/deliveries`, {
            body: JSON.stringify(delivery),
            headers: {
                'content-type': 'application/json'
            },
            method:'POST'
        })
    },
};

export default deliveries