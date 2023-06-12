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
      country:{
        type:String,
      },
      state:{
        type:String,
      },
      city:{
        type:String,
      },
    profilePic: {
      type: String,
      default: "",
    },
    phoneNumberOne :{
        type: String,
    },
    phoneNumberTwo :{
      type: String,
  },
    address : {
        type: String,
    },
    listterrain :{
        type: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Terrain',
          }
        ],
    } 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Farmer", FarmerSchema);