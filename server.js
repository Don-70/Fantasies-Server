const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
require('dotenv').config();
const { PORT = 4000, DATABASSE_URL } = process.env;

mongoose.connect(DATABASSE_URL);
mongoose.connection
    .on('open', () => console.log('You are connected to mongoose'))
    .on('close', () => console.log('You are disconnected from mongoose'))
    .on('error', (error) => console.log(error.message));

const poemSchema = new mongoose.Schema({
    name: String,
    author: String,
    user: String,
}, {timestamps: true})

const Poem = mongoose.model('Poem', poemSchema);

//IDUCE

app.get('/api/poem', async (req, res) => {
    try {
        res.status(200).json(await Poem.find({}));
    } catch (error) {
        console.log(error);
        res.status(400).json({'error': 'bad request'});      
    }
});    

app.listen(PORT, () => console.log(`Express is listening on PORT: ${PORT}`));