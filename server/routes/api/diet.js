const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Diet = require("../../models/Diet");

//@route GET api/diet
//@desc  get all diets
//@access  public
router.get("/", async (req, res) => {
  try {
    const diets = await Diet.find();
    res.json(diets);
  } catch (error) {
    console.error(error.message);
    res.send(500).send("server error");
  }
});

//@route GET api/diet/me
//@desc  get current users diets
//@access  private
router.get("/me", auth, async (req, res) => {
  try {
    const diets = await Diet.find({ user: req.user.id })

    if (!diets || diets.length === 0) {
      return res.status(400).json({
        msg: "No diets found for this user"
      });
    }
    res.json(diets);
  } catch (error) {
    console.error(error.message);
    res.send(500).send("server error");
  }
});

//@route GET api/diet/:diet_id
//@desc  get diet by id
//@access  public
router.get("/:diet_id", async (req, res) => {
  try {
    const diet = await Diet.findOne({ _id: req.params.diet_id });
    if (!diet) {
      return res.status(400).json({
        msg: "No diet found with this id"
      });
    }
    res.json(diet);
  } catch (error) {
    console.error(error.message);
    //if the type of error is object id error res.send the same error as above
    if (error.kind === "ObjectId") {
      return res.status(400).json({
        msg: "No diet found with this id"
      });
    }
    res.send(500).send("server error");
  }
});

//@route POST api/diet
//@desc  create a diet route
//@access  private
router.post(
  "/",
  [
    auth,
    [
      check("title", "Title is required")
        .not()
        .isEmpty(),
      check("description", "Description is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const {
      title,
      description,
      calorieGoal,
      carbohydrateGoal,
      proteinGoal,
      fatGoal,
      dailyMeals
    } = req.body;

    const dietFields = {};
    dietFields.user = req.user.id;
    if (title) dietFields.title = title;
    if (description) dietFields.description = description;
    if (calorieGoal) dietFields.calorieGoal = calorieGoal;
    if (carbohydrateGoal) dietFields.carbohydrateGoal = carbohydrateGoal;
    if (proteinGoal) dietFields.proteinGoal = proteinGoal;
    if (fatGoal) dietFields.fatGoal = fatGoal;
    // possibly change how the daily meals are added
    if (dailyMeals) dietFields.dailyMeals = dailyMeals;

    try {
      diet = new Diet(dietFields);
      await diet.save();
      res.json(diet);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route POST api/diet/:diet_id
//@desc  edit a diet route
//@access  private
router.post("/:diet_id", auth, async (req, res) => {
  const {
    title,
    description,
    calorieGoal,
    carbohydrateGoal,
    proteinGoal,
    fatGoal,
    dailyMeals
  } = req.body;

  const dietFields = {};
  dietFields.user = req.user.id;
  if (title) dietFields.title = title;
  if (description) dietFields.description = description;
  if (calorieGoal) dietFields.calorieGoal = calorieGoal;
  if (carbohydrateGoal) dietFields.carbohydrateGoal = carbohydrateGoal;
  if (proteinGoal) dietFields.proteinGoal = proteinGoal;
  if (fatGoal) dietFields.fatGoal = fatGoal;
  if (dailyMeals) dietFields.dailyMeals = dailyMeals;

  try {
    let diet = await Diet.findOne({ _id: req.params.diet_id });
    if (diet) {
      diet = await Diet.findOneAndUpdate(
        {
          _id: req.params.diet_id
        },
        {
          $set: dietFields
        },
        {
          new: true
        }
      );

      return res.json(diet);
    } else {
      return res.status(400).json({ msg: "Diet could not be found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//@route DELETE api/diet/:diet_id
//@desc  delete diet by id
//@access  private
router.delete("/:diet_id", auth, async (req, res) => {
  try {
    await Diet.findOneAndRemove({
      _id: req.params.diet_id
    });
    res.json({
      msg: "Diet has been successfully deleted"
    });
  } catch (error) {
    console.error(error.message);
    res.send(500).send("server error");
  }
});


module.exports = router;
