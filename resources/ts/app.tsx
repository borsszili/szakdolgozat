import {Routes, Route} from "react-router";
import {routes} from "./routes";
import {useAppDispatch} from "./Hooks/useAppDispatch";
import {useEffect} from "react";
import {setIsMobile} from "./Stores/Reducers/MobileSlice";
import {AnimatedLayout} from "./Components/animatedLayout";

export const App = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        const checkMobile = () => {
            dispatch(setIsMobile(window.innerWidth < 768))
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [dispatch])

    return (
        <div>
            <AnimatedLayout>
                <Routes>
                    {routes?.map((route) => <Route {...route} key={route.path}/> )}
                </Routes>
            </AnimatedLayout>
        </div>
    );
}
