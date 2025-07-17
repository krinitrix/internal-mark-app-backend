const mongoose = require('mongoose');
const examSchema =mongoose.Schema({
    studentName:String,
    admissionNo:String, 
    subject:String,
    noOfDaysPresent:String,
    noOfDaysTotal:String,
    exam1Mark:String,
    exam1Total:String,
    exam2Mark:String,
    exam2Total:String,
    assig1Score:String,
    assig2Score:String,
    firstExam:String,
    secondExam:String,
    totalExamScore:String,
    TotalAssigScore:String,
    attendancePercentage:String,
    internalMark:String
})

const examModel= mongoose.model("internalMarks",examSchema)
module.exports=examModel