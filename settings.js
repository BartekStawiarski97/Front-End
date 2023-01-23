const button = document.getElementById("save");
button.onclick = save;


// Saves all the form information and puts them in localstorage
function save(){
	// alert("saved");
	var formValues = document.forms.formSettings;
	var formData = new FormData(formValues);
	var time = formData.get("time");
	var people = formData.get("people");
	var theme = formData.get("themeselect");
	// alert(time+" "+people);
	localStorage.setItem("GameTime",time);
	localStorage.setItem("GamePeople",people);
	localStorage.setItem("Theme",theme);
	setTimeout("location.href = 'index.html';");
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

