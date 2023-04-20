const express = require("express");
const fs = require("fs");

const port = 3000;
const server = express();
const router = express.Router();

const homeFilePath = "./home.html";
// const driversFilePath = "./driver-data.json";

//  Configuracion de Router para servidores que tengan rutas con parametros.PONER SIEMPRE QUE HAY PARAMS.
server.use(express.json());
// Que entienda los json
server.use(express.urlencoded({ extended: false }));
// Entiende mejor los params de las rutas

router.get("/", (req, res) => {
  fs.readFile(homeFilePath, (error, data) => {
    //  Leemos el fichero//
    if (error) {
      //  Si hay error al leer el fichero ... envio codigo 500 y un mensaje
      res.status(500).send("Error inesperado");
    } else {
      //  Si no hay errores leyendo le devolvemos el html
      res.setHeader("Content-Type", "text/html; charset=UTF-8");
      res.send(data);
    }
  });
});

// router.get("/pokemon", (req, res) => {
//   fs.readFile(pokemonFilePath, (error, data) => {
//     //  Leemos el fichero//
//     if (error) {
//       //  Si hay error al leer el fichero ... envio codigo 500 y un mensaje
//       res.status(500).send("Error inesperado");
//     } else {
//       //  Si no hay error al leer el fichero ...
//       const pokemons = JSON.parse(data);
//       //  Parseamos el json
//       res.json(pokemons);
//       // Enviamos todos los pokemons en la respuesta
//     }
//   });
// });

// router.post("/pokemon", (req, res) => {
//   fs.readFile(pokemonFilePath, (error, data) => {
//     //  Leemos el fichero//
//     if (error) {
//       //  Si hay error al leer el fichero ... envio codigo 500 y un mensaje
//       res.status(500).send("Error inesperado");
//     } else {
//       //  Si no hay error al leer el fichero ...
//       const pokemons = JSON.parse(data);
//       //  Parseamos el json
//       const newPokemon = req.body;
//       //  Recogemos la peticion post en el body de la request
//       const lastId = pokemons[pokemons.length - 1].id;
//       //  Identificamos el último id del fichero
//       newPokemon.id = lastId + 1;
//       //  Asignamos un id al nuevo pokemon que vamos a añadir
//       pokemons.push(newPokemon);
//       //  Lo añadimos a la lista de pokemons

//       // Guardamos el fichero
//       fs.writeFile(pokemonFilePath, JSON.stringify(pokemons), (error) => {
//         // Ecribimos el fichero con los pokemons nuevos
//         if (error) {
//           //   Si hay error ... le envio un código 500 y un mensaje
//           res.status(500).send("Error al escribir el archivo");
//         } else {
//           //  Si no hay error y se ha ecrito correctamente el archivo le devuelvo el pokemon nuevo
//           res.json(newPokemon);
//         }
//       });
//     }
//   });
// });

// router.get("/pokemon/:id", (req, res) => {
//   fs.readFile(pokemonFilePath, (error, data) => {
//     //  Leemos el fichero//
//     if (error) {
//       //  Si hay error al leer el fichero ... envio codigo 500 y un mensaje
//       res.status(500).send("Error inesperado");
//     } else {
//       //  Si no hay error al leer el fichero ...
//       const id = parseInt(req.params.id);
//       //  Convertimos a numerico el id indicado por parametros
//       const pokemons = JSON.parse(data);
//       //  Parseamos el json
//       const pokemon = pokemons.find((pokemon) => pokemon.id === id);
//       //  Buscamos el pokemon con el mismo id q nos han indicado

//       if (pokemon) {
//         //  Si existe ese pokemon con ese id indicado...enviamos el pokemon en la respuesta
//         res.json(pokemon);
//       } else {
//         //  Si no existe un pokemon con el id indicado ... enviamos un codigo 404 y un mensaje
//         res.status(404).send("pokemon no encontrado");
//       }
//     }
//   });
// });

server.use("/", router);

server.listen(port, () => {
  console.log(`Servidor levantado y escuchando en el puerto: ${port}`);
});
