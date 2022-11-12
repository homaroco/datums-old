function turnAddTagBtnIntoInput() {
	console.log('clicked:', this)
}

async function createDatum() {
	const datum = convertDatumToHtml(await fetchRandomDatum())
	$('#datum-list ul').append(
		$('<li>').append(
			datum
	))
	datum[0].scrollIntoView({
		behavior: 'smooth'
	})
	await colorAllTagsRandomly()
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