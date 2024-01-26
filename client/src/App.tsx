import { UserContextProvider } from "./context/UserContext";
import { ToastContainer } from "react-toastify";
import { AppRouter } from "./router/App.router";
import { AppContainer } from "./router/App.styles";
import "react-toastify/dist/ReactToastify.css";
import { withAxiosIntercepted } from "./hooks/withAxiosIntercepted";

function App() {
    return (
        <AppContainer>
            <UserContextProvider>
                <AppRouter />
                <ToastContainer />
            </UserContextProvider>
        </AppContainer>
    );
}

export default withAxiosIntercepted(App);
