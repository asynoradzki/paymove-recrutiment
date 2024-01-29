import { toast } from "react-toastify";
import { ItemApi } from "../../api/ItemApi";
import { SingleItem } from "../../components/single_item/SingleItem";
import { Item } from "../../models/Item";
import { AllItemsContainer, Items } from "./AllItems.styles";
import { useCallback, useEffect, useState } from "react";
import { Haeding } from "../../router/App.styles";
import { CLOSE_TIME } from "../../constants/constants";

export const AllItems = () => {
    const [items, setItems] = useState<Item[]>([]);

    const getAvailableItems = useCallback(async () => {
        try {
            const result = await ItemApi.getAvailableItems();
            setItems(result.data);
        } catch (error) {
            toast.error("something went wrong with the server!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: CLOSE_TIME,
            });
        }
    }, []);

    useEffect(() => {
        getAvailableItems();
        // eslint-disable-next-line
    }, []);

    return (
        <AllItemsContainer>
            <Haeding>Items Available For Sale</Haeding>
            <Items>
                {items.map((item, index) => (
                    <SingleItem key={index} item={item} getAvailableItems={getAvailableItems} />
                ))}
            </Items>
        </AllItemsContainer>
    );
};
