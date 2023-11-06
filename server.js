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