const jwt = require("jsonwebtoken")


module.exports = verify = (req, res, next) => {

    const token = req.headers["authorization"];
    console.log(token)
    if (!token) {const err = new Error();
    err.status = 401;
    err.message = "You are not authenticated!";next(err);}
  
  
    jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
      if (err) {const err = new Error();
        err.status = 403;
        err.message = "Token is not valid!";next(err);}

      req.userid = payload.id;
      req.username = payload.username;
      req.email = payload.email; 
      next()
    });
  };
  