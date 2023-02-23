import { colors } from "../utils/pokemonTypes"

export default function PokemonCard({ pokemon }: any) {
    return (
        <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
            <div className="flex relative flex-col items-center bg-[rgb(92,94,239)] p-4 rounded-md shadow-lg hover:scale-105 border-2 border-[rgb(92,94,239)] hover:border-white hover:shadow-none duration-200">
                <h3 className="font-mono absolute top-4 left-4 text-white font-semibold text-sm">
                    {pokemon?.id}
                </h3>
                <h2 className="font-mono text-white uppercase font-semibold">
                    {pokemon?.name}
                </h2>
                <img
                    className="h-40 w-40"
                    src={pokemon?.sprites?.front_default ?? ""}
                    alt={pokemon?.name}
                />
                <ul className="flex gap-2">
                    {pokemon?.types?.map((type: any) => (
                        <li
                            key={type.type.name}
                            className={`bg-[${
                                colors.find(
                                    (color) => color.type === type.type.name
                                )?.color
                            }] text-white font-mono font-semibold uppercase text-xs px-2 py-1 shadow-md rounded-full hover:scale-110 hover:shadow-none cursor-pointer duration-150`}
                        >
                            {type.type.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
