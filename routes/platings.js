const router = require('express').Router();

const Plating = require('../models/Plating');


// Post Plating
router.post("/", async (req, res)=>{
    const newPlating = new Plating(req.body);
    try{
        const plating  = await newPlating.save();
        res.status(200).json(plating);
    }catch(error){
        res.status(500).json(error);
        console.log(error)
    }
});


// Get Platings
router.get("/:id", async (req, res) => {
    
    try {
        const plating = await newPlating.findById(req.params.id);
        res.status(200).json(plating);

    } catch (err) {
        res.status(500).json(err);
        console.log(err)
    }
});

// Get all Task for platings
router.get("/terrain/:idterrain", async (req, res) => {
    const idTerrain = req.params.idterrain;
  
    
    try {
        const platings = await Plating.find(
        {farmerid:{
            $in:[idTerrain]
        }}
        );
        res.status(200).json(platings);

    } catch (err) {
        res.status(500).json(err);
        console.log(err)
    }

    
});








module.exports = router