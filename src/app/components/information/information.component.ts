import { Component, OnInit, AfterViewInit } from '@angular/core';
import anime from 'animejs/lib/anime.es';
import {
	trigger,
	state,
	style,
	animate,
	transition
} from '@angular/animations';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
	public introduction: string;
	public aboutRTG: string;
	public angularText: string;
	public firebaseText: string;
	public rawgText: string;
	public animejsText: string;

	constructor() {
		this.introduction = "Project developed by Aldres as a practice when implementing various technologies focused on the visual section.";

		this.aboutRTG = "About Roll The Game";

		this.angularText = "This Web Application has been developed using the Angular 8 Framework, " + 
								"storing the information in a Non-Relational database with MongoDB (in development).";

		this.firebaseText = "Roll The Game has been deployed in Firebase to facilitate access for " + 
								"anyone interested in the application through Google's servers.";

		this.rawgText = "The search for random games is executed with the API of the well-known "+
							"RAWG video game database, which currently has more than 360,000 games.";	

		this.animejsText = "To give a more interesting visual style to the Front-end, the AnimeJs animation library" + 
								" developed by Julian Garnier has been implemented and used.";	

	}

	ngOnInit() {

		const cards = document.querySelectorAll('.project-tool');

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

	}

	ngAfterViewInit(){
		
		var donIntro = document.querySelector('#intro');
		var donAboutRTG = document.querySelector('.border-title');
		var titlebox = document.querySelectorAll('#information-title');

		anime({
            targets: titlebox,
            opacity: ['0', '1'],
            translateY: -50,
            delay: 500,
		    duration: 2000
        });		

		anime({
            targets: donIntro,
            opacity: ['0', '1'],
            translateY: -20,
		    delay: 1000,
		    duration: 2000
        });		

        anime({
        	targets: donAboutRTG,
        	opacity: ['0', '1'],
            translateY: -20,
		    delay: 1300,
		    duration: 2000
        });
		
	}

}
