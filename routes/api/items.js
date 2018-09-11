const express = require("express");
const router = express.Router();
const passport = require("passport");
const moment = require("moment");

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
//  @desc   GET item by :id
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

//  @route  GET   api/items/date/2018-09-09
//  @desc   Get Item as per date
//  @access Private
router.get(
  "/date/:date",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    date = req.params.date;
    date = new Date(date);
    date = getDate(date);
    console.log("inside date ", date);
    Items.findOne({ user: req.user.id })
      .then(items => {
        const getData = items.items.filter(obj => {
          return getDate(obj.date) == date;
        });
        if (getData.length) {
          return getData;
        }
        return res.status(400);
      })
      .then(data => {
        const total = data
          .map(a => {
            return a.price;
          })
          .reduce((a, c) => a + c);

        console.log("total", total);
        return res.status(200).json({
          status: "success",
          date,
          total,
          data
        });
      })
      .catch(() => {
        return res.status(400).json({
          noitemFound: "No Data Found"
        });
      });
  }
);

//  @route  GET   api/items/monthly/2018-09-09
//  @desc   Get Item as monthly
//  @access Private
router.get(
  "/monthly/:date",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    date = req.params.date;
    date = new Date(date);
    month = date.getMonth() + 1;
    console.log("monthly wise show income", month);
    Items.findOne({ user: req.user.id })
      .then(items => {
        // console.log(items);
        const getData = items.items.filter(
          obj => obj.date.getMonth() + 1 == month
        );
        console.log(getData);
        if (getData.length) {
          console.log("inside");
          return getData;
        }
        return res.status(400);
      })
      .then(data => {
        const total = data
          .map(a => {
            return a.price;
          })
          .reduce((a, c) => a + c);
        console.log("total", total);
        return res.status(200).json({
          status: "success",
          month,
          total,
          data
        });
      })
      .catch(() => {
        return res.status(400).json({
          noitemFound: "No Data Found"
        });
      });
  }
);

//  @route  GET   api/items/quarterly/2018-09-09
//  @desc   Get Item as quarterly
//  @access Private
router.get(
  "/quarterly/:date",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    date = req.params.date;
    date = new Date(date);
    quarter = getQuarter(date);
    console.log("inside quarterly");
    Items.findOne({ user: req.user.id })
      .then(data => {
        quart = data.items.filter(q => getQuarter(q.date) == quarter);
        // console.log(quart);
        return quart;
      })
      .then(data => {
        const total = data
          .map(a => {
            return a.price;
          })
          .reduce((a, c) => a + c);
        console.log("total", total);
        return res.status(200).json({
          status: "success",
          quarter,
          total,
          data
        });
      })
      .catch(() => {
        return res.status(400).json({
          noitemFound: "No Data Found"
        });
      });
  }
);

//  @route  GET   api/items/quarterly/2018-09-09
//  @desc   Get Item as quarterly
//  @access Private
router.get(
  "/weekly/:date",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    date = req.params.date;
    date = new Date(date);
    week = getWeek(date);
    console.log("inside weekly", week);
    Items.findOne({ user: req.user.id })
      .then(data => {
        weekly = data.items.filter(q => getWeek(q.date) == week);
        return weekly;
      })
      .then(data => {
        const total = data
          .map(a => {
            return a.price;
          })
          .reduce((a, c) => a + c);

        console.log("total", total);
        return res.status(200).json({
          status: "success",
          week,
          total,
          data
        });
      })
      .catch(() => {
        return res.status(400).json({
          noitemFound: "No Data Found"
        });
      });
  }
);

//  Get Date (YYYY-MM-DD)
const getDate = date => {
  return date.toISOString().slice(0, 10);
};

//  Get Quarter of Date
const getQuarter = date => {
  return Math.floor((date.getMonth() + 3) / 3);
};

//  Get Week of Year
const getWeek = date => {
  var onejan = new Date(date.getFullYear(), 0, 1);
  return Math.ceil(((date - onejan) / 86400000 + onejan.getDay() + 1) / 7);
};

module.exports = router;
