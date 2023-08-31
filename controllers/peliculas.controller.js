const Pelicula = require("../models/peliculas.model");
const peliculasModel = require("../models/peliculas.model");


// read all muestro todas las peliculas //


const mainPage = async (req, res) => {
  try {
    const peliculas = await peliculasModel.find({}).lean();
    // console.log(peliculas);
    res.render("mainPage", {
      Title: "Home",
      peliculas,
    });
  } catch (error) {
    console.log(err);
    res.status(500).send("Disculpa algo ocurrio ");
  }
};






const listar = async (req, res) => {
  try {
    const peliculas = await peliculasModel.find({}).lean();
    // console.log(peliculas);
    res.render("index", {
      Title: "Home",
      peliculas,
    });
  } catch (error) {
    console.log(err);
    res.status(500).send("Disculpa algo ocurrio ");
  }
};

const create = (req, res) => {
  res.render("peliculas/create", {
    Title: "Create Movies",
  });
};

const edit = async (req, res) => {
  console.log(req.params);

  try {
    const pelicula = await peliculasModel.findById(req.params.id).lean();

    // validar si esta la pelicula//
    if (!pelicula) {
      return req.status(400).send("La pelicula no se encuentra");
    }
    // Si esta  desestructuro y me la traigo //
    const { title, year, _id } = pelicula;
    // y paso la pelicula editada...//
    res.render("peliculas/edit", {
      Title: "Edit movie",
      title,
      year,
      _id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Fallo del Servidos [EDIT]", error);
  }
};

const show = async (req, res) => {
  // console.log(req.params);

  try {
    const pelicula = await peliculasModel.findById(req.params.id).lean();

    if (!pelicula) {
      return req.status(400).send("La pelicula no se encuentra");
    }
    res.render("peliculas/show", {
      Title: "Mostrar pelicula",
      pelicula,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Fallo del Servidos [SHOW]", error);
  }
};

// crear pelicula//
const save = async (req, res) => {
  console.log(req.body);

  try {
    // creo el modelo //
    let pelicula = new Pelicula();

    pelicula.title = req.body.title;
    pelicula.year = req.body.year;

    pelicula = await pelicula.save();

    if (!pelicula) {
      return res.status(400).send("Hubo un error al crear la pelicula ");
    }
    console.log(pelicula);
    res.status(201).redirect("/peliculas");
  } catch (error) {
    console.log("ERROR SAVE", error);
  }
};
// actualizar//
const update = async (req, res) => {
  // console.log(req.params.id); // me llega el object id
  // console.log(req.body); // por el body la info para editar //

  try {
    const { title, year } = req.body;

    const pelicula = await Pelicula.findByIdAndUpdate(req.params.id, req.body);
    if (!pelicula) {
      return req.status(400).send("No se pudo encontrar la pelicula");
    }
    res.redirect("/peliculas");
  } catch (error) {
    console.log("Show peliculas", error);
  }
};

// eliminar //
const remove = async (req, res) => {
  console.log(req.params.id);
 
  try {
    
    
  








    
    const isDeleted = await Pelicula.findByIdAndDelete(req.params.id);
   

    if (!isDeleted) {
      return res.status(404).send("Disulpa , no se pudo borrar la pelicula");
    }

    res.redirect("/peliculas");
  } catch (error) {
    console.log("error DELETE", error);
    res.status(404).send("Ocurrio un error al eliminar la pelicula", error);
  }
};

module.exports = { save, listar, create, edit, show, update, remove,mainPage };
