# liri-node-app

<strong>Project Developer:</strong> <br/>Jessica Katelyn Blomer

<strong>Project Description:</strong> <br/>This project is called LIRI.  LIRI is a _Language_ Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data.<br/>


Please watch the video here:


<a href="https://youtu.be/26Vyvv7dRSM" target="_blank"></a>
<br/>

<strong>Project Logic:</strong> <br/> I wrote one function called liriThis() to take care of all 4 LIRI node commands.  The function liriThis() takes in two strings as arguments.  The first argument is one of 4 LIRI node commands, listed below:</br>

* `concert-this`

* `spotify-this-song`

* `movie-this`

* `do-what-it-says`</br>

If no second argument is provided for 'spotify-this-song' then "The Sign" from Ace of Base is returned. </br> If no second argument is provided for 'movie-this' then "Mr. Nobody" is returned.  </br> If no second argument is provided for 'concert-this', the command line will prompt you to provide one. </br>Lastly, 'do-what-it-says' does not take in a second argument.  This last command, 'do-what-it-says', reads from a random.txt file, grabs the text, and re-calls liriThis() with the text commands provided for in the file.
