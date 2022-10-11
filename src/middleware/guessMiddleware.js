function guestMiddleware(req, res, next) {
    if (req.session.userLogged) {
      res.redirect("/"); // debería ir a la vista /user/profile -> hay que crearla
    }
    next();
  }
  
  module.exports = guestMiddleware;
