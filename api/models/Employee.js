const mongoose = require("mongoose")

const EmployeeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    mobile:{
        type:Number,
        required:true
    },
    designation:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true
    },
    course:{
        type:Array,
        required:true
    },
    photo:{
        type:String,
        required:false,
        default:"N/A"
    },
    createdDate: {
        type: Date,
        default: Date.now
      },
      updatedDate: {
        type: Date,
        default: Date.now
      }

}
);

module.exports = mongoose.model("Employee",EmployeeSchema)