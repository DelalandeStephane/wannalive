const Localisation = require("../models/localisation");

exports.getAllDep = (req, res, next) => {
  let region;
  if(req.params.region != 'undefined'){
    region = {region_name : req.params.region};
  }
  Localisation.find(region).then((deps) => {
      res.status(200).json(deps);
  })
  .catch((error) => {
    res.status(400).json({
      error: error,
    });
  });
}

exports.getAllRegions = (req, res, next) => {
  Localisation.find({}).distinct('region_name')
  .then((regions) => {
      res.status(200).json(regions);
  })
  .catch((error) => {
    res.status(400).json({
      error: error,
    });
  });
}