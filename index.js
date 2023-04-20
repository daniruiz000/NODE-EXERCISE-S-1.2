const express = require("express");
const fs = require("fs");

const port = 3000;
const server = express();
const router = express.Router();

const homeFilePath = "./home.html";
const driversFilePath = "./driver-data.json";

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

router.get("/f1-driver", (req, res) => {
  fs.readFile(driversFilePath, (error, data) => {
    //  Leemos el fichero//
    if (error) {
      //  Si hay error al leer el fichero ... envio codigo 500 y un mensaje
      res.status(500).send("Error inesperado");
    } else {
      //  Si no hay error al leer el fichero ...
      const drivers = JSON.parse(data);
      //  Parseamos el json
      res.json(drivers);
      // Enviamos todos los drivers en la respuesta
    }
  });
});

router.post("/f1-driver", (req, res) => {
  fs.readFile(driversFilePath, (error, data) => {
    //  Leemos el fichero//
    if (error) {
      //  Si hay error al leer el fichero ... envio codigo 500 y un mensaje
      res.status(500).send("Error inesperado");
    } else {
      //  Si no hay error al leer el fichero ...
      const drivers = JSON.parse(data);
      //  Parseamos el json
      const newDriver = req.body;
      //  Recogemos la peticion post en el body de la request
      const lastId = drivers[drivers.length - 1].id;
      //  Identificamos el último id del fichero
      newDriver.id = lastId + 1;
      //  Asignamos un id al nuevo driver que vamos a añadir
      drivers.push(newDriver);
      //  Lo añadimos a la lista de drivers

      // Guardamos el fichero
      fs.writeFile(driversFilePath, JSON.stringify(drivers), (error) => {
        // Ecribimos el fichero con los drivers nuevos
        if (error) {
          //   Si hay error ... le envio un código 500 y un mensaje
          res.status(500).send("Error al escribir el archivo");
        } else {
          //  Si no hay error y se ha ecrito correctamente el archivo le devuelvo el pokemon nuevo
          res.json(newDriver);
        }
      });
    }
  });
});

router.get("/f1-driver/:id", (req, res) => {
  fs.readFile(driversFilePath, (error, data) => {
    //  Leemos el fichero//
    if (error) {
      //  Si hay error al leer el fichero ... envio codigo 500 y un mensaje
      res.status(500).send("Error inesperado");
    } else {
      //  Si no hay error al leer el fichero ...
      const id = parseInt(req.params.id);
      //  Convertimos a numerico el id indicado por parametros
      const drivers = JSON.parse(data);
      //  Parseamos el json
      const driver = drivers.find((driver) => driver.id === id);
      //  Buscamos el pokemon con el mismo id q nos han indicado

      if (driver) {
        //  Si existe ese pokemon con ese id indicado...enviamos el pokemon en la respuesta
        res.json(driver);
      } else {
        //  Si no existe un pokemon con el id indicado ... enviamos un codigo 404 y un mensaje
        res.status(404).send("Driver no encontrado");
      }
    }
  });
});

server.use("/", router);

server.listen(port, () => {
  console.log(`Servidor levantado y escuchando en el puerto: ${port}`);
});
