const router = require('express').Router();
const Farmer = require('../models/Farmer');

const bcrypt = require("bcrypt");
const { verifyToken } = require('../middlewares/auth');





//UPDATE
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { token, ...updateData } = req.body;

    if (req.farmer.userId === id) {
      const updatedFarmer = await Farmer.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true }
      );

      res.status(200).json(updatedFarmer);
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

// Get farmer
router.get("/:id", verifyToken, async (req, res)=>{
    try {

        const farmer = await Farmer.findById(req.farmer.farmerId);
        const {password, ...others} = farmer._doc;
        // if (farmer){
        //     res.status(200).json(others)
        // }
        // else{
        //     res.status(200).json(others)
        // }
        res.status(200).json(others);

    } catch (error) {
        res.status(500).json(error);
        console.log(error)
    }
})





module.exports = router