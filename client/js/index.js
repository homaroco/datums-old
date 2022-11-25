$(async () => {
	const view = window.location.pathname.substring(1)
	$('.view').hide()
	$(`#${view}`).show()
	const response = await fetch('https://api.datums.app/datums')
	const json = await response.json()
	const datums = json.data
	datums.forEach(datum => {
		$('#datum-list ul').append(
			$('<li>').append(
				convertDatumToHtml(datum)
			)
		)
	})

	$(window).on('popstate', (e) => {
		$('.view').hide()
		if (e.state) {
			$(`#${e.state.view}`).show()
		} else {
			$(`#${window.location.pathname.substring(1)}`).show()
		}
	})
	// List view
	$('.open-datum-menu').on('click', openDatumMenu)
	$('#add-tag').on('click', turnAddTagBtnIntoInput)
	$('#add-datum').on('click', addDatum)
	$('.tag').on('click', openTagMenu)
	$('#settings').on('click', fetchRandomDatum)
	$('#add-tag-input').on('keypress', addTag)
	$('#add-tag-input').on('blur', replaceAddTagInputWithBtn)
	$('.item-delete-datum').on('click', deleteDatum)
	$('#settings').on('click', openSettingsMenu)
	$('.item-login').on('click', navigateToLoginView)
	$('.item-register').on('click', navigateToRegisterView)
	
	// Login view
	$('#login input').on('focus', handleInputFocus)
	$('#login input').on('blur', handleInputBlur)

	// Register view
	$('#register input').on('focus', handleInputFocus)
	$('#register input').on('blur', handleInputBlur)
	
	$('#click-away-screen').on('click', closeMenus)
})