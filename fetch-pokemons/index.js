// savePokemons.js
const fs = require("fs");

const fetchPokemons = async () => {
  const pokemons = [];
  for (let i = 1; i <= 30; i++) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const data = await response.json();
    pokemons.push({
      id: data.id,
      number: data.id.toString().padStart(3, "0"),
      name: data.name,
      classification: data.types.map((t) => t.type.name).join(", "),
      fleeRate: (Math.random() * 0.2).toFixed(2),
      image: data.sprites.front_default,
    });
  }
  fs.writeFileSync("./data/pokemons.json", JSON.stringify(pokemons, null, 2));
};

fetchPokemons();
