import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { Item } from "../../models/Item";
import { useCallback, useContext } from "react";
import { ItemApi } from "../../api/ItemApi";
import { toast } from "react-toastify";
import { UserContext } from "../../context/UserContext";
import { CLOSE_TIME, COLOR4 } from "../../constants/constants";

interface SingleItemProps {
    item: Item;
    getAvailableItems: () => void;
}

export const SingleItem = ({ item, getAvailableItems }: SingleItemProps) => {
    const { currentUser } = useContext(UserContext);

    const deleteItem = useCallback(
        async (itemId: number) => {
            try {
                await ItemApi.deleteItem(itemId);
                getAvailableItems();

                toast.success("Item successfully deleted", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: CLOSE_TIME,
                });
            } catch (error: any) {
                let message: string;

                if (error.response && error.response.status === 404) {
                    message = "Item not found in database";
                } else if (error.response.status === 401) {
                    message = error.response.data.errorMessage;
                } else if (error.response.status === 403) {
                    message = "Your token expired, sign in again";
                } else {
                    message = "An error occured when trying to connect to server";
                }
                toast.error(message, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: CLOSE_TIME,
                });
            }
        },
        [getAvailableItems]
    );

    const buyItem = useCallback(
        async (itemId: number, email: string) => {
            try {
                await ItemApi.buyItem(itemId, email);
                getAvailableItems();

                toast.success("Congratulations, good purchase!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: CLOSE_TIME,
                });
            } catch (error: any) {
                let message: string;

                if (error.response && error.response.status === 404) {
                    message = error.response.data.errorMessage;
                } else if (error.response.status === 403) {
                    message = "Your token expired, sign in again";
                } else {
                    message = "An error occured when trying to connect to server";
                }
                toast.error(message, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: CLOSE_TIME,
                });
            }
        },
        [getAvailableItems]
    );

    return (
        <Paper elevation={3} sx={{ backgroundColor: `${COLOR4}`, width: "340px", padding: "16px" }}>
            <Box>
                <Typography variant="subtitle1">{new Date(item.offerDate).toLocaleDateString()}</Typography>
                <Typography variant="h6">{item.itemName}</Typography>
                <Typography variant="subtitle2">{item.itemDescription}</Typography>
                <Typography variant="subtitle1">Offered by: {item.sellerEmail}</Typography>
                <Typography variant="subtitle1">Price: {item.price}$</Typography>
                {item.purchaseDate && (
                    <Typography variant="subtitle2">
                        Purchased on: {item.purchaseDate ? new Date(item.purchaseDate).toLocaleDateString() : ""}
                    </Typography>
                )}
                {item.buyerEmail && <Typography variant="subtitle2">Purchsed by: {item.buyerEmail}</Typography>}
                <Stack spacing={2} direction={"row"} justifyContent={"center"}>
                    {(currentUser?.sub === item.sellerEmail || currentUser?.role === "ADMIN") && !item.buyerEmail && (
                        <Button sx={{ width: "100px" }} variant="outlined" onClick={() => deleteItem(item.itemId)}>
                            Delete
                        </Button>
                    )}
                    {currentUser && !item.buyerEmail && currentUser.sub !== item.sellerEmail && (
                        <Button
                            sx={{ width: "100px" }}
                            variant="outlined"
                            onClick={() => buyItem(item.itemId, currentUser?.sub)}
                        >
                            Buy
                        </Button>
                    )}
                </Stack>
            </Box>
        </Paper>
    );
};
