import { getContrastColorFor } from '../utils.ts'
import words from '../words.ts'
import colors from '../colors.ts'
import Datum from '../interfaces/Datum.ts'

const DATUM_COUNT = 100

const getRandomFrom = (array: any[]): any => {
	const randomIndex = Math.floor(Math.random() * array.length)
	return array[randomIndex]
}

const getRandomDatum = async () => {
	const numberOfTags = Math.ceil(Math.random() * 5)

	// put one or two words together to make tag names
	const tagNames = []
	for (let i = 0; i < numberOfTags; i++) {
		let tagName = getRandomFrom(words)
		const hasOneWord = Math.floor(Math.random() * 3)
		if (!hasOneWord) tagName += ' ' + getRandomFrom(words)
		tagNames.push(tagName)
	}

	// get a random color palette
	const colorHex = getRandomFrom(colors).hex
	const response = await fetch(`https://www.thecolorapi.com/scheme?hex=${colorHex}&count=${numberOfTags}`)
	const json = await response.json()
	const colorScheme = json.colors

	// add a color, maybe add a number/word tag value
	const tags = tagNames.map((tagName, i) => {
		// maybe tag value
		let tagValue = null
		const hasTagValue = Math.floor(Math.random() * 3) // 67%
		if (hasTagValue) {
			const isWord = Math.round(Math.random())
			if (isWord) {
				tagValue = getRandomFrom(words)
			} else {
				tagValue = Math.ceil(Math.random() * 100)
			}
		}

		// tag colors
		const color = colorScheme[i].hex.value
		const contrastColor = getContrastColorFor(color)

		return {
			name: tagName,
			value: tagValue,
			color,
			contrastColor,
		}
	})

	// add a uuid and time to the tags
	return {
		id: crypto.randomUUID(),
		time: Date.now(),
		tags,
	}
}

// export an array of datums
let datums: Datum[] = []
for (let i = 0; i < DATUM_COUNT; i++) {
	console.log('Getting random datum number', i + '...')
	datums.push(await getRandomDatum())
}

export default datums