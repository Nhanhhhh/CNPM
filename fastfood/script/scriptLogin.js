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

// let listUsers = "";

// $(document).ready(function() {
	
	// $.ajax({
	// 	type: 'GET',
	// 	url: 'http://localhost:3000/users/signup/admin',
	// 	success: function(user) {
			// listUsers = users;
			// $.each(users, function(i, user) {
				// console.log(user);
			// });
			// console.log(listUsers[0].name, listUsers[0].password);
		// },
	// 	error: function() {
	// 		alert("error loading users info");
	// 	}
	// });

	
// });

$('#login').click(function(event) {
	event.preventDefault();
	let userName = $('.usernameLogin').val();
	let passWord = $('.passwordLogin').val();
	let id;
	// console.log('username:', userName, 'password', passWord);

	$.ajax({
		type: 'POST',
		url: 'http://localhost:3000/users/authorize',
		data: {
			username: userName,
			password: passWord,
		},
		success: function(result) {
			if (result == 1) {
				window.location.href = 'admin.html';
				// window.open('admin.html');
			}
			else if(result == 2) {
				$('.wrongLoginInfo').html('<p>Tài khoản chưa được đăng ký</p>');
			}
			else if(result == 3) {
				$('.wrongLoginInfo').html('<p>Tài khoản hoặc mật khẩu không chính xác</p>');
			}
		}
	});

	// $.each(listUsers, function(i, user) {
	// 	if (userName == user.userName) {
	// 		id = user.id;
	// 		$.ajax({
	// 			type: 'GET',
	// 			url: 'http://localhost:3000/users/' + id,
	// 			success: function() {
	// 				if(userName == user.userName && passWord == user.password) {
	// 					$('.usernameLogin').val("");
	// 					window.location.href = 'admin.html';
	// 					// window.open('admin.html');
	// 					return false;
	// 				}
	// 				else{
	// 					$('.wrongLoginInfo').html('<p>Tài khoản hoặc mật khẩu không chính xác</p>');
	// 				}
	// 			}
	// 		})
	// 	}
	// 	else {
	// 		$('.wrongLoginInfo').html('<p>Tài khoản chưa được tạo</p>');
	// 	}
	// })

	// $.ajax({
	// 	type: 'GET',
	// 	url: 'http://localhost:3000/users/findAll'
	// })
	
	
	// $.each(listUsers, function(i, user) {
	// 	if(userName == user.userName && passWord == user.password) {
	// 		$('.usernameLogin').val("");
	// 		window.location.href = 'admin.html';
	// 		// window.open('admin.html');
	// 		return false;
	// 	}
	// 	else{
	// 		$('.wrongLoginInfo').html('<p>Tài khoản hoặc mật khẩu không chính xác</p>');
	// 	}
	// });
});

$('#signup').click(function(event) {
	event.preventDefault();
	let username = $('.usernameSignup').val();
	let passWord = $('.passwordSignup').val();
	let Name = $('.nameSignup').val();
	let phoneNum = $('.phoneSignup').val();
	let mail = $('.emailSignup').val();
	let addr = $('.addressSignup').val();

	// let arr = [username, passWord, Name, phoneNum, mail, addr];
	// console.log(arr);

	let newUser = {
		userName: username,
		password: passWord,
		email: mail,
		phone: phoneNum,
		address: addr,
		role: 1,
		name: Name,
	};

	$.ajax({
		type: 'POST',
		url: 'http://localhost:3000/users/',
		data: newUser,
		success: function() {
			window.location.href = 'admin.html';
		},
		error: function() {
			$('.usernameExisted').html('<p>Tài khoản đã tồn tại</p>');
		}
	});

});
