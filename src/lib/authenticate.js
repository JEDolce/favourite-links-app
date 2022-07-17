module.exports = {
    // Este metodo es para proteger las rutas,
    // como profile o links
    isLoggedIn(req, res, next) {
        // isAuthenticated es un metodo de passport que viene de req
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/auth/signin');
    },

    // Y deberia hacer el proceso inverso, es decir
    // si estoy logeado, que no pueda ir de nuevo a signin
    isNotLoggedIn(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/auth/profile');
    }
};




