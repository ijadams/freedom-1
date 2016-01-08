import {Component, Output, ViewEncapsulation, ElementRef, EventEmitter} from 'angular2/core';
import {Observable} from 'rxjs/Rx';
import {ComponentInstruction} from 'angular2/router';
import {DataService} from '../data/data.service';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'scoreboard',
    template: ` <div id="jumbotron" class="desktop">
                  <div class="screen-wrap">
                      <div class="stats-wrap">
                        <div class="stats-container">
                          <div class="stat"><span class="target">{{data.lastTarget}}</span></div>
                          <div class="stat"><span class="date">{{data.lastDate}}</span></div>
                          <div class="stat"><span class="kills">{{data.lastKills}}</span></div>
                          <div class="stat"><span class="total-kills">{{data.totalKills}}</span></div>
                        </div>
                      </div>
                      <!-- movie -->
                      <div class="video">
                        <video id="jumbo-main" autoplay loop>
                          <source src="http://jdreckley.cachefly.net/freedom/assets/video/Globatron_Video_1_Final_2_23RF.mp4" type="video/mp4">
                        </video>
                      </div>
                      <!-- end movie -->
                      <!-- right side -->
                      <div class=""></div>
                      <!-- end right side -->
                  </div>
                  <div class="ticker-wrap">
                    <div class="ticker-container">
                      <span>{{data.homeTicker}}</span>
                      <video id="ticker" class="bg-vid" autoplay loop>
                        <source src="http://jdreckley.cachefly.net/freedom/assets/video/STOCK_TICKER_LOOP_FINAL.mp4" type="video/mp4">
                      </video>
                    </div>
                  </div>
              </div>
              `
})

export class Scoreboard {
  jumbotron : Object;
  ticker : Object;
  active : Boolean;
  info : Object;

  constructor( public data : DataService ) {
    console.log('Constructing Scoreboard', data);
    this.jumbotron = document.getElementById('jumbo-main');
    this.jumbotron.play();
    this.ticker = document.getElementById('ticker');
    this.ticker.play();

    setTimeout(function() {console.log('Data', data.lastTarget)}, 2000);
  }

  routerOnActivate(next: ComponentInstruction, prev: ComponentInstruction) {
    return Observable.of(true).delay(400).toPromise();
  }

  routerOnDeactivate(next: ComponentInstruction, prev: ComponentInstruction) {
    return Observable.of(true).delay(400).toPromise();
  }

}
