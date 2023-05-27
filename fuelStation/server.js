// import the express library
const express = require("express");
const fs = require("fs");
const PORT = 5050;

// create an instance of express
const app = express();

//midware
app.use(express.json());


// sendind a welcome message
app.get( '/', (req, res) => {
    res.status( 200 ).json ( {
        message: "welcome to NNPC Fuel Station"
    })
    // res.send("welcome")
})

//Internal Database
const fuelStation =[
    {id: 1, StaffName: "Paul", StaffAddress: "lekki", StaffSalary: 140, StaffPosition: "MD", StaffGender: "Male"},
    {id: 2, StaffName: "Peter", StaffAddress: "Festac", StaffSalary: 100, StaffPosition: "Instructor", StaffGender: "Male"},
    {id: 3, StaffName: "Silas", StaffAddress: "Aba", StaffSalary: 155, StaffPosition: "Secretary", StaffGender: "Male"},
    {id: 4, StaffName: "Nkechi", StaffAddress: "Abuja", StaffSalary: 18, StaffPosition: "MD", StaffGender: "Female"},
    {id: 5, StaffName: "Grace", StaffAddress: "Lagos", StaffSalary: 168, StaffPosition: "Driver", StaffGender: "Female"}
]
// console.log(database)

// Read Database
const readDatabase = (req, res) => {
    // const database = fs.readFileSync('./user.js')
    return (database);
}


// // Write to database
const writeDatabase = (data) => {
    // fs.writeFileSync('./user.js', (data, null, 2))
    // console.log(data)
    // return (data)
    let all = database.staff.push(data)
    return (all)
}


// GET all Staff in the database - DISPLAYING ALL STAFF
// app.get("/staffs", (req, res) => {
//     const database = readDatabase()
//     if(database.length === 0) {
//         res.status(404).json({
//             message: "No users found"
//         })
//     } else {
//         res.status(200).json({
//             message: "OK",
//             data: database,
//             total: database.length
//         })
//         // res.send(users);
//     }
// })

app.get("/staffs", (req, res) =>{
    res.status(200).send(fuelStation)
})


// Get one staff - Identifying a particular Staff Credentials
app.get('/users/:id', (req, res) => {
    const database = readDatabase()
    const userid = parseInt(req.params.id);
    const users = database.staff.find(user => user.id === userid)
    if(!users) {
        res.status(404).json({
            message: "User not found"
        })
    } else {
        res.status(200).json({
            message: "success",
            data: users
        })
    }
})


// Creating a new user - STAFF REGISTRATION 
app.post('/users', (req, res) => {
    const database = readDatabase();
    const newStaff = req.body;
    newStaff.id = database.staff.length + 1;
    database.staff.push(newStaff);
    writeDatabase(database);
    res.status(201).json({
        newData: newStaff
    })

    // second method
    // const { name, age } = req.body;
    // newUserid = database.users.length + 1;
    // newUser = {
    //     id: newUserid,
    //     name,
    //     age
    // }

    // database.users.push(newUser);
    // writedatabase(database);
    // res.status(201).json({
    //     newData: newUser
    // })
})


// set the port
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
});