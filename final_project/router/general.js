const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => 
{
    const usr = req.body.username
    const psw = req.body.password

    // console.log(typeof (usr))

    if( usr.length < 4 ){
        return res.json({error: "The username must contain atleast 4 digits"})
    }

    if( psw.length < 8 ){
        return res.json({error: "The password must contain atleast 8 digits"})
    }

    for(const i of users){
      console.log(i);
      console.log(i.user);

        if(i.user == usr){
            return res.json({error: "The username already exist"})
        }
    }

    let obj = {
        username : usr,
        password : psw
    }

    // obj = JSON.stringify(obj)

    users.push(obj)
    console.log(users);

    return res.json({"SUCCESS" : `Your Username and password has been registered ${usr} ` })
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    // console.log(books);
    return res.status(300).json({message: books});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  let par = req.params.isbn
  par = Number(par)  
  return res.status(300).json(books[par]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) 
{
    let par = req.params.author
    // let len = Object.keys(books).length

    // console.log(par);

    for (const key in books) 
    {
        // console.log(books[key]["author"]);   
        if(books[key]["author"] == par)
        {
            return res.status(300).json(books[key])
        }
    }

    return res.json({error: "No author found"})
    
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) 
{
    let a = req.params.title

    for( const key in books){
        if(books[key]["title"] == a)
        {
            return res.json(books[key])
        }
    }

    return res.json({error: "No Title found"})
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) 
{
    let b = req.params.isbn

    for(const key in books){
        if(key == Number(b))
        {
            return res.json(books[key]["reviews"])
        }
    }
    return res.json({error: "No Title found"})
});

module.exports.general = public_users;
