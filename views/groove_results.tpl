<head>
    <script src="http://code.jquery.com/jquery-latest.js"></script>
</head>

<h2>GrooveSearch</h2>
<form method="POST">
    <input name="Title" type="text" />
    <input value="Search" type="submit" />
</form>

<h2>GrooveControl</h2>

<input type="button" value="Play" onClick="jQuery.get('http://{{ip}}:8080/groove?action=play');" />
<input type="button" value="Pause" onClick="jQuery.get('http://{{ip}}:8080/groove?action=pause');" />
<input type="button" value="Next" onClick="jQuery.get('http://{{ip}}:8080/groove?action=next');" />
<br>
<h3>Volume</h3>
<input type="button" value="Low" onClick="jQuery.get('http://{{ip}}:8080/groove?action=volume&level=10');" />
<input type="button" value="Medium" onClick="jQuery.get('http://{{ip}}:8080/groove?action=volume&level=50');" />
<input type="button" value="High" onClick="jQuery.get('http://{{ip}}:8080/groove?action=volume&level=100');" />


<h2>Groove Results</h2>
<p>
<table border=1>
    <tr><th>Link</th><th>Name</th><th>Artist</th><th>Album</th></tr>
    %for song in songs:
    %   Url=song['Url']
    %   ArtistName=song['ArtistName']
    %   AlbumName=song['AlbumName']
    %   SongName=song['SongName']
    %   SongID=song['SongID']
    <tr>
        <td><input type="button" value="Add" onClick="jQuery.get('http://{{ip}}:8080/groove?action=addSong&songID={{SongID}}');" /></td>
        <td>{{SongName}}</td><td>{{ArtistName}}</td><td>{{AlbumName}}</td>
    </tr>
    %end

</table>

</p>
