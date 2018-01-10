var Full = function ( param ) {
'use strict';

var self = this;

var priv = {};

priv.param = param;

priv.default = {
    container : priv.param.container !== undefined ? priv.param.container : 'full',
    section : priv.param.section !== undefined ? priv.param.section : 'section'
}

priv.container = document.getElementById( priv.default.container );

priv.sections = priv.container.getElementsByClassName( priv.default.section );

// В объект записываются имена классов, которые впоследствии будут присвоены новым элементам.
priv.comp = {
    wrapper : 'js-full__wrapper',
    section : 'js-full__section',
    navigator : 'js-full__list'
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
if ( priv.anchor !== undefined && Array.isArray( priv.anchor.array ) )
priv.data = (function () {
  for ( var i = 0; i <= priv.sections.length - 1; i++ )
    if ( !priv.sections[i].hasAttribute( priv.anchor[i] ) )
      priv.sections[i].setAttribute( priv.anchor.name, priv.anchor.array[i] );
})();

}

var full = new Full({
    container : 'full',
    anchor : [ 'hero', 'main', 'footer' ]
});