const express = require('express')
var app = express()
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

app.use(express.json()) //Lets our app use JSON from the body that gets pased to it from request


const posts = [
    {
        username : 'Ashesh',
        title: 'Post 1'
    },
    {
        username : 'Neha',
        title: 'Post 2'
    }
]

const users = [
    
]

app.get('/users',function(req,res){
    res.json(users)
})

app.post('/users',async(req,res) =>
{   

    try{
        // const salt = await bcrypt.genSalt()
        // const hashedPassword = await bcrypt.hash(req.body.password,salt)

        const hashedPassword = await bcrypt.hash(req.body.password,10)
        //console.log(salt)
        console.log(hashedPassword)

        const user = {
            name : req.body.name,
            password : hashedPassword
        }
    
        users.push(user)
        res.sendStatus(201).send('User Created')
    }
        catch{
            res.status(500).send()
        }
    
    

})

app.post('/users/login',async (req,res)=>{
    const user = users.find(user => user.name = req.body.name)
    if(user==null)
    {
        return res.status(400).send('Cannot find user')
    }

    try{
        if(await bcrypt.compare(req.body.password,user.password))
        {
            res.send("Success!!")
        }

        else
        {
            res.send("Not Allowed")
        }

    }
    catch{
        res.status(500).send()
    }

})


app.get('/posts',function(req,res){
    res.json(posts)
})

app.post('/login',function(req,res){
    //Authenticate User

    const username = req.body.username

})

app.listen('3000',function(){
    console.log('Listening on port 3000')
})