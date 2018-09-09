const express = require("express");
const router = express.Router();
const passport = require("passport");
//  Load Input Validation
const validateItemsInput = require("../../validation/item");

//  Load Item Model
const Items = require("../../models/Items");

//  @route  GET api/items/test
//  @desc   Test items route
//  @access Public
router.get("/test", (req, res) => res.json({ msg: "Items Works" }));

//  @route  GET api/items/
//  @desc   Get Items as per User
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

//  @route  POST api/items
//  @desc   Create item
//  @access Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    id = req.params.id;
    Items.find({ user: req.user.id })
      .then(item => {
        console.log("s", item);
        res.json(item);
      })
      .catch(err =>
        res.status(404).json({
          noitemfound: "No item found with that id"
        })
      );
    // });
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
      if (!material) {
        newItems = new Items({
          user: req.user.id,
          items: []
        });
        items = {
          name: req.body.name,
          price: req.body.price
        };
        newItems.items.unshift(items);
        newItems
          .save()
          .then(items => res.json(items))
          .catch(err => res.status(404).json("not inserted !!"));
      }
      itemDate = {
        name: req.body.name,
        price: req.body.price
      };
      material.items.unshift(itemDate);
      material
        .save()
        .then(items => res.json(items))
        .catch(err => res.json("not inserted"));
    });
  }
);

//  @route  Delete  api/items/:id
//  @desc   Delete item from items
//  @access Private
router.delete(
  "/:id",
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

module.exports = router;
