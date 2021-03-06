const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

//  Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

//  Load User Model
const User = require("../../models/User");
const Items = require("../../models/Items");

//  @route  GET api/users/test
//  @desc   Test user route
//  @access Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

//  @route  POST api/users/register
//  @desc   Register / Signup user
//  @access Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  //  Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //  Size
        r: "pg", //  Rating
        d: "mm" //  Default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//  @route  GET api/users/login
//  @desc   Login User / Returning JWT Token
//  @access Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  //  Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;

  //  Find User by email
  User.findOne({ email }).then(user => {
    //  Check for user
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    //  Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //  User Matched

        //  Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email
        };

        //  Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: "1h" },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
        // res.json({ msg: "Success" });
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

//  @route  GET api/users/current
//  @desc   Return current user
//  @access Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

//  @route  DELETE api/users/delete
//  @desc   Delete user and its all items
//  @access Private
router.delete(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Items.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() => {
        res.json({ success: true });
      });
    });
  }
);

module.exports = router;
