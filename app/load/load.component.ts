import {Component, ElementRef} from 'angular2/core';
import {Router, ComponentInstruction} from 'angular2/router';
import {Observable} from 'rxjs/Rx';

@Component({
    selector: 'load',
    template: ` <div id="load-screen">
                  <div class="container">
                    <div class="wrap">
                      <div class="left">{{percLoaded}}</div>
                      <div class="right">{{percLoaded}}</div>
                    </div>
                  </div>
                </div>
              `
})

export class Load {
  percLoaded : number;
  totalSize : number;
  numLoaded : number;
  assets : Object[];


  constructor( public _router : Router, public elem : ElementRef ) {
    this.assets = [
      {
        uri: 'assets/images/loading-screen.jpg',
        type: 'image',
        size: 60
      },
      {
        uri: 'assets/images/globatron/GLOBATRON_SCOREBOARD.png',
        type: 'image',
        size: 456
      },
      {
        uri: 'assets/images/globatron/GLOBATRON_WALL_Top.png',
        type: 'image',
        size: 1800
      },
      {
        uri: 'assets/images/globatron/GLOBATRON_WALL.jpg',
        type: 'image',
        size: 1800
      },
      {
        uri: 'assets/video/Globatron_Vid_1_Final.mp4',
        type: 'video',
        size: 12800
      },
      {
        uri: 'assets/video/Background_Sky_Final.mp4',
        type: 'video',
        size: 3300
      },
      {
        uri: 'assets/video/intro.mp4',
        type: 'video',
        size: 4400
      },
      {
        uri: 'assets/video/Audience_Loop_Final_2.mp4',
        type: 'video',
        size: 3700
      },
      {
        uri: 'assets/video/STOCK_TICKER_LOOP_FINAL.mp4',
        type: 'video',
        size: 4000
      }

    ];
    // initiate values
    this.numLoaded= 0;
    this.totalSize = 0;
    this.percLoaded = 0;
    // save context
    var _this = this;
    // get total size of assets
    this.assets.forEach(function(asset) {
      _this.totalSize += asset.size;
    });
    console.log('Total size: ' + this.totalSize);
    // assign percentage of 100% to each asset
    this.assets.forEach(function(asset) {
      asset.perc = Math.round(asset.size / _this.totalSize * 100);
    });
    // move on to load
    this.loadFiles();
  }

  loadFiles() {
    var _this = this;
    // load assets
    this.assets.forEach(function(asset) {
      // console.log('Preloading: ', asset.uri, asset.perc);
      /* images  ----------------------------------------------------------- */
      if (asset.type === 'image') {
        var img = new Image();
        img.onload = function() {
          _this.numLoaded++;
          _this.percLoaded += asset.perc;
          if (_this.numLoaded === _this.assets.length) {
            setTimeout(function() { _this.finish() }, 1000);
          }
          //console.log(thisapp.percLoaded);
        };
        img.src = asset.uri;
      }
      /* video  ----------------------------------------------------------- */
      else if (asset.type === 'video') {
        var video = document.createElement( 'video' );
        // play inline if on an iphone (only works for native/hybrid apps)
        var attr = document.createAttribute('webkit-playsinline');
        attr.value = 'true';
        video.setAttributeNode(attr);
        video.addEventListener('loadeddata', function() {
          _this.numLoaded++;
          _this.percLoaded += asset.perc;
          if (_this.numLoaded === _this.assets.length) {
            setTimeout(function() { _this.finish() }, 1000);
          }
          //console.log(thisapp.percLoaded);
        }, false);
      	video.src = asset.uri;
      	video.load();
      }
    });
  }

  finish() {
    var event = document.createEvent('Event');
    event.initEvent('setForIntro', true, true);
    this.elem.nativeElement.dispatchEvent(event);
    this._router.navigate( ['Intro'] );
  }

  routerOnActivate(next: ComponentInstruction, prev: ComponentInstruction) {
    return Observable.of(true).delay(100).toPromise();
  }

  routerOnDeactivate(next: ComponentInstruction, prev: ComponentInstruction) {
    return Observable.of(true).delay(200).toPromise();
  }

}