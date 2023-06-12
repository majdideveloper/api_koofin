const router = require('express').Router();

const Plating = require('../models/Plating');
const Terrain = require('../models/Terrain');
const Task = require('../models/Task');



//New Method add Plating to Land of Farmer
router.post("/", async (req, res) => {
    Terrain.findById(req.body.idLand).then(land=>{
     if(!land){
       throw new Error('Land not found');
     }
     const requestBody = req.body;
     const newPlating = new Plating(requestBody);
 
     newPlating.save().then(savedPlating=>{
       land.listofplating.push(savedPlating._id);
 
       return land.save();
     })
     .then(updatedLand => {
       console.log('Plating added to Land:', updatedLand);
       res.status(200).json(updatedLand);
     })
     .catch(error => {
       console.error('Error adding Plating:', error);
     });
   }).catch(error => {
     console.error('Error finding user:', error);
   });
     
   
 });

 // Get All Product of Farmer...

router.get("/:id/task",  async (req, res)=>{
  try {
      const { id } = req.params;

      
      const tasks = await Task.find({ idProduct :id });
      console.log(tasks);
    
      res.status(200).json(tasks);
  } catch (error) {
      res.status(500).json({ 'message': 'Error getting farmer' });
      console.log(error)
  }
})


// // Post Plating
// router.post("/", async (req, res)=>{
//     const newPlating = new Plating(req.body);
//     try{
//         const plating  = await newPlating.save();
//         res.status(200).json(plating);
//     }catch(error){
//         res.status(500).json(error);
//         console.log(error)
//     }
// });


// // Get Platings
// router.get("/:id", async (req, res) => {
    
//     try {
//         const plating = await newPlating.findById(req.params.id);
//         res.status(200).json(plating);

//     } catch (err) {
//         res.status(500).json(err);
//         console.log(err)
//     }
// });

// // Get all Task for platings
// router.get("/terrain/:idterrain", async (req, res) => {
//     const idTerrain = req.params.idterrain;
  
    
//     try {
//         const platings = await Plating.find(
//         {farmerid:{
//             $in:[idTerrain]
//         }}
//         );
//         res.status(200).json(platings);

//     } catch (err) {
//         res.status(500).json(err);
//         console.log(err)
//     }

    
// });








module.exports = router