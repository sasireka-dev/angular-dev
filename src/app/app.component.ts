import { animate, group, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { AlertComponent } from './alert.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger('divState', [
      state('normal', style({
        backgroundColor: 'red',
        transform: 'translateX(0)'
      })),
      state('highlight', style({
        'background-color': 'blue',
        transform: 'translateX(100px)'
      })),
      transition('normal<=>highlight', animate(300)),
      // transition('highlight=>normal', animate(500)),
    ]),
    trigger('wildState', [
      state('normal', style({
        backgroundColor: 'red',
        transform: 'translateX(0) scale(1)'
      })),
      state('highlight', style({
        backgroundColor: 'blue',
        transform: 'translateX(100px) scale(1)'
      })),
      state('shrunken', style({
        backgroundColor: 'green',
        transform: 'translateX(0) scale(0.5)'
      })),
      transition('normal => highlight', animate(300)),
      transition('highlight => normal', animate(500)),
      transition('shrunken <=> *', [
        style({
          backgroundColor: 'orange'
        }),
        animate(1000, style({
          'border-radius': '50px'
        })),
        animate(2000)
      ])
    ]),
    trigger('list1', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100px)'
        }),
        animate(500)]),
      transition('* => void',
        animate(500, style({
          opacity: 0,
          transform: 'translateX(100px)'
        }))),
      // transition('highlight=>normal', animate(500)),
    ]),
    trigger('list2', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        animate(1000, keyframes([
          style({
            transform: 'translateX(-100px)',
            opacity: 0,
            offset: 0
          }),
          style({
            transform: 'translateX(-50px)',
            opacity: 0.5,
            offset: 0.3
          }),
          style({
            transform: 'translateX(-20px)',
            opacity: 0.8,
            offset: 0.8
          }),
          style({
            transform: 'translateX(0px)',
            opacity: 1,
            offset: 1
          })
        ])),
      ]),
      transition('* => void', [
        group([
          animate(500, style({
            color: 'red'
          })),
          animate(800, style({
            opacity: 0,
            transform: 'translateX(100px)'
          }))
        ]),
      ])

      // transition('highlight=>normal', animate(500)),
    ]),
  ]
})
export class AppComponent {
  list = ['Milk', 'Sugar', 'Bread'];
  state = 'normal';
  wildState = 'normal';
  content: string;


  constructor(inj: Injector) {
    const alertElement = createCustomElement(AlertComponent, { injector: inj })
    customElements.define('my-alert', alertElement)
    setTimeout(() => {
      // this.content = "<p>This is a paragraph</p>"
      this.content = "<my-alert message='Rendered dynamically'></my-alert>"
    }, 1000)
  }
  onAdd(item) {
    this.list.push(item);
  }
  onAnimate() {
    this.state = this.state === 'normal' ? 'highlight' : 'normal';
    this.wildState = this.wildState === 'normal' ? 'highlight' : 'normal';
  }
  onShrunk() {
    this.wildState = 'shrunken';
  }
  onDelete(item) {
    this.list.splice(this.list.indexOf(item), 1);
  }
  animateDone(event) {
    console.log(event);
  }
  animateStart(event) {
    console.log(event)
  }
}
