const router = require('express').Router();
const Farmer = require('../models/Farmer');
const bcrypt = require("bcrypt");


//Register

router.post('/registerfarmer',async (req, res)=>{
try{

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const newFarmer = new Farmer({
        
        email : req.body.email,
        password : hashPassword
    });


    const farmer = await newFarmer.save();
    res.status(200).json(farmer);

}catch(err){
    res.status(500).json(err);
    console.log(err)
}
}) ;


// Login 

router.post("/loginfarmer", async (req, res)=>{
    try{

        // check if the user exists
        const farmer = await Farmer.findOne({ email: req.body.email });
        if(!farmer) {
            res.status(400).json("wrong credentials!!!");
        } else{
            const validate = await bcrypt.compare(req.body.password, farmer.password);
            if(!validate){
                res.status(400).json("wrong password!!!");
            }
            else{
                const {password,...others}= farmer._doc;
                res.status(200).json(others);
            }

        }


        

        

    
    }catch(err){
        res.status(500).json(err);
    }

})





// udate info Farmer
// router.put("/farmer:id", async (req, res) => {
//     try {
//       const farmer = await Farmer.findById(req.params.id);
//       if (farmer.name === req.body.name) {
//         try {
//           const updatedFarmer = await Farmer.findByIdAndUpdate(
//             req.params.id,
//             {
//               $set: req.body,
//             },
//             { new: true }
//           );
//           res.status(200).json(updatedPost);
//         } catch (err) {
//           res.status(500).json(err);
//         }
//       } else {
//         res.status(401).json("You can update only your Account");
//       }
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });







module.exports = router