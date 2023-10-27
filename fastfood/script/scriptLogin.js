$(document).ready(function () {
    $('.toLogIn').click(function() {
		$('.sign-up-container').hide();
		$('.log-in-container').show();
	});
	$('.toSignUp').click(function() {
		$('.sign-up-container').show();
		$('.log-in-container').hide();
	});
});

let Name = document.querySelector(".name");
let Username = document.querySelector(".username");
let Password = document.querySelector(".password");
let Phone = document.querySelector(".phone");
let Email = document.querySelector(".email");

let signUpButton = document.getElementById("signup");
signUpButton.addEventListener("click", ()=>{
	let obj={
		name:Name.value,
		username:Username.value,
		password:Password.value,
		phone:Phone.value,
		email:Email.value
	};

	fetch("/signup", {
		method: "POST",
		headers: {
			"Content-type":"application/json"
		},
		body:JSON.stringify(obj)
	});
});