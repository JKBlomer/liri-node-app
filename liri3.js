require("dotenv").config();
var axios = require("axios");
var moment = require("moment");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var fs = require("fs");

var spotify = new Spotify(keys.spotify);
var divider = "\n\n=========================\n\n";



var userInput = process.argv;

var appSearch = process.argv[2];
var queryString = "";
var queryString1 = "";
for (var i = 3; i < userInput.length; i++) {
    queryString += userInput[i] + " ";
    queryString1 += userInput[i];
}


if (appSearch === "spotify-this-song") {
    spotify.search({
            type: "track",
            query: "The Sign"
        }, function (err, data) {
            if (err) {
                console.log(err);
            }

            // console.log(JSON.stringify(data.tracks.length));
            console.log(data.tracks.items.length);
            
            for (var j = 0; j < data.tracks.items.length; j++) {
                console.log("someting");
               

                var artist = JSON.stringify(data.tracks.items[j].album.artists[0].name);
                var art = artist.replace(/ /g, "");
                
                console.log("artist: " + art);
                if(art===JSON.stringify("AceofBase")) {
                    console.log("ace of base found");
                }
               
                var album = JSON.stringify(data.tracks.items[j].album.name);
                var trackName = JSON.stringify(data.tracks.items[j].name);
                var trackData = [
                    "Artist: " + artist,
                    "Track: " + trackName,
                    "Album: " + album

                ].join("\n\n");
                fs.appendFile("myText.txt", trackData + divider, function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("my text good !!");
                    }
                })
                }
            });
    }

    if (appSearch === "movie-this") {

        var queryUrl = "http://www.omdbapi.com/?t=" + queryString + "&y=&plot=short&apikey=trilogy";
        axios.get(queryUrl).then(function (response) {
            console.log("resp:" + JSON.stringify(response.data));
            fs.appendFile("secondText.txt", JSON.stringify(response.data) + divider, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("second text good");
                }
            });
        })
    }

    if (appSearch === "do-what-it-says") {
        fs.readFile("random.txt", "utf8", function (err, data) {
            if (err) {
                console.log(err);
            } else {
                console.log(data.split(","));
            }
        })
    }

    if (appSearch === "concert-this") {

        var concertThis = "https://rest.bandsintown.com/artists/" + queryString1 + "/events?app_id=codingbootcamp";

        console.log(concertThis);

        axios.get(concertThis).then(function (response) {
            console.log(response.data);
            var respArr = [];


            if (response.data.length === 0) {
                console.log("No upcoming events for " + queryString);
                return false;
            } else {
                for (var i = 0; i < response.data.length; i++) {


                    if (response.data[i].venue.region === "CO") {
                        respArr.push(response.data[i].venue);
                        var concertVenue = [
                            "Datetime: " + moment(response.data[i].datetime.slice(0, 10)).format("MM/DD/YYYY"),
                            "Venue: " + response.data[i].venue.name,
                            "City: " + response.data[i].venue.city
                        ].join("\n\n");

                        console.log(concertVenue);
                        console.log("==========================");
                    }

                }
                if (respArr.length === 0) {
                    console.log("no Colorado shows for " + queryString);
                } else {
                    console.log("======================");
                    // console.log(respArr);
                }

            }
        })
    }