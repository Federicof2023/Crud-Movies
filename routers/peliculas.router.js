// const express = require('express')
// const routerPeliculas = express.Router()
const routerPeliculas = require("express").Router();
const pelicontroller = require("../controllers/peliculas.controller");
// const peliculasModel = require("../models/peliculas.model");



routerPeliculas.get("/", pelicontroller.listar);

routerPeliculas.get("/create", pelicontroller.create);

routerPeliculas.post("/save", pelicontroller.save); 

routerPeliculas.get("/edit/:id", pelicontroller.edit);

routerPeliculas.get("/show/:id", pelicontroller.show);

routerPeliculas.put("/update/:id", pelicontroller.update);



routerPeliculas.delete("/remove/:id", pelicontroller.remove);

module.exports = {
  routerPeliculas,
};
