export default interface User {
	uuid: string,
	username: string,
	email: string,
	password_hash: string,
	time_created: number,
	is_active: boolean,
}