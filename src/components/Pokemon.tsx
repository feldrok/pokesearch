import { useEffect, useState } from "react"

import Footer from "../layout/Footer"
import Nav from "../layout/Nav"
import PokemonCard from "./PokemonCard"
import TypeFilter from "./TypeFilter"
import axios from "axios"
import { useQuery } from "react-query"

const API_URL = process.env.REACT_APP_API_URL

const client = axios.create({
    baseURL: API_URL,
})

function Pokemon() {
    const [search, setSearch] = useState("")
    const [pokemonData, setPokemonData] = useState<any>([])
    const [pokemons, setPokemons] = useState<any>([])
    const [type, setType] = useState<any>([])

    const {
        data: pokemon,
        isFetching,
        error,
    } = useQuery(
        ["getPokemon"],
        async () => {
            const { data } = await client.get(`/pokemon?limit=151`)
            return data
        },
        {
            onSuccess: (data) => {
                data.results?.map((pokemon: any) => {
                    client.get(pokemon.url).then((res) => {
                        setPokemonData((prev: any) => [...prev, res.data])
                    })
                })
            },
        }
    )

    useEffect(() => {
        if (type.length === 0) {
            setPokemons(pokemonData)
        } else {
            const filteredPokemons = pokemonData?.filter((pokemon: any) => {
                // filter each pokemon type by each type in the type state
                const filteredTypes = pokemon.types.filter((typeObj: any) =>
                    type.includes(typeObj.type.name)
                )

                // if the pokemon has a type that matches the filter, return it
                if (filteredTypes.length > 0) {
                    return pokemon
                }
                return null
            })
            setPokemons(filteredPokemons)
        }
    }, [type])

    return (
        <div className="flex flex-col h-full min-h-screen bg-slate-800">
            <Nav />
            <div className="flex flex-col items-center justify-center pt-4">
                <h1 className="font-mono text-white font-bold">Filters</h1>
                <div className="flex flex-col  items-center gap-6 p-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Search by name"
                            onChange={(e) => setSearch(e.target.value)}
                            className="bg-[rgb(92,94,239)] hover:bg-[rgb(75,78,240)] text-white placeholder:text-gray-200 font-mono font-semibold uppercase text-xs px-4 py-2 shadow-md rounded-full  cursor-pointer duration-150 outline-none"
                        />
                    </div>
                    <div className="flex justify-center">
                        <TypeFilter setType={setType} />
                    </div>
                </div>
            </div>
            <>{error && <div>Something is wrong</div>}</>
            {isFetching ? (
                <span className="text-white font-mono">Loading...</span>
            ) : (
                <div className="container my-10 mx-auto px-4 md:px-10">
                    <div className="flex flex-wrap -mx-1 lg:-mx-4">
                        {type.length === 0
                            ? pokemonData
                                  .filter((pokemon: any) =>
                                      pokemon.name
                                          .toLowerCase()
                                          .includes(search.toLowerCase())
                                  )
                                  .map((pokemon: any) => {
                                      return (
                                          <PokemonCard
                                              key={pokemon.name}
                                              pokemon={pokemon}
                                              type={type}
                                          />
                                      )
                                  })
                            : pokemons
                                  .filter((pokemon: any) =>
                                      pokemon.name
                                          .toLowerCase()
                                          .includes(search.toLowerCase())
                                  )
                                  .map((pokemon: any) => {
                                      return (
                                          <PokemonCard
                                              key={pokemon.name}
                                              pokemon={pokemon}
                                              type={type}
                                          />
                                      )
                                  })}
                    </div>
                </div>
            )}
            <Footer />
        </div>
    )
}

export default Pokemon
