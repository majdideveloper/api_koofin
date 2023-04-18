const mongoose = require("mongoose");

const FarmerSchema = new mongoose.Schema(
  {
   
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
        type: String,
      },
    profilePic: {
      type: String,
      default: "",
    },
    phoneNumber :{
        type: String,
    },
    address : {
        type: String,
    },
    listterrain :{
        type: [],
    } 



  },
  { timestamps: true }
);

module.exports = mongoose.model("Farmer", FarmerSchema);