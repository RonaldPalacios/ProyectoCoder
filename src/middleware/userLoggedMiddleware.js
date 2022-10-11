// Middleware para que detecte si hay usurio logueado
const { APIURL } = require("../config");
const fetch = require("node-fetch");

function userLoggedMiddleware(req, res, next) {
  res.locals.isLogged = false;

  if (req.session && req.session.userLogged) {
    res.locals.isLogged = true;
    res.locals.userLogged = req.session.userLogged;
    let emailInCookie = req.cookies.userEmail;
    if (emailInCookie != undefined) {
      fetch(`${APIURL}/users/email/${emailInCookie}`)
        .then(user => {
          if (user.status == 200) {
            req.session.userLogged = user.user;
          }
        })
        .catch(e => console.log(e));
    }
  }

  next();
}

module.exports = userLoggedMiddleware;
