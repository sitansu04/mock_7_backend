const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
  let token = req.headers.authorization;
  if (token) {
    try {
      const decoded = jwt.verify(token, "sitansu");
      if (decoded) {
        const userID = decoded.userID;
        req.body.ID = userID;
        console.log(userID);
        next()
      } else {
        res.status(400).send({ msg: `Please login first` });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: error.message });
    }
  } else {
    res.status(400).send({ msg: `Please Login First` });
  }
};

module.exports = {
  authentication,
};
