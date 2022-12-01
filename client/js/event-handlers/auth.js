function handleRegisterUsernameChange() {
	$('.register-input-and-label-container').hide()
	$('.register-btn').hide()
	if (!$(this).val()) {
		$('#register-username-field').show()
		$('#register .subtitle').text("Let's get started! Enter a username")
	} else {
		$('#register-username-field').show()
		$('#register-password-field').show()
		$('#register .subtitle').text("Great! Now enter a password")
	}
}

function handleRegisterPasswordChange() {
	$('.register-input-and-label-container').hide()
	$('.register-btn').hide()
	if (!$(this).val()) {
		$('#register-username-field').show()
		$('#register-password-field').show()
		$('#register .subtitle').text("Great! Now enter a password")
	} else {
		if ($(this).val().length < 8) {
			$('#register-username-field').show()
			$('#register-password-field').show()
			$('#register .subtitle').text(`Only ${8 - $(this).val().length} more character${$(this).val().length === 7 ? '' : 's'} to go`)
		} else {
			$('#register-username-field').show()
			$('#register-password-field').show()
			$('#register-email-field').show()
			$('.register-btn').show()
			$('#register .subtitle').text("Awesome! Enter an email if you'd like")
		}
	}
}

function handleRegisterEmailChange() {
	$('.register-btn').hide()
	if (!$(this).val()) {
		$('.register-btn').show()
		$('#register .subtitle').text("Awesome! Enter an email if you'd like")
	} else {
		if (isEmailValid($(this).val())) {
			$('.register-btn').show()
			$('#register .subtitle').text("Thanks for the email!")
		} else {
			$('#register .subtitle').text("Make sure your email is valid")
		}
	}
}

async function registerUser() {
	const body = JSON.stringify({
		username: $('#register-username-input').val(),
		password: $('#register-password-input').val(),
		email: $('#register-email-input').val()
	})
	clearRegisterInputs()
	$('.register-input-and-label-container').hide()
	$('.register-btn').hide()
	$('#register .subtitle').text('Signing up...')
	const response = await fetch('https://api.datums.app/users', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body,
	}) 
	const json = await response.json()
	handleRegisterUsernameChange()
	renderView('list')
}