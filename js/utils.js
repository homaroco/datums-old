const print = (...args) => console.log(...args)

const getRandomHex = () => {
	const letters = '0123456789ABCDEF'.split('')
	let color = ''
	for (let i = 0; i < 6; i++) {
		const random = Math.floor(Math.random() * 16)
		color += letters[random]
	}
	return color
}

const fetchRandomColor = async () => {
	const randomHex = getRandomHex()
	const baseUrl = 'https://www.thecolorapi.com'
	const endpoint = `/id?hex=${randomHex}`
	const response = await fetch(baseUrl + endpoint)
	const json = await response.json()
	return json
}

const colorAllTagsRandomly = async () => {
	$(document).find('.tag').each(function () {
		colorTagRandomly(this)
	})
}

const colorTagRandomly = async tag => {
	const color = await fetchRandomColor()
	const hex = color.name.closest_named_hex
	let textHex = color.contrast.value
	if (textHex === '#000000') textHex = 'hsl(0, 0%, 5%)'
	colorTag({
		tag, 
		color: textHex, 
		bgColor: hex,
	})
}

const convertDatumToHtml = datum => (
	$('<div class="datum">').append(
		$('<span class="tags">').append(
			...datum.tags.map(tag => (
				$('<span class="tag">').append(
					$('<span class="tag-name">').text(tag.name),
					tag.value ? $('<span class="tag-value">').text(tag.value) : null,
				)
			))
		)
	)
)

const convertHtmlToDatumObj = html => {

}

const colorTag = ({
	tag, 
	color, 
	bgColor,
}) => {
	$(tag).find('.tag-name').css('color', color)
	$(tag).find('.tag-name').css('background-color', bgColor)
	$(tag).find('.tag-name').css('border-color', bgColor)
	$(tag).find('.tag-value').css('color', bgColor)
	$(tag).find('.tag-value').css('background-color', color)
	$(tag).find('.tag-value').css('border-color', bgColor)
}

const fetchRandomDatum = async () => {
	const numberOfTags = Math.ceil(Math.random() * 5)
	const response = await fetch('words.json')
	const words = await response.json()
	const tagNames = []
	for (let i = 0; i < numberOfTags; i++) {
		const randomIndex = Math.floor(Math.random() * words.length)
		tagNames.push(words[randomIndex])
	}
	const tags = tagNames.map(async tagName => {
		let tagValue = null
		const hasTagValue = Math.floor(Math.random() * 3) // 67% chance
		if (hasTagValue) {
			const isWord = Math.round(Math.random())
			if (isWord) {
				const randomIndex = Math.floor(Math.random() * words.length)
				tagValue = words[randomIndex]
			} else {
				tagValue = Math.ceil(Math.random() * 100)
			}
		}
		const colorData = await fetchRandomColor()
		const color = colorData.name.closest_named_hex
		let contrastColor = colorData.contrast.value
		if (contrastColor === '#000000') contrastColor = 'hsl(0, 0%, 5%)'
		return {
			name: tagName,
			value: tagValue,
			color,
			contrastColor,
		}
	})
	return {
		tags: await Promise.all(tags),
		id: 1,
		time: Date.now(),
	}
}