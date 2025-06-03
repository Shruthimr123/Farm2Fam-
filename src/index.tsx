import React from "react";
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux";
import { store } from "./app/store"
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

ReactDOM.createRoot(document.getElementById('root')!).render(

    <PayPalScriptProvider options={
        {
            "clientId": "AcEpwCsIyg9uBsRVY04DOVtMqQGZ7cNjuwBeON-gLSROFgT_V5sMdJLstzBQUwe0QUsETTZ73rBHX7z1",
            "currency": "USD"
        }
    }>
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </PayPalScriptProvider>

)
