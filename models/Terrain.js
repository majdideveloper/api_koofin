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
    
    address : {
        type: String,
    },
    soltype : {
        type: String,
    },
    numberofwell:{
        type : Number,
    },
    waterSalinity : {
        type:Number,
    },
    numberOfBorehole:{
        type:Number,
    },

    planting: {
        type:[]

    },
    typeOfPlanting:{
        type:[]
    },
    listofplating : {
        type: []
    }





  },
  { timestamps: true }
);

module.exports = mongoose.model("Terrain", TerrainSchema);