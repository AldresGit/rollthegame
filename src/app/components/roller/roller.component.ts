import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RawgService } from '../../services/rawg.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Game } from '../../models/game';
import { Platform } from '../../models/platform';
import { Genre } from '../../models/genre';
import { Preferences } from '../../models/preferences';
import { global } from '../../services/global';

import {FormControl} from '@angular/forms';
import anime from 'animejs/lib/anime.es';

@Component({
  selector: 'app-roller',
  templateUrl: './roller.component.html',
  styleUrls: ['./roller.component.css'],
  providers: [ RawgService, UserService ]
})
export class RollerComponent implements OnInit {
	public title: string;
	public motto: string;
	public subtitle: string;
	public val_message: string;
	public preferences: Preferences;
	public selected_platform: string;
	public selected_genre: string;
	public selected_date: string;
	public initial_date: Date;
	public final_date: Date;
	public user: User;
	public game: Game;
	public platforms_api: Platform[];
	public genres_api: Genre[];
	public hidden: boolean; 
	public form_error: boolean;


	constructor(
		private _rawgService: RawgService,
		private _userService: UserService
	){
		this.title = "Don't know what to play? Then...";
		this.motto = "ROLL THE GAME";
		this.subtitle = "Let me offer you a random game according to your preferences.";
		this.val_message = "Validation error.";

		this.platforms_api = new Array<Platform>();
		this.genres_api = new Array<Genre>();

		//Inicializar preferencias base
		this.preferences = new Preferences("0", "0", "1980-01-01.2022-01-01");

		this.selected_platform = this.preferences['platforms'];
		this.selected_genre = this.preferences['genres'];
		this.selected_date = this.preferences['dates'];
		this.initial_date = this.stringConverterToDate(this.preferences['dates'].split(".")[0]);
		this.final_date = this.stringConverterToDate(this.preferences['dates'].split(".")[1]);

		//Inicializar juego para facilitar asunto
		//this.game = new Game("258323", "Melbits World", "https://media.rawg.io/media/games/f61/f618468eb87b1c62301f566b457f94b5.jpg", "2018-11-14", 0, "18", "19,4,7");

		this.initialisePlatformsAndGenres();

		this.user = null;
		this.game = null;
		this.hidden = false;
		this.form_error = false;
	}

