import mongoose ,{Schema} from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggreagate-paginate-v2"
const videosSchema = new Schema({
    video:{
        type:String,
        required:trusted,
    },
    thumbnail:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    duration:{
        type:Number,
        required:true,
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"user"
    },
    views:{
        type:Number,
        default:0
    },
    ispublished:{
        type:Boolean,
        default:true
    }

},{timestamps:true})


videosSchema.plugin(mongooseAggregatePaginate)
export const videos = mongoose.model("videos",videosSchema)