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
  touches : false,
  touch : false,
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
  // counterSection : 0
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
  var target = e.target, wrapper, sections, currentSection, value, offset;
  
  wrapper = priv.container.getElementsByClassName( priv.comp.wrapper )[0];
  sections = wrapper.getElementsByClassName( priv.comp.section );

  if ( target.hasAttribute( priv.label.name ) ) {
  
  if ( target.tagName.toLowerCase() === 'a' ) e.preventDefault();
  
  value = target.getAttribute( priv.label.name );

  for ( var i = 0; i <= sections.length - 1; i++ )
  if ( sections[i].hasAttribute( priv.label.name ) && 
  sections[i].getAttribute( priv.label.name ) === value )
  priv.counterSection = i;

  currentSection = sections[priv.counterSection];
  offset = currentSection.offsetTop;

  wrapper.classList.add( 'active' );
  wrapper.style.transform = 'translateY(-' + offset + 'px)';

  }
}

/* Обработчик события скролл при клике по элементу с атрибутом data- */
if ( Array.isArray( priv.label.array ) ) priv.container.addEventListener( 'click', priv.draw );

priv.container.addEventListener( 'touchstart', function ( e ) {
  
  priv.swipe.touches = e.touches;

  if ( priv.swipe.touches.length !== 1 ) return;

  priv.swipe.touch = e.changedTouches[0];

  priv.swipe.coord.start.x = priv.swipe.touch.clientX;
  priv.swipe.coord.start.y = priv.swipe.touch.clientY;

  // console.log( 'Touchstart x : ' + priv.swipe.coord.start.x ); 
  // console.log( 'Touchstart y : ' + priv.swipe.coord.start.y );

});

priv.container.addEventListener( 'touchend', function ( e ) {
  var wrapper, currentSection;

  priv.swipe.touch = e.changedTouches[0];

  priv.swipe.coord.end.x = priv.swipe.touch.clientX;
  priv.swipe.coord.end.y = priv.swipe.touch.clientY;

  wrapper = priv.container.getElementsByClassName( priv.comp.wrapper );
  currentSection = wrapper[0].getElementsByClassName( priv.comp.section );

  if ( priv.counterSection !== currentSection.length - 1 
  && priv.swipe.coord.start.y > priv.swipe.coord.end.y ) 
  ++priv.counterSection
  else if ( priv.counterSection !== 0 &&
  priv.swipe.coord.start.y < priv.swipe.coord.end.y ) 
  --priv.counterSection;

  wrapper[0].classList.add( 'active' );
  wrapper[0].style.transform = 'translateY(-'+ currentSection[priv.counterSection].offsetTop +'px)';

  // console.log( 'Touchend x : ' + priv.swipe.coord.end.x );
  // console.log( 'Touchend y : ' + priv.swipe.coord.end.y ); 
});

// End contsr
}

var full = new Full({
    container : 'full',
    label : [ 'hero', 'main', 'footer' ],
    navigator : true
});
