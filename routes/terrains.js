const router = require('express').Router();

const Terrain = require('../models/Terrain');
const Farmer = require('../models/Farmer');
const { verifyToken } = require('../middlewares/auth');



router.post("/", verifyToken,async (req, res) => {

    try {
      if (req.farmer.farmerId !== req.body.farmerid) {
        return res.status(401).json({ message: "You can only create terrain for yourself." });
      }
        const newTerrain = new Terrain(req.body);

        const terrain = await newTerrain.save();

        res.status(200).json(terrain);

    } catch (err) {
        res.status(500).json(err);
        console.log(err)
    }
});

//Update Terrain
router.put("/:id", async (req, res) => {
    try {
      const terrain = await Terrain.findById(req.params.id);
      if (terrain.farmerId === req.body.farmerId) {
        try {
          const updatedTerrain = await Terrain.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updatedTerrain);
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can update only your Terrain!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //Delete Terrain
router.delete("/:id", async (req, res) => {
    try {
      const terrain = await Terrain.findById(req.params.id);
      if (terrain.farmerId === req.body.farmerId) {
        try {
          await terrain.delete();
          res.status(200).json("terrain has deleted");
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can delete only your Terrain!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
// Get one Terrain
router.get("/:id", async (req, res) => {

    try {
        const terrain = await newTerrain.findById(req.params.id);
        res.status(200).json(terrain);

    } catch (err) {
        res.status(500).json(err);
        console.log(err)
    }
});

// Get all Terrains
router.get("/", async (req, res) => {

    try {
        const terrains = await Terrain.find();
        res.status(200).json(terrains);

    } catch (err) {
        res.status(500).json(err);
        console.log(err)
    }


});

/* /api/terrains/farmer/:id
its supposed to be -> /api/farmers/:id/terrains
you have to get all terrains associate to farmers
from the farmers Routing not the terrains
you just return listofterrain of the farmers document*/
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