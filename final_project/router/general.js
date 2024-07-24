const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require("axios")



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


public_users.get("/books", function(req,res)
{
    return res.json(books)
})

// Get the book list available in the shop
public_users.get('/',async function(req, res) {
    
    // return res.status(300).json({message: books});

    //  Using Axios

    const a = await axios.get("http://localhost:5000/books")
    console.log(a.data)

    return res.json({message : a.data})

});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
  let par = req.params.isbn
  par = Number(par)  
  const a = await axios.get("http://localhost:5000/books")
  return res.json(a.data[par])
 });
  

// Get book details based on author
public_users.get('/author/:author', async function (req, res) 
{
    let par = req.params.author
    const a = await axios.get("http://localhost:5000/books")

    for (const key in books) 
    {
        // console.log(books[key]["author"]);   
        if(a.data[key]["author"] == par)
        {
            return res.status(300).json(a.data[key])
        }
    }
    return res.json({error: "No author found"})   
});

// Get all books based on title
public_users.get('/title/:title', async function (req, res) 
{
    let a = req.params.title

    const b = await axios.get("http://localhost:5000/books")

    for( const key in b.data){
        if(b.data[key]["title"] == a)
        {
            return res.json(b.data[key])
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
