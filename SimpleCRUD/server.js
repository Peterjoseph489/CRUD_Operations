const express = require("express");
const app = express();
PORT = 4000
app.use(express.json());

const studentInfo = [
    {
        id: 1,
        name: "ubani",
        course: "Full Stack",
        duration: "One Year",
        institution: "The Curve",
        grade: {
            javascript: 60,
            html: 80,
            css: 50,
            react: 50,
            node: 40
        }
    },
    {
        id: 2,
        name: "ubani",
        course: "Full Stack",
        duration: "One Year",
        institution: "The Curve"
    },
    {
        id: 3
    }
]






// Reads all students
app.get('/users', (req, res) => {
    res.status(200).json({
        data: studentInfo
    })
})


// Reads one student
app.get('/users/:id', (req, res) => {
    const userid = parseInt(req.params.id);
    const user = studentInfo.find((item)=>(item.id === userid));
    const userIndex = studentInfo.findIndex((item)=>(item.id === userid));
    if (!user) {
        res.status(404).json({
            message: "User not Found"
        })
    } else {res.status(200).json({
            data: studentInfo[userIndex]
        })
    }
})


// Creates a new student
app.post('/users', (req, res) => {

    // FIRST METHOD OF DESTRUCTURING
    // const {name, course, duration, institution, grade} = req.body;
    // const previousId = parseInt(studentInfo.find((obj)=>(obj.id === studentInfo.length)).id)
    // const newUserId = previousId + 1;
    // console.log(newUserId); 
    // // res.json(newUserId)
    // const newUserInfo = {
    //     id: newUserId,
    //     name,
    //     course,
    //     duration,
    //     institution,
    //     grade
    // }
    // studentInfo.push(newUserInfo);
    // res.status(200).json({
    //     message: "ok",
    //     data: newUserInfo
    // })

    // SECOND METHOD
    const newUserInfo = req.body;
    const previousId = parseInt(studentInfo.find((obj)=>(obj.id === studentInfo.length)).id)
    newUserInfo.id = previousId + 1;
    studentInfo.push(newUserInfo);
    studentInfo.push(newUserInfo);
    res.status(200).json({
        message: "ok",
        data: newUserInfo
    })
})


// Updating a User's Information
app.put('/users/:id', (req, res) => {
    const userid = parseInt(req.params.id)
    const user = studentInfo.find((item)=>(item.id === userid))
    const  {name, course, duration, institution, grade} = req.body;
    const UpdatedUser = [
        studentInfo.name = req.body.name || studentInfo.name,
        studentInfo.course = req.body.course || studentInfo.course,
        studentInfo.duration = req.body.duration || studentInfo.duration,
        studentInfo.institution = req.body.institution || studentInfo.institution,
        studentInfo.grade = req.body.grade || studentInfo.grade
    ]
    if (!user) {
        res.status(404).json({
            message: "User not Found"
        })
    } else {
        res.status(200).json({
            message: "ok",
            data: UpdatedUser
        })
    }
})




app.listen(PORT, (error) => {
    if (error) {
        console.log(error.message)
    } else {
        console.log(`This server is listening to port: ${PORT}`)
    }
})

