$(async () => {
	renderView(window.location.pathname)
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

	$(window).on('popstate', () => renderView(window.location.pathname))
	$('.open-datum-menu').on('click', openDatumMenu)
	$('#add-tag').on('click', turnAddTagBtnIntoInput)
	$('#add-datum').on('click', addDatum)
	$('.tag').on('click', openTagMenu)
	$('#settings').on('click', fetchRandomDatum)
	$('#add-tag-input').on('keypress', addTag)
	$('#add-tag-input').on('blur', replaceAddTagInputWithBtn)
	$('#click-away-screen').on('click', closeMenus)
	$('.item-delete-datum').on('click', deleteDatum)
	$('#settings').on('click', openSettingsMenu)
	$('.item-login').on('click', navigateToLoginView)
})