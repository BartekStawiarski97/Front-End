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

