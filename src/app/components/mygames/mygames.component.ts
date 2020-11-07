import { Component, OnInit, AfterViewInit } from '@angular/core';
import anime from 'animejs/lib/anime.es';
import { RawgService } from '../../services/rawg.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Game } from '../../models/game';
import { global } from '../../services/global';
import {
	trigger,
	state,
	style,
	animate,
	transition
} from '@angular/animations';

@Component({
  selector: 'app-mygames',
  templateUrl: './mygames.component.html',
  styleUrls: ['./mygames.component.css'],
  providers: [ RawgService, UserService ]
})

export class MygamesComponent implements OnInit{

	public title: string;
	public _id: string;
	public games: Game[];
	public user: User;
	public game: Game;

	constructor(
		private _rawgService: RawgService,
		private _userService: UserService
	){
		this.title = "My Games";
		this._id = global.test_id;
		this.user = new User('', '', '', []);

		//Inicializar juego para facilitar asunto
		this.game = new Game("258323", "Melbits World", "https://media.rawg.io/media/games/f61/f618468eb87b1c62301f566b457f94b5.jpg", "2018-11-14", 0, "18", "19,4,7");

	}

	//-------------------------- LIFE HOOKS ---------------------------//
	ngOnInit() {

		this.initialiseUser();
		//this.getUser();
	
	/*
		this._rawgService.getUser().subscribe(
			result => {
				console.log(result);
			},
			error => {
				console.log(<any>error);
			}
		);
	*/
	}

	ngAfterViewInit(){

		var elements = document.querySelectorAll('.game-element');
		var titlebox = document.querySelectorAll('#mygames-title');
		
		anime({
            targets: titlebox,
            opacity: ['0', '1'],
            translateY: -50,
            delay: 500,
		    duration: 2000
        });	

		anime({
            targets: elements,
            opacity: ['0', '1'],
            translateY: -50,
		    delay: anime.stagger(200, {start: 1000}),
		    duration: 1000
        });		
		
	}

	//-------------------------- LIFE HOOKS ---------------------------//

	getUser(){
		this._userService.getUser(this._id).subscribe(
			response => {
				console.log(response);
				if(response.user.games) {
					this.games = response.user.games;
				}
			},
			error => {
				console.log(<any>error);
			}
		);
	}

	//---------- DEBE IR EN LA PAGINA PRINCIPAL JUNTO AL USER -----------------

	/*

	onSubmit(form){
		console.log(this.user);
		var g = new Game("Pachacha", "Fantasia", "Accion, Pachachas", "algo", 4.45, "algo.com", "");
		this._userService.saveGame(this.user, g).subscribe(
			response => {
				console.log(response);
				},
			error => {
				console.log(error);
			}
		);
	}

	*/

	//---------- DEBE IR EN LA PAGINA PRINCIPAL JUNTO AL USER -----------------


	initialiseUser(){

		this.user._id = "5e4a7538ee32a62510968c99";
		this.user.nickname = "Antonio";
		this.user.password = "pruebon";
		this.user.games = [ 
		        {
		            "id" : "4200",
		            "name" : "Portal 2",
		            "background_image" : "https://media.rawg.io/media/games/328/3283617cb7d75d67257fc58339188742.jpg",
		            "released" : "2011-04-19",
		            "rating" : 4.61,
		            "platforms" : "PS4, PC",
		            "genres" : "Platforms, Arcade"
		        }, 
		        {
		            "id" : "3328",
		            "name" : "Witcher 3",
		            "background_image" : "https://media.rawg.io/media/games/088/088b41ca3f9d22163e43be07acf42304.jpg",
		            "released" : "2015-05-18",
		            "rating" : 4.68,
		            "platforms" : "PS4, PC, XBOX ONE",
		            "genres" : "Open World, RPG"
		        }, 
		        {
		            "id" : "5679",
		            "name" : "Skyrim",
		            "background_image" : "https://media.rawg.io/media/games/e9c/e9cbc91e2090638ddab6ae0b3d334f90.jpg",
		            "released" : "2011-05-18",
		            "rating" : 4.41,
		            "platforms" : "PS4, PC, XBOX ONE",
		            "genres" : "Open World, RPG"
		        }, 
		        {
		            "id" : "12020",
		            "name" : "Left 4 Dead 2",
		            "background_image" : "https://media.rawg.io/media/games/c25/c25ebb8eb08790277ae2e2dce0d62174.jpg",
		            "released" : "2009-11-18",
		            "rating" : 4.1,
		            "platforms" : "PC",
		            "genres" : "Coop, Action"
		        }, 
		        {
		            "id" : "802",
		            "name" : "Borderlands 2",
		            "background_image" : "https://media.rawg.io/media/games/588/588c6bdff3d4baf66ec36b1c05b793bf.jpg",
		            "released" : "2012-11-18",
		            "rating" : 4.07,
		            "platforms" : "PC",
		            "genres" : "Coop, Action"
		        }, 
		        {
		            "id" : "4062",
		            "name" : "Bioshock Infinite",
		            "background_image" : "https://media.rawg.io/media/games/fc1/fc1307a2774506b5bd65d7e8424664a7.jpg",
		            "released" : "2013-11-18",
		            "rating" : 4.37,
		            "platforms" : "PC, PS4, SWITCH, XBOX ONE, PS3",
		            "genres" : "Action, Shooter"
		        }
    ];

    this.games = this.user.games;

	}

}
