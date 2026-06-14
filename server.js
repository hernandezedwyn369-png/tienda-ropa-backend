const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.log(err));

const Prenda = mongoose.model('Prenda',{
    nombre:String,
    categoria:String,
    talla:String,
    precio:Number,
    stock:Number,
    imagen:String
});

app.get('/prendas', async(req,res)=>{
    const prendas = await Prenda.find();
    res.json(prendas);
});

app.post('/prendas', async(req,res)=>{
    const nuevaPrenda = new Prenda(req.body);
    await nuevaPrenda.save();
    res.json(nuevaPrenda);
});

app.listen(process.env.PORT,()=>{
    console.log(`Servidor activo en puerto ${process.env.PORT}`);
});