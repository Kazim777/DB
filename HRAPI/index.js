// import e from "cors";
// import { Pool } from "pg";


// const express = require('express');
// const cors = require('cors');
// const Pool = require('./db');
// require('dotenv').config();


// const app = express();
// app.use =


// app.get('/',async(req,res)=>{
// try{
// res.json('Welcome To HR API');
// }
// catch(arr){
//   res.status(500).json({Error:err.message});
// }
// });
// app.get('/country',async(req,res)=>{

//     try{
//         const result = await pool.query('select * from countries')
// res.json(result.rows);
//     }
//     catch(err){
//        res.status(500).json({Error:err.message});
//     }
// }
// app.get('/regions',async(req,res)=>{

//     try{
//         const result = await pool.query('select * from regions')
//         res.json(result.rows);
//     }
//     catch(err){
//        res.status(500).json({Error:err.message});
//     }
// }
// )
// const app = express();

// app.use(cors());
// app.use(express.json());


// const PORT = process.env.PORT;
// app.listen(PORT,()=>{
//     console.log(`Connected Succesfully...on PORT ${PORT}`);
// });

// import cors from "cors";


// const express = require('express');
// const cors = require('cors');
// const pool = require('./db');  // Changed 'Pool' to 'pool' to match usage
// require('dotenv').config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.get('/', async (req, res) => {
//     try {
//         res.json('Welcome To HR API');
//     }
//     catch (err) {  // Fixed typo 'arr' to 'err'
//         res.status(500).json({ Error: err.message });
//     }
// });

// app.get('/country', async (req, res) => {
//     try {
//         const result = await pool.query('select * from countries');
//         res.json(result.rows);
//     }
//     catch (err) {
//         res.status(500).json({ Error: err.message });
//     }
// });

// app.get('/regions', async (req, res) => {
//     try {
//         const result = await pool.query('select * from regions');
//         res.json(result.rows);
//     }
//     catch (err) {
//         res.status(500).json({ Error: err.message });
//     }
// });

// const PORT = process.env.PORT;
// app.listen(PORT, () => {
//     console.log(`Connected Successfully...on PORT ${PORT}`);
// });

const express=require('express');
const cors=require('cors');
const pool=require('./db');
require('dotenv').config();

const app=express();
app.use(cors());
app.use(express.json());

// app.get('/', async(req,res))

const PORT= process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Connected Succesfully...${PORT}`);
});

app.get('/',async (req, res) => {
   try{
res.json('Welcome to HR API!')
   }catch(err){
    res.status(500).json({Error:err.message});
   }
  });

  app.get('/countries',async (req, res) => {
    try{
const result=await pool.query('select * from countries');
res.json(result.rows)
    }catch(err){
     res.status(500).json({Error:err.message});
    }
   });


   app.get('/regions',async (req, res) => {
    try{
const result=await pool.query('select * from regions');
res.json(result.rows)
    }catch(err){
     res.status(500).json({Error:err.message});
    }
   });

   app.get('/employeess',async (req, res) => {
    try{
const result=await pool.query('select COUNT(*) from employees ');
res.json(result.rows)
    }catch(err){
     res.status(500).json({Error:err.message});
    }
   });


   
   app.get('/employeess',async (req, res) => {
    try{
const result=await pool.query('select COUNT(*) from employees ');
res.json(result.rows)
    }catch(err){
     res.status(500).json({Error:err.message});
    }
   });