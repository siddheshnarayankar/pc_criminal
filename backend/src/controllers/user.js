import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import passport from 'passport';

import db from '../models';
const User = db.User;

// load input validation
import validateRegisterForm from '../validation/register';
import validateLoginForm from '../validation/login';

// create user
const create = (req, res) => {
  //const { errors, isValid } = validateRegisterForm(req.body);
  let {
    policestation,
    name,
    phone,
    role,
    rank,
    userid,
    password,
    cityId,
    stateId,
    districtId
  } = req.body;

  console.log(req.body, 'Test')
  // check validation
  // if(!isValid) {
  //   return res.status(400).json(errors);
  // }

  User.findAll({
    where: {
      userid
    }
  }).then(user => {
    if (user.length) {
      return res.status(400).json({
        userid: 'User already exists!'
      });
    } else {
      let newUser = {
        policestation,
        name,
        phone,
        role,
        rank,
        userid,
        password,
        cityId,
        stateId,
        districtId
      };
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          User.create(newUser)
            .then(user => {
              res.json({
                user
              });
            })
            .catch(err => {
              res.status(500).json({
                err
              });
            });
        });
      });
    }
  });
};

const login = (req, res) => {
  const {
    errors,
    isValid
  } = validateLoginForm(req.body);

  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const {
    userid,
    password
  } = req.body;

  console.log(userid, password)

  User.findAll({
      where: {
        userid
      }
    })
    .then(user => {
      //check for user

      if (!user.length) {
        errors.userid = 'User not found LOGIN!';
        return res.status(404).json(errors);
      }
      let originalPassword = user[0].dataValues.password
      console.log(originalPassword, 'originalPassword', user, 'user')
      //check for password
      bcrypt
        .compare(password, originalPassword)
        .then(isMatch => {
          console.log(isMatch, 'isMatch')
          if (isMatch) {
            // user matched
            console.log('matched!')
            const {
              id,
              username
            } = user[0].dataValues;
            const payload = {
              id,
              username
            }; //jwt payload
            // console.log(payload)

            jwt.sign(payload, 'secret', {
              expiresIn: 3600
            }, (err, token) => {
              res.json({
                success: true,
                token: 'Bearer ' + token,
                role: user[0].dataValues.role,
                cityId: user[0].dataValues.cityId,
                stateId: user[0].dataValues.stateId,
                districtId:user[0].dataValues.districtId,
                id:user[0].dataValues.id,
                userid:user[0].dataValues.userid,
              });
            });
          } else {
            errors.password = 'Password not correct';
            return res.status(400).json(errors);
          }
        }).catch(err => console.log(err));
    }).catch(err => res.status(500).json({
      err
    }));
};

// fetch all users
const findAllUsers = (req, res) => {
  const cityId = req.params.cityId;
  const role = req.params.role;
  User.findAll({
      where: {
        cityId,
        role
      },
      attributes: ['name', 'phone', 'userid','districtId','cityId','id']
    })
    .then(user => {
      res.json({
        user
      });
    })
    .catch(err => res.status(500).json({
      err
    }));
};


const findAdminUsers = (req, res) => {
  const role = req.params.role;
  User.findAll({
      where: {
        role
      },
      attributes: ['name', 'phone', 'userid']
    })
    .then(user => {
      res.json({
        user
      });
    })
    .catch(err => res.status(500).json({
      err
    }));
};

// fetch user by userId
const findById = (req, res) => {
  const id = req.params.userId;

  User.findAll({
      where: {
        id
      }
    })
    .then(user => {
      if (!user.length) {
        return res.json({
          msg: 'user not found USER'
        })
      }
      res.json({
        user
      })
    })
    .catch(err => res.status(500).json({
      err
    }));
};

// update a user's info
const update = (req, res) => {
  let {
    firstname,
    lastname,
    HospitalId,
    role,
    image
  } = req.body;
  const id = req.params.userId;

  User.update({
      firstname,
      lastname,
      role,
    }, {
      where: {
        id
      }
    })
    .then(user => res.status(200).json({
      user
    }))
    .catch(err => res.status(500).json({
      err
    }));
};

// delete a user
const deleteUser = (req, res) => {
  const id = req.params.userId;

  User.destroy({
      where: {
        id
      }
    })
    .then(() => res.status.json({
      msg: 'User has been deleted successfully!'
    }))
    .catch(err => res.status(500).json({
      msg: 'Failed to delete!'
    }));
};

export {
  create,
  login,
  findAllUsers,
  findById,
  update,
  deleteUser,
  findAdminUsers
}