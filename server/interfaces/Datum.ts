interface Tag {
	name: string,
	value: string | null,
	color: string,
	contrastColor: string,
}

export default interface Datum {
	id: string,
	time: number,
	tags: Tag[],
}