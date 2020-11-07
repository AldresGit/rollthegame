import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Preferences } from '../models/preferences';

@Injectable()
export class RawgService{
	public url: string;

	constructor(
		public _http: HttpClient
	){
		this.url = "https://api.rawg.io/";
	}

	getGameList(preferences: Preferences, page = 1): Observable<any>{
		/*   Busqueda con fechas

		var query = "?platforms="+preferences.platforms+"&genres="+preferences.genres+"&dates="+preferences.dates+"&page="+page;

		*/

		//La API limita las busquedas a un paginado de 500
		if(page > 500) {
			page = (page % 500) + 1;
		}

		var query = "";

		if(preferences.platforms != "0"){
			query = "?platforms=" + preferences.platforms;
		}

		if(preferences.genres != "0"){
			if(query == ""){
				query = "?genres=" + preferences.genres;
			} else {
				query = query + "&genres=" + preferences.genres;
			}
		}

		if(query == "") {
			query = "?page=" + page;
		} else {
			query = query + "&page=" + page;
		}

		//console.log(this.url+'api/games'+query);

		return this._http.get(this.url+'api/games'+query);
	}

	getPlatforms(): Observable<any> {
		return this._http.get(this.url+'api/platforms');
	}

	getGenres(): Observable<any> {
		return this._http.get(this.url+'api/genres');
	}
}