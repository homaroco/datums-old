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
	console.log('click menu')
	$(this).closest('.datum').find('.datum-menu').css('display', 'flex')
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