var players = [
{
	name: "Lewandowski",
	image: "src/lewandowski.jpg"
},
{
	name: "Dembele",
	image: "src/dembele.jpg"
},
{
	name: "Kounde",
	image: "src/kounde.jpg"
},
{
	name: "Ter Stegen",
	image: "src/terstegen.jpg"
},
{
	name: "Jordi Alba",
	image: "src/jordialba.jpg"
},
{
	name: "Busquets",
	image: "src/busquets.jpg"
},
{
	name: "de Jong",
	image: "src/dejong.jpg"
},
{
	name: "Raphinha",
	image: "src/raphinha.jpg"
},
{
	name: "Gavi",
	image: "src/gavi.jpg"
},
{
	name: "Pedri",
	image: "src/pedri.jpg"
},
{
	name: "Depay",
	image: "src/depay.jpg"
}

];

var removePlayer = [
	{
	name: "Blind",
	image: "src/blind.jpg",
	correctcount: 0
},
{
	name: "De Jong",
	image: "src/dejong.jpg",
	correctcount: 0
},
{
	name: "De Ligt",
	image: "src/deligt.jpg",
	correctcount: 0
},
{
	name: "Neres",
	image: "src/neres.jpg",
	correctcount: 0
},
{
	name: "Onana",
	image: "src/onana.jpg",
	correctcount: 0
},
{
	name: "Schone",
	image: "src/schone.jpg",
	correctcount: 0
},
{
	name: "Tadic",
	image: "src/tadic.jpg",
	correctcount: 0
},
{
	name: "Tagliafico",
	image: "src/tagliafico.jpg",
	correctcount: 0
},
{
	name: "Van De Beek",
	image: "src/vandebeek.jpg",
	correctcount: 0
},
{
	name: "Veltman",
	image: "src/veltman.jpg",
	correctcount: 0
},
{
	name: "Ziyech",
	image: "src/ziyech.jpg",
	correctcount: 0
}
];

var usedPlayers = [];

document.getElementById("endingBtn").onclick = function(){
	window.location.href="index.html";
}

// Creates a new array as long as the chosen players from settings and picks them random
let array2 = [];
while(players.length !== 0){
	let randomIndex = Math.floor(Math.random() * players.length);
	array2.push(players[randomIndex]);
	players.splice(randomIndex, 1);
}

players = array2;
console.log(players);


// Defines gamePeople (number of players of the game)
var gamePeople = 11;
if(localStorage.getItem("GamePeople") != null){
	gamePeople = localStorage.getItem("GamePeople");
}


// Defines timerTime
var timerTime = 120;
// alert(localStorage.getItem("GameTime"));
if(localStorage.getItem("GameTime") != null){
	timerTime = localStorage.getItem("GameTime");
}

// timer settings
var interval = 1000;
var width = 100;
var barAmount = Number(width/timerTime);
var timer = setTimeout(countDown, interval);
document.getElementById("timer").innerHTML = "Timer: "+timerTime+"s";

// Timer function 
function countDown() {
	timerTime--;
    document.getElementById("timer").innerHTML = "Timer: "+timerTime+"s";
    width = width-barAmount;
    console.log(width);
    document.getElementById("timerBar").style.width = width + "%"; 
    // document.getElementById("timerBar").style.transition = "1s linear"; 
    timer = setTimeout(countDown, interval);

    if(timerTime== 0){
    	clearTimeout(timer);
    	document.getElementById("progress").classList.remove("d-inline-block");
		document.getElementById("invisible").classList.remove("d-none");
		gameEnding();
		return;
    }
}


const buttons = document.querySelectorAll('.button');
buttons.forEach(element => {
	element.onclick = function() { selectIMG(element.id); };
});

const buttons2 = document.querySelectorAll('.button-2');
buttons2.forEach(element => {
	element.onclick = function() { selectNAME(element.id); };
});

// Creates an array with numbers
var numbers = [];
for(var i = 0; i < gamePeople; i++){
	numbers[i] = i;
}

// Creates an array with numbers
var numbersName = [];
for(var i = 0; i < gamePeople; i++){
	numbersName[i] = i;
}
console.log(numbersName);

// Uses the arrays with numbers from above to place the images random on the site without repeating the same image
// The splice removes the number from the array that already has been used
for (var i = 0; i < gamePeople; i++) {
	var randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
	var numberIndex = numbers.indexOf(randomNumber);
	numbers.splice(numberIndex,1);
	var randomNumberName = numbersName[Math.floor(Math.random() * numbersName.length)];
	var numberIndexName = numbersName.indexOf(randomNumberName);
	numbersName.splice(numberIndexName,1);

	registerUsedPlayers(randomNumber);
	document.getElementById("img-"+i).src = players[randomNumber].image;
	document.getElementById("btn-"+i).innerHTML = players[randomNumberName].name;

};

var selectedIMG;
var selectedIMGid;


// Removes not used containers
removeNotUsed();

// Select the clicked image
function selectIMG(id){
	// check if there is already a img selected and add/remove border

	if(selectedIMGid == undefined) {

		document.getElementById(id).classList.add("borderActive");
		selectedIMGid = id;
		selectedIMG = document.getElementById(id).src;
	} else{
		// document.getElementById(selectedIMGid).style.outlineStyle = "none";
		document.getElementById(selectedIMGid).classList.remove("borderActive");
		document.getElementById(id).classList.add("borderActive");
		selectedIMGid = id;
		selectedIMG = document.getElementById(id).src;
	}

	//cuts off src path from image
	selectedIMG = selectedIMG.substring(selectedIMG.indexOf("src"));
	checkMatch();
}

var selectedNAME;
var selectedNAMEid;


