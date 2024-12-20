import {Routes, Route} from "react-router";
import {routes} from "./routes";

export const App = () => {
    return (
        <div>
            <Routes>
                {routes?.map((route) => <Route {...route} key={route.path}/> )}
            </Routes>
        </div>
    );
}
