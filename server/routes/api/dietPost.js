const express = require("express")
const router = express.Router()
const {
    check,
    validationResult
} = require("express-validator")
const auth = require("../../middleware/auth")

const Diet = require("../../models/Diet")
const Profile = require("../../models/Profile")
const User = require("../../models/User")


//@route POST api/dietPost
//@desc  create a diet route
//@access  Public
router.post("/", [auth, [
        check("title", "Title is required")
        .not()
        .isEmpty(),
        check("description", "Description is required")
        .not()
        .isEmpty()
    ]],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }

        const {
            title,
            description,
            calorieGoal,
            carbohydrateGoal,
            proteinGoal,
            fatGoal,
            dailyMeals
        } = req.body

        const dietFields = {}
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
            diet = new Diet(dietFields)
            await diet.save()
            res.json(diet)
        } catch (error) {
            console.error(error.message)
            res.status(500).send("Server Error")
        }
    }
)

module.exports = router