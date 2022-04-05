const bcrypt = require("bcrypt");
const User = require("../models/User");
const Localisation = require("../models/localisation");
const jwt = require('jsonwebtoken');


exports.signUp = (req, res, next) => {
      bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
            req.body.password = hash;
            // complete user localisation by department number
            Localisation.findOne({num_dep : req.body.numDep}).then( dep => {
              req.body.region = dep.region_name;
              const user_one = new User({
                ...req.body
              });
              user_one
                .save()
                .then((user) => res.status(201).json({ _id: user._id }))
                .catch(error => res.status(500).json({  error }));
            });
        })
        .catch(error => res.status(500).json({  error }));
};

exports.signIn = (req, res, next) => {
  User.findOne({email:req.body.email})
  .then(user => {
    if(!user) {
      return res.status(401).json({ error:'Utilisateur non trouvé'})
    }
    bcrypt.compare(req.body.password, user.password)
    .then( valid => {
      if(!valid){
        return res.status(401).json({ error:'Identifiant incorrect'})
      }
      res.status(200).json({
        userId: user._id,
        userName: user.userName,
        token: jwt.sign(
          {userId: user._id},
          'RANDOM_TOKEN_SECRET',
          { expiresIn:'24h' }
        )
      });
    })
    .catch(error => { res.status(500).json({ error}) })
  })
  .catch( error => res.status(500).json({ error }));
}

exports.verifyEmail = (req, res, next) => {
  User.findOne({ email: req.params.email }).then((user) => {
      res.status(200).json(user);
  })
}