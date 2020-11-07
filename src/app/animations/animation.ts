import {
  animation, trigger, animateChild, group,
  transition, animate, style, query
} from '@angular/animations';

export const transAnimation = animation([
  style({
    height: '{{ height }}',
    opacity: '{{ opacity }}',
    backgroundColor: '{{ backgroundColor }}'
  }),
  animate('{{ time }}')
]);

// Routable animations
export const slideInAnimation =
  trigger('routeAnimations', [
    transition('LoadingPage => HomePage', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          opacity: 1,
          width: '100%'
        })
      ], { optional: true }),
      query(':enter', [
        style({ opacity: 0})
      ]),
      query(':leave', animateChild(), { optional: true }),
      group([
        query(':leave', [
          animate('500ms ease-out', style({opacity: 0}))
        ], { optional: true }),
        query(':enter', [
          animate('500ms ease-out', style({ opacity: 1}))
        ])
      ]),
      query(':enter', animateChild()),
    ]),


    transition('* => GamesPage, AboutPage => HomePage', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ], { optional: true }),
      query(':enter', [
        style({ left: '-100%'})
      ]),
      query(':leave', animateChild(), { optional: true }),
      group([
        query(':leave', [
          animate('500ms ease-out', style({ left: '100%'}))
        ], { optional: true }),
        query(':enter', [
          animate('500ms ease-out', style({ left: '0%'}))
        ])
      ]),
      query(':enter', animateChild()),
    ]),
    transition('* => AboutPage, GamesPage => HomePage', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ right: '-100%'})
      ]),
      query(':leave', animateChild(), { optional: true }),
      group([
        query(':leave', [
          animate('500ms ease-out', style({ right: '100%'}))
        ], { optional: true }),
        query(':enter', [
          animate('500ms ease-out', style({ right: '0%'}))
        ])
      ]),
      query(':enter', animateChild()),
    ])
  ]);
