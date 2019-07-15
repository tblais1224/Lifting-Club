const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Workout = require("../../models/Workout");
const User = require("../../models/User");

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
    const workouts = await Workout.find({ user: req.user.id });

    if (!workouts || workouts.length === 0) {
      return res.status(404).json({
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
      return res.status(404).json({
        msg: "No workout found with this id"
      });
    }
    res.json(workout);
  } catch (error) {
    console.error(error.message);
    //if the type of error is object id error res.send the same error as above
    if (error.kind === "ObjectId") {
      return res.status(404).json({
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
      muscleGroups,
      exercises
    } = req.body;

    const workoutFields = {};
    workoutFields.user = req.user.id;
    if (title) workoutFields.title = title;
    if (description) workoutFields.description = description;
    if (muscleGroups) workoutFields.muscleGroups = muscleGroups;
    if (exercises) workoutFields.exercises = exercises;

    try {
      workout = new workout(workoutFields);
      await workout.save();
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
      return res.status(404).json({ msg: "workout could not be found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//@route POST api/workout/:workout_id/comment
//@desc  comment on workout
//@access  private
router.post(
  "/:workout_id/comment",
  [
    auth,
    [
      check("text", "Text is required")
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
    try {
      const workout = await Workout.findById(req.params.workout_id);
      //get current user for the name
      const user = await User.findById(req.user.id, "name");
      const newComment = {
        text: req.body.text,
        name: user.name,
        user: req.user.id
      };

      workout.comments.unshift(newComment);
      await workout.save();

      res.json(workout);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }





  <div class="_3m31" style="height: 100%; background-image: url(&quot;https://scontent.fbos1-1.fna.fbcdn.net/v/t1.15752-0/s261x260/65033675_365995824058185_8379537054840651776_n.jpg?_nc_cat=107&amp;_nc_oc=AQlvJrmxMbfXeNzmZBKyLduoq6B1TAUfEYOk3XesbZIidAQdw0mVxoElaF1vjjeIF3k&amp;_nc_ht=scontent.fbos1-1.fna&amp;oh=d0b13b57efee72ec843431fa9a09ecef&amp;oe=5DA14172&quot;); background-position: center center;"></div>
);

//@route DELETE api/workout/:workout_id/comment/:comment_id
//@desc  delete comment
//@access  private
router.delete("/:workout_id/comment/:comment_id", auth, async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.workout_id);
    const comment = workout.comments.find(
      comment => comment.id === req.params.comment_id
    );
    //make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: "Comment not found" });
    }
    //make sure user matches
    //  ===> is this a SECURE method??? <===
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Unautharized user" });
    }
    //get index of comment to remove
    const removeIndex = workout.comments
      .map(comment => comment.id)
      .indexOf(req.params.comment_id);

    workout.comments.splice(removeIndex, 1);
    await workout.save();
    res.json(workout.comments);
  } catch (error) {
    console.error(error.message);
    res.send(500).send("server error");
  }
});

//@route POST api/workout/:workout_id/review
//@desc  review a workout
//@access  private
router.post(
  "/:workout_id/review",
  [
    auth,
    [
      check("rating", "Rating is required")
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
    try {
      let workout = await Workout.findById(req.params.workout_id);
      //check if user has an existing review
      const review = workout.reviews.filter(
        review => review.user.toString() === req.user.id
      );

      const newReview = {
        rating: parseInt(req.body.rating),
        text: req.body.text,
        user: req.user.id
      };

      //if review exists update with new content
      if (review.length > 0) {
        workout = await Workout.findOneAndUpdate(
          {
            _id: req.params.workout_id,
            "reviews.user": req.user.id
          },
          {
            $set: {
              "reviews.$.rating": req.body.rating,
              "reviews.$.text": req.body.text,
              "reviews.$.date": Date.now()
            }
          },
          {
            new: true
          }
        );
        return res.json(workout);
      }

      workout.reviews.unshift(newReview);
      await workout.save();

      res.json(workout);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route DELETE api/workout/:workout_id/review/:review_id
//@desc  delete review
//@access  private
router.delete("/:workout_id/review/:review_id", auth, async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.workout_id);
    const review = workout.reviews.find(
      review => review.id === req.params.review_id
    );
    //make sure review exists
    if (!review) {
      return res.status(404).json({ msg: "review not found" });
    }
    //make sure user matches
    //  ===> is this a SECURE method??? <===
    if (review.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Unautharized user" });
    }
    //get index of review to remove
    const removeIndex = workout.reviews
      .map(review => review.id)
      .indexOf(req.params.review_id);

    workout.reviews.splice(removeIndex, 1);
    await workout.save();
    res.json(workout.reviews);
  } catch (error) {
    console.error(error.message);
    res.send(500).send("server error");
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
