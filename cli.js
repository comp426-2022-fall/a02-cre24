#!/usr/bin/env node

import minimist from "minimist";
import moment from "moment-timezone";
import fetch from "node-fetch";


const arg = minimist(process.argv.slice(2));

// Obtain Timezone
var timezone = moment.tz.guess()

//Initialize longitude and latitude
var longitude;
var latitude;

//Implement timezone and coordinates here
if (arg.n) {
	latitude = arg.n;
}

if (arg.e) {
	longitude = arg.e;
}

if (arg.s) {
	latitude = arg.s * -1;
}

if (arg.w) {
	longitude = arg.w * -1
}

if (arg.t) {
	timezone = arg.t;
}
timezone.replace("/", "%2");

// Check for out of range coordinates
if(!longitude) {
	console.log("Longitude must be in range");
	process.exit(0);
} else if (!latitude) {
	console.log("Latitude must be in range");
	process.exit(0);
}


// Request to api
const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude='+ String(latitude) + '&longitude='+ String(longitude) + '&daily=precipitation_hours&timezone='+ timezone);

// Data inputed from request
const data = await response.json();

// Manipulate data from json
if (arg.j) {
	console.log(data);
	process.exit(0);
}

// Code relating to the day variable
const day = arg.d;

// Conditional determing what to output based on the data on the day
if (data.daily.precipitation_hours[day] == 0) {
    console.log('You will not need your galoshes')
} else {
		console.log('You might need your galoshes')
}

if (day == 0){
	console.log(" today.")
} else if (day > 1) {
	console.log(" in " + day + " days.")
} else {
	console.log(" tomorrow.")
}
process.exit(0);