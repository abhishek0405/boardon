const mongoose=require('mongoose');

//polls Schema
const PollsSchema=mongoose.Schema({
    cid : {
        type : Number
    },
    pollId : {
        type : Number,
        default : 0
    },
    pollName : {
        type : String
    },
    posted : {
        type: String
    },
    questions : [{
        type : {
            qs : String,
            opt : [String]
        }
    }],

    responses : [{
        type : {
            username : String,
            answers : [String]
        }
    }]
})

module.exports=mongoose.model('Polls',PollsSchema)

