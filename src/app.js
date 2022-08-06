const express = require("express");
const session = require("express-session");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const userLoggedMiddleware = require("./middleware/userLoggedMiddleware");
const cookies = require("cookie-parser");

const rutaHome = require("./routes/main.js");
const rutaProduct = require("./routes/products.js");
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
app.use("/css", express.static(path.join(__dirname, "../public/css")));
app.use("/img", express.static(path.join(__dirname, "../public/img")));
app.use("/js", express.static(path.join(__dirname, "../public/js")));

// <-- Levantando el Servidor -->
app.listen(8080, () =>
  console.log("Servidor levantado con exito en el puerto 8080")
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

app.use('/', rutaHome);
app.use("/product", rutaProduct);
app.use("/admin", adminRoutes);
app.use("/admin", adminMiddleware, adminRoutes);


