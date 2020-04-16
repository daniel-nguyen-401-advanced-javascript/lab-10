const notFound = (req, res, next) => {

  res.status(404);
  res.statusMessage = '404 Page Not Found';
  console.log(res.statusMessage);
  res.end();
};

module.exports = notFound;