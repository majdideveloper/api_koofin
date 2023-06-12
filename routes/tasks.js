const router = require('express').Router();

const Task = require('../models/Task');
const Plating = require('../models/Plating');


// Post Task
router.post("/", async (req, res) => {
    Plating.findById(req.body.idProduct).then(plating=>{
     if(!plating){
       throw new Error('Land not found');
     }
     const requestBody = req.body;
     const newTask = new Task(requestBody);
 
     newTask.save().then(savedTask=>{
       plating.listTask.push(savedTask._id);
 
       return plating.save();
     })
     .then(updatedplating => {
       console.log('Task added to Product:', updatedplating);
       res.status(200).json(updatedplating);
     })
     .catch(error => {
       console.error('Error adding Task:', error);
     });
   }).catch(error => {
     console.error('Error finding Product:', error);
   });
     
   
 });




// router.post("/", async (req, res)=>{
//     const newTask = new Task(req.body);
//     try{
//         const task  = await newTask.save();
//         res.status(200).json(task);
//     }catch(error){
//         res.status(500).json(error);
//         console.log(error)
//     }
// });


// Get One Task
// Get one Terrain 
router.get("/:id", async (req, res) => {
    
    try {
        const task = await newTask.findById(req.params.id);
        res.status(200).json(task);

    } catch (err) {
        res.status(500).json(err);
        console.log(err)
    }
});

// Get all Task for plating
router.get("/farmer/:idfarmer", async (req, res) => {
    const idFarmer = req.params.idfarmer;
  
    
    try {
        const terrains = await Terrain.find(
        {farmerid:{
            $in:[idFarmer]
        }}
        );
        res.status(200).json(terrains);

    } catch (err) {
        res.status(500).json(err);
        console.log(err)
    }

    
});








module.exports = router