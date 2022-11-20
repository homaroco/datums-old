import { getContrastColorFor } from '../utils.ts'
import words from '../words.ts'
import colors from '../colors.ts'
import Datum from '../interfaces/Datum.ts'

const DATUM_COUNT = 100

const getRandomFrom = (array: any[]): any => {
	const randomIndex = Math.floor(Math.random() * array.length)
	return array[randomIndex]
}

const getRandomDatum = (): Datum => {
	const numberOfTags = Math.ceil(Math.random() * 5)
	const tagNames = []
	for (let i = 0; i < numberOfTags; i++) {
		let tagName = getRandomFrom(words)
		const hasOneWord = Math.floor(Math.random() * 3)
		if (!hasOneWord) tagName += ' ' + getRandomFrom(words)
		tagNames.push(tagName)
	}
	const tags = tagNames.map(tagName => {
		let tagValue = null
		const hasTagValue = Math.floor(Math.random() * 3)
		if (hasTagValue) {
			const isWord = Math.round(Math.random())
			if (isWord) {
				tagValue = getRandomFrom(words)
			} else {
				tagValue = Math.ceil(Math.random() * 100)
			}
		}
		const color = '#' + getRandomFrom(colors).hex
		const contrastColor = getContrastColorFor(color)
		return {
			name: tagName,
			value: tagValue,
			color,
			contrastColor,
		}
	})
	return {
		id: crypto.randomUUID(),
		time: Date.now(),
		tags,
	}
}

let datums: Datum[] = []

for (let i = 0; i < DATUM_COUNT; i++) {
	datums.push(getRandomDatum())
}

export default datums