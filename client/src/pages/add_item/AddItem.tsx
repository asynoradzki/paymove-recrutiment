import { useNavigate } from "react-router-dom";
import { ItemCreateRequest } from "../../models/ItemCreateRequest";
import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { ItemApi } from "../../api/ItemApi";
import { toast } from "react-toastify";
import { Box, Button, Stack, TextField } from "@mui/material";
import { AddItemContainer } from "./AddItems.styles";
import { Haeding } from "../../router/App.styles";
import { CLOSE_TIME } from "../../constants/constants";

export const AddItem = () => {
    const { currentUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [addItemRequest, setAddItemRequest] = useState<ItemCreateRequest>({
        itemName: "",
        itemDescription: "",
        price: 0,
        sellerEmail: currentUser?.sub ? currentUser.sub : "",
    });
    const [isRequestValid, setIsRequestValid] = useState<boolean>(false);

    const addItem = useCallback(async () => {
        try {
            if (currentUser?.sub) {
                await ItemApi.addItem(addItemRequest);
            }

            toast.success("Your item is for sale now!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: CLOSE_TIME,
            });

            navigate("/");
        } catch (error: any) {
            let message: string;

            if (error.response && error.response.status === 404) {
                message = "User not found in database";
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
    }, [addItemRequest, navigate, currentUser?.sub]);

    useEffect(() => {
        const isValid: boolean =
            !!addItemRequest.itemName &&
            !!addItemRequest.itemDescription &&
            addItemRequest.price >= 0 &&
            !!addItemRequest.sellerEmail;
        setIsRequestValid(isValid);
    }, [addItemRequest]);

    return (
        <AddItemContainer>
            <Haeding>Add Item For Sale</Haeding>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                }}
            >
                <Stack width={300} direction={"column"} spacing={2} alignItems={"center"} paddingTop={"64px"}>
                    <TextField
                        fullWidth
                        label="Item name"
                        variant="outlined"
                        required
                        color="primary"
                        value={addItemRequest.itemName}
                        onChange={(e) => setAddItemRequest({ ...addItemRequest, itemName: e.currentTarget.value })}
                    />
                    <TextField
                        fullWidth
                        label="Item description"
                        variant="outlined"
                        required
                        color="primary"
                        value={addItemRequest.itemDescription}
                        onChange={(e) =>
                            setAddItemRequest({ ...addItemRequest, itemDescription: e.currentTarget.value })
                        }
                    />
                    <TextField
                        fullWidth
                        label="Price"
                        variant="outlined"
                        required
                        color="primary"
                        value={addItemRequest.price}
                        onChange={(e) => setAddItemRequest({ ...addItemRequest, price: +e.currentTarget.value })}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={addItem}
                        disabled={!isRequestValid}
                        sx={{ width: "120px" }}
                    >
                        Add Item
                    </Button>
                </Stack>
            </Box>
        </AddItemContainer>
    );
};
