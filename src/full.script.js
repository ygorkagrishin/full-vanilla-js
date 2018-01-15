var Full = function ( param ) {
'use strict';

var self = this;

var priv = {};

priv.param = param;

priv.default = {
    container : 'full',
    section :  'section',
    navigator : priv.param.navigator !== undefined ? priv.param.navigator : false,
    duration : 700
}

priv.container = document.getElementById( priv.default.container );

priv.sections = priv.container.getElementsByClassName( priv.default.section );

/* В объект записываются имена классов, которые впоследствии будут присвоены новым элементам. */
priv.comp = {
    wrapper : 'js-full__wrapper',
    section : 'js-full__section',
    navigator : {
        name : 'js-full__nav',
        item : 'js-full__item',
        link : 'js-full__link'
    }
}

priv.swipe = {
  touch : false,
  start : false,
  detecting : false,
  coord : {
    start : {
      x : null,
      y : null
    },
    end : {
      x : null,
      y : null
    }
  }
}

priv.counterSection = 0;

/* Массив со значениями для data-anchor. */
priv.label = {
    name : 'data-full',
    array : priv.param.label
}

/* Динамическая обертка для секций устанавливающая их высоту равной высоте окна.
Так же метод перезаписывает priv.sections присваивая новую коллекцию элементов. */
priv.section = ( function () {
  var currentSection, clone, newSection;
  
  for ( var i = 0; i <= priv.sections.length - 1; i++) {
    currentSection = priv.sections[i],
    clone = currentSection.cloneNode( true ),
    newSection = document.createElement( 'div' );
      
    priv.container.replaceChild( newSection, currentSection );
    newSection.classList.add( priv.comp.section ),
    newSection.appendChild( clone ); }
  
  priv.sections = priv.container.getElementsByClassName( priv.comp.section );
})();

/* Динамическая обертка внутри контейнера для перемещения. */
priv.wrapper = (function () {
  var wrapper, content;

  wrapper = document.createElement( 'div' ),
  content = priv.container.innerHTML;
    
  priv.container.innerHTML= ' ';    
  priv.container.appendChild( wrapper );
  wrapper.classList.add( priv.comp.wrapper );
  wrapper.innerHTML = content;    
})();

/* Метод устанавливает высоту оберткам секций равной высоте окна. */
priv.setHeight = ( function () {
  for ( var i = 0; i <= priv.sections.length - 1; i++ ) 
    priv.sections[i].style.height = window.innerHeight + 'px';
})();


/* Если свойство объекта не undefined и является массивом, 
то метод проходит циклом по секциям и устанавливает атрибут data-anchor. */
if ( priv.label.array !== undefined && Array.isArray( priv.label.array ) )
  priv.data = (function () {
  for ( var i = 0; i <= priv.sections.length - 1; i++ )
    if ( !priv.sections[i].hasAttribute( priv.label[i] ) )
      priv.sections[i].setAttribute( priv.label.name, priv.label.array[i] );
})();

/* Метод, создает навигационную панель */
if ( priv.default.navigator && priv.label.array !== undefined && Array.isArray( priv.label.array ) )
priv.navigator = (function () {
  var navigator, item, link;

  navigator = document.createElement( 'ul' );
  priv.container.appendChild( navigator );
  navigator.classList.add( priv.comp.navigator.name );
  
  for ( var i = 0; i <= priv.label.array.length - 1; i++ ) {
    item = document.createElement( 'li' );
    navigator.appendChild( item );
    
    item.classList.add( priv.comp.navigator.item );
    link = document.createElement( 'a' );
    item.appendChild( link );
    link.classList.add( priv.comp.navigator.link );
    
  if ( !link.hasAttribute( priv.label.name ) )
    link.setAttribute( priv.label.name, priv.label.array[i] ); }
})();

/* Метод, обрабатывающий событие при клике по элементу с атрибутом data- */
priv.draw = function ( e ) {
  var target = e.target, wrapper, sections, value;
  
  wrapper = priv.container.getElementsByClassName( priv.comp.wrapper );
  sections = wrapper[0].getElementsByClassName( priv.comp.section );

  if ( target.hasAttribute( priv.label.name ) ) {
  
  if ( target.tagName.toLowerCase() === 'a' ) e.preventDefault();
  
  value = target.getAttribute( priv.label.name );
  for ( var i = 0; i <= sections.length - 1; i++ )
    if ( sections[i].hasAttribute( priv.label.name ) && 
    sections[i].getAttribute( priv.label.name ) === value )
      priv.counterSection = i;

  wrapper[0].classList.add( 'active' );
  wrapper[0].style.transform = 'translateY(-' + sections[priv.counterSection].offsetTop + 'px)';
  }
}

/* Обработчик события скролл при клике по элементу с атрибутом data- */
if ( Array.isArray( priv.label.array ) ) priv.container.addEventListener( 'click', priv.draw );

/* Метод для обработчика touchstart получает начальные координаты касания */
priv.swipeStart = function ( e ) {
    priv.swipe.touch = e.changedTouches[0];
    priv.swipe.coord.start.x = priv.swipe.touch.clientX;
    priv.swipe.coord.start.y = priv.swipe.touch.clientY;
}

priv.container.addEventListener( 'touchstart', priv.swipeStart );

/* Метод для обработчика touchend получает конечные точки касания и
сравнивает координаты по оси xy для запуска смещения wrapper */
priv.swipeEnd = function ( e ) {
  var wrapper, currentSection;

  wrapper = priv.container.getElementsByClassName( priv.comp.wrapper );
  currentSection = wrapper[0].getElementsByClassName( priv.comp.section );

  priv.swipe.touch = e.changedTouches[0];
  priv.swipe.coord.end.x = priv.swipe.touch.clientX;
  priv.swipe.coord.end.y = priv.swipe.touch.clientY;

  if ( Math.abs( priv.swipe.coord.start.x - priv.swipe.coord.end.x ) >= 
    Math.abs( priv.swipe.coord.start.y - priv.swipe.coord.end.y ) ) return;
  
  if ( priv.counterSection !== currentSection.length - 1 
  && priv.swipe.coord.start.y > priv.swipe.coord.end.y ) 
    ++priv.counterSection
  else if ( priv.counterSection !== 0 &&
  priv.swipe.coord.start.y < priv.swipe.coord.end.y ) 
    --priv.counterSection;

  wrapper[0].classList.add( 'active' );
  wrapper[0].style.transform = 'translateY(-' + currentSection[priv.counterSection].offsetTop + 'px)';

}

priv.container.addEventListener( 'touchend', priv.swipeEnd );

// End contsr
}

var full = new Full({
    container : 'full',
    label : [ 'hero', 'main', 'footer' ],
    navigator : true
});
