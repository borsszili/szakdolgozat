import {StrictMode} from "react";
import {App} from "./app";
import {createRoot} from "react-dom/client";
import {HashRouter} from "react-router";
import '../../css/app.css';
import "./Config/axios.ts";
import {Provider} from "react-redux";
import {store} from "./Stores/store";

const root = createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <StrictMode>
        <HashRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </HashRouter>
    </StrictMode>
);
