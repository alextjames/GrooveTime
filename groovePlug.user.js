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
    window.Grooveshark.play();
}

function pauseSong()
{
    window.Grooveshark.pause();
}

function nextSong()
{
    window.Grooveshark.next();
}

function addSong(data)
{
    var startNow = true;
    var curStatus = window.Grooveshark.getCurrentSongStatus();
    
    // If there are already songs playing, we don't want to start this one right away.
    if(curStatus.status == 'playing')
    {
        startNow = false;
    }
    
    window.Grooveshark.addSongsByID([data.songID], startNow);
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