// Select the clicked name
function selectNAME(id){
	// checks if there is already a name selected and add/removes border
	if(selectedNAMEid == undefined) {
		document.getElementById(id).classList.add("borderActive");
		selectedNAMEid = id;
		selectedNAME = document.getElementById(id).innerHTML;
	}
	else{
		document.getElementById(selectedNAMEid).classList.remove("borderActive");
		document.getElementById(id).classList.add("borderActive");

		selectedNAMEid = id;
		selectedNAME = document.getElementById(id).innerHTML;
	}
	checkMatch();
}

var score = 0;
var tries = 0;

// check if the selected image/name is a match
function checkMatch(){
	var selectedNoMatch;
	
	if(selectedNAME != undefined && selectedIMG != undefined){
		tries++;
		document.getElementById("triesCounter").innerHTML = tries;
		resetAnimation();
		// Loops through the array to check if there is a match
		for (var i = 0; i < players.length; i++) {
			selectedNoMatch = false;
			if(players[i].name == selectedNAME && players[i].image == selectedIMG){
				document.getElementById(selectedNAMEid).style.opacity = "0";
				document.getElementById(selectedNAMEid).style.transition = "0.5s";
				document.getElementById(selectedNAMEid).onclick = null;

				document.getElementById(selectedIMGid).style.opacity = "0";
				document.getElementById(selectedIMGid).style.transition = "0.5s";
				document.getElementById(selectedIMGid).onclick = null;
				selectedNAME = undefined;
				selectedIMG = undefined;
				score++;
				addCorrectPlayers(selectedNAMEid);
				
				document.getElementById("scoreCounter").innerHTML = score;
				if(score == gamePeople){
					gameEnding();
				}
				return;
			} else if(players[i].name != selectedNAME || players[i].image != selectedIMG){
				selectedNoMatch = true;
			}
		
		}
		if(selectedNoMatch == true){
			// makes border red
			// document.getElementById(selectedNAMEid).style.outlineColor = "#ff0015";
			// document.getElementById(selectedIMGid).style.outlineColor = "#ff0015";

			document.getElementById(selectedNAMEid).classList.add("shakeAnimation");
			document.getElementById(selectedIMGid).classList.add("shakeAnimation");
	
			selectedNAME = undefined;
			selectedIMG = undefined;
			document.getElementById(selectedNAMEid).classList.remove("borderActive");
			document.getElementById(selectedIMGid).classList.remove("borderActive");
		
		}	
	} else {
		// alert("Niet beide geselecteerd");
	}	
}


//reset the animation
function resetAnimation(){
	document.getElementById(selectedIMGid).classList.remove("shakeAnimation");
		document.getElementById(selectedNAMEid).classList.remove("shakeAnimation");
		void document.getElementById(selectedNAMEid).offsetWidth;
		void document.getElementById(selectedIMGid).offsetWidth;
}

// Puts all the game details in localStorage
var historySet = false;
localStorage.setItem("HistorySet", historySet);
var maxScore = localStorage.getItem("GamePeople");
function gameEnding(){
	historySet = true;
	var date = new Date().toLocaleString();
	localStorage.setItem("Score",score);
	localStorage.setItem("Maxscore",maxScore);
	localStorage.setItem("Tries",tries);
	localStorage.setItem("Date",date);
	localStorage.setItem("HistorySet", historySet);
	// localStorage.setItem("PlayersCorrect", usedPlayers);
	localStorage.setItem("PlayersCorrect", JSON.stringify(usedPlayers));
	localStorage.setItem("TimeLeft", timerTime);
	setTimeout("location.href = 'ending.html';",500);
}


// Removes not used buttons
function removeNotUsed(){
	for (var i = 0; i < players.length; i++) {
		if(document.getElementById("btn-"+i).innerHTML == ""){
			document.getElementById("img-"+i).classList.remove("d-block");
			document.getElementById("btn-"+i).classList.remove("d-block");
			document.getElementById("btn-"+i).classList.remove("d-flex");
			document.getElementById("img-"+i).classList.add("d-none");
			document.getElementById("btn-"+i).classList.add("d-none");
		}
	};
}


//Sends the players used in the game to the history
function registerUsedPlayers(playerIndex){
	usedPlayers.push({
  		name: players[playerIndex].name,
  		correct: false
	});
	// players[randomNumber].image
	console.log(usedPlayers);
}


// Updates the array where the information about the matches is in
function addCorrectPlayers(PlayerId){
	var rememberName = document.getElementById(PlayerId).innerHTML;
	for (var i = 0; i<= usedPlayers.length; i++) {
		if(rememberName == usedPlayers[i].name){
			usedPlayers[i].correct = true;
			console.log(usedPlayers);
			return;
		}
	}

}

// Changes the theme of the game
function changeTheme(){
	if (localStorage.getItem("Theme") == "horizontal") {
		alert("theme horizontal");
		document.getElementById("divImg").classList.remove("col-6");
		document.getElementById("divImg").classList.add("col-12");
		document.getElementById("divBtn").classList.remove("col-6");
		document.getElementById("divBtn").classList.add("col-12");

		for (var i = 0; i <= 10; i++) {
			document.getElementById("img-"+i).classList.add("col-2");
			document.getElementById("img-"+i).classList.add("p-0");
			document.getElementById("btn-"+i).classList.add("col-2");
			document.getElementById("btn-"+i).classList.add("p-5");
		}
	} else if (localStorage.getItem("Theme") == "vertical"){
		alert("theme vertical");
		for (var i = 0; i <= 10; i++) {
			document.getElementById("img-"+i).classList.add("col-6");
			document.getElementById("img-"+i).classList.add("p-0");
			document.getElementById("btn-"+i).classList.add("col-6");
		}
	}
}

changeTheme();



