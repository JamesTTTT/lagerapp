import config from "../config/config.json";
import products from"./product";
import Order from "../interfaces/order";
import OrderItems from "../interfaces/order_item";


const orders = {
    getOrders: async function getOrders() {
        const response = await fetch(`${config.base_url}/orders?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    },
    pickOrder: async function pickOrder(order: Partial<Order>) {
        // TODO: Minska lagersaldo för de
        // orderrader som finns i ordern
        await Promise.all(order.order_items.map(async (order_item:
        Partial<OrderItems>) => {
            let changedProduct = {
                id:order_item.product_id,
                name: order_item.name,
                stock: order_item.stock - order_item.amount,
                api_key: config.api_key,
            };
            await products.updateProduct(changedProduct);
        }))
        
        // TODO: Ändra status för ordern till packad
        let updateStatus = {
            id: order.id,
            name: order.name,
            status_id: 200,
            api_key: config.api_key
        };

        await orders.updateOrder(updateStatus)
    },
    updateOrder: async function updateOrder(order :Partial<Order>) {
        await fetch(`${config.base_url}/orders?api_key=${config.api_key}`, {
            body: JSON.stringify(order),
            headers: {
                'content-type': 'application/json'
            },
            method:'PUT'
        })
    }
};

export default orders;