const express = require('express')
var bodyParser = require('body-parser');
var mysql = require('mysql');
const app = express()
const port = process.env.port || 3001;
var Date = require("./DateTime")


let config = {
    dateStrings: [
        'DATE',
        'DATETIME'
    ]
};

var con = mysql.createConnection({
    host: "localhost",
    user: "eamuser",
    password: "EAM1EAM2eam#eam$",
    database: "ypakp",
    dateStrings: true,
});

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }))

// CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Appointment Route
app.get('/api/appointment/:year-:month-:day', (req, res) => 
{
    // Generate up to 9 random appointment times
    var unavailableCount = Math.floor( Math.random()*9) + 1;
    var unavailable = [];
    for (let index = 0; index < unavailableCount; index++)
    {
        var appTime = {
            hour: Math.floor(Math.random()*9+8),
            minute: Math.floor(Math.random()*2)*30
        }
        var push = true;
        if( unavailable.length > 0)
            unavailable.forEach(element => {
                if( element.hour === appTime.hour && element.minute === appTime.minute )
                    push = false;
            });
        
        if(push)
            unavailable.push(appTime);
    }

    res.json(unavailable);
})

// Employee search Route
app.get("/api/get-employees/:employerafm/:searchquery", (req,res) =>
{
    con.query(  "SELECT employee.firstname, employee.lastname, employee.afm, employee.isAnastoli " + 
                "FROM user as employer, user as employee, company " + 
                "WHERE employer.afm = " + con.escape(req.params.employerafm) + " " +
                "AND employer.companyid = company.companyid " + 
                "AND employee.companyid = employer.companyid " + 
                "AND employee.roleid = 0 " + 
                "AND ( employee.firstname LIKE " + con.escape( req.params.searchquery + "%") + " " +
                       "OR employee.lastname LIKE " + con.escape( req.params.searchquery + "%") + " " +
                       "OR employee.afm LIKE " + con.escape( req.params.searchquery + "%") + ")", 
    function (error, result) {
        if(error) throw error;
        res.send(JSON.stringify(result));
    });
});


app.get("/api/getWorkschedule/:afm/:month-:year", (req, res) => 
{
    con.query(  "SELECT workschedule.date,workschedule.workdaytype " + 
                "FROM workschedule " + 
                "WHERE workschedule.afm = " + con.escape(req.params.afm) + " " +
                "AND YEAR(workschedule.date) = " + con.escape(req.params.year) + " " +
                "AND MONTH(workschedule.date) = " + con.escape(req.params.month),
    function(error, result) {
        if(error) throw error;
        
        res.status(200);
        res.send(JSON.stringify(result));
    } )
});

app.get("/api/getuserdata/:afm", (req, res) =>
{

    con.query(  "SELECT user.firstname, user.lastname, user.email, user.tel, user.roleid, company.companyname " +
                "FROM user, company " + 
                "WHERE user.afm = " + con.escape(req.params.afm) + " " +
                "AND company.companyid = user.companyid",
    function(error, result) {
        if(error) throw error;
        res.status(200);
        res.send(JSON.stringify(result[0]));
    })
})

