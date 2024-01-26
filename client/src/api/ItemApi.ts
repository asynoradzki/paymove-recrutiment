import axios from "axios";
import { Item } from "../models/Item";

export class ItemApi {
    static getAvailableItems = async () => await axios.get<Item[]>(`/items/all`);
}
