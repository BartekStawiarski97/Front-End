document.getElementById('start').onclick = function(){
	window.location.href="play.html";
}

document.getElementById('settings').onclick = function(){
	window.location.href="settings.html";
}

var theme;
var removeplayers;


// if the theme is null set the theme to standard
if(localStorage.getItem("Theme") == null){
	// gamePeople = localStorage.getItem("GamePeople");
	theme = "standard";
	localStorage.setItem("Theme",theme);
}



