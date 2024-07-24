const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [{ user: "Rohith", pass: "hello890" }, { user: "Vishnu", pass: "hi34314" }]

const isValid = (username) => { //returns boolean
    if (username.length > 4) {
        return true
    }
    else {
        return false
    }

}

const authenticatedUser = (username, password) => { //returns boolean
    //write code to check if username and password match the one we have in records.
    for (const i of users)
    {
        if (i.user == username && i.pass == password)
        {
            return true
        }
    }
    return false
}

//only registered users can login
regd_users.post("/login", (req, res) =>
{
    const obj = {
        "name" : req.body.username,
        "pwd" : req.body.password
    }

    req.session.usrname = req.body.username

    //Write your code here
    let accessToken = jwt.sign({
        data: obj
    }, 'access', { expiresIn: 60 * 60 });
    // Store access token in session
    
    req.session.authorization = {
        accessToken
    }
    return res.status(200).send("User successfully logged in");
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) =>
{
    const {revContent} = req.query

    console.log(req.session.usrname);
    console.log(revContent);
     
    const usrMapRev = {
        "name" : req.session.usrname,
        "rev" : revContent
    }

    // usrMapRev = JSON.stringify(usrMapRev)
    
    const isbn = req.params.isbn

    console.log(isbn );
    

    for(const i of books[isbn]["reviews"])
    {
        if( i["name"] == req.session.usrname)
        {
            i.rev = revContent
            return res.json({"Successfully Edited" : "Edited your review"})
        }
    }
    books[isbn]["reviews"].push(usrMapRev)
    return res.json({"Successfully Added" : "Added your review"})
});


regd_users.delete("/auth/review/:isbn", (req, res) =>
{
    const isbn = req.params.isbn
    let j = -1

    for(const i of books[isbn]["reviews"])
    {
        j += 1
        if( i["name"] == req.session.usrname)
        {
            books[isbn]["reviews"].splice(j,1)
            return res.json({"Successfully Deleted" : "Deleted your review"})
        }
    }
    return res.json({"Error" : "Failed to delete"})
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
