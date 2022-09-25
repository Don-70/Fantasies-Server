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

const poemsSchema = new mongoose.Schema({
    name: String,
    content: String,
    author: String,
    user: String,
}, {timestamps: true})

const Poems = mongoose.model('Poems', poemsSchema);

//IDUCE

app.get('/api/poems', async (req, res) => {
    try {
        res.status(200).json(await Poems.find({}));
    } catch (error) {
        console.log(error);
        res.status(400).json({'error': 'bad request'});      
    }
});    

app.post('/api/poems', async (req, res) => {
    try {
        res.status(201).json(await Poems.create(req.body));
    } catch (error) {
        console.log(error);
        res.status(400).json({'error': 'bad request'});
    }
});

app.put('/api/poems/:id', async (req, res) => {
    try {
        res.status(200).json(await Poems.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ));
    } catch (error) {
        console.log(error);
        res.status(400).json({'error': 'bad request'});
    }
});

app.delete('/api/poems/:id', async (req, res) => {
    try {
        res.status(200).json(await Poems.findByIdAndDelete(
            req.params.id
        ));
    } catch (error) {
        console.log(error);
        res.status(400).json({'error': 'bad request'});
    }
});

app.listen(PORT, () => console.log(`Express is listening on PORT: ${PORT}`));