const express = require("express");
const path = require("path");
const app = express();
//const hbs = require("hbs");
var expressLayouts = require("express-ejs-layouts")

require("./db/connection");
const Register = require("./models/registers");

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("views", path.join(__dirname,'../views'));
//console.log(path.join(__dirname,'./models/registers'))
//app.set("view engine", "hbs")
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", path.join(__dirname,'../views/layouts/layout'));

//hbs.registerPartials(path.join(__dirname,'../templates/partials'))


app.get("/", (req, res) => {
    res.render("index")
});

app.get("/index", (req, res) => {
    res.render("index")
});

app.get("/student_registration", (req,res) => {
    res.render("student_registration")
})

app.post("/student_registration", async (req,res) => {
    try{
        const newUser = new Register({
            Roll: req.body.roll,
            Name: req.body.name,
            Dob: req.body.dob,
            Score: req.body.score
        });

        const registered = await newUser.save();
        res.render("index");

    }catch(error){
        res.status(400).send(error);
    }
})

app.get("/login", (req, res) => {
    res.render("login")
});

app.post("/login", async(req,res) => {
    try {
        const roll = req.body.roll;
        const dob = req.body.dob;
        const userRoll = await Register.findOne({Roll:roll});

        if(userRoll.Dob == dob ){
            res.status(201).render("result", {user: userRoll});
        }else{
            res.send("Invalid Details!");
        }
        
    } catch (error) {
        res.status(400).send("Invalid Details!");
    }
})

app.get("/teacher_login", (req, res) => {
    res.render("teacher_login");
});

app.post("/teacher_login", async(req,res) =>{
    if(req.body.password == "admin"){
        res.redirect("/all_record");
    }else{
        res.render("teacher_login", {error: "Please enter correct password!"});
    }
    
} )
app.get("/all_record", async(req, res) => {
    const allStudents = await Register.find()
    res.status(201).render("all_record", {student : allStudents});
});


app.get("/add", (req, res) => {
    res.render("add")
});

app.post("/add", async(req, res) => {
    try{
        const Student = new Register({
            Roll: req.body.roll,
            Name: req.body.name,
            Dob: req.body.dob,
            Score: req.body.score
        })

        const added = await Student.save();
        res.redirect("/all_record");

    }catch{
        res.send("Error!");
    }
});

app.get("/edit/:id", async (req, res) => {
    const user = await Register.findById(req.params.id);
    //console.log(edit)
    res.render("edit", {user: user});

});

app.post("/edit/:id", async (req, res) => {

        await Register.findByIdAndUpdate( req.params.id,req.body, (err) =>{
            if(err){
                console.log(err);
            }
            res.redirect("/all_record");
        });
        //res.redirect("/all_record");
});

app.get("/add", (req, res) => {
    res.render("add")
});

app.get("/delete/:id", async (req, res) => {
    await Register.findByIdAndDelete(req.params.id)
    res.redirect("/all_record")
});


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
