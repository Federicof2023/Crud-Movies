const express = require("express");
const { engine } = require("express-handlebars");
const methodOverride = require("method-override");
const session = require("express-session");
const mongoStore = require("connect-mongo"); // guarda las sessions en mongo //
const passport = require("passport");
require("dotenv").config();

const { conectarDB } = require("./db/mongo.config");
const { routerPeliculas } = require("./routers/peliculas.router");
const { routerUsuarios } = require("./routers/usuarios.router");
const { mainPage } = require("./controllers/peliculas.controller");
const isAuthenticated = require("./middlewares/isAuthenticated");

// variables //
const PORT = process.env.PORT;

// settings //
const app = express();

//  ****** estructura handlebars ***** //

app.engine(
  "hbs",
  engine({
    defaultLayout: "main",
    extname: ".hbs",
  })
),
  app.set("view engine", "hbs");
app.set("views", "./views");

//******  importo config de PASSPORT********* //
require("./config_passport/passport");

//*************************************//

// MIDDLEWARS//
app.use(express.static("public")); // sirve archivos estaticos //
app.use(express.urlencoded({ extended: true })); // para que node interprete forms //
app.use(express.json());
app.use(methodOverride("_method"));

// middleware  sessions //
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: mongoStore.create({ mongoUrl: process.env.MONGO_URI }), // aca con mongostore le indico en cual DB voy a guardar las sessions , le paso la URI LOCAL //
  })
);

//** MIDDLEWARES - PASSPORT ***/

app.use(passport.initialize());
app.use(passport.session());

// endpoints //
app.get("/", mainPage);
app.use("/peliculas", isAuthenticated, routerPeliculas);
app.use("/auth", routerUsuarios);



// inicializacion de la app y conexion a la DB //



const conexion = async () => {
  try {
    await conectarDB(process.env.MONGO_URI);
    console.log("----------------------------------------");
    console.log("Base de datos conectada");
    console.log("----------------------------------------");
    app.listen(PORT);
    console.log("Servidor escuchando en el puerto", PORT);
    console.log("-----------------------------------------");


   
  } catch (error) {
    console.log("Algo ocurrio con el servidor", error);
  }
};

conexion();
