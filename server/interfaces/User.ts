export default interface User {
	id: number,
	uuid: string,
	username: string,
	email: string,
	password_hash: string,
	time_created: number,
	is_active: boolean,
}