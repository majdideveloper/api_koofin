const mongoose = require("mongoose");

const PlatingSchema = new mongoose.Schema(
  {


    nameLand: {
      type: String,
    },
    idLand: {
      type: String,
    },
    nameFarmer: {
      type: String,
    },
    idFarmer: {
      type: String,
    },
    nameProduct: {
      type: String,
    },
    imageProduct: {
      type: String,
    }, 
    areaProduct: {
      type: String,
    },
    planting: {
      type: String

    },
    typeOfPlanting: {
      type: String
    },
    listTask :{
     type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Task',
        }
      ],
    }





  },
  { timestamps: true }
);

module.exports = mongoose.model("Plating", PlatingSchema);