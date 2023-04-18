const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
   
    
    name: {
        type: String,
    },
    type:{
        type:String,
    },
    fertilizer_name : {
        type:String,
    },
    
    quantity:{
        type:Number,
    },


   





  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);