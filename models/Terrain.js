const mongoose = require("mongoose");

const TerrainSchema = new mongoose.Schema(
  {


    name: {
      type: String,
    },
    farmername: {
      type: String,
    },
    farmerid: {
      type: String,
    },

    address: {
      type: String,
    },
    country: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    
    numberofwell: {
      type: Number,
    },
    waterSalinity: {
      type: Number,
    },
    numberOfBorehole: {
      type: Number,
    },
    area:{
      type:String,
    },
    soltype: {
      type: [],
    },

    planting: {
      type: []

    },
    typeOfPlanting: {
      type: []
    },
    listofplating:{
      type: [
         {
           type: mongoose.Schema.Types.ObjectId,
           ref: 'Plating',
         }
       ],
     }





  },
  { timestamps: true }
);

module.exports = mongoose.model("Terrain", TerrainSchema);