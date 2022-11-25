async function addDatum() {
	const datumObj = convertHtmlToDatum($('#datum-bar').get())
	if (!datumObj.tags.length) return
	const response = await fetch('https://api.datums.app/datums', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(datumObj)
	})
	const json = await response.json()
	const datumHtml = convertDatumToHtml(json.data)
	$('#datum-list ul').append(
		$('<li>').append(
			datumHtml
	))
	datumHtml[0].scrollIntoView({
		behavior: 'smooth'
	})
	$('#datum-bar').find('.tag').remove()

	updateAddDatumBtnState()
}

function openDatumMenu() {
	$(this).closest('.datum').find('.datum-menu').css('display', 'flex')
	$(this).closest('.datum').css('z-index', 2)
	$('#click-away-screen').show()
}

function closeMenus() {
	$('.menu').hide()
	$('.datum-menu').hide()
	$('#click-away-screen').hide()
	$('.datum').css('z-index', 0)
}

async function openTagMenu() {
	colorTag({
		tag: this, 
		color: 'var(--background)', 
		bgColor: 'var(--dark-grey)',
	})
	await colorTagRandomly(this)
}

function turnAddTagBtnIntoInput() {
	$(this).hide()
	$('#add-tag-input').show()
	$('#add-tag-input')[0].focus()
}

function addTag(e) {
	if (e.which !== 13) return // not Enter
	if (!this.value) return

	$(this).hide()

	// create and insert new tag, show btn again
	const tag = `
		<span class="tag">
			<span class="tag-name">${this.value}</span>
		</span>
	`
	$(tag).insertBefore('#add-tag')

	// reset value after making new tag
	$(this).val('')
	$('#add-tag').show()

	updateAddDatumBtnState()
}

function replaceAddTagInputWithBtn() {
	$(this).hide()
	$('#add-tag').show()

	updateAddDatumBtnState()
}

async function deleteDatum() {
	const datum = convertHtmlToDatum($(this).closest('.datum'))
	const response = await fetch(`https://api.datums.app/datums/${datum.id}`, {
		method: 'DELETE'
	})
	const json = await response.json()
	if (json.success) {
		$(this).closest('li').remove()
		closeMenus()
	}
}

function openSettingsMenu() {
	$('#click-away-screen').show()
	$('.settings-menu').css('display', 'flex')
}

function navigateToLoginView() {
	closeMenus()
	renderView('login')
}

function handleInputFocus() {
	const inputName = $(this).attr('name')
	$(`#login label[for=${inputName}]`).css('color', 'white')
}

function handleInputBlur() {
	const inputName = $(this).attr('name')
	if (!$(this).val()) {
		$(`#login label[for=${inputName}]`).css('color', 'grey')
	}
}