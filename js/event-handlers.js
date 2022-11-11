function turnAddTagBtnIntoInput() {
	console.log('clicked:', this)
}

function createDatum() {
	$('#datum-list ul').append(
		$('<li>').append(
			convertDatumObjToHtml({
				tags: [
					{ name: 'ayy', value: 'bravo' },
					{ name: 'another', value: 'test' },
					{ name: 'noval', value: null},
				]
			})
		))
}

function openDatumMenu() {
	console.log('clicked:', this)
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
	$(this).replaceWith($('<input id="add-tag-input">'))
}