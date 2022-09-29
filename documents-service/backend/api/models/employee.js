const mongoose=require('mongoose');

//employee schema
const EmployeeSchema = mongoose.Schema({
    cid : {
        type : Number
    },
    eid : {
        type : Number
    },
    name : {
        type : String
    },
    dob : {
        type : String
    },
    username : {
        type : String
    },
    password : {
        type : String
    }
    
})

module.exports=mongoose.model('Employee', EmployeeSchema)

