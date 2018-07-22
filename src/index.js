console.log('*************\nArientiDentalClinic\n' + new Date + '\n************')
var $ = require('jquery')
var _ = require('underscore')
// import 'slick-carousel'
// import '../node_modules/slick-carousel/slick/slick-theme.scss'
// import '../node_modules/slick-carousel/slick/slick.js'
import './style/style.scss'
// import 'owl.carousel/dist/assets/owl.carousel.scss';
// import 'owl.carousel';

// *********************
// ***** variables *****
// *********************
// header
const headerHeight = 62
// counter
var counterAnimationExecuted = [false, false, false, false]
const values = [20, 1630, 16, 8]
// carousel
var carouselPosition = 0
var stepSize, cardsNumber, maxDistance

const menuList = ['chi-siamo', 'servizi', 'staff', 'dove',  'contatti']


window.onload = function () {
  // show body  
  document.getElementsByTagName('body')[0].classList.toggle('is-off')

  // catch hamburger-button click
  document.getElementById('hamburger-button').onclick = function () {
    handleMenuClick()
  }

  // handle rensponsive elements
  handleRensponsivness()
  handleMenuHighlight()
  setCarouselMeasures()
  handleCarouselColor()

  // carousel
  $('.carousel-button').click(e => { handleMoveCarousel(e) })

  // photo carousel
  // $('.photo-carousel').slick({
  //   infinite: true,
  // });
  // $('.photo-carousel').owlCarousel();

  // handle navigation
  $('.menu-chi-siamo,#logo-container').click(() => { scrollToId("#chi-siamo")})
  $('.menu-servizi').click(() => { scrollToId("#servizi")})
  $('.menu-staff').click(() => { scrollToId("#staff")})
  $('.menu-dove').click(() => { scrollToId("#dove")})
  $('.menu-contatti').click(() => { scrollToId("#contatti")})

  // panel
  $('.button-panel').click(e => {
    const id = e.target.id.slice(-1)
    const otherButtonId = '#button-panel' + (id == '1' ? '2' : '1')
    console.log('button panel was clicked', id)
    console.log('otherButtonId', otherButtonId)
    if (!$(e.target).hasClass('hovered')) {
      console.log('is not hovered')
      $(e.target).toggleClass('hovered')
      $(otherButtonId).toggleClass('hovered')
      $('#panel1, #panel2').toggleClass('zero-opacity')
      setTimeout(function () { $('#panel1, #panel2').toggleClass('hidden') }, 300)
    }
  })

  // resize event
  // window.addEventListener('resize', function () {
  //   // close menu section if it's open
  //   if (menuIsOpen()) {
  //     handleMenuClick()
  //   }
  //   setCarouselMeasures()
  //   handleMoveCarousel('resize')
  //   handleRensponsivness()
  // })
  window.addEventListener('resize', _.debounce(function () {
    // close menu section if it's open
    if (menuIsOpen()) {
      handleMenuClick()
    }
    setCarouselMeasures()
    handleMoveCarousel('resize')
    handleRensponsivness()
  }, 200))

  // counter
  var counterNumbersEl = document.querySelectorAll('.counterNumber');
  window.addEventListener('scroll', _.debounce(function () {
    //handle counters
    if (!counterAnimationWasExecuted()) {
      counterNumbersEl.forEach(function (element, index) {
        if (isInViewport(element) && !counterAnimationExecuted[index]) {
          fireCounterAnimation(element, index)
        }
      }, this)
    }

    handleMenuHighlight()
  }, 200))
}

// *********************
// ******* methods *****
// *********************

// menu
function handleMenuHighlight () {
  // highlight menu onview section
  menuList.some(function (elName) {
    var element = document.getElementById(elName)
    if (isInViewport(element)) {
      console.log('IN VIEW: ', elName)
      // add hovered class
      $('.menu-' + elName).addClass('hovered')

      // remove from others
      var globalString = ''
      menuList.forEach(function (str) {
        if (str !== elName) globalString += '.menu-' + str + ','
      }, this)
      // remove last comma
      globalString = globalString.slice(0, -1);
      $(globalString).removeClass('hovered')
      // exit from loop
      return true
    }
  }, this)  
}

