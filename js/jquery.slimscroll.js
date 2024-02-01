!function(R){R.fn.extend({slimScroll:function(S){var E=R.extend({width:"auto",height:"250px",size:"7px",color:"#000",position:"right",distance:"1px",start:"top",opacity:.4,alwaysVisible:!1,disableFadeOut:!1,railVisible:!1,railColor:"#333",railOpacity:.2,railDraggable:!0,railClass:"slimScrollRail",barClass:"slimScrollBar",wrapperClass:"slimScrollDiv",allowPageScroll:!1,wheelStep:20,touchScrollStep:200,borderRadius:"7px",railBorderRadius:"7px"},S);return this.each(function(){var o,e,s,i,a,r,l,n,c="<div></div>",h=30,u=!1,p=R(this);if(p.parent().hasClass(E.wrapperClass)){var d=p.scrollTop();if(b=p.parent().find("."+E.barClass),v=p.parent().find("."+E.railClass),x(),R.isPlainObject(S)){if("height"in S&&"auto"==S.height){p.parent().css("height","auto"),p.css("height","auto");var g=p.parent().parent().height();p.parent().css("height",g),p.css("height",g)}if("scrollTo"in S)d=parseInt(E.scrollTo);else if("scrollBy"in S)d+=parseInt(E.scrollBy);else if("destroy"in S)return b.remove(),v.remove(),void p.unwrap();y(d,!1,!0)}}else if(!(R.isPlainObject(S)&&"destroy"in S)){E.height="auto"==E.height?p.parent().height():E.height;var f=R(c).addClass(E.wrapperClass).css({position:"relative",overflow:"hidden",width:E.width,height:E.height});p.css({overflow:"hidden",width:E.width,height:E.height});var v=R(c).addClass(E.railClass).css({width:E.size,height:"100%",position:"absolute",top:0,display:E.alwaysVisible&&E.railVisible?"block":"none","border-radius":E.railBorderRadius,background:E.railColor,opacity:E.railOpacity,zIndex:90}),b=R(c).addClass(E.barClass).css({background:E.color,width:E.size,position:"absolute",top:0,opacity:E.opacity,display:E.alwaysVisible?"block":"none","border-radius":E.borderRadius,BorderRadius:E.borderRadius,MozBorderRadius:E.borderRadius,WebkitBorderRadius:E.borderRadius,zIndex:99}),w="right"==E.position?{right:E.distance}:{left:E.distance};v.css(w),b.css(w),p.wrap(f),p.parent().append(b),p.parent().append(v),E.railDraggable&&b.bind("mousedown",function(e){var i=R(document);return s=!0,t=parseFloat(b.css("top")),pageY=e.pageY,i.bind("mousemove.slimscroll",function(e){currTop=t+e.pageY-pageY,b.css("top",currTop),y(0,b.position().top,!1)}),i.bind("mouseup.slimscroll",function(e){s=!1,H(),i.unbind(".slimscroll")}),!1}).bind("selectstart.slimscroll",function(e){return e.stopPropagation(),e.preventDefault(),!1}),v.hover(function(){C()},function(){H()}),b.hover(function(){e=!0},function(){e=!1}),p.hover(function(){o=!0,C(),H()},function(){o=!1,H()}),p.bind("touchstart",function(e,t){e.originalEvent.touches.length&&(a=e.originalEvent.touches[0].pageY)}),p.bind("touchmove",function(e){(u||e.originalEvent.preventDefault(),e.originalEvent.touches.length)&&(y((a-e.originalEvent.touches[0].pageY)/E.touchScrollStep,!0),a=e.originalEvent.touches[0].pageY)}),x(),"bottom"===E.start?(b.css({top:p.outerHeight()-b.outerHeight()}),y(0,!0)):"top"!==E.start&&(y(R(E.start).position().top,null,!0),E.alwaysVisible||b.hide()),function(){window.addEventListener?(this.addEventListener("DOMMouseScroll",m,!1),this.addEventListener("mousewheel",m,!1)):document.attachEvent("onmousewheel",m)}()}function m(e){if(o){var t=0;(e=e||window.event).wheelDelta&&(t=-e.wheelDelta/120),e.detail&&(t=e.detail/3);var i=e.target||e.srcTarget||e.srcElement;R(i).closest("."+E.wrapperClass).is(p.parent())&&y(t,!0),e.preventDefault&&!u&&e.preventDefault(),u||(e.returnValue=!1)}}function y(e,t,i){u=!1;var o=e,s=p.outerHeight()-b.outerHeight();if(t&&(o=parseInt(b.css("top"))+e*parseInt(E.wheelStep)/100*b.outerHeight(),o=Math.min(Math.max(o,0),s),o=0<e?Math.ceil(o):Math.floor(o),b.css({top:o+"px"})),o=(l=parseInt(b.css("top"))/(p.outerHeight()-b.outerHeight()))*(p[0].scrollHeight-p.outerHeight()),i){var a=(o=e)/p[0].scrollHeight*p.outerHeight();a=Math.min(Math.max(a,0),s),b.css({top:a+"px"})}p.scrollTop(o),p.trigger("slimscrolling",~~o),C(),H()}function x(){r=Math.max(p.outerHeight()/p[0].scrollHeight*p.outerHeight(),h),b.css({height:r+"px"});var e=r==p.outerHeight()?"none":"block";b.css({display:e})}function C(){if(x(),clearTimeout(i),l==~~l){if(u=E.allowPageScroll,n!=l){var e=0==~~l?"top":"bottom";p.trigger("slimscroll",e)}}else u=!1;n=l,r>=p.outerHeight()?u=!0:(b.stop(!0,!0).fadeIn("fast"),E.railVisible&&v.stop(!0,!0).fadeIn("fast"))}function H(){E.alwaysVisible||(i=setTimeout(function(){E.disableFadeOut&&o||e||s||(b.fadeOut("slow"),v.fadeOut("slow"))},1e3))}}),this}}),R.fn.extend({slimscroll:R.fn.slimScroll})}(jQuery);