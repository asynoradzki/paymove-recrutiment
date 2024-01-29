import { useNavigate } from "react-router-dom";
import { LoginContainer } from "./Login.styles";
import { useCallback, useContext, useEffect, useState } from "react";
import { SignInRequest } from "../../models/SignInRequest";
import { UserContext } from "../../context/UserContext";
import { AuthApi } from "../../api/AuthApi";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";
import { saveTokenToLocaleStorage, validateEmailRFC2822 } from "../../auth_helpers/authHelpers";
import { Box, Button, Checkbox, FormControlLabel, Stack, TextField } from "@mui/material";
import { UserFromToken } from "../../models/UserFromToken";
import { Haeding } from "../../router/App.styles";
import { CLOSE_TIME } from "../../constants/constants";

export const Login = () => {
    const navigate = useNavigate();
    const { userModifier } = useContext(UserContext);

    const [signInRequest, setSignInRequest] = useState<SignInRequest>({ email: "", password: "" });

    const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
    const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const onLoginClicked = useCallback(async () => {
        try {
            const result = await AuthApi.signIn(signInRequest);
            saveTokenToLocaleStorage(result.data);
            const decodedAccessToken: UserFromToken = jwtDecode(result.data.access_token);

            userModifier({ ...decodedAccessToken });
            navigate("/");
        } catch (error: any) {
            let message: string;

            if (error.response && error.response.status === 403) {
                message = "Incorrect email or password";
            } else {
                message = "An error occured when trying to connect to server";
            }
            toast.error(message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: CLOSE_TIME,
            });
        }
    }, [signInRequest, navigate, userModifier]);

    useEffect(() => {
        setIsEmailValid(validateEmailRFC2822(signInRequest.email));
    }, [signInRequest.email]);

    useEffect(() => {
        setIsPasswordValid(signInRequest.password.length > 0);
    }, [signInRequest.password]);

    return (
        <LoginContainer>
            <Haeding>Log In The App</Haeding>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                }}
            >
                <Stack marginTop={16} width={360} direction={"column"} spacing={2} alignItems={"center"}>
                    <TextField
                        fullWidth
                        label="email"
                        variant="outlined"
                        required
                        color="primary"
                        value={signInRequest.email}
                        error={!(isEmailValid || signInRequest.email.length === 0)}
                        onChange={(e) => setSignInRequest({ ...signInRequest, email: e.currentTarget.value })}
                    />
                    <TextField
                        fullWidth
                        label="password"
                        variant="outlined"
                        required
                        color="primary"
                        type={showPassword ? "text" : "password"}
                        value={signInRequest.password}
                        onChange={(e) => setSignInRequest({ ...signInRequest, password: e.currentTarget.value })}
                    />
                    <Box sx={{ width: "100%" }}>
                        <FormControlLabel
                            control={
                                <Checkbox checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
                            }
                            label="Show password"
                        />
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={onLoginClicked}
                        disabled={!(isEmailValid && isPasswordValid)}
                        sx={{ width: "120px" }}
                    >
                        Sign In
                    </Button>
                </Stack>
            </Box>
        </LoginContainer>
    );
};
