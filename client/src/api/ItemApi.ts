import axios from "axios";
import { Item } from "../models/Item";
import { authorizedApi } from "../hooks/withAxiosIntercepted";
import { ItemCreateRequest } from "../models/ItemCreateRequest";
import qs from "qs";

export class ItemApi {
    static getAvailableItems = async () => await axios.get<Item[]>(`/items/all`);

    static getMyPurchasedItems = async (email: string) => {
        return await authorizedApi.get<Item[]>(`/items/purchased?email=${encodeURIComponent(email)}`);
    };

    static getMyItemsForSale = async (email: string) =>
        await authorizedApi.get<Item[]>(`/items/offered?email=${encodeURIComponent(email)}`);

    static addItem = async (request: ItemCreateRequest) => await authorizedApi.post<Item>(`/items/`, request);

    static deleteItem = async (itemId: number) => await authorizedApi.delete<Item>(`/items/${itemId}`);

    static buyItem = async (itemId: number, email: String) =>
        await authorizedApi.patch<Item>(`/items/buy/${itemId}?email=${email}`);
}
