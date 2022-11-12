$(async () => {
	for (let i = 0; i < 10; i++) {
		await createDatum()
	}
	colorAllTagsRandomly()
	$('button.open-datum-menu').on('click', openDatumMenu)
	$('button#add-tag').on('click', turnAddTagBtnIntoInput)
	$('button#add-datum').on('click', createDatum)
	$('.tag').on('click', openTagMenu)
	$('button#settings').on('click', fetchRandomDatum)
})