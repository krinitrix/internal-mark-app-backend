const express = require('express');
const cors = require('cors');
const examModel = require('./models/exam');

const mongoose = require('mongoose');


const app = express();
mongoose.connect("mongodb+srv://nithin:nithin77@cluster0.npsai9c.mongodb.net/internalMarkDb?retryWrites=true&w=majority&appName=Cluster0")
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/getResult', (request, response) => {

    const studentName = request.body.studentName;
    const admissionNo = request.body.admissionNo;
    const subject = request.body.subject;

    const noOfDaysPresent = parseInt(request.body.noOfDaysPresent);
    const noOfDaysTotal = parseInt(request.body.noOfDaysTotal);

    const exam1Mark = parseInt(request.body.exam1Mark)
    const exam1Total = parseInt(request.body.exam1Total)

    const exam2Mark = parseInt(request.body.exam2Mark)
    const exam2Total = parseInt(request.body.exam2Total)

    const assig1Score = parseInt(request.body.assig1Score);
    const assig2Score = parseInt(request.body.assig2Score);


    const firstExam = (exam1Mark / exam1Total) * 10;
    const secondExam = (exam2Mark / exam2Total) * 10;
    const totalExamScore = firstExam + secondExam;

    const TotalAssigScore = assig1Score + assig2Score
    const attendancePercentage = (noOfDaysPresent / noOfDaysTotal) * 8

    const internalMark = totalExamScore + TotalAssigScore + attendancePercentage;

    let data_store = new examModel(
        {
            studentName:studentName,
            admissionNo:admissionNo,
            subject:subject,
            noOfDaysPresent: noOfDaysPresent,
            noOfDaysTotal: noOfDaysTotal,
            exam1Mark: exam1Mark,
            exam1Total: exam1Total,
            exam2Mark: exam2Mark,
            exam2Total: exam2Total,
            assig1Score: assig1Score,
            assig2Score: assig2Score,
            firstExam: firstExam,
            secondExam: secondExam,
            totalExamScore: totalExamScore,
            TotalAssigScore: TotalAssigScore,
            attendancePercentage: attendancePercentage,
            internalMark: internalMark
        })

    data_store.save()


    response.json({
        "studentName": studentName,
        "subject": subject,
        "admissionNo": admissionNo,
        "internalMark": internalMark


    })




});

app.get('/viewAll',(request,response)=>{
    examModel.find().then(
        (items)=>{
            response.json(items);
        }
    )
})




app.listen(4000, () => {
    console.log('Server is running on port 4000');
});