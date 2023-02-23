import axios from "axios"
import { colors } from "../utils/pokemonTypes"
import { useQuery } from "react-query"
const API_URL = process.env.REACT_APP_API_URL

const client = axios.create({
    baseURL: API_URL,
})

export default function TypeFilter({ setType }: any) {
    const { data, isFetching, error } = useQuery("getTypes", async () => {
        const { data } = await client.get("/type?limit=18")
        return data
    })

    return (
        <>
            {<>{error && <div>Something is wrong</div>}</>}
            {isFetching ? (
                <span className="text-white font-mono">Loading...</span>
            ) : (
                <div className="flex gap-2 flex-wrap justify-center items-center">
                    {data?.results.map((type: any) => (
                        <label
                            className={`bg-[${
                                colors.find((color) => color.type === type.name)
                                    ?.color
                            }] hover:bg-[${
                                colors.find((color) => color.type === type.name)
                                    ?.hoverColor
                            }] text-white select-none font-mono font-semibold flex items-center uppercase text-xs px-2 py-2 shadow-md rounded-full hover:scale-110 hover:shadow-none cursor-pointer duration-150`}
                        >
                            <input
                                key={type.name}
                                type="checkbox"
                                name={type.name}
                                id={type.name}
                                className="appearance-none w-3 h-3 rounded-full border-2 mr-2 border-white checked:bg-slate-800 checked:border-transparent focus:outline-none"
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setType((prev: any) => [
                                            ...prev,
                                            e.target.name,
                                        ])
                                    } else {
                                        setType((prev: any) =>
                                            prev.filter(
                                                (type: any) =>
                                                    type !== e.target.name
                                            )
                                        )
                                    }
                                }}
                            />
                            {type.name}
                        </label>
                    ))}
                </div>
            )}
        </>
    )
}
