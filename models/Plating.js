const mongoose = require("mongoose");

const PlatingSchema = new mongoose.Schema(
  {
   
    
    nameOfTheLand: {
        type: String,
      },
      farmername: {
        type: String,
      },
      farmerid: {
        type: String,
      },
      landId:{
        type:String,
      },
    
    
    

    planting: {
        type:[]

    },
    typeOfPlanting:{
        type:[]
    }





  },
  { timestamps: true }
);

module.exports = mongoose.model("Plating", PlatingSchema);