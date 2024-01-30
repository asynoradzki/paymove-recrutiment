import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { RegisterRequest } from "../../models/RegisterRequest";
import { AuthApi } from "../../api/AuthApi";
import { saveTokenToLocaleStorage, validateEmailRFC2822 } from "../../auth_helpers/authHelpers";
import { toast } from "react-toastify";
import { UserFromToken } from "../../models/UserFromToken";
import jwtDecode from "jwt-decode";
import { RegisterContainer } from "./Register.styles";
import { Box, Button, Checkbox, FormControlLabel, MenuItem, Stack, TextField } from "@mui/material";
import { Haeding } from "../../router/App.styles";
import { CLOSE_TIME } from "../../constants/constants";

const roles: String[] = ["User", "Admin"];

export const Register = () => {
    const navigate = useNavigate();
    const { userModifier } = useContext(UserContext);
    const [registerRequest, setRegisterRequest] = useState<RegisterRequest>({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        role: null,
    });
    const [repeatedPassword, setRepeatedPassword] = useState<string>("");
    const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
    const [isRequestValid, setIsRequestValid] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [selectedRole, setSelectedRole] = useState<number>(2);

    const onRegisterClicked = useCallback(async () => {
        try {
            const result = await AuthApi.signUp(registerRequest);

            saveTokenToLocaleStorage(result.data);

            toast.success("You have successfully registered and signed in", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
            });

            const decodedAccessToken: UserFromToken = jwtDecode(result.data.access_token);
            userModifier({ ...decodedAccessToken });

            navigate("/");
        } catch (error: any) {
            let message: string;

            if (error.response && error.response.status === 403) {
                message = "Incorrect email or password";
            } else if (
                error.response.status === 403 &&
                error.response.data.errorMessage === "email already exists in database"
            ) {
                message = "User with such e-mail aready exists";
            } else {
                message = "An error occured when trying to connect to server";
            }
            toast.error(message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: CLOSE_TIME,
            });
        }
    }, [registerRequest, navigate, userModifier]);

    useEffect(() => {
        setIsEmailValid(validateEmailRFC2822(registerRequest.email));
    }, [registerRequest.email]);

    useEffect(() => {
        const isValid: boolean =
            !!registerRequest.firstname &&
            !!registerRequest.lastname &&
            isEmailValid &&
            registerRequest.password.length > 7 &&
            repeatedPassword === registerRequest.password &&
            !!registerRequest.role;

        setIsRequestValid(isValid);
    }, [registerRequest, isEmailValid, repeatedPassword]);

    const onRoleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (+e.target.value === 0) {
            setRegisterRequest((prevState) => ({ ...prevState, role: "USER" }));
        } else if (+e.target.value === 1) {
            setRegisterRequest((prevState) => ({ ...prevState, role: "ADMIN" }));
        } else {
            setRegisterRequest((prevState) => ({ ...prevState, role: null }));
        }
        setSelectedRole(+e.target.value);
    };

    return (
        <RegisterContainer>
            <Haeding>Register New User</Haeding>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                }}
            >
                <Stack marginTop={8} width={360} direction={"column"} spacing={2} alignItems={"center"}>
                    <TextField
                        fullWidth
                        label="first name"
                        variant="outlined"
                        required
                        color="primary"
                        value={registerRequest.firstname}
                        onChange={(e) => setRegisterRequest({ ...registerRequest, firstname: e.currentTarget.value })}
                    />
                    <TextField
                        fullWidth
                        label="last name"
                        variant="outlined"
                        required
                        color="primary"
                        value={registerRequest.lastname}
                        onChange={(e) => setRegisterRequest({ ...registerRequest, lastname: e.currentTarget.value })}
                    />
                    <TextField
                        fullWidth
                        label="email"
                        variant="outlined"
                        required
                        color="primary"
                        value={registerRequest.email}
                        error={!(isEmailValid || registerRequest.email.length === 0)}
                        onChange={(e) => setRegisterRequest({ ...registerRequest, email: e.currentTarget.value })}
                    />
                    <TextField
                        fullWidth
                        label="password"
                        variant="outlined"
                        required
                        color="primary"
                        type={showPassword ? "text" : "password"}
                        value={registerRequest.password}
                        error={registerRequest.password.length < 8 && registerRequest.password.length > 0}
                        onChange={(e) => setRegisterRequest({ ...registerRequest, password: e.currentTarget.value })}
                    />

                    <TextField
                        fullWidth
                        label="repeat password"
                        variant="outlined"
                        required
                        color="primary"
                        type={showPassword ? "text" : "password"}
                        value={repeatedPassword}
                        error={!(registerRequest.password === repeatedPassword || repeatedPassword.length === 0)}
                        onChange={(e) => setRepeatedPassword(e.target.value)}
                    />
                    <Box sx={{ width: "100%" }}>
                        <FormControlLabel
                            control={
                                <Checkbox checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
                            }
                            label="Show password"
                        />
                    </Box>
                    <Box minHeight={80} width="100%">
                        <TextField
                            color="primary"
                            label="select role"
                            variant="outlined"
                            required
                            select
                            value={selectedRole}
                            onChange={onRoleChange}
                            fullWidth
                            inputProps={{
                                readOnly: false,
                            }}
                        >
                            <MenuItem value={2} disabled={false}>
                                {"Select role"}
                            </MenuItem>
                            {roles.map((role, index) => (
                                <MenuItem key={index} value={index}>
                                    {role}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={onRegisterClicked}
                        disabled={!isRequestValid}
                        sx={{ width: "120px" }}
                    >
                        Sign up
                    </Button>
                </Stack>
            </Box>
        </RegisterContainer>
    );
};
