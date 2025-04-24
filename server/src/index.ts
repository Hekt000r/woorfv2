/***************
 * Index.ts 
 * Handles all core logic for the Express server
 ***************/

/* Imports */

const express = require(`express`)
const fs = require(`fs`)

/* Variables */

const config = JSON.parse(fs.readFileSync(`./express-config.json`))
const port = config.port

/* Fetching Categories */

