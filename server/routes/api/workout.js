const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Workout = require("../../models/Workout");

//@route GET api/workout
//@desc  get all workouts
//@access  public
router.get("/", async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.json(workouts);
  } catch (error) {
    console.error(error.message);
    res.send(500).send("server error");
  }
});

//@route GET api/workout/me
//@desc  get current users workouts
//@access  private
router.get("/me", auth, async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user.id })

    if (!workouts || workouts.length === 0) {
      return res.status(400).json({
        msg: "No workouts found for this user"
      });
    }
    res.json(workouts);
  } catch (error) {
    console.error(error.message);
    res.send(500).send("server error");
  }
});

//@route GET api/workout/:workout_id
//@desc  get workout by id
//@access  public
router.get("/:workout_id", async (req, res) => {
  try {
    const workout = await Workout.findOne({ _id: req.params.workout_id });
    if (!workout) {
      return res.status(400).json({
        msg: "No workout found with this id"
      });
    }
    res.json(workout);
  } catch (error) {
    console.error(error.message);
    //if the type of error is object id error res.send the same error as above
    if (error.kind === "ObjectId") {
      return res.status(400).json({
        msg: "No workout found with this id"
      });
    }
    res.send(500).send("server error");
  }
});

//@route POST api/workout
//@desc  create a workout route
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

    const workoutFields = {};
    workoutFields.user = req.user.id;
    if (title) workoutFields.title = title;
    if (description) workoutFields.description = description;
    if (calorieGoal) workoutFields.calorieGoal = calorieGoal;
    if (carbohydrateGoal) workoutFields.carbohydrateGoal = carbohydrateGoal;
    if (proteinGoal) workoutFields.proteinGoal = proteinGoal;
    if (fatGoal) workoutFields.fatGoal = fatGoal;
    // possibly change how the daily meals are added
    if (dailyMeals) workoutFields.dailyMeals = dailyMeals;

    try {
      workout = new Workout(workoutFields);
      await Workout.save();
      res.json(workout);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route POST api/workout/:workout_id
//@desc  edit a workout route
//@access  private
router.post("/:workout_id", auth, async (req, res) => {
  const {
    title,
    description,
    calorieGoal,
    carbohydrateGoal,
    proteinGoal,
    fatGoal,
    dailyMeals
  } = req.body;

  const workoutFields = {};
  workoutFields.user = req.user.id;
  if (title) workoutFields.title = title;
  if (description) workoutFields.description = description;
  if (calorieGoal) workoutFields.calorieGoal = calorieGoal;
  if (carbohydrateGoal) workoutFields.carbohydrateGoal = carbohydrateGoal;
  if (proteinGoal) workoutFields.proteinGoal = proteinGoal;
  if (fatGoal) workoutFields.fatGoal = fatGoal;
  if (dailyMeals) workoutFields.dailyMeals = dailyMeals;

  try {
    let workout = await Workout.findOne({ _id: req.params.workout_id });
    if (workout) {
      workout = await Workout.findOneAndUpdate(
        {
          _id: req.params.workout_id
        },
        {
          $set: workoutFields
        },
        {
          new: true
        }
      );

      return res.json(workout);
    } else {
      return res.status(400).json({ msg: "workout could not be found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//@route DELETE api/workout/:workout_id
//@desc  delete workout by id
//@access  private
router.delete("/:workout_id", auth, async (req, res) => {
  try {
    await Workout.findOneAndRemove({
      _id: req.params.workout_id
    });
    res.json({
      msg: "workout has been successfully deleted"
    });
  } catch (error) {
    console.error(error.message);
    res.send(500).send("server error");
  }
});


module.exports = router;
