import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import { Game } from '../models/game';
import { global } from './global';

@Injectable()
export class UserService{
	public users_api_url: string;

	constructor(
		private _http: HttpClient
	){
		this.users_api_url = global.users_api_url;
	}

	testService(){
		return 'Probando el servicio de angular';
	}

	saveGame(user: User, game: Game){

		user.games.push(game);
		let params = JSON.stringify(user);
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.put(this.users_api_url+'user/'+user._id, params, {headers: headers});
	}

	getUser(_id: string): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.get(this.users_api_url+'user/'+_id, {headers: headers});
	}
}