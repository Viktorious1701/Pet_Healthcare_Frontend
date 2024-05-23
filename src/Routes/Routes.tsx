import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <main>Home</main>,
        children:[
            {
                path: "about",
                element: <main>About</main>
            }
        ]
    }
])

export default router;