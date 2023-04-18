const router = require('express').Router();
const Farmer = require('../models/Farmer');

const bcrypt = require("bcrypt");







//UPDATE
router.put("/:id", async (req, res) => {
    if (req.body.farmerId === req.params.id) {
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      }
      try {
        const updatedFarmer = await Farmer.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedFarmer);
      } catch (err) {
        res.status(500).json(err);
        console.log(err)
      }
    } else {
      res.status(401).json("You can update only your account!");
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
router.get("/:id", async (req, res)=>{
    try {

        const farmer = await Farmer.findById(req.params.id);
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