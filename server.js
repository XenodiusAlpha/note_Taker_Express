// declared variables for importing dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const {v4: uuid} = require('uuid');

// assigning port to use for node server
const PORT = process.env.PORT || 3001;

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static('public'));

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) =>
    fs.readFile('./db/db.json', (err, data) => 
        err ? console.log('error') : res.json(JSON.parse(data))
    )
);

// adding note
app.post('/api/notes', (req, res) =>
    fs.readFile('./db/db.json',  (err, data) =>
        {
            if(err) {
                console.log('error');
            } else {
                let dataDB = JSON.parse(data);
                const {title, text} = req.body;
                const newData = {
                    id: uuid(),
                    title: title,
                    text: text
                };

                dataDB.push(newData);
                fs.writeFile('./db/db.json', JSON.stringify(dataDB), (err) =>
                    err ? console.log('error') : res.json('Notes have been saved.')  
                )
            }
        }
    )
);

// deleting by id
app.delete('/api/notes/:id', (req, res) =>
    fs.readFile('./db/db.json',  (err, data) =>
        {
            if(err) {
                console.log('error');
            } else {
                let dataDBJson = JSON.parse(data);
                const {id} = req.params;
                dataDBJson = dataDBJson.filter((d) => d.id !== id);
                fs.writeFileSync('./db/db.json', JSON.stringify(dataDBJson), (err) =>
                    err ? console.log('error') : res.json('Notes have been deleted.')
                )
                res.json(dataDBJson);
            }
        }
    )
)

app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);


app.listen(PORT, () => console.log(`Now Listening at ${PORT}`));