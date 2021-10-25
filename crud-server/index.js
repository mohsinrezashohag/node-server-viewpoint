const express = require("express")
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
port = 5000;


const uri = "mongodb+srv://firstdb:77Xi3ElpGmZ1Ay70@cluster0.g008r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


app.get('/', (req, res) => {
    res.send("cholche")
})

// mongo activities

client.connect(err => {
    const usersCollection = client.db("foodMaster").collection("users");


    // creating the data
    app.post('/addUser', async (req, res) => {
        // console.log(req.body);
        const result = await usersCollection.insertOne(req.body)
        console.log(result);
    })

    // getting and showing the data on website front page
    app.get('/users', async (req, res) => {
        const result = await usersCollection.find({}).toArray();
        // console.log(result);
        res.send(result)

    })


    // deleting item

    app.delete('/deleteUser/:id', async (req, res) => {
        // console.log(req.params);
        const id = req.params.id;
        const result = await usersCollection.deleteOne({ _id: (ObjectId(id)) })
        res.send(result.acknowledged);
    })

    // client.close();
});













app.listen(port, () => {
    console.log("listening to : ", port);
})