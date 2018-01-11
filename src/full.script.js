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

// В объект записываются имена классов, которые впоследствии будут присвоены новым элементам.
priv.comp = {
    wrapper : 'js-full__wrapper',
    section : 'js-full__section',
    navigator : {
        name : 'js-full__nav',
        item : 'js-full__item',
        link : 'js-full__link'
    }
}

// Массив со значениями для data-anchor.
priv.anchor = {
    name : 'data-anchor',
    array : priv.param.anchor
}

// Динамическая обертка для секций устанавливающая их высоту равной высоте окна.
// Так же метод перезаписывает priv.sections присваивая новую коллекцию элементов.
priv.section = ( function () {
  for ( var i = 0; i <= priv.sections.length - 1; i++) {
  var currentSection = priv.sections[i],
      clone = currentSection.cloneNode( true ),
      newSection = document.createElement( 'div' );
      
  priv.container.replaceChild( newSection, currentSection );
  newSection.classList.add( priv.comp.section ),
  newSection.appendChild( clone ); }
  
  priv.sections = priv.container.getElementsByClassName( priv.comp.section );
})();

// Динамическая обертка внутри контейнера для перемещения.
priv.wrapper = (function () {
  var wrapper = document.createElement( 'div' ),
      content = priv.container.innerHTML;
    
  priv.container.innerHTML= ' ';    
  priv.container.appendChild( wrapper );
  wrapper.classList.add( priv.comp.wrapper );
  wrapper.innerHTML = content;    
})();

// Метод устанавливает высоту оберткам секций равной высоте окна.
priv.setHeight = ( function () {
  for ( var i = 0; i <= priv.sections.length - 1; i++ ) 
    priv.sections[i].style.height = window.innerHeight + 'px';
})();


// Если свойство объекта не undefined и массив, то метод проходит циклом по секциям и устанавливает
// атрибут data-anchor.
if ( priv.anchor.array !== undefined && Array.isArray( priv.anchor.array ) )
priv.data = (function () {
  for ( var i = 0; i <= priv.sections.length - 1; i++ )
    if ( !priv.sections[i].hasAttribute( priv.anchor[i] ) )
      priv.sections[i].setAttribute( priv.anchor.name, priv.anchor.array[i] );
})();

// Метод создает навигационную панель
if ( priv.default.navigator && priv.anchor.array !== undefined && Array.isArray( priv.anchor.array ) )
priv.navigator = (function () {
  
  var navigator = document.createElement( 'ul' ), item, link;
  priv.container.appendChild( navigator );
  navigator.classList.add( priv.comp.navigator.name );
  
  for ( var i = 0; i <= priv.anchor.array.length - 1; i++ ) {
    item = document.createElement( 'li' );
    navigator.appendChild( item );
    
    item.classList.add( priv.comp.navigator.item );
    link = document.createElement( 'a' );
    item.appendChild( link );
    link.classList.add( priv.comp.navigator.link );
    
    if ( !link.hasAttribute( priv.anchor.name ) )
      link.setAttribute( priv.anchor.name, priv.anchor.array[i] );
  }
})();

// Метод обрабатывающий событие при клике по элементу с атрибутом data-
priv.draw = function ( e ) {
  var target = e.target, wrap, getValue, offset;

  if ( target.hasAttribute( priv.anchor.name ) ) { 
    if ( target.tagName.toLowerCase() === 'a' ) e.preventDefault();
    getValue = target.getAttribute( priv.anchor.name );
      
    for ( var i = 0; i<= priv.sections.length - 1; i++ ) { 
      if ( priv.sections[i].hasAttribute( priv.anchor.name ) ) { 
        if ( priv.sections[i].getAttribute( priv.anchor.name ) === getValue ) {
          offset = priv.sections[i].offsetTop;
          wrap = priv.container.getElementsByClassName( priv.comp.wrapper );
          wrap[0].style.transform = 'translateY(-'+ offset +'px)';
          wrap[0].classList.add( 'active' );
        }
      }
    }
  }
}

// Обработчик события скролл при клике по элементу с атрибутом data-
if ( Array.isArray( priv.anchor.array ) ) priv.container.addEventListener( 'click', priv.draw );

}

var full = new Full({
    container : 'full',
    anchor : [ 'hero', 'main', 'footer' ],
    navigator : true
});
