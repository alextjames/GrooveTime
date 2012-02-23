// Setup a div that will be used for communications between the plugin and the grooveshark page
var GrooveTimeDiv = document.createElement('div');
GrooveTimeDiv.style.display = 'none';
GrooveTimeDiv.id = 'GrooveTimeDiv';
document.body.appendChild(GrooveTimeDiv);

// This will register all of the callbacks for the various events
function initGrooveTimeEvents() {
    var GrooveTimeDiv = document.getElementById('GrooveTimeDiv');

    GrooveTimeDiv.addEventListener('play', function() {
        window.Grooveshark.play();
    });

    GrooveTimeDiv.addEventListener('pause', function() {
        window.Grooveshark.pause();
    });

    GrooveTimeDiv.addEventListener('next', function() {
        window.Grooveshark.next();
    });

    GrooveTimeDiv.addEventListener('volume', function() {
        var data = JSON.parse(document.getElementById('GrooveTimeDiv').innerText);
        window.Grooveshark.setVolume(data.level);
    });

    GrooveTimeDiv.addEventListener('addSong', function() {
        var startNow = true;
        var curStatus = window.Grooveshark.getCurrentSongStatus();
        
        // If there are already songs playing, we don't want to start this one right away.
        if(curStatus.status == 'playing')
        {
            startNow = false;
        }
        
        var data = JSON.parse(document.getElementById('GrooveTimeDiv').innerText);

        window.Grooveshark.addSongsByID([data.songID], startNow);

    });
}

var script = document.createElement('script');
script.innerHTML = initGrooveTimeEvents + '\ninitGrooveTimeEvents();';
document.body.appendChild(script);

function doTimer() {
    setTimeout(doTimer, 500);
   
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8080/groove_list.json", true);
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4)
        {
            if(xhr.responseText)
            {
                var data = JSON.parse(xhr.responseText);
                if (data.action)
                {
                    var grooveEvent = document.createEvent('Event');
                    GrooveTimeDiv.innerText = JSON.stringify(data);

                    // The action type passed to use by the control server
                    // will be used as the event type.
                    grooveEvent.initEvent(data.action, true, true);
                    GrooveTimeDiv.dispatchEvent(grooveEvent);
                }
            }
        }
    }
    xhr.send();
}

setTimeout(doTimer, 500);