	ngOnInit() {

		

		const cards = document.querySelectorAll('.title-card');

		const downbox = document.querySelector('#downbox');

		var observerCards = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if(entry.intersectionRatio > 0) {
					//console.log('Entra: ' + entry.target);

					anime({
			            targets: entry.target,
			            opacity: ['0', '1'],
			            translateY: -20,
					    duration: 2000
			        });	

					observerCards.unobserve(entry.target);

				}
			});
		}, {
			threshold: 0.9
		});

		cards.forEach(card => {
			observerCards.observe(card);
		});

		var observerBox = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if(entry.intersectionRatio > 0) {
					anime({
			            targets: entry.target,
			            opacity: ['0', '1'],
			            translateY: -20,
					    duration: 2000
			        });

			        observerBox.unobserve(entry.target);
				}
			});
		}, {
			threshold: 0.5
		});

		observerBox.observe(downbox);

		/*
		const images = document.querySelectorAll('.animate-me');

		observer = new IntersectionObserver((entries) => {
		  entries.forEach(entry => {
		    if (entry.intersectionRatio > 0) {
		      entry.target.classList.add('fancy');
		    } else {
		      entry.target.classList.remove('fancy');
		    }
		  });
		});

		images.forEach(image => {
		  observer.observe(image);
		});

		-------------------------------------------------------------

		anime({
            targets: donIntro,
            opacity: ['0', '1'],
            translateY: -20,
		    delay: 500,
		    duration: 2000
        });		

        anime({
        	targets: donAboutRTG,
        	opacity: ['0', '1'],
            translateY: -20,
		    delay: 1500,
		    duration: 2000
        });

        

        anime({
        	targets: donProjectTools,
        	opacity: ['0', '1'],
            translateY: -20,
		    delay: anime.stagger(200, {start: 2500}),
		    duration: 1500
        });

        ----------------------------------------------------------------


		*/

	}


	ngAfterViewInit(){
		var titlebox = document.querySelectorAll('#main-title');

		anime({
            targets: titlebox,
            opacity: ['0', '1'],
            translateY: -30,
            delay: 500,
		    duration: 2000
        });		
	}


	initialisePlatformsAndGenres() {
		this._rawgService.getPlatforms().subscribe(
			result => {
				let array = result.results;
				for(let i = 0, element; element = array[i]; i++){
					this.platforms_api.push(new Platform(element['id'], element['name'], element['slug']));
				}
				//console.log(this.platforms_api);
			},
			error => {
				console.log(<any>error);
			}
		);
		this._rawgService.getGenres().subscribe(
			result => {
				let array = result.results;
				for(let i = 0, element; element = array[i]; i++){
					this.genres_api.push(new Genre(element['id'], element['name'], element['slug']));
				}
				//console.log(this.genres_api);
			},
			error => {
				console.log(<any>error);
			}
		);
	}

	getGameEvent(){
		if(this.user != null){
			//this.preferences = this.user.preferences;
		}

		this.game = null;

	//------------------------- Scroll hacia abajo del todo ---------------------------//

		window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'});

	//------------------------- Scroll hacia abajo del todo ---------------------------//


	//----------------------------- Animacion del dado --------------------------------//


	var diceIcon = document.querySelector('#dice-icon');

	anime({
        targets: diceIcon,
        rotate: '1turn',
	    duration: 1000
    });	

	//----------------------------- Animacion del dado --------------------------------//


		var count = 0;
		var aleatorio = 0;
		var page = 0;
		var elem = 0;

		this._rawgService.getGameList(this.preferences).subscribe(
			result => {
				//console.log("Primera busqueda:");
				//console.log(result);
				count = result.count;
				if(count == 0) {
					this.showRandomGame(undefined);

				} else {
					//console.log("La cantidad de elementos es: " + count);
					aleatorio = this.getRandomNumber(0, count);
					//console.log("El numero aleatorio es: " + aleatorio);
					page = Math.floor(aleatorio / 20);
					if(page == 0) page = 1;
					elem = aleatorio % 20;
					//console.log("El juego es: " + elem);

					this._rawgService.getGameList(this.preferences, page).subscribe(
						result => {
							//-------------- Imprimir juego en cuestion ------------------
							this.showRandomGame(result.results[elem]);
							//-------------- Imprimir juego en cuestion ------------------

						},
						error => {
							console.log(<any>error);
						}
					);
				}
			},
			error => {
				console.log(<any>error);
			}
		);
	}

	getRandomNumber(min, max) {
  		return Math.round(Math.random() * (max - min) + min);
	}

	showRandomGame(elem) {
		//console.log(elem);
		if(elem == undefined) {
			let id = "0";
			let name = "No game with this parameters";
			let background_image = "../../../assets/img/space-invaders-404.jpg";
			let released = "Never";
			let rating = 0;
			let platforms_string = "No one";
			let genres_string = "No one";
			this.game = new Game(id, name, background_image, released, rating, platforms_string, genres_string);
		} else {
			let id = elem.id;
			let name = elem.name;
			let background_image = elem.background_image;
			let released = elem.released;
			let rating = elem.rating;

			var getPlatforms = "";
			for(var i = 0; i < elem.platforms.length; i++){
				getPlatforms = getPlatforms.concat(elem.platforms[i].platform.name + ", ");
			}
			let platforms_string = getPlatforms.substring(0, getPlatforms.length-2);

			var getGenres = "";
			for(var i = 0; i < elem.genres.length; i++){
				getGenres = getGenres.concat(elem.genres[i].name + ", ");
			}
			let genres_string = getGenres.substring(0, getGenres.length-2);

			this.game = new Game(id, name, background_image, released, rating, platforms_string, genres_string);
			//console.log(this.game);
		}
		

	}

	exitGame() {
		this.game = null;

		var diceIcon = document.querySelector('#dice-icon') as HTMLElement;
		diceIcon.style.transform = null;
	}

	repeat() {
		this.game = null;

		var diceIcon = document.querySelector('#dice-icon') as HTMLElement;
		diceIcon.style.transform = null;

		this.getGameEvent();
	}

	showHideForm(){
		var element = document.querySelector('#preferences_form');
		var element2 = document.querySelector('#preferences-message');
		
		if(!this.hidden){
			//console.log("Entra");
			this.hidden = true;

			anime({
	            targets: element2,
	            opacity: [1, 0],
			    duration: 500,
			    easing: 'linear'
        	});	

			anime({
	            targets: element,
	            opacity: [0, 1],
	            translateY: -40,
	            height: [0, 335],
	            visibility: 'visible',
			    duration: 800,
			    easing: 'cubicBezier(0.015, 0.705, 0.470, 0.995)'
        	});	
        	
		} else {
			//console.log("Sale");
			this.hidden = false;

			anime({
	            targets: element2,
	            opacity: [0, 1],
			    duration: 500,
			    easing: 'linear'
        	});	

			anime({
	            targets: element,
	            opacity: [1, 0],
	            height: [335, 0],
	            translateY: -10,
	            visibility: 'hidden',
			    duration: 800,
			    easing: 'cubicBezier(0.015, 0.705, 0.470, 0.995)'
        	});	
        	
		}
	}

	getPreferences(form) {
		//this.form_error = !this.form_error;
		//console.log("Plataforma: " + this.selected_platform);
		//console.log("Genero: " + this.selected_genre);

		this.preferences = new Preferences(this.selected_platform, this.selected_genre, "1980-01-01.2022-01-01");
		this.showHideForm();
		//console.log("Fecha inicial: " + this.selected_platform);
		//console.log("Fecha final: " + this.selected_platform);
	}

	dateConverterToString(date: Date) : string{
		return date.getUTCFullYear() + "-" + (date.getUTCMonth() + 1) + "-" + date.getUTCDate();
	}

	stringConverterToDate (date_unformatted: string) : Date{
		return new Date(date_unformatted);
	}
}
