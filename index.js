const express = require("express");
const app = express();
const mongoose = require("mongoose")
var fs = require('fs')
var csv = require('csv-parse')
const csvtojson = require("csvtojson");
const MeetingSchema = require('./model')

//write data

const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
    path: 'file.csv',
    header: [
        {id: 'fullName', title: 'NAME'},
        {id: 'position', title: 'POSITION'},
        {id: 'age', title: 'AGE'}
    ]
});

const records = [
    {fullName: 'Bob',  position: 'Manager',age:'24' },
    {fullName: 'Dee',  position: 'Programmer',age:'42' },
    {fullName: 'Kavi',  position: 'Accountant',age:'33' },
    {fullName: 'Bas',  position: 'Clerk',age:'27' },
    {fullName: 'Remo',  position: 'CEO',age:'39' }
];

csvWriter.writeRecords(records)       // returns a promise
    .then(() => {
        console.log();
    });

//read data

fs.createReadStream('file.csv')
.pipe(csv())
.on('data',function(data){
    console.log(data)
})
.on('end',function(data){
    console.log('Read finished')
})

// app.get('/',(req,res)=>{
// csvtojson()
//   .fromFile("file.csv")
//   .then(csvData => {
//     console.log(csvData)
//     res.send(csvData)
//   })

// })

app.get('/', (req, res) => {
  insertData(req, res)
})


// const meetings = fs.readFileSync(__dirname + '/file.csv', 'utf-8');
async function insertData(req, res) {
    try {
      const data = await csvtojson()
      .fromFile("file.csv");
        console.log("csvData", data)
     const answer = await MeetingSchema.insertMany(data);
      console.log('Done!');
      res.send(answer)
      process.exit();
    } catch(e) {
      console.log(e);z
      process.exit();
    }
  };



app.listen(3000,() => {
    console.log("server listening in port 3000")
})


mongoose.connect('mongodb+srv://user:MbvyVlIqk0xlPnZs@cluster0.uxdtw.mongodb.net/test', {
        useNewUrlParser: true , useFindAndModify: false, useUnifiedTopology: true, useCreateIndex: true, })
        .then(() => console.log("mongodb connected"))
        .catch(err => console.log(err));
