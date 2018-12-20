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



function liriThis(term1, term2) {



    if (term1 === "spotify-this-song") {

        if (term2 === "") {
            console.log("The node command: spotify-this-song requires a track name as the second argument.  Ace of Base is default");
            term2 = "The Sign";
            liriThis(term1, term2);
        } else {
            spotify.search({
                type: "track",
                query: term2
            }, function (err, data) {
                if (err) {
                    console.log(err);

                } else if (term2 === "The Sign") {

                    for (var j = 0; j < data.tracks.items.length; j++) {

                        var artist = JSON.stringify(data.tracks.items[j].album.artists[0].name);
                        var art = artist.replace(/ /g, "");


                        if (art === JSON.stringify("AceofBase")) {

                            var album = JSON.stringify(data.tracks.items[j].album.name);
                            var trackName = JSON.stringify(data.tracks.items[j].name);
                            var trackData = [
                                "Artist: " + artist,
                                "Track: " + trackName,
                                "Album: " + album

                            ].join("\n\n");
                            console.log("\n===========\n" + trackData + "\n=========\n");
                            var logString = term1 + ": \n\n";
                            fs.appendFile("log.txt", logString + trackData + divider, function (err) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log("\nlog.txt done");
                                }
                            })
                        }
                    }
                } else {

                    var artist = JSON.stringify(data.tracks.items[0].album.artists[0].name);
                    var album = JSON.stringify(data.tracks.items[0].album.name);
                    var trackName = JSON.stringify(data.tracks.items[0].name);
                    var trackData = [
                        "Artist: " + artist,
                        "Track: " + trackName,
                        "Album: " + album

                    ].join("\n\n");
                    
                    var logString = term1 + ": \n\n";
                    fs.appendFile("log.txt", logString + trackData + divider, function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("log.txt done");
                        }
                    })
                }
            });
        }
    }

    if (term1 === "movie-this") {

        if (term2 === "") {
            console.log("Please add a movie to the 'movie-this' node command");
        } else {
            var queryUrl = "http://www.omdbapi.com/?t=" + term2 + "&y=&plot=short&apikey=trilogy";
            axios.get(queryUrl).then(function (response) {


                if (response.data.Response === "False") {
                    console.log(response.data.Error);
                } else {

                    var movieData = [
                        "Title: " + JSON.stringify(response.data.Title),
                        "Year released: " + JSON.stringify(response.data.Released),
                        "Plot: " + JSON.stringify(response.data.Plot),
                        "Actors: " + JSON.stringify(response.data.Actors),
                        "Language: " + JSON.stringify(response.data.Language),
                        "Country: " + JSON.stringify(response.data.Country),
                        "IMDB rating: " + JSON.stringify(response.data.imdbRating),
                        "Rotten Tomatoes rating: " + JSON.stringify(response.data.Ratings[1].Value)
                    ].join("\n\n");
                    console.log("\n===========\n" + movieData + "\n=========\n");
                    var logString = term1 + ": \n\n";
                    fs.appendFile("log.txt", logString + movieData + divider, function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("log.text done");
                        }
                    });
                }
            })
        }

    }
 
    if (term1 === "concert-this") {
        console.log("querystring1 second: " + queryString1);

        if (queryString1 === "") {
            console.log("You must enter in a band or artist name for 'concert-this' command to work");
        } else {
            var concertThis = "https://rest.bandsintown.com/artists/" + queryString1 + "/events?app_id=codingbootcamp";

            

            axios.get(concertThis).then(function (response) {
                
                var respArr = [];


                if (response.data.length === 0) {
                    console.log("No upcoming events for " + queryString1);
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

                            var logString = term1 + ": \n\n";

                            console.log("\n===========\n" + concertVenue + "\n=========\n");

                            fs.appendFile("log.txt", logString + concertVenue+ divider, function(err){
                                if(err) {
                                    console.log(err);
                                }
                                else
                                {
                                    console.log("log.txt done");
                                }
                            })
                        }

                    }
                    if (respArr.length === 0) {
                        console.log("no Colorado shows for " + queryString);
                    } else {
                        console.log("======================");
                        
                    }

                }
            })
        }

    }

    if (term1 === "do-what-it-says") {
        fs.readFile("random.txt", "utf8", function (err, data) {
            if (err) {
                console.log(err);
            } else {
                
                var array1 = data.split(",");
                var t1 = array1[0].trim();
                var t2 = array1[1].trim().replace(/"/g, "");
                queryString1 = t2;
                liriThis(t1, t2);
            }
        })
    }
}

if (userInput.length < 3) {
    console.log("You must enter in a liri command to run this node application.");
} else {
    liriThis(appSearch, queryString);
}