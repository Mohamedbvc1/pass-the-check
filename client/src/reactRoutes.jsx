import { createBrowserRouter } from "react-router-dom";
import RestaurantPage from "./components/RestaurantPage";
import Facilities from "./components/Frontpage";
import NewFrontPage from "./components/Frontpage2";
import ViolationsForFacility from './components/ViolationsForFacility';
import { BarCharts } from "./components/Charts";
import { useRouteError } from 'react-router-dom'


const router = createBrowserRouter([
    { path: "/restaurant/:id", element: <RestaurantPage />, errorElement: <ErrorPage /> },
    { path: "/error", element: <ErrorPage /> },
    { path: "/", element: <NewFrontPage /> },
    { path: "/charts", element: <BarCharts /> },
    { path: `/test/:id`, element: <ViolationsForFacility />, errorElement: <ErrorPage /> },
])

function ErrorPage() {
    const error = useRouteError();
    console.log(error);

    return <div>
        <h2>Oh Snap! Something went sideways!</h2>
        <div>{error}</div>
    </div>
}

export default router