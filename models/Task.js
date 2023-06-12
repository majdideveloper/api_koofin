const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
   
    
    name: {
        type: String,
    },
    type:{
        type:String,
    },
    dateTaskField: {
      type: String,
      
    },
    quantity:{
        type:String,
    },
    idProduct: {
      type: String,
    },
    nameProduct:{
      type:String,
    }


   





  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);