function handleMenuClick() {
  // change hb icon
  document.getElementById('hamburger-button').innerHTML = menuIsOpen() ? 'menu' : 'close'
  // open | close header height
  var startHeight = headerHeight + 'px'
  var endHeight = headerHeight + document.getElementById('menu-section').offsetHeight + 'px'
  var finalPosition = menuIsOpen() ? endHeight : startHeight
  // document.getElementsByTagName('header')[0].classList.toggle('is-closed')
  // document.getElementsByTagName('header')[0].classList.toggle('is-open')
  $("header").toggleClass('is-closed, is-open')
  // document.getElementsByTagName('header')[0].style.height = finalPosition
}

// check if menu is open
function menuIsOpen() {
  return document.getElementById('hamburger-button').innerHTML === 'close'
}

function scrollToId(id) {
  if (menuIsOpen()) handleMenuClick()
  $('html,body').animate({ scrollTop: $(id).offset().top - headerHeight }, 500)
}

function isInViewport (elem) {
  if (elem) {
    var bounding = elem.getBoundingClientRect();
    if ($(elem).attr('id') === 'servizi') {
      console.log('isInViewPort? ', elem)
      console.log('top: ', bounding.top)
      console.log('bottom: ', bounding.bottom)
      console.log('btm comparison: ', (window.innerHeight || document.documentElement.clientHeight))
    }

    if (bounding.top >= 0 && bounding.top <= (window.innerHeight || document.documentElement.clientHeight)) return true
    if (bounding.top < 0 && bounding.bottom > 200) return true
  }
}

// handle rensponsive elements
function handleRensponsivness () {
  var sbElement = document.getElementsByClassName('side-box')
  for (var index = 0; index < sbElement.length; index++) {
    var element = sbElement[index];
    element.style.height = document.getElementById('dove').clientHeight / 2 + 'px'
    // element.style.height = element.parentElement.clientHeight / 2 + 'px'
  }
}

// counter
function counterAnimationWasExecuted() {
  var res = true
  counterAnimationExecuted.forEach(function (element) {
    if (element === false) res = false
  }, this)
  return res
}

function fireCounterAnimation(element, index) {
  element.style.visibility = 'visible'
  counterAnimationExecuted[index] = true
  var finalValue = values[index]

  var interval = Math.round(1500 / finalValue)

  for (var i = 0; i <= finalValue; i++) { doAnimation(i) }

  function doAnimation(i) {
    setTimeout(function () { element.innerHTML = i; }, i * interval)
  }
}

function setCarouselMeasures () {
  // var stepSize = this.state.viewportWidth * (0.8)
  stepSize = $('#carousel').children(":first").width()
  console.log('stepsize', stepSize)
  cardsNumber = $("#carousel > *").length
  console.log('cardsNumber', cardsNumber)
  maxDistance = cardsNumber * stepSize - $(window).width() + 100
  console.log('maxDistance', maxDistance)
}

// carousel
function handleMoveCarousel (event) {
  console.log('carouselPosition', carouselPosition)

  event.preventDefault()


  if (event !== 'resize') {
    var stepInstance = event.target.id === 'left-button' ? -1 : 1

    var nextPosition = carouselPosition + stepInstance
    var nextDistance = nextPosition * stepSize    
    console.log('nextDistance', nextDistance)
    if (nextDistance > 0 && nextDistance <= maxDistance) {
      carouselPosition = nextPosition
      $('#left-button,#right-button').css('visibility', 'visible')
      if (maxDistance - nextDistance < stepSize / 2) $('#right-button').css('visibility', 'hidden')
    } else if (nextDistance <= 0) {
      carouselPosition = 0
      $('#left-button').css('visibility', 'hidden')
    } 
  }

  var translationSize = carouselPosition * stepSize

  $('#carousel').css({
    '-webkit-transform': `translate(-${translationSize}px)`,
    '-ms-transform': `translate(-${translationSize}px)`,
    'transform': `translate(-${translationSize}px)`
  })
}

function handleCarouselColor () {
  var colors = ['#a9d7de', '#a3b1b4', '#c4deb7', '#89bd97']

  const cards = document.querySelectorAll("#carousel > *")

  console.log(cards)
  var colorIndex = 0
  for (var i = 0; i < cardsNumber; i++) {
    $(cards[i]).css('background-color', colors[colorIndex])
    colorIndex < colors.length - 1 ? colorIndex++ : colorIndex = 0
  }
}