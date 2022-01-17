// var express = require('express');
// var session = require('express-session');


// var path = require('path');





// var app = express();
// app.use(session({
// 	secret: 'secret',
// 	resave: true,
// 	saveUninitialized: true
// }));
// app.use(bodyParser.urlencoded({extended : true}));
// app.use(bodyParser.json());

// app.use('/login', (req, res) => {
//     res.send({
//       token: 'test123'
//     });
//   });

// // app.post('/auth', function(request, response) {
// // 	var username = request.body.username;
// // 	var password = request.body.password;
// // 	if (username && password) {
// //         const user = await User.findOne({ where : {username: username, password: password}})
// //         if(user){
// //             request.session.loggedin = true;
// // 			request.session.username = username;
// //             //response.status(200).json({message: 'Welcome ' + username})
// // 			response.redirect('/home');
// //         } else {
// //             response.status(500).json({message: 'Incorrect username and/or password'});
// //         }	
// // 	} else {
// //         response.status(500).json({message: 'Please enter Username and Password!'})
// // 	}
// // });

// // app.get('/home', function(request, response) {
// // 	if (request.session.loggedin) {
// // 		response.send('Welcome back, ' + request.session.username + '!');
// // 	} else {
// // 		response.send('Please login to view this page!');
// // 	}
// // 	response.end();
// // });
const Sequelize = require('sequelize')
const express = require('express');
const cors = require('cors')
const app = express();
var bodyParser = require('body-parser');
const { response } = require('express');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'sample.db'
})

const User = sequelize.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING
})

const Note = sequelize.define('note', {
  title: Sequelize.STRING,
  owner: Sequelize.STRING
})

const Section = sequelize.define('section', {
  title: Sequelize.STRING,
  owner: Sequelize.STRING
})

Section.hasMany(Note)

app.use(cors());
app.use(bodyParser.json())


app.get('/sync', async(req, res)=>{
  try{
      await sequelize.sync({force: true})
      res.status(201).json({message: 'tables created'})
  } catch(err){
      console.warn(err)
      res.status(500).json({message: 'some error occured'})
  }
})

app.post('/login', async (req, res) => {
  console.log(req.body)
  try{
    const searchedUser = await User.findOne({where: {username : req.body.username}})
    if(searchedUser !== null){
      res.status(201).json({token: 'test123'})
    } else{
      res.status(500).json({message: 'invalid credentials'})
    }
  } catch (err){
    console.warn(err)
    res.status(500).json({message: 'some error occured'})
  }




  
  // res.send({
  //   token: 'test123'
  // });
});

app.post('/register', async (req, res) =>{
  try{
    const searchedUser = await User.findOne({where: {username : req.body.username}})
    if(searchedUser == null){
      const user = req.body
      await User.create(user)
      res.status(201).json({token: 'test123'})
    }
    else{
      res.status(501).json({message: 'user already exists'})
    }
    
  } catch(err){
    console.warn(err)
    res.status(500).json({message: 'some error occured'})
  }
});

app.get('/sections', async(req, res)=>{
  try{
      const sections = await Section.findAll()
      res.status(201).json(sections)
  } catch(err){
      console.warn(err)
      res.status(500).json({message: 'some error occured'})
  }
})
app.post('/sections', async(req, res)=>{
  try{
      // console.log(req)
      const section = req.body
      // console.log(section)
      await Section.create(section)
      res.status(201).json({message: 'created'})
  } catch(err){
      console.warn(err)
      res.status(500).json({message: 'some error occured'})
  }
})
app.get('/sections/:title', async(req, res)=>{
  try{
      const section = await Section.findOne(
        {where: {title : req.params.title}}
      )
      if(section){
        res.status(201).json(section)
      }
      res.status(404).json({message: "not found"})
  } catch(err){
      console.warn(err)
      res.status(500).json({message: 'some error occured'})
  }
})
app.delete('/sections/:title', async(req, res)=>{
  try{
      const section = await Section.findOne(
        {where: {title : req.params.title}}
      )
      if(section){
        await section.destroy();
        res.status(200).json({message:"deleted"})
      }
      res.status(404).json({message: "not found"})
  } catch(err){
      console.warn(err)
      res.status(500).json({message: 'some error occured'})
  }
})
app.put('/sections/:title', async(req, res)=>{
  try{
      const section = await Section.findOne(
        {where: {title : req.params.title}}
      )
      if(section){
        await section.update(req.body, {
          fields: ['title']
        });
        res.status(200).json(section)
      }
      res.status(404).json({message: "not found"})
  } catch(err){
      console.warn(err)
      res.status(500).json({message: 'some error occured'})
  }
})

app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));