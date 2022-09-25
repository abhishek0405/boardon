const mongoose=require('mongoose');

//company schema
const CompanySchema = mongoose.Schema({
    cid : {
        type : Number
    },

    name : {
        type : String
    },
    address : {
        type : String
    },
    description : {
        type : String
    },
   
    password : {
        type : String
    },
    docs_needed : {
        type : [String]
    },
    domain : {
        type : String
    }
})

module.exports=mongoose.model('Company', CompanySchema)

