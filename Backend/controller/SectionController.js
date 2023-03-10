const Response = require('../ResponseMessage/AllMessage')
const Section = require("../model/section")

exports.index = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    if(!req.body.class_id){
        res.json(Response.requiredError("Class id is required"))
    }else{
        const classData = await Section.find({class_id:req.body.class_id}).select({ __v: 0 }).sort({ created_at: -1 });
        res.json(Response.ResponseDataMsg("Data Found SuccessFully", classData))
    }
}

exports.AddSection = async(req,res) => {
    if(!req.body.section_name || !req.body.class_id || !req.body.capecity){
        if(!req.body.section_name){
            res.json(Response.requiredError("Section name required"))
        }else if(!req.body.class_id){
            res.json(Response.requiredError("Class id required"))
        }else if(!req.body.cpacity){
            res.json(Response.requiredError("Section Capicity required"))
        }
    }else{
        const addSection = Section({
            section_name:req.body.section_name,
            class_id:req.body.class_id,
            capecity:req.body.capecity
        })
        const saveSec = await addSection.save()
        if(saveSec){
            res.json(Response.successResponse("Section added succesfully"))
        }else{
            res.json(Response.catchError("something went wrong"))
        }
    }
}