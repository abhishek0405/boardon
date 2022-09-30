const mongoose=require('mongoose');

//docs Schema
const CommentsSchema=mongoose.Schema({
    username : {
        type : String
    },
    comments : {
        type : {
            
        }
    }
})

module.exports=mongoose.model('Comments',CommentsSchema)

