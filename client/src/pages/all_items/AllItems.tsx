import { ItemApi } from "../../api/ItemApi";
import { SingleItem } from "../../components/single_item/SingleItem";
import { UserContext } from "../../context/UserContext";
import { Item } from "../../models/Item";
import { AllItemsContainer } from "./AllItems.styles";
import { useCallback, useContext, useEffect, useState } from "react";

export const AllItems = () => {
    const { currentUser } = useContext(UserContext);
    const [items, setItems] = useState<Item[]>([]);

    const getAvailableItems = useCallback(async () => {
        try {
            const result = await ItemApi.getAvailableItems();
            setItems(result.data);
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        getAvailableItems();
    }, [getAvailableItems]);

    return (
        <AllItemsContainer>
            {items.map((item, index) => (
                <SingleItem key={index} item={item} />
            ))}
            <div>{currentUser?.exp}</div>
            <div>{currentUser?.sub}</div>
            <div>{currentUser?.role}</div>
        </AllItemsContainer>
    );
};
