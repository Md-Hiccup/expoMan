const express = require("express");
const router = express.Router();
const passport = require("passport");
// const moment = require('moment');

//  Load Input Validation
const validateItemsInput = require("../../validation/item");

//  Load Item Model
const Items = require("../../models/Items");

//  @route  GET api/items/test
//  @desc   Test items route
//  @access Public
router.get("/test", (req, res) => res.json({ msg: "Items Works" }));

//  @route  GET api/items/
//  @desc   Get Items list of User
//  @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Items.find({ user: req.user.id })
      // .sort({ "items.date": -1 }) //  -1 is for descending
      .then(items => res.json(items))
      .catch(err =>
        res.status(404).json({
          noitemfound: "No Item Found"
        })
      );
  }
);

//  @route  GET api/items/item/:id
//  @desc   Get item by :id
//  @access Private
router.get(
  "/item/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    id = req.params.id;
    Items.findOne({ user: req.user.id })
      .then(items => {
        const getIndex = items.items.filter(item => item.id == req.params.id);
        console.log(getIndex.length);
        if (getIndex.length) {
          console.log("inside");
          return getIndex[0];
        }
        return res.status(400);
      })
      .then(data => {
        res.json(data);
      })
      .catch(() => {
        return res.status(404).json({
          noitemfound: "No item Found on this id"
        });
      });
  }
);

//  @route  POST api/items
//  @desc   Create item
//  @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateItemsInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    itemDate = {};

    Items.findOne({ user: req.user.id }).then(material => {
      itemDate = {
        name: req.body.name,
        price: req.body.price,
        date: req.body.date
      };
      if (!material) {
        newItems = new Items({
          user: req.user.id,
          items: []
        });
        newItems.items.unshift(itemDate);
        newItems
          .save()
          .then(items => res.json(items))
          .catch(err => res.status(404).json("not inserted !!"));
      }
      // itemDate = {
      //   name: req.body.name,
      //   price: req.body.price
      // };
      material.items.unshift(itemDate);
      material
        .save()
        .then(items => res.json(items))
        .catch(err => res.json("not inserted"));
    });
  }
);

//  @route  Delete  api/items/item/:id
//  @desc   Delete item from items
//  @access Private
router.delete(
  "/item/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Items.findOne({ user: req.user.id })
      .then(items => {
        const removeIndex = items.items
          .map(item => item.id)
          .indexOf(req.params.id);

        // Splice out of array
        items.items.splice(removeIndex, 1);

        // Save
        items.save().then(item => res.json(item));
        console.log(removeIndex);
      })
      .catch(err => res.status(400).json(error));
  }
);

//  @route  GET   api/items/date
//  @desc   Get Item as per date
//  @access Private
router.get(
  "/date/:date",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    date = req.params.date;
    date = new Date(date);
    console.log(date);
    console.log('inside date')
    // return res.json(date)
    Items.findOne({ user: req.user.id })
      .then(items => {
        console.log(items);
        const getData = items.items.filter(
          obj => {
            console.log(obj.date.getDate())
            return obj.date.getDate() == date.getDate()
          }
        );
        console.log(getData);
        if (getData.length) {
          console.log("inside");
          return getData;
        }
        return res.status(400);
      })
      .then(data => {
        return res.status(200).json(data);
      })
      .catch(() => {
        return res.status(400).json({
          noitemFound: "No Data Found"
        });
      });
  }
);

//  @route  GET   api/items/monthly
//  @desc   Get Item as monthly
//  @access Private
router.get(
  "/monthly/:date",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    date = req.params.date;
    date = new Date(date);
    console.log(date);
    console.log("monthly wise show income");
    Items.findOne({ user: req.user.id })
      .then(items => {
        // console.log(items);
        const getData = items.items.filter(
          obj => obj.date.getMonth()+1 == date.getMonth()+1
        );
        console.log(getData);
        if (getData.length) {
          console.log("inside");
          return getData;
        }
        return res.status(400);
      })
      .then(data => {
        return res.status(200).json(data);
      })
      .catch(() => {
        return res.status(400).json({
          noitemFound: "No Data Found"
        });
      });
  }
);

//  @route  GET   api/items/monthly
//  @desc   Get Item as monthly
//  @access Private
router.get(
  "/weekly/:date",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    date = req.params.date;
    date = new Date(date);
    console.log(date);
    console.log('inside weekly')
    return res.json(date)
  }
);

module.exports = router;
