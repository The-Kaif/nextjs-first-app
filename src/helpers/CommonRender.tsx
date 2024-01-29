import React from "react";

export const MakeTypesIntoTags = (types: any) => {
  return (
    <div>
      {types.map((type: any, index: number) => (
        <span
          key={index}
          className="me-3 inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300"
        >
          <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
          {type.type.name}
        </span>
      ))}
    </div>
  );
};

const CapitalizeWords = (str: any) => {
  return str.replace(/\b\w/g, (char: any) => char.toUpperCase());
};

interface PokemonTableProps {
  data: Array<{
    id: number | string;
    name: string;
    image: string;
    types: React.ReactNode;
  }>;
}

export const PokemonTable: React.FC<PokemonTableProps> = ({ data }) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Image
            </th>
            <th scope="col" className="px-6 py-3">
              Types
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((pokemon, index) => (
            <tr
              key={index}
              className="text-center odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
            >
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {pokemon.id}
              </td>
              <td className="px-6 py-4 font-bold">
                {CapitalizeWords(pokemon.name)}
              </td>
              <td className="px-6 py-4 flex justify-center">
                <div className="w-16 h-16">
                  <img
                    src={pokemon.image}
                    alt={pokemon.name}
                    className="w-full h-full object-contain"
                  />
                </div>
              </td>

              <td className="px-6 py-4">{MakeTypesIntoTags(pokemon.types)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
