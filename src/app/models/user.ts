import { Game } from './game';

export class User{
	constructor(
		public _id: string,
		public nickname: string,
		public password: string,
		public games: Game[]
	){

	}
}