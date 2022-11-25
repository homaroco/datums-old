import { 
	getContrastColorFor,
	convertHexToHsl,
	getRandomHex,
} from '../utils.ts'
import words from '../words.ts'
import colors from '../colors.ts'
import Datum from '../interfaces/Datum.ts'

const DATUM_COUNT = 1000

const getRandomFrom = (array: any[]): any => {
	const randomIndex = Math.floor(Math.random() * array.length)
	return array[randomIndex]
}

const getRandomDatum = () => {
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
	// const colorHex = getRandomFrom(colors).hex
	// const schemeMode = getRandomFrom([
	// 	'monochrome',
	// 	// 'monochrome-dark',
	// 	// 'monochrome-light',
	// 	'analogic',
	// 	// 'complement',
	// 	'analogic-complement',
	// 	// 'triad',
	// 	// 'quad',
	// ])
	// const response = await fetch(`https://www.thecolorapi.com/scheme?hex=${colorHex}&mode=${schemeMode}&count=${numberOfTags}`)
	// const json = await response.json()
	// const colorScheme = json.colors

	// add a color, maybe add a number/word tag value
	const tags = tagNames.map((tagName, i) => {
		let colorHex, s, l
		do {
			colorHex = getRandomHex()
			const hsl = convertHexToHsl(colorHex)
			s = hsl.s
			l = hsl.l
		} while (s < 0.20 || s > 0.80 || l < 0.20 || l > 0.80) // s < 0.33 || l < 0.25
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
		const color = '#' + colorHex
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