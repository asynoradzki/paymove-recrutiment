import { UserContextProvider } from "./context/UserContext";
import { ToastContainer } from "react-toastify";
import AppRouter from "./router/App.router";
import { AppContainer } from "./router/App.styles";
import "react-toastify/dist/ReactToastify.css";

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

export default App;
