const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const {
  check,
  validationResult
} = require("express-validator");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

//@route GET api/profile/me
//@desc  get current users profile
//@access  private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate(
      "user",
      ["name"]
    );

    if (!profile) {
      return res.status(400).json({
        msg: "No profile found for this user"
      });
    }

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.send(500).send("server error");
  }
});

//@route GET api/profile/user/:user_id
//@desc  get profile by user id
//@access  public
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate("user", ["name"]);

    if (!profile) {
      return res.status(400).json({
        msg: "No profile found with this id"
      });
    }

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    //if the type of error is object id error res.send the same error as above
    if (error.kind === "ObjectId") {
      return res.status(400).json({
        msg: "No profile found with this id"
      });
    }
    res.send(500).send("server error");
  }
});

//@route GET api/profile/
//@desc  get all profiles
//@access  public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name"]);
    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.send(500).send("server error");
  }
});

//POST allows us to create a resource
//@route POST api/profile
//@desc  create a profile
//@access  private
router.post(
  "/",
  [
    auth,
    [
      check("bio", "Bio is required")
      .not()
      .isEmpty(),
      check("experienceLevel", "Experience level is required")
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
      instagramURL,
      youtubeURL,
      otherURL,
      sex,
      bio,
      experienceLevel,
      certifications,
      favoriteGym
    } = req.body;

    //build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    profileFields.social = {};
    if (instagramURL) profileFields.social.instagramURL = instagramURL;
    if (youtubeURL) profileFields.social.youtubeURL = youtubeURL;
    if (otherURL) profileFields.social.otherURL = otherURL;
    if (sex) profileFields.sex = sex;
    if (bio) profileFields.bio = bio;
    if (experienceLevel) profileFields.experienceLevel = experienceLevel;

    //this might not be necassery
    if (certifications)
      profileFields.certifications = certifications.map(cert => ({
        certification: cert
      }));
    if (favoriteGym) profileFields.favoriteGym = favoriteGym;

    try {
      let profile = await Profile.findOne({
        user: req.user.id
      });

      if (profile) {
        //update profile
        profile = await Profile.findOneAndUpdate({
          user: req.user.id
        }, {
          $set: profileFields
        }, {
          new: true
        });
        return res.json(profile);
      }

      //create new profile
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server error");
    }
  }
);

//PUT is idempotent. Updating a resource will always yield the same result - it's going to be either the creation of the result based on the payload (if the resource did not exist) or the resource is going to be updated - and the update is always going to be the same.

//@route PUT api/profile/bodyMeasurement
//@desc  add body measurements
//@access  private
router.put(
  "/bodyMeasurement",
  [
    auth,
    [
      check("weight", "Weight is required")
      .not()
      .isEmpty(),
      check("height", "Height is required")
      .not()
      .isEmpty(),
      check("bodyFatIndex", "Body fat index is required")
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
      weight,
      height,
      bodyFatIndex,
      leftThigh,
      rightThigh,
      leftCalf,
      rightCalf,
      chestBack,
      leftArm,
      rightArm,
      leftForearm,
      rightForearm,
      waist
    } = req.body;

    //build body meas object
    const bodyMeasurementFields = {};

    if (weight) bodyMeasurementFields.weight = weight;
    if (height) bodyMeasurementFields.height = height;
    if (bodyFatIndex) bodyMeasurementFields.bodyFatIndex = bodyFatIndex;
    if (leftThigh) bodyMeasurementFields.leftThigh = leftThigh;
    if (rightThigh) bodyMeasurementFields.rightThigh = rightThigh;
    if (leftCalf) bodyMeasurementFields.leftCalf = leftCalf;
    if (rightCalf) bodyMeasurementFields.rightCalf = rightCalf;
    if (chestBack) bodyMeasurementFields.chestBack = chestBack;
    if (rightArm) bodyMeasurementFields.rightArm = rightArm;
    if (leftArm) bodyMeasurementFields.leftArm = leftArm;
    if (leftForearm) bodyMeasurementFields.leftForearm = leftForearm;
    if (rightForearm) bodyMeasurementFields.rightForearm = rightForearm;
    if (waist) bodyMeasurementFields.waist = waist;

    try {
      const profile = await Profile.findOne({
        user: req.user.id
      });

      profile.bodyMeasurements.unshift(bodyMeasurementFields);

      await profile.save();

      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server error");
    }
  }
);

//@route PUT api/profile/bodyMeasurementGoal
//@desc  add body measurement Goal
//@access  private
router.put(
  "/bodyMeasurementGoal",
  [
    auth,
    [
      check("weight", "Weight is required")
      .not()
      .isEmpty(),
      check("goalDate", "A valid goal date is required")
      .not()
      .isEmpty(),
      check("bodyFatIndex", "Body fat index is required")
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
      weight,
      bodyFatIndex,
      leftThigh,
      rightThigh,
      leftCalf,
      rightCalf,
      chestBack,
      leftArm,
      rightArm,
      leftForearm,
      rightForearm,
      waist,
      goalDate
    } = req.body;

    //build body meas goal object
    const bodyMeasurementGoalFields = {};

    if (weight) bodyMeasurementGoalFields.weight = weight;
    if (bodyFatIndex) bodyMeasurementGoalFields.bodyFatIndex = bodyFatIndex;
    if (leftThigh) bodyMeasurementGoalFields.leftThigh = leftThigh;
    if (rightThigh) bodyMeasurementGoalFields.rightThigh = rightThigh;
    if (leftCalf) bodyMeasurementGoalFields.leftCalf = leftCalf;
    if (rightCalf) bodyMeasurementGoalFields.rightCalf = rightCalf;
    if (chestBack) bodyMeasurementGoalFields.chestBack = chestBack;
    if (rightArm) bodyMeasurementGoalFields.rightArm = rightArm;
    if (leftArm) bodyMeasurementGoalFields.leftArm = leftArm;
    if (leftForearm) bodyMeasurementGoalFields.leftForearm = leftForearm;
    if (rightForearm) bodyMeasurementGoalFields.rightForearm = rightForearm;
    if (waist) bodyMeasurementGoalFields.waist = waist;
    if (goalDate) bodyMeasurementGoalFields.goalDate = goalDate;

    try {
      const profile = await Profile.findOne({
        user: req.user.id
      });

      profile.bodyMeasurementGoals.unshift(bodyMeasurementGoalFields);

      await profile.save();

      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server error");
    }
  }
);

//@route DELETE api/profile/bodyMeasurement/:bodyMeasurement_id
//@desc  delete bodyMeasurement
//@access  private
router.delete(
  "/bodyMeasurement/:bodyMeasurement_id",
  auth,
  async (req, res) => {
    try {
      const profile = await Profile.findOne({
        user: req.user.id
      });
      //get index of the one you want to remove
      const removeIndex = profile.bodyMeasurements
        .map(meas => meas.id)
        .indexOf(req.params.bodyMeasurement_id);

      profile.bodyMeasurements.splice(removeIndex, 1);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.send(500).send("server error");
    }
  }
);

//@route DELETE api/profile/bodyMeasurementGoal/:bodyMeasurementGoal_id
//@desc  delete bodyMeasurementGoal
//@access  private
router.delete(
  "/bodyMeasurementGoal/:bodyMeasurementGoal_id",
  auth,
  async (req, res) => {
    try {
      const profile = await Profile.findOne({
        user: req.user.id
      });
      //get index of the one you want to remove
      const removeIndex = profile.bodyMeasurementGoals
        .map(goal => goal.id)
        .indexOf(req.params.bodyMeasurementGoal_id);
      //remove index value only
      profile.bodyMeasurementGoals.splice(removeIndex, 1);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.send(500).send("server error");
    }
  }
);

//@route DELETE api/profile
//@desc  delete user and profile
//@access  private
router.delete("/", auth, async (req, res) => {
  try {
    // ----->    possibly remove workouts and diets????  <-------
    //remove profile with user id
    await Profile.findOneAndRemove({
      user: req.user.id
    });
    await User.findOneAndRemove({
      _id: req.user.id
    });
    res.json({
      msg: "User has been successfully deleted"
    });
  } catch (error) {
    console.error(error.message);
    res.send(500).send("server error");
  }
});

module.exports = router;