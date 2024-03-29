const express = require("express");
const session = require("express-session");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const userLoggedMiddleware = require("./middlewares/userLoggedMiddleware");
const cookies = require("cookie-parser");

const rutaHome = require("./routes/main.js");
const userRoutes = require("./routes/userRoutes.js");
const rutaProduct = require("./routes/productRoutes.js");
const adminRoutes = require("./routes/adminRoutes");
const adminMiddleware = require("./middlewares/adminMiddleware");

app.use(
  session({
    secret: "Frase secreta",
    resave: false,
    saveUninitialized: false,
  })
);

// <-- Definiendo la carpeta estatica -->
app.use("/public", express.static(path.join(__dirname, "../public")));

// <-- Levantando el Servidor -->
app.listen(4000, () =>
  console.log("Servidor levantado con exito en el puerto 4000")
);

app.use(cookies());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(userLoggedMiddleware);

// Motor de Plantilla EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

// <-- Rutas -->
app.use("/", rutaHome);
app.use("/users", userRoutes);
app.use("/product", rutaProduct);
app.use("/admin", adminMiddleware, adminRoutes);
