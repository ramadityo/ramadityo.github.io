"use strict";var SmoothScroll=function(){function SmoothScroll(options){var _this=this;this.endThreshold=.05,this.requestId=null,this.maxDepth=10,this.viewHeight=0,this.halfViewHeight=0,this.maxDistance=0,this.scrollHeight=0,this.endScroll=0,this.currentScroll=0,this.resizeRequest=1,this.scrollRequest=0,this.scrollItems=[],this.lastTime=-1,this.maxElapsedMS=100,this.targetFPMS=.06,this._onResize=function(event){_this.resizeRequest++,_this.requestId||(_this.lastTime=performance.now(),_this.requestId=requestAnimationFrame(_this._update))},this._onScroll=function(event){_this.scrollRequest++,_this.requestId||(_this.lastTime=performance.now(),_this.requestId=requestAnimationFrame(_this._update))},this._update=function(currentTime){void 0===currentTime&&(currentTime=performance.now());var elapsedMS=currentTime-_this.lastTime;elapsedMS>_this.maxElapsedMS&&(elapsedMS=_this.maxElapsedMS);var deltaTime=elapsedMS*_this.targetFPMS,dt=1-Math.pow(1-_this.scrollEase,deltaTime),resized=_this.resizeRequest>0,scrollY=window.pageYOffset;if(resized){var height=_this.target.clientHeight;document.body.style.height=height+"px",_this.scrollHeight=height,_this.viewHeight=window.innerHeight,_this.halfViewHeight=_this.viewHeight/2,_this.maxDistance=2*_this.viewHeight,_this.resizeRequest=0}_this.endScroll=scrollY,_this.currentScroll+=(scrollY-_this.currentScroll)*dt,(Math.abs(scrollY-_this.currentScroll)<_this.endThreshold||resized)&&(_this.currentScroll=scrollY,_this.scrollRequest=0);var scrollOrigin=_this.currentScroll+_this.halfViewHeight;_this.target.style.transform="translate3d(0px,-"+_this.currentScroll+"px,0px)";for(var i=0;i<_this.scrollItems.length;i++){var item=_this.scrollItems[i],distance,offsetRatio=(scrollOrigin-item.top)/_this.maxDistance;item.endOffset=Math.round(_this.maxOffset*item.depthRatio*offsetRatio),Math.abs(item.endOffset-item.currentOffset<_this.endThreshold)?item.currentOffset=item.endOffset:item.currentOffset+=(item.endOffset-item.currentOffset)*dt,item.target.style.transform="translate3d(0px,-"+item.currentOffset+"px,0px)"}_this.lastTime=currentTime,_this.requestId=_this.scrollRequest>0?requestAnimationFrame(_this._update):null},this.target=options.target,this.scrollEase=null!=options.scrollEase?options.scrollEase:.1,this.maxOffset=null!=options.maxOffset?options.maxOffset:500,this.addItems(),window.addEventListener("resize",this._onResize),window.addEventListener("scroll",this._onScroll),this._update()}return SmoothScroll.prototype.addItems=function(){this.scrollItems=[];for(var elements=document.querySelectorAll("*[data-depth]"),i=0;i<elements.length;i++){var element=elements[i],depth=+element.getAttribute("data-depth"),rect=element.getBoundingClientRect(),item={target:element,depth:depth,top:rect.top+window.pageYOffset,depthRatio:depth/this.maxDepth,currentOffset:0,endOffset:0};this.scrollItems.push(item)}return this},SmoothScroll}();

'use strict';

const isTouchDevice = 'ontouchstart' in document.documentElement;

disableScroll();
if (!isTouchDevice) smoothScroll();

window.onresize = () => {
  resizeBodyHeight();
};

window.onload = () => {
  enableScroll();
  resizeBodyHeight();
};

// Functions

function disableScroll() {
  document.body.style.overflow = 'hidden';
}

function enableScroll() {
  document.body.style.overflow = '';
}

function smoothScroll() {
  document.querySelector('.viewport').classList.add('SmoothScroll');

  new SmoothScroll({
    target: document.querySelector('.container'),
    scrollEase: 0.08,
    maxOffset: 500,
  });
}

function resizeBodyHeight() {
  document.body.style.height = document.querySelector('.viewport').scrollHeight + 'px';
}