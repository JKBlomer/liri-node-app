# liri-node-app

<strong>Project Developer:</strong> <br/>Jessica Katelyn Blomer

<strong>Project Description:</strong> <br/>This project is called LIRI.  LIRI is a _Language_ Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data.<br/>


Please watch the video here:
https://youtu.be/26Vyvv7dRSM
<br/>

<strong>Project Logic:</strong> <br/> I wrote one function called liriThis() to take care of all 4 LIRI node commands.  The function liriThis() takes in two strings as arguments.  The first argument is one of 4 LIRI node commands, listed below:</br>

* `concert-this`

* `spotify-this-song`

* `movie-this`

* `do-what-it-says`</br></br>
The node command "spotify-this-song" utilizes the node Spotify API package in order to retrieve song information from the Spotify API
</br>.  The node command "movie-this" uses the node axios package to retrieve data from the OMDB API. </br>The command "concert-this" searches the Bands in Town Artist Events API for upcoming concerts in Colorado. </br> The last command, "do-what-it-says", reads from a random.txt file, grabs the text, and re-calls liriThis() using the text commands provided for in the file. </br>All four commands log their results to the node console as well as to a log.txt file.</br>
If no second argument is provided for 'spotify-this-song' then "The Sign" from Ace of Base is returned. </br> If no second argument is provided for 'movie-this' then "Mr. Nobody" is returned.  </br> If no second argument is provided for 'concert-this', the command line will prompt you to provide one. </br>Lastly, 'do-what-it-says' does not take in a second argument.  </br>
The video runs through the following command line arguments, in this order:
* node liri
* node liri spotify-this-song
* node liri spotify-this-song shadowboxer
* node liri movie-this
* node liri movie-this aliens
* node liri concert-this
* node liri concert-this the rolling stones
* node liri do-what-it-says </br>
</br></br>
In order to clone this project, you must supply a .env file to the .gitignore folder with your spotify ID and Secret included in the following format: </br>
SPOTIFY_ID=your-spotify-id</br>
SPOTIFY_SECRET=your-spotify-secret
</br>

