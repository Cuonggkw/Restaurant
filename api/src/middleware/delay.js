const delay = (req, res, next) => {
  if (req.path === "/login") {
    return next();
  }
  setTimeout(() => {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
    }

    next();
  }, 2000);
};

module.exports = delay;
