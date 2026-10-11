import { useEffect, useState } from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";

import router from './reactRoutes';

function App() {
  // const router = createBrowserRouter([
  //   {path: "/restaurant", element: <RestaurantPage />, errorElement: <ErrorPage />,},
  //   { path: "/error", element: <ErrorPage /> },
  //   { path: "/", element: <Facilities /> },
  //   { path: `/restaurant/:id`, element: <ViolationsForFacility/>, errorElement: <ErrorPage/>},
  // ]);

  return (
    <>
      <div>
        <RouterProvider router={router}></RouterProvider>
      </div>
    </>
  );
}

export default App;
