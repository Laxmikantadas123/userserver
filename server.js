const express = require("express")
const mongoose = require("mongoose")
const Model = require("./schema/models")

mongoose.connect("mongodb://localhost:27017/userDetails")
    .then(() => { console.log("database is connected"); })
const app = express()
app.use(express.json())

// ------------------post----------------

app.post("/users", async (req, res) => {
    const data = new Model(req.body)
    try {
        await data.save()
        res.status(201).send(data)
    } catch (e) {
        res.status(400).send(e)
    }
})

// ----------------------get--------------
app.get("/users", async (req, res) => {
    try {
        const data = await Model.find({})
        res.status(200).send(data)
    } catch (e) {
        res.status(400).send(e)
    }
})

// ----------------------get by id---------------

app.get("/users/:id", async (req, res) => {
    const _id = req.params.id
    try {
        const data = await Model.findById(_id)
        res.status(200).send(data)
    } catch (e) {
        res.status(404).send(e)
        console.log(e);
    }
})

// ------------------------udate----------


app.put("/users/:id", async (req, res) => {
    const _id = req.params.id
    const updates=Object.keys(req.body)
    const allowedupdates=["name","age","email","password","status"]
    const isValidoperation=updates.every((update)=>allowedupdates.includes(update))
    if(!isValidoperation){
        return res.status(400).send({error:"Invalid update"})
    }
    try {
        const data = await Model.findByIdAndUpdate(_id, req.body)
        res.status(200).send(data)
    } catch (e) {
        res.status(404).send(e)
    }
})
// ------------------------delete-------------------

app.delete("/users/:id", async (req, res) => {
    const _id = req.params.id
    try {
        const data = await Model.findByIdAndDelete(_id)
        res.status(200).send(data)
    } catch (e) {
             res.status.apply(404).send(e)
    }
})


app.listen(3000, () => {
    console.log("server is running in port 3000");

})