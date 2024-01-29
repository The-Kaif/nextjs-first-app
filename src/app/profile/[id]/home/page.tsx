// Import necessary modules and components
"use client";
import Layout from "@/app/components/Layout";
import { MakeTypesIntoTags, PokemonTable } from "@/helpers/CommonRender";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

// Define the functional component named 'Home'
function Home() {
  // State to manage Pokemon data and loading status
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  // useEffect hook to fetch Pokemon data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await fetchPokemon();
      } catch (error: any) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to fetch a list of Pokemon
  async function fetchPokemon() {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=15`
      );
      const allpokemon = await response.json();

      for (const pokemon of allpokemon.results) {
        await fetchPokemonData(pokemon);
      }
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
    }
  }

  // Function to fetch detailed data of a specific Pokemon
  async function fetchPokemonData(pokemon: any) {
    try {
      const response = await fetch(pokemon.url);
      const pokeData = await response.json();
      renderPokemon(pokeData);
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
    }
  }

  // Function to process and render Pokemon data
  function renderPokemon(pokeData: any) {
    let obj: any = {
      id: pokeData.order,
      name: pokeData.name,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeData.id}.png`,
      types: pokeData.types,
    };

    setData((prevData: any) => {
      // Use a Set to keep track of unique IDs
      const idSet = new Set(prevData.map((item: any) => item.id));

      // Check if the current Pokemon ID already exists
      if (!idSet.has(obj.id)) {
        return [...prevData, obj];
      }

      // If the ID already exists, update the existing data
      return prevData.map((item: any) => (item.id === obj.id ? obj : item));
    });
  }


  // JSX structure for the component's UI
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-4">Pokemon Details</h1>
      <p className="text-gray-600 mb-6">
        Explore detailed information about the selected Pokemon.
      </p>

      {loading ? (
        // Loading spinner while fetching data
        <div className="flex items-center justify-center h-screen">
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* SVG path for loading spinner */}
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        // Render Pokemon data in a table
        <PokemonTable data={data} />
      )}
    </Layout>
  );
}

// Export the component as the default export
export default Home;
