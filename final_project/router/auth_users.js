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
  for (const i of users) {
    if (i.user == username && i.pass == password) 
    { 
        let accessToken = jwt.sign({
        data: i
        } , 'access', { expiresIn: 60 * 60 });
      

        req.session.authorization = {accessToken}
        return true
    }
  }

  return false
}

//only registered users can login
regd_users.post("/login", (req, res) => {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
