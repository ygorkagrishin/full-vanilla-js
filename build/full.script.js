var Full=function(e){"use strict";var t,a,n,l,o={};o.param=e,o.default={container:"full",section:"section",navigator:void 0!==o.param.navigator&&o.param.navigator,duration:void 0!==o.param.duration?o.param.duration:700},o.container=document.getElementById(o.default.container),o.sections=o.container.getElementsByClassName(o.default.section),o.comp={wrap:{cls:"js-full__wrapper",el:null},sect:{cls:"js-full__section",el:null},nav:{list:{cls:"js-full__nav",el:null},item:{cls:"js-full__item",el:null},link:{cls:"js-full__link",el:null}}},o.swipe={touch:!1,coord:{start:{x:null,y:null},end:{x:null,y:null}}},o.label={name:"data-full",array:o.param.label},o.counterSection=0,o.wrap=(t=document.createElement("div"),a=o.container.innerHTML,o.container.innerHTML=" ",o.container.appendChild(t),t.classList.add(o.comp.wrap.cls),t.innerHTML=a,void(o.comp.wrap.el=o.container.getElementsByClassName(o.comp.wrap.cls))),o.section=function(){for(var e,t,a,n=0;n<=o.sections.length-1;n++)a=(e=o.sections[n]).cloneNode(!0),t=document.createElement("div"),o.comp.wrap.el[0].replaceChild(t,e),t.classList.add(o.comp.sect.cls),t.appendChild(a);o.comp.sect.el=o.container.getElementsByClassName(o.comp.sect.cls)}(),o.setHeight=function(){for(var e=0;e<=o.comp.sect.el.length-1;e++)o.comp.sect.el[e].style.height=window.innerHeight+"px"}(),o.data=function(){for(var e=0;e<=o.sections.length-1;e++)o.comp.sect.el[e].hasAttribute(o.label[e])||o.comp.sect.el[e].setAttribute(o.label.name,o.label.array[e])},void 0!==o.label.array&&Array.isArray(o.label.array)&&o.data(),o.navigator=function(){var e,t,a,n,l;e=document.createElement("ul"),o.container.appendChild(e),e.classList.add(o.comp.nav.list.cls);for(var c=0;c<=o.label.array.length-1;c++)t=document.createElement("li"),e.appendChild(t),t.classList.add(o.comp.nav.item.cls),a=document.createElement("a"),t.appendChild(a),a.classList.add(o.comp.nav.link.cls),a.hasAttribute(o.label.name)||a.setAttribute(o.label.name,o.label.array[c]);n=Math.round(o.container.offsetHeight/2),l=Math.round(e.offsetHeight/2),e.style.top=n-l+"px",o.comp.nav.list.el=o.container.getElementsByClassName(o.comp.nav.list.cls),o.comp.nav.item.el=o.comp.nav.list.el[0].getElementsByClassName(o.comp.nav.item.cls),o.comp.nav.link.el=o.comp.nav.list.el[0].getElementsByClassName(o.comp.nav.link.cls)},o.default.navigator&&Array.isArray(o.label.array)&&o.navigator(),o.default.navigator&&Array.isArray(o.label.array)&&(o.isActive=function(){for(var e=0;e<=o.comp.nav.link.el.length-1;e++)o.comp.nav.link.el[e].classList.contains("active")&&o.comp.nav.link.el[e].classList.remove("active");o.comp.nav.link.el[o.counterSection].classList.add("active")}),o.default.navigator&&Array.isArray(o.label.array)&&o.isActive(),o.move=function(){o.isActive(),o.comp.wrap.el[0].classList.add("active"),o.comp.wrap.el[0].style.transform="translateY(-"+o.comp.sect.el[o.counterSection].offsetTop+"px)",o.comp.wrap.el[0].style.transition="all "+o.default.duration+"ms ease-out",setTimeout(function(){o.comp.wrap.el[0].style.transition=null,o.comp.wrap.el[0].classList.remove("active")},o.default.duration)},o.moveTo=function(e){var t,a=e.target;if(a.hasAttribute(o.label.name)){"a"===a.tagName.toLowerCase()&&e.preventDefault(),t=a.getAttribute(o.label.name);for(var n=0;n<=o.sections.length-1;n++)o.comp.sect.el[n].hasAttribute(o.label.name)&&o.comp.sect.el[n].getAttribute(o.label.name)===t&&(o.counterSection=n);o.isActive(),o.move()}},Array.isArray(o.label.array)&&o.container.addEventListener("click",o.moveTo),o.swipeStart=function(e){o.swipe.touch=e.changedTouches[0],o.swipe.coord.start.x=o.swipe.touch.clientX,o.swipe.coord.start.y=o.swipe.touch.clientY},o.container.addEventListener("touchstart",o.swipeStart),o.container.addEventListener("touchmove",function(e){e.preventDefault()}),o.swipeEnd=function(e){o.swipe.touch=e.changedTouches[0],o.swipe.coord.end.x=o.swipe.touch.clientX,o.swipe.coord.end.y=o.swipe.touch.clientY,Math.abs(o.swipe.coord.start.x-o.swipe.coord.end.x)>=Math.abs(o.swipe.coord.start.y-o.swipe.coord.end.y)||(o.counterSection!==o.comp.sect.el.length-1&&o.swipe.coord.start.y>o.swipe.coord.end.y?(++o.counterSection,o.move()):0!==o.counterSection&&o.swipe.coord.start.y<o.swipe.coord.end.y&&(--o.counterSection,o.move()))},o.container.addEventListener("touchend",o.swipeEnd),o.resize=(l=function(e){var t,a;n||(l=setTimeout(function(){n=null;for(var e=0;e<=o.comp.sect.el.length-1;e++)o.comp.sect.el[e].style.height=window.innerHeight+"px";t=Math.round(o.container.offsetHeight/2),a=Math.round(o.comp.nav.list.el[0].offsetHeight/2),o.comp.nav.list.el[0].style.top=t-a+"px",o.comp.wrap.el[0].style.transform="translateY(-"+o.comp.sect.el[o.counterSection].offsetTop+"px)"},69))},void window.addEventListener("resize",l))},full=new Full({container:"full",label:["main","1","2","3"],navigator:!0});