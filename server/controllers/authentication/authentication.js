module.exports = (req, res, next) => {
  const { jwt } = req.cookies;
  
const { verify } = require('jsonwebtoken');
  const secret = process.env.SECRET;
  // res.send(secret);
    if (jwt && secret) {
      verify(jwt, secret, (err, decoded) => {
        console.log(decoded);
        
        if (decoded) {
          req.user = decoded;
          next();
        } else {
          res.clearCookie('jwt');
          next({ code: 401, msg: 'you are not authenticated ' });
        }
      });
    } else next({ code: 401, msg: 'you are not authenticated ' });
  };
  

  