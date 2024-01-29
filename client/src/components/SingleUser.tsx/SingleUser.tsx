import { Box, Paper, Typography } from "@mui/material";
import { User } from "../../models/User";
import { COLOR4 } from "../../constants/constants";

interface SingleUserProps {
    user: User;
}

export const SingleUser = ({ user }: SingleUserProps) => {
    return (
        <Paper elevation={3} sx={{ backgroundColor: `${COLOR4}`, width: "340px", padding: "16px" }}>
            <Box>
                <Typography variant="subtitle1">Id: {user.userId}</Typography>
                <Typography variant="subtitle1">Name: {user.firstname}</Typography>
                <Typography variant="subtitle1">Lastname: {user.lastname}</Typography>
                <Typography variant="subtitle1">E-mail: {user.email}</Typography>
                <Typography variant="subtitle1">Role: {user.role}</Typography>
            </Box>
        </Paper>
    );
};
