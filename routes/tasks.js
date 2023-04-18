const router = require('express').Router();

const Task = require('../models/Task');


// Post Task
router.post("/", async (req, res)=>{
    const newTask = new Task(req.body);
    try{
        const task  = await newTask.save();
        res.status(200).json(task);
    }catch(error){
        res.status(500).json(error);
        console.log(error)
    }
});


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