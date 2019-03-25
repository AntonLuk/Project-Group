$(document).ready(function() {

	let
		loginLink = $('.menu .login'),
		logoutLink = $('.menu .logout');
		registerLink = $('.menu .register');

	if (localStorage.token) {

		loginLink.addClass('hidden');
		registerLink.addClass('hidden');
		logoutLink.removeClass('hidden');

	} else {

		loginLink.removeClass('hidden');
		registerLink.removeClass('hidden');
		logoutLink.addClass('hidden');

	}

	loginLink.on('click', function(event) {

		window.location.replace("./loginForm");

	});

	logoutLink.on('click', function(event) {

		localStorage.removeItem('token');
		window.location.replace('./loginForm');

	});
});
