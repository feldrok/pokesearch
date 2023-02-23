import { Link, NavLink } from "react-router-dom"

const routes = [
    {
        path: "/",
        name: "Home",
    },
    {
        path: "/pokemon",
        name: "Pokemon",
    },
]

export default function Nav() {
    return (
        <nav className="bg-[rgb(92,94,239)] p-4 shadow-md flex justify-between">
            <div>
                <Link
                    to={"/"}
                    className="font-semibold text-white cursor-pointer uppercase font-mono"
                >
                    Pokesearch
                </Link>
            </div>
            <div>
                <ul className="flex gap-2">
                    {routes.map((route) => (
                        <li key={route.path}>
                            <NavLink
                                to={route.path}
                                className={({ isActive }) => {
                                    return `text-white font-mono font-semibold uppercase hover:border-b-2 hover:border-white ${
                                        isActive
                                            ? "border-b-2 border-white"
                                            : ""
                                    }`
                                }}
                            >
                                {route.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}
