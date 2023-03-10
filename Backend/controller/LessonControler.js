const Response = require('../ResponseMessage/AllMessage')
const Lesson = require("../model/lesson")

exports.GetAllLesson = async(req,res)=>{
    try{
        const lessonData = await Lesson.find()
        res.json(Response.dataResponse("data found succesfully",lessonData))
    }catch(err){
        console.log(err);
        res.json(Response.catchError(err.message))
    }
}

exports.AddLesson = async(req,res)=>{
    try{
        if (!req.body.grade || !req.body.subject || !req.body.date || !req.body.topic || !req.body.lesson || !req.body.foucus || !req.body.material || 
            !req.body.objective || !req.body.structure || !req.body.assesment) {
            if(!req.body.grade){
                res.json(Response.requiredError("grade is required"))
            }else if(!req.body.subject){
                res.json(Response.requiredError("subject is required"))
            }else if(!req.body.date){
                res.json(Response.requiredError("date is required"))
            }else if(!req.body.topic){
                res.json(Response.requiredError("topic is required"))
            }else if(!req.body.lesson){
                res.json(Response.requiredError("lesson is required"))
            }else if(!req.body.foucus){
                res.json(Response.requiredError("foucus is required"))
            }else if(!req.body.material){
                res.json(Response.requiredError("material is required"))
            }else if(!req.body.objective){
                res.json(Response.requiredError("objective is required"))
            }else if(!req.body.structure){
                res.json(Response.requiredError("structure is required"))
            }else if(!req.body.assesment){
                res.json(Response.requiredError("assesment is required"))
            }
        }else {
            const addLesson = Lesson({
                grade:req.body.grade,
                subject:req.body.subject,
                date:req.body.date,
                topic:req.body.topic,
                lesson:req.body.lesson,
                foucus:req.body.foucus,
                material:req.body.material,
                objective:req.body.objective,
                structure:req.body.structure,
                assesment:req.body.assesment
            })
            const saveData = await addLesson.save()
            if(saveData){
                res.json(Response.successResponse("Lesson Added Succesfullt"))
            }else{
                res.json(Response.findError("Something went wrong"))
            }
        }
    }catch(err){
        console.log(err);
        res.json(Response.catchError(err.message))
    }
}

exports.ViewLesson = async(req,res)=>{
    try{
        if (!req.params.id){
                res.json(Response.requiredError("id is required"))
        }else {
            const saveData = await Lesson.findById({_id:req.params.id})
            if(saveData){
                res.json(Response.dataResponse("Data Found Succesfullt",saveData))
            }else{
                res.json(Response.findError("Something went wrong"))
            }
        }
    }catch(err){
        console.log(err);
        res.json(Response.catchError(err.message))
    }
}

exports.EditLesson = async(req,res)=>{
    try{
        if (!req.params.id || !req.body.grade || !req.body.subject || !req.body.date || !req.body.topic || !req.body.lesson || !req.body.foucus || !req.body.material || 
            !req.body.objective || !req.body.structure || !req.body.assesment) {
            if(!req.params.id){
                res.json(Response.requiredError("id is required"))
            }else if(!req.body.grade){
                res.json(Response.requiredError("grade is required"))
            }else if(!req.body.subject){
                res.json(Response.requiredError("subject is required"))
            }else if(!req.body.date){
                res.json(Response.requiredError("date is required"))
            }else if(!req.body.topic){
                res.json(Response.requiredError("topic is required"))
            }else if(!req.body.lesson){
                res.json(Response.requiredError("lesson is required"))
            }else if(!req.body.foucus){
                res.json(Response.requiredError("foucus is required"))
            }else if(!req.body.material){
                res.json(Response.requiredError("material is required"))
            }else if(!req.body.objective){
                res.json(Response.requiredError("objective is required"))
            }else if(!req.body.structure){
                res.json(Response.requiredError("structure is required"))
            }else if(!req.body.assesment){
                res.json(Response.requiredError("assesment is required"))
            }
        }else {
            const editLesson = {
                grade:req.body.grade,
                subject:req.body.subject,
                date:req.body.date,
                topic:req.body.topic,
                lesson:req.body.lesson,
                foucus:req.body.foucus,
                material:req.body.material,
                objective:req.body.objective,
                structure:req.body.structure,
                assesment:req.body.assesment
            }
            const saveData = await Lesson.findByIdAndUpdate({_id:req.params.id},editLesson,{new:true})
            if(saveData){
                res.json(Response.successResponse("Lesson Updated Succesfullt"))
            }else{
                res.json(Response.findError("Something went wrong"))
            }
        }
    }catch(err){
        console.log(err);
        res.json(Response.catchError(err.message))
    }
}

exports.DeleteLesson = async(req,res)=>{
    try{
        if (!req.params.id){
                res.json(Response.requiredError("id is required"))
        }else {
            const saveData = await Lesson.findByIdAndDelete({_id:req.params.id})
            if(saveData){
                res.json(Response.successResponse("Data Deleted Succesfullt"))
            }else{
                res.json(Response.findError("Something went wrong"))
            }
        }
    }catch(err){
        console.log(err);
        res.json(Response.catchError(err.message))
    }
}