const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

//@route GET api/profile/me
//@desc  get current users profile
//@access  private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name"]
    );

    if (!profile) {
      return res.status(400).json({ msg: "No profile found for this user" });
    }

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.send(500).send("server error");
  }
});

//@route GET api/profile/user/:user_id
//@desc  get profile by uder id
//@access  public
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id }).populate(
      "user",
      ["name"]
    );

    if (!profile) {
      return res.status(400).json({ msg: "No profile found for this user" });
    }

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    //if the type of error is object id error res.send the same error as above
    if(error.kind === "ObjectId"){
      return res.status(400).json({msg: "No profile found for this user"})
    }
    res.send(500).send("server error");
  }
});

//@route GET api/profile/user/:user_id
//@desc  get all profiles
//@access  public
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id }).populate(
      "user",
      ["name"]
    );

    if (!profile) {
      return res.status(400).json({ msg: "No profile found for this user" });
    }

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.send(500).send("server error");
  }
});

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
      return res.status(400).json({ errors: errors.array() });
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
    if (certifications)
      profileFields.certifications = certifications.map(cert => ({
        certification: cert
      }));
    if (favoriteGym) profileFields.favoriteGym = favoriteGym;
    try {
        

      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        //update profile
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
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

module.exports = router;
