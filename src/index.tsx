import "./index.css"

import { QueryClient, QueryClientProvider } from "react-query"
import { RouterProvider, createBrowserRouter } from "react-router-dom"

import App from "./App"
import Pokemon from "./components/Pokemon"
import ReactDOM from "react-dom/client"
import reportWebVitals from "./reportWebVitals"

// Implementing the router here just for simplicity of the task
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/pokemon",
        element: <Pokemon />,
    },
])

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
        },
    },
})

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
    </QueryClientProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
