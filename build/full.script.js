var Full=function(e){"use strict";var t,a,n={};n.param=e,n.default={container:"full",section:"section",navigator:void 0!==n.param.navigator&&n.param.navigator,duration:700},n.container=document.getElementById(n.default.container),n.sections=n.container.getElementsByClassName(n.default.section),n.comp={wrapper:"js-full__wrapper",section:"js-full__section",navigator:{name:"js-full__nav",item:"js-full__item",link:"js-full__link"}},n.swipe={touches:!1,touch:!1,coord:{start:{x:null,y:null},end:{x:null,y:null}}},n.counterSection=0,n.label={name:"data-full",array:n.param.label},n.section=function(){for(var e,t,a,r=0;r<=n.sections.length-1;r++)t=(e=n.sections[r]).cloneNode(!0),a=document.createElement("div"),n.container.replaceChild(a,e),a.classList.add(n.comp.section),a.appendChild(t);n.sections=n.container.getElementsByClassName(n.comp.section)}(),n.wrapper=(t=document.createElement("div"),a=n.container.innerHTML,n.container.innerHTML=" ",n.container.appendChild(t),t.classList.add(n.comp.wrapper),void(t.innerHTML=a)),n.setHeight=function(){for(var e=0;e<=n.sections.length-1;e++)n.sections[e].style.height=window.innerHeight+"px"}(),void 0!==n.label.array&&Array.isArray(n.label.array)&&(n.data=function(){for(var e=0;e<=n.sections.length-1;e++)n.sections[e].hasAttribute(n.label[e])||n.sections[e].setAttribute(n.label.name,n.label.array[e])}()),n.default.navigator&&void 0!==n.label.array&&Array.isArray(n.label.array)&&(n.navigator=function(){var e,t,a;e=document.createElement("ul"),n.container.appendChild(e),e.classList.add(n.comp.navigator.name);for(var r=0;r<=n.label.array.length-1;r++)t=document.createElement("li"),e.appendChild(t),t.classList.add(n.comp.navigator.item),a=document.createElement("a"),t.appendChild(a),a.classList.add(n.comp.navigator.link),a.hasAttribute(n.label.name)||a.setAttribute(n.label.name,n.label.array[r])}()),n.draw=function(e){var t,a,r,o,i=e.target;if(a=(t=n.container.getElementsByClassName(n.comp.wrapper)[0]).getElementsByClassName(n.comp.section),i.hasAttribute(n.label.name)){"a"===i.tagName.toLowerCase()&&e.preventDefault(),r=i.getAttribute(n.label.name);for(var l=0;l<=a.length-1;l++)a[l].hasAttribute(n.label.name)&&a[l].getAttribute(n.label.name)===r&&(n.counterSection=l);o=a[n.counterSection].offsetTop,t.classList.add("active"),t.style.transform="translateY(-"+o+"px)"}},Array.isArray(n.label.array)&&n.container.addEventListener("click",n.draw),n.container.addEventListener("touchstart",function(e){n.swipe.touches=e.touches,1===n.swipe.touches.length&&(n.swipe.touch=e.changedTouches[0],n.swipe.coord.start.x=n.swipe.touch.clientX,n.swipe.coord.start.y=n.swipe.touch.clientY)}),n.container.addEventListener("touchend",function(e){var t,a;n.swipe.touch=e.changedTouches[0],n.swipe.coord.end.x=n.swipe.touch.clientX,n.swipe.coord.end.y=n.swipe.touch.clientY,a=(t=n.container.getElementsByClassName(n.comp.wrapper))[0].getElementsByClassName(n.comp.section),n.counterSection!==a.length-1&&n.swipe.coord.start.y>n.swipe.coord.end.y?++n.counterSection:0!==n.counterSection&&n.swipe.coord.start.y<n.swipe.coord.end.y&&--n.counterSection,t[0].classList.add("active"),t[0].style.transform="translateY(-"+a[n.counterSection].offsetTop+"px)"})},full=new Full({container:"full",label:["hero","main","footer"],navigator:!0});