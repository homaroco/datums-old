// deno-lint-ignore-file no-unused-vars
const isUsernameValid = username => {
	return Boolean(username.length)
}

const isEmailValid = email => {
	const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return email.match(re)
}

const isPasswordValid = password => {
	return password.length > 7
}

const clearRegisterInputs = () => {
	$('#register-username-input').val('')
	$('#register-password-input').val('')
	$('#register-email-input').val('')
}
