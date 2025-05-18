const validations = require("./server/server_validaiton.js")

const express = require("express")
const app = express()


const mysql = require("mysql2");
const jwt = require("jsonwebtoken"); // For cookies
const cookieparser = require('cookie-parser')


require("dotenv").config() 

try {
    
    pool = mysql.createPool({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    }).promise();process
    
    console.log('MySQL connection pool created successfully');
  } catch (error) {
    console.error('Error creating MySQL connection pool:', error);
  }

// Delete all rows from database
async function reset_db(){
    try {
        const conn = await pool.getConnection(); // is a promis obj but since inside async function, conn its a connection obj
        await conn.query("DELETE FROM users");
        conn.release();
        console.log("Database deleted")
    } catch (err) {
        console.error("Failed to reset database:", err)
    }
}
//reset_db()

app.set("view engine", "ejs")
app.use(express.urlencoded({extended: false})) // allow the access of value in app.post() by user
app.use(express.static("public")) //Acces the public folder
app.use(cookieparser())



//Middleware 
app.use(function (req, res, next) {
    res.locals.errors = []

    // try to decode incoming cookies
    try {
        const decoded = jwt.verify(req.cookies.SimpleValidationApp, process.env.JWT_SECRET)
        req.user = decoded
    } catch(err) {
        req.user = false
    }
    next()
});

//---------------
// app.get() are routs
app.get("/homepage/:param?", (req, res) => {
    
    const param = req.params.param;
    if (param == "true") {
        if (req.cookies.SimpleValidationApp) { //Check if cookie exist
            if (req.user) {
                res.render("homepage", {
                    message: `${req.user.username}, click login to enter your page`
                })
            }
        } else {
            res.render("homepage", {
                message: ''
            })
        }
        

    } else {
        if (req.user) {
            res.render("userPage", {
                username: req.user.username
            })
        } else {
            res.render("homepage", {
                message: ''
            })
        }
    }
})

app.get("/login", (req, res) => {
    if (req.user) {
        res.render("userPage", {
            username: req.user.username
        })
    } else {
        res.render("login")
    }
})

app.get("/signup", (req, res) => {
    res.render("signup")
})

app.get("/userPage", (req, res) => {  
    res.render("userPage")
})

app.get("/logout", (req, res) => {
    res.clearCookie("SimpleValidationApp", {
        path: "/",
        httpOnly: true,
        secure: false // cookie will be deleted for http sites
    });

    res.render("homepage", {
        message: ''
    })
})


pool.getConnection().then(database => {
    validations.signup_validation(app, database)
    validations.login_validation(app, database)
})

const port = process.env.PORT || 4000;
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
  });