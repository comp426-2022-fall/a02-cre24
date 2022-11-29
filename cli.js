#!/usr/bin/env node

import minimist from "minimist";
import moment from "moment-timezone";
import fetch from "node-fetch";


const arg = minimist(process.argv.slice(2));

// Obtain Timezone
const timezone = moment.tz.guess()

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

// Request to api
const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude='+latitude+'&longitude='+longitude+'&daily=precipitation_hours&timezone='+timezone);

// Data inputed from request
const data = await response.json();

// Manipulate data from json
if (process.argv.indexOf('-j') > -1) {
	console.log(data);
	process.exit(0);
}

// Code relating to the day variable
const day = 1;

if (process.argv.indexOf('-d') > -1) {
	day = argv[process.argv.indexOf('-d') - 1];
}

// Conditional determing what to output based on the data on the day
if (day == 0) {
    if (data.daily.precipitation_hours[day] == 0) {
		console.log('You will not need your galoshes')
	} else {
		console.log('You might need your galoshes')
	}
    console.log(" today.")
    process.exit(0)
} else if (day > 1) {
    if (data.daily.precipitation_hours[day] == 0) {
		console.log('You will not need your galoshes')
	} else {
		console.log('You might need your galoshes')
	}
    console.log(" in " + day + " days.")
    process.exit(0)
} else {
    if (data.daily.precipitation_hours[day] == 0) {
		console.log('You will not need your galoshes')
	} else {
		console.log('You might need your galoshes')
	}
    console.log(" tomorrow.")
    process.exit(0)
}