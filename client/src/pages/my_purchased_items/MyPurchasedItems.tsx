import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Item } from "../../models/Item";
import { ItemApi } from "../../api/ItemApi";
import { toast } from "react-toastify";
import { Items, MyPurchasedItemsContainer } from "./MyPurchasedItems.styles";
import { SingleItem } from "../../components/single_item/SingleItem";
import { Haeding } from "../../router/App.styles";
import { CLOSE_TIME } from "../../constants/constants";

export const MyPurchasedItems = () => {
    const { currentUser } = useContext(UserContext);
    const [items, setItems] = useState<Item[]>([]);

    const getMyPurchasedItems = useCallback(async () => {
        try {
            if (currentUser?.sub) {
                const result = await ItemApi.getMyPurchasedItems(currentUser.sub);
                setItems(result.data);
            }
        } catch (error: any) {
            let message: string;

            if (error.response && error.response.status === 404) {
                message = error.response.data.errorMessage;
            } else if (error.response.status === 403) {
                message = "Your token expired, sign in again";
            } else {
                message = "something went wrong with the server";
            }

            toast.error(message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: CLOSE_TIME,
            });
        }
    }, [currentUser?.sub]);

    useEffect(() => {
        if (currentUser) {
            getMyPurchasedItems();
        }
        // eslint-disable-next-line
    }, [currentUser]);

    return (
        <MyPurchasedItemsContainer>
            <Haeding>My Purchased Items</Haeding>
            <Items>
                {items.map((item, index) => (
                    <SingleItem key={index} item={item} getAvailableItems={getMyPurchasedItems} />
                ))}
            </Items>
        </MyPurchasedItemsContainer>
    );
};
