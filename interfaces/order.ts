import OrderItems from "./order_item";

export default interface Order {
    id: number,
    name: string,
    adress: string,
    zip: number,
    city: string,
    country: string,
    status: string,
    status_id: number,
    order_items: Array<OrderItems>
}