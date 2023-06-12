const router = require('express').Router();

const Terrain = require('../models/Terrain');
const Farmer = require('../models/Farmer');



router.post("/", async (req, res) => {
   Farmer.findById(req.body.farmerid).then(farmer=>{
    if(!farmer){
      throw new Error('Farmer not found');
    }
    const requestBody = req.body;
    const newTerrain = new Terrain(requestBody);

    newTerrain.save().then(savedTerrain=>{
      farmer.listterrain.push(savedTerrain._id);

      return farmer.save();
    })
    .then(updatedFarmer => {
      console.log('Terrain added to Farmer:', updatedFarmer);
      res.status(200).json(updatedFarmer);
    })
    .catch(error => {
      console.error('Error adding Terrain:', error);
    });
  }).catch(error => {
    console.error('Error finding user:', error);
  });
    
  
});

// //Update Terrain 
// router.put("/:id", async (req, res) => {
//     try {
//       const terrain = await Terrain.findById(req.params.id);
//       if (terrain.farmerId === req.body.farmerId) {
//         try {
//           const updatedTerrain = await Terrain.findByIdAndUpdate(
//             req.params.id,
//             {
//               $set: req.body,
//             },
//             { new: true }
//           );
//           res.status(200).json(updatedTerrain);
//         } catch (err) {
//           res.status(500).json(err);
//         }
//       } else {
//         res.status(401).json("You can update only your Terrain!");
//       }
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

//   //Delete Terrain 
// router.delete("/:id", async (req, res) => {
//     try {
//       const terrain = await Terrain.findById(req.params.id);
//       if (terrain.farmerId === req.body.farmerId) {
//         try {
//           await terrain.delete();
//           res.status(200).json("terrain has deleted");
//         } catch (err) {
//           res.status(500).json(err);
//         }
//       } else {
//         res.status(401).json("You can delete only your Terrain!");
//       }
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });
// // Get one Terrain 
// router.get("/:id", async (req, res) => {
    
//     try {
//         const terrain = await newTerrain.findById(req.params.id);
//         res.status(200).json(terrain);

//     } catch (err) {
//         res.status(500).json(err);
//         console.log(err)
//     }
// });

// // Get all Terrain for farmers
// router.get("/", async (req, res) => {
    
//     try {
//         const terrains = await Terrain.find();
//         res.status(200).json(terrains);

//     } catch (err) {
//         res.status(500).json(err);
//         console.log(err)
//     }

    
// });

// // Get all Terrain for farmers
// router.get("/farmer/:idfarmer", async (req, res) => {
//     const idFarmer = req.params.idfarmer;
  
    
//     try {
//         const terrains = await Terrain.find(
//         {farmerid:{
//             $in:[idFarmer]
//         }}
//         );
//         res.status(200).json(terrains);

//     } catch (err) {
//         res.status(500).json(err);
//         console.log(err)
//     }

    
// });




module.exports = router