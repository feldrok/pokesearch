import Nav from "./layout/Nav"

function App() {
    return (
        <div className="flex flex-col h-screen bg-slate-800">
            <Nav />
            <div className="flex h-full justify-center items-center">
                <h1 className="text-4xl font-bold text-center text-white font-mono uppercase">
                    Semibot PokeSearch
                </h1>
            </div>
        </div>
    )
}

export default App