app.post('/api/register', (req, res) => 
{
    var fname = req.body.fname;
    var lname = req.body.lname;
    var afm = req.body.afm;
    var role = req.body.role;
    var email = req.body.email;
    var tel = req.body.tel;
    var cname = req.body.companyname;

    con.query("SELECT afm FROM user WHERE user.afm = " + con.escape(afm), function(error, result) {
        if(error) throw error;
        // If afm doesnt exist in dbm  
        if( result.length === 0)
            con.query("SELECT companyid FROM company WHERE company.companyname = " + con.escape(cname) + "", function(error, result) {
                if(error) throw error;

                // If company doesn't exist:
                if( result.length === 0 )
                {
                    // register company to DB
                    con.query("INSERT INTO company(companyname) VALUES (" + con.escape(cname) + ")", function(error, result2) {
                        if(error) throw error;
                        
                        // Then register employer/employee to user DB
                        con.query("INSERT INTO user(firstname,lastname,afm,roleid,email,tel,companyid) VALUES (" + con.escape(fname) + "," + con.escape(lname) + "," + con.escape(afm) + "," + con.escape(role) + "," + con.escape(email) + "," + con.escape(tel) + "," + result2.insertId + ")", function(error) {
                            if(error) throw error;
                            
                            res.sendStatus(200);
                        });
                    });
                }
                else
                    if( role === "1" )
                    {                
                        // If role is employer:
                        con.query("SELECT COUNT(*) as res FROM user WHERE companyid = " + result[0].companyid + " AND roleid = 1", function(error, result2) {
                            if(error) throw error;

                            if( result2[0].res === 0 )
                            {
                                // Company has no employer, insert dude
                                con.query("INSERT INTO user(firstname,lastname,afm,roleid,email,tel,companyid) VALUES (" + con.escape(fname) + "," + con.escape(lname) + "," + con.escape(afm) + "," + con.escape(role) + "," + con.escape(email) + "," + con.escape(tel) + "," + result[0].companyid + ")", function(error) {
                                    if(error) throw error;
                                    res.sendStatus(200);
                                });
                            }
                            else
                            {
                                res.status(401);
                                res.send(JSON.stringify({error: 1}));
                            }

                        });
                    }
                    else
                    {
                        // If role is employee insert user:
                        con.query("INSERT INTO user(firstname,lastname,afm,roleid,email,tel,companyid) VALUES (" + con.escape(fname) + "," + con.escape(lname) + "," + con.escape(afm) + "," + con.escape(role) + "," + con.escape(email) + "," + con.escape(tel) + "," + result[0].companyid + ")", function(error) {
                            if(error) throw error;
                            res.sendStatus(200);

                        });            
                    }
            });
        else
        {
            res.status(401);
            res.send(JSON.stringify({error: 0}));
        }

    })

});

app.post('/api/login', (req, res) => 
{
    var fname = req.body.fname;
    var lname = req.body.lname;
    var afm = req.body.afm;

    con.query("SELECT user.roleid as res FROM user WHERE firstname = " + con.escape(fname) + " and lastname = " + con.escape(lname) + " and afm = " + con.escape(afm), function(error, result) {
        if(error) throw error;
        if(result.length > 0 )
        {
            res.status(200);
            res.send(JSON.stringify({role: result[0].res}));
        }
        else 
            res.sendStatus(401);

    });
});


app.post('/api/anastoliToggle/:employeeafm', (req, res) => 
{
    var afm = req.params.employeeafm;

    con.query("SELECT user.isAnastoli FROM user WHERE afm =" + con.escape(afm), function (error,result) {
        if(error) throw error;

        var newVal = 0
        if( result[0].isAnastoli === 0 )
            newVal = 1

        con.query("UPDATE user SET user.isAnastoli = " + con.escape(newVal) + " WHERE afm = " + con.escape(afm), function (error,result){
            if( error) throw error;
            res.sendStatus(200);
        })
    })
});


app.post("/api/updateWorkschedule/:afm/:startyear-:startmonth-:startday/:endyear-:endmonth-:endday/:scheduletype", (req, res) => {
    var startDate = new Date(Number(req.params.startday), Number(req.params.startmonth), Number(req.params.startyear))
    var endDate = new Date(Number(req.params.endday), Number(req.params.endmonth), Number(req.params.endyear))

    var sqlQuery = "REPLACE INTO workschedule(date,afm,workdaytype) VALUES ";
    var sqlVals = "";
    var comma = "";

    while( startDate.daysBetween(endDate) >= 0 )
    {
        sqlVals = comma + "('" + startDate.year + "/" + startDate.month + "/" + startDate.day + "'," + req.params.afm + "," + req.params.scheduletype + ")"

        sqlQuery += sqlVals
        startDate.incrementDay();
        comma = ","

    }

    con.query(sqlQuery, function (error,result) {
        if(error) throw error;
        res.sendStatus(200);
    })

});

app.post("/api/setuserdata/:afm/:mail/:tel/:roleid", (req,res) => {
    
    con.query(  "UPDATE user SET user.email = " + con.escape(req.params.mail) + ", user.tel = " + con.escape(req.params.tel) + ", user.roleid = " + con.escape(req.params.roleid) +
                "WHERE user.afm = " + con.escape(req.params.afm), function(error, result) {
                    if(error) throw error;
                    res.sendStatus(200);
                })
})


app.listen(port, () => console.log(`Application listening on port ${port}`))