import { Box, Paper } from "@mui/material";
import { Item } from "../../models/Item";

interface SingleItemProps {
    item: Item;
}

export const SingleItem = ({ item }: SingleItemProps) => {
    return (
        <Paper elevation={2} sx={{ backgroundColor: "lightgrey", width: "300px" }}>
            <Box>
                <div>{new Date(item.offerDate).toLocaleDateString()}</div>
                <div>{item.itemName}</div>
                <div>{item.itemDescription}</div>
                <div>{item.sellerEmail}</div>
                <div>{item.price}</div>
            </Box>
        </Paper>
    );
};
