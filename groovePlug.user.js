// ==UserScript==
// @name       Groove Time
// @version    0.1
// @description  Will play songs written to a file
// @include    *grooveshark.com*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js
// @copyright  2011+, Alexandre James
// ==/UserScript==

function playSong()
{
    var curStatus = window.Grooveshark.getCurrentSongStatus();
    
    if(curStatus.status == 'playing')
    {
        return;
    }
    
    window.Grooveshark.play();
    
    setTimeout(playSong, 500);
}

function pauseSong()
{
    window.Grooveshark.pause();
}

function nextSong()
{
    window.Grooveshark.next();
}

function addSong(data) {
    window.Grooveshark.addSongsByID([data.songID]);
    playSong();
}

function doTimer() {
    setTimeout(doTimer, 500);

    if(window.Grooveshark)
    {
        var song;
        jQuery.getJSON('http://localhost:8080/groove_list.json?callback=?', function(data) {
            switch (data.action)
            {
                case "addSong":
                    addSong(data);
                    break;
                case "play":
                    playSong();
                    break;
                case "pause":
                    pauseSong();
                    break;
                case "next":
                    nextSong();
                    break;
            }
            
        });
    }
}

window.addEventListener("load", doTimer, false);
