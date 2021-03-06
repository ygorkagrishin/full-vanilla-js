var Full = function ( param ) {
'use strict';

var self = this;

var priv = {};

priv.param = param;

priv.default = {
    container : 'full',
    section :  'section',
    navigator : priv.param.navigator !== undefined ? priv.param.navigator : false,
    duration : priv.param.duration !== undefined ? priv.param.duration : 700
}

priv.container = document.getElementById( priv.default.container );

priv.sections = priv.container.getElementsByClassName( priv.default.section );

/* В объект записываются имена классов, которые впоследствии будут присвоены новым элементам. */
priv.comp = {
  wrap : {
    cls : 'js-full__wrapper',
    el : null
  },
  sect : {
    cls : 'js-full__section',
    el : null
  },
  nav : {
    list : {
      cls : 'js-full__nav',
      el : null
    },
    item : {
      cls : 'js-full__item',
      el : null
    },
    link : {
      cls : 'js-full__link',
      el : null
    }
  }
}

priv.swipe = {
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
}

/* Массив со значениями для data-anchor. */
priv.label = {
    name : 'data-full',
    array : priv.param.label
}

/* Счетчик секций */
priv.counterSection = 0;

/* Динамическая обертка внутри контейнера для перемещения. В которой будут хрониться только секции */
priv.wrap = ( function () {
  var wrap, content;

  wrap = document.createElement( 'div' ),
  content = priv.container.innerHTML;
    
  priv.container.innerHTML= ' ';    
  priv.container.appendChild( wrap );
  wrap.classList.add( priv.comp.wrap.cls );
  wrap.innerHTML = content;   
  
  priv.comp.wrap.el = priv.container.getElementsByClassName( priv.comp.wrap.cls );
})();

/* Динамическая обертка для секций устанавливающая их высоту равной высоте окна.
Так же метод записывает новую коллекцию элементов в свойсвто comp. */
priv.section = ( function () {
  var currentSection, newSection, clone;

  for ( var i = 0; i <= priv.sections.length - 1; i++) {
    currentSection = priv.sections[i],
    clone = currentSection.cloneNode( true ),
    newSection = document.createElement( 'div' );
      
    priv.comp.wrap.el[0].replaceChild( newSection, currentSection );
    newSection.classList.add( priv.comp.sect.cls ),
    newSection.appendChild( clone ); }
  
  priv.comp.sect.el = priv.container.getElementsByClassName( priv.comp.sect.cls );
})();

/* Метод устанавливает высоту оберткам секций равной высоте окна. */
priv.setHeight = ( function () {
  for ( var i = 0; i <= priv.comp.sect.el.length - 1; i++ ) 
    priv.comp.sect.el[i].style.height = window.innerHeight + 'px';
})();

/* Если свойство объекта не undefined и является массивом, 
то метод проходит циклом по секциям и устанавливает атрибут data-anchor. */
priv.data = function () {
  for ( var i = 0; i <= priv.sections.length - 1; i++ )
    if ( !priv.comp.sect.el[i].hasAttribute( priv.label[i] ) )
      priv.comp.sect.el[i].setAttribute( priv.label.name, priv.label.array[i] );
}

if ( priv.label.array !== undefined && Array.isArray( priv.label.array ) ) priv.data();

/* Метод, создает навигационную панель и записывает новые элементы в свойвтво comp*/
priv.navigator = function () {
  var navigator, item, link, containerOffsetHeight,
  navigatorOffsetHeight;

  navigator = document.createElement( 'ul' );
  priv.container.appendChild( navigator );
  navigator.classList.add( priv.comp.nav.list.cls );
  
  for ( var i = 0; i <= priv.label.array.length - 1; i++ ) {
    item = document.createElement( 'li' );
    navigator.appendChild( item );
    
    item.classList.add( priv.comp.nav.item.cls );
    link = document.createElement( 'a' );
    item.appendChild( link );
    link.classList.add( priv.comp.nav.link.cls );
    
  if ( !link.hasAttribute( priv.label.name ) )
    link.setAttribute( priv.label.name, priv.label.array[i] ); }

  /* Центровка навигационной панели */
  containerOffsetHeight = Math.round( priv.container.offsetHeight / 2 );
  navigatorOffsetHeight = Math.round( navigator.offsetHeight / 2 );

  navigator.style.top = containerOffsetHeight - navigatorOffsetHeight + 'px';

  priv.comp.nav.list.el = priv.container.getElementsByClassName( priv.comp.nav.list.cls );
  priv.comp.nav.item.el = priv.comp.nav.list.el[0].getElementsByClassName( priv.comp.nav.item.cls );
  priv.comp.nav.link.el = priv.comp.nav.list.el[0].getElementsByClassName( priv.comp.nav.link.cls );
}

if ( priv.default.navigator && Array.isArray( priv.label.array ) ) priv.navigator();

/* Добавляет класс active ссылкам навигационной панели */
if ( priv.default.navigator && Array.isArray( priv.label.array ) )
priv.isActive = function () {
  for ( var i = 0; i <= priv.comp.nav.link.el.length - 1; i++ )
    if ( priv.comp.nav.link.el[i].classList.contains( 'active' ) )
      priv.comp.nav.link.el[i].classList.remove( 'active' );

  priv.comp.nav.link.el[priv.counterSection].classList.add( 'active' );
}

if ( priv.default.navigator && Array.isArray( priv.label.array ) ) priv.isActive();

priv.move = function () {
  priv.isActive();
  priv.comp.wrap.el[0].classList.add( 'active' );
  priv.comp.wrap.el[0].style.transform = 'translateY(-' + priv.comp.sect.el[priv.counterSection].offsetTop + 'px)';
  priv.comp.wrap.el[0].style.transition = 'all ' + priv.default.duration + 'ms ease-out';
  setTimeout( function () { 
    priv.comp.wrap.el[0].style.transition = null;
    priv.comp.wrap.el[0].classList.remove( 'active' ); }, priv.default.duration);
}

/* Метод, обрабатывающий событие при клике по элементу с атрибутом data- */
priv.moveTo = function ( e ) {
  var target = e.target, value;

  if ( target.hasAttribute( priv.label.name ) ) {
  if ( target.tagName.toLowerCase() === 'a' ) e.preventDefault();

  value = target.getAttribute( priv.label.name );
  
  for ( var i = 0; i <= priv.sections.length - 1; i++ )
    if ( priv.comp.sect.el[i].hasAttribute( priv.label.name ) && 
    priv.comp.sect.el[i].getAttribute( priv.label.name ) === value )
      priv.counterSection = i;

  priv.isActive(); priv.move();
  }
}

/* Обработчик события скролл при клике по элементу с атрибутом data- */
if ( Array.isArray( priv.label.array ) ) priv.container.addEventListener( 'click', priv.moveTo );

/* Метод для обработчика touchstart получает начальные координаты касания */
priv.swipeStart = function ( e ) {
    priv.swipe.touch = e.changedTouches[0];
    priv.swipe.coord.start.x = priv.swipe.touch.clientX;
    priv.swipe.coord.start.y = priv.swipe.touch.clientY;
}

priv.container.addEventListener( 'touchstart', priv.swipeStart );

/* Отменяет действие по умолчанию для обработчика touchmove */
priv.container.addEventListener( 'touchmove', function ( e ) {
  e.preventDefault();
});

/* Метод для обработчика touchend получает конечные точки касания и
сравнивает координаты по оси xy для запуска смещения wrapper */
priv.swipeEnd = function ( e ) {
  priv.swipe.touch = e.changedTouches[0];
  priv.swipe.coord.end.x = priv.swipe.touch.clientX;
  priv.swipe.coord.end.y = priv.swipe.touch.clientY;

  if ( Math.abs( priv.swipe.coord.start.x - priv.swipe.coord.end.x ) >= 
    Math.abs( priv.swipe.coord.start.y - priv.swipe.coord.end.y ) ) return;
  
  if ( priv.counterSection !== priv.comp.sect.el.length - 1 
  && priv.swipe.coord.start.y > priv.swipe.coord.end.y ) {
    ++priv.counterSection; priv.move(); 
  }
  else if ( priv.counterSection !== 0 &&
  priv.swipe.coord.start.y < priv.swipe.coord.end.y ) { 
    --priv.counterSection; priv.move();
   }
}

priv.container.addEventListener( 'touchend', priv.swipeEnd );

/* Метод пересчитывает высоту контейнера */
priv.resize = ( function () {
  var resizeTimeout, actualResizeHandler;
  
  actualResizeHandler = function ( e ) {
    var containerOffsetHeight, navigatorOffsetHeight;

    if ( !resizeTimeout ) 
      actualResizeHandler = setTimeout( function () {
      resizeTimeout = null; 

      for ( var i = 0; i <= priv.comp.sect.el.length - 1; i++ ) 
        priv.comp.sect.el[i].style.height = window.innerHeight + 'px';
      
      containerOffsetHeight = Math.round( priv.container.offsetHeight / 2 );
      navigatorOffsetHeight = Math.round( priv.comp.nav.list.el[0].offsetHeight / 2 );
      
      priv.comp.nav.list.el[0].style.top = containerOffsetHeight - navigatorOffsetHeight + 'px';
      priv.comp.wrap.el[0].style.transform = 'translateY(-' + priv.comp.sect.el[priv.counterSection].offsetTop + 'px)';
      }, 69);
  }
    
window.addEventListener( 'resize', actualResizeHandler );

})();

// End contsr
}

var full = new Full({
    container : 'full',
    label : [ 'main', '1', '2', '3' ],
    navigator : true
});