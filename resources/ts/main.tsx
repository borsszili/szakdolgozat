import {StrictMode} from "react";
import {App} from "./app";
import {createRoot} from "react-dom/client";
import {HashRouter} from "react-router";
import '@/css/app.css';
import "@/ts/Config/axios.ts";

const root = createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <StrictMode>
        <HashRouter>
            <App />
        </HashRouter>
    </StrictMode>
);
