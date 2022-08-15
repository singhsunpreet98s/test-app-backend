const jwt = require('jsonwebtoken');
exports.adminAuthentication = (req, res, next) => {
   try {
      const token = req.headers.authorization.split(" ")[1]
      jwt.verify(token, process.env.JWTKEY, (err, decoded) => {
         if (err) {
            return res.json({ msg: 'token expired' })
         }
         if (decoded) {
            if (decoded.admin) {
               req.body._user_id = decoded._id
               next()
            }
            else {
               return res.json({ msg: "error", stats: "only admin can add" })
            }

         }
      })
   }
   catch (err) {
      console.log(err)
      return res.json({ msg: 'error' })
   }
}
exports.authenticate = (req, res, next) => {
   try {

      if (req.headers.authorization) {
         const token = req.headers.authorization.split(" ")[1]
         jwt.verify(token, process.env.JWTKEY, (err, decoded) => {
            if (err) {
               return res.json({ msg: 'token expired' })
            }
            if (decoded) {
               req.body._user_id = decoded._id
               next()
            }
         })
      }
      else {
         res.status(401).json({ msg: "failed to authenticate user" })
      }
   }
   catch (err) {
      res.status(501).json({ msg: "error", error: err })

   }
}