const router = require('express').Router();
const Farmer = require('../models/Farmer');
const Terrain = require('../models/Terrain');
const Plating = require('../models/Plating');

const bcrypt = require("bcrypt");
const { verifyToken } = require('../middlewares/auth');





//UPDATE
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

   // if (req.farmer.farmerId === id) {
    if (req.body.farmerId === id) {
      const updatedFarmer = await Farmer.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      );
      console.log(updatedFarmer)
      const {password, ...others} = updatedFarmer._doc;
      res.status(200).json(others);
    } else {
      res.status(401).json("You can update only your account!");
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating farmer' });
  }
});
// delete farmer
router.delete("/:id",async (req, res)=>{
    if (req.body.farmerId === req.params.id) {
       // delete all product and task
        try {
            const farmer = await Farmer.findById(req.params.id);
            try {
                // await Product.deleteMany({email : farmer.email});
                // await Task.deleteMany({email : farmer.email});
                // await Terrains.deleteMany({email : farmer.email});
                await Farmer.findByIdAndDelete(req.params.id);
                res.status(200).json("farmer has been deleted ....");
              } catch (err) {
                res.status(500).json(err);
                console.log(err)
              }
        } catch (error) {
            res.status(404).json("farmer not found")
        }
      } else {
        res.status(401).json("You can delete only your account!");
      }

});

// // Get farmer
// router.get("/:id", verifyToken, async (req, res)=>{
//     try {
//         const { id } = req.params;

//         if (id !== req.farmer.farmerId) {
//           return res.status(403).json({ 'message': 'Unmatched ID' })
//         }

//         const farmerObj = await Farmer.findById(req.farmer.farmerId);
//         if (!farmerObj) {
//           return res.status(404).json({ 'message': 'Farmer not found' });
//         }
//         const {password, ...others} = farmerObj._doc;
//         res.status(200).json(others);
//     } catch (error) {
//         res.status(500).json({ 'message': 'Error getting farmer' });
//         console.log(error)
//     }
// })

// Get farmer
router.get("/:id/land",  async (req, res)=>{
  try {
      const { id } = req.params;

      // if (id !== req.farmer.farmerId) {
      //   return res.status(403).json({ 'message': 'Unmatched ID' })
      // }

      // const farmerObj = await Farmer.findById(id);
      // if (!farmerObj) {
      //   return res.status(404).json({ 'message': 'Farmer not found' });
      // }
      const lands = await Terrain.find({ farmerid :id });
    
      res.status(200).json(lands);
  } catch (error) {
      res.status(500).json({ 'message': 'Error getting farmer' });
      console.log(error)
  }
})


// Get All Product of Farmer...

router.get("/:id/plating",  async (req, res)=>{
  try {
      const { id } = req.params;

      
      const platings = await Plating.find({ idFarmer :id });
      console.log(platings);
    
      res.status(200).json(platings);
  } catch (error) {
      res.status(500).json({ 'message': 'Error getting farmer' });
      console.log(error)
  }
})





module.exports = router