const express=require('express');
const cors=require('cors');
const app=express();

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
    const exam1Total=parseInt(request.body.exam1Total)

    const exam2Mark = parseInt(request.body.exam2Mark)
    const exam2Total=parseInt(request.body.exam2Total)

    const assig1Score = parseInt(request.body.assig1Score);
    const assig2Score = parseInt(request.body.assig2Score);


    const firstExam=(exam1Mark / exam1Total) * 10;
    const secondExam=(exam2Mark / exam2Total) * 10;
    const totalExamScore = firstExam + secondExam;

    const TotalAssigScore= assig1Score+assig2Score
    const attendancePercentage = (noOfDaysPresent / noOfDaysTotal) * 8

    const internalMark=totalExamScore+ TotalAssigScore + attendancePercentage;

    response.json({
            "studentName": studentName,
            "subject": subject,
            "admissionNo":admissionNo,
            "internalMark": internalMark

    })



    
});




app.listen(4000,()=>{
    console.log('Server is running on port 4000');
});