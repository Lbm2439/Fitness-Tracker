// const router = require("express").Router();
// const Workout = require("../models/workout.js");

// module.exports = function(app) {
// router.post("/api/workouts", (req, res) => {
//     Workout.create(req.body)
//         .then(dbWorkout => {
//             res.json(dbWorkout)
//         })
//         .catch(err => {
//             res.json(err)
//         })
// });

// router.get("/api/workouts", (req, res) => {
//     Workout.find( {} )
//         .then(dbWorkout => {
//             res.json(dbWorkout)
//         })
//         .catch(err => {
//             res.json(err)
//         })
// });

// router.get("/api/workouts/range", ( { query } , res) => {
//     Workout.find({ day: { $gte: query.start, $lte: query.end } })
//       .then(dbWorkouts => {
//         res.json(dbWorkouts);
//       })
//       .catch(err => {
//         res.json(err);
//       });
//   });
  
//   router.delete("/api/workouts", ( { body } , res) => {
//     Workout.findByIdAndDelete(body.id)
//       .then(() => {
//         res.json(true);
//       })
//       .catch(err => {
//         res.json(err);
//       });
//   });

//   router.put("/api/workouts/:id", ( { body, params } , res) => {
//     Workout.findByIdAndUpdate(
//       params.id,
//       { $push: { exercises: body } },
      
//       { new: true, runValidators: true }
//     )
//       .then(dbWorkout => {
//         res.json(dbWorkout);
//       })
//       .catch(err => {
//         res.json(err);
//       });
//   });
// }

// module.exports = router;

const db = require("../models");

String.prototype.toObjectId = function () {
  var ObjectId = (require('mongoose').Types.ObjectId);
  return new ObjectId(this.toString());
};

module.exports = function (app) {

  app.get("/api/workouts", async (req, res) => {
    const agg = await db.Workout.aggregate([
      { $unwind: "$exercises" },
      {
        $group: {
          _id: "$_id",
          day: { "$first": "$day" },
          exercises: { $push: "$exercises" },
          totalDuration: { $sum: "$exercises.duration" },
        }
      },
      { $sort: { day: 1 } }
    ]);
    res.json(agg);
  });

  app.post("/api/workouts", async (req, res) => {
    const workout = new db.Workout();
    const data = await db.Workout.create(workout);
    res.json(data);
  });

  app.put("/api/workouts/:id", async (req, res) => {
    try {
      const data = await db.Workout.updateOne(
        {
          _id: req.params.id.toObjectId()
        },
        {
          $push: { exercises: req.body }
        },
        {
          runValidators: true
        });
      console.log(data);
      res.json(data);

    } catch (err) {
      console.log(JSON.stringify(err.errors['exercises'].message));
      res.sendStatus(400);
    }
  });

  app.get("/api/workouts/range", async (req, res) => {
    const data = await db.Workout.find({}).sort({ 'day': 1 });
    res.json(data.slice(-7));
  });
}