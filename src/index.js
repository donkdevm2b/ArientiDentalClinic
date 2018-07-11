console.log('*************\nArientiDentalClinic\n' + new Date + '\n************')
var $ = require('jquery')
import './style/style.scss'

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


window.onload = function () {
  // show body  
  document.getElementsByTagName('body')[0].classList.toggle('is-off')

  // catch hamburger-button click
  document.getElementById('hamburger-button').onclick = function () {
    handleMenuClick()
  }

  // handle rensponsive elements
  handleRensponsivness()

  // carousel
  $('.carousel-button').click((e) => { handleMoveCarousel(e) })

  // handle navigation
  $('.menu-chi-siamo,#logo-container').click(() => { scrollToId("#chi-siamo")})
  $('.menu-servizi').click(() => { scrollToId("#servizi")})
  $('.menu-staff').click(() => { scrollToId("#staff")})
  $('.menu-dove').click(() => { scrollToId("#map_wrapper")})
  $('.menu-contatti').click(() => { scrollToId("#contatti")})

  // resize event
  window.addEventListener('resize', function () {
    // close menu section if it's open
    if (menuIsOpen()) {
      handleMenuClick()
    }

    handleRensponsivness()
  })

  // counter
  var counterNumbersEl = document.querySelectorAll('.counterNumber');
  window.addEventListener('scroll', function (e) {
    //handle counters
    if (!counterAnimationWasExecuted()) {
      counterNumbersEl.forEach(function (element, index) {
        if (isInViewport(element) && !counterAnimationExecuted[index]) {
          fireCounterAnimation(element, index)
        }
      }, this)
    }
  })
}

// *********************
// ******* methods *****
// *********************

// menu
function handleMenuClick() {
  // change hb icon
  document.getElementById('hamburger-button').innerHTML = menuIsOpen() ? 'menu' : 'close'
  // open | close header height
  var startHeight = headerHeight + 'px'
  var endHeight = headerHeight + document.getElementById('menu-section').offsetHeight + 'px'
  var finalPosition = menuIsOpen() ? endHeight : startHeight
  document.getElementsByTagName('header')[0].classList.toggle('is-closed')
  document.getElementsByTagName('header')[0].style.height = finalPosition
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
  var bounding = elem.getBoundingClientRect();
  return (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

// handle rensponsive elements
function handleRensponsivness () {
  var sbElement = document.getElementsByClassName('side-box')
  for (var index = 0; index < sbElement.length; index++) {
    var element = sbElement[index];
    element.style.height = document.getElementById('map_wrapper').clientHeight / 2 + 'px'
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

// carousel
function handleMoveCarousel (e) {
  console.log('handleMoveCarousel', e)
  event.preventDefault()
  // var stepSize = this.state.viewportWidth * (0.8)
  var stepSize = $('#carousel').children(":first").width()
  console.log('stepsize', stepSize)
  var cardsNumber = $("#carousel > *").length
  console.log('cardsNumber', cardsNumber)
  var maxDistance = cardsNumber * stepSize
  console.log('maxDistance', maxDistance)
  var stepInstance = event.target.id === 'left-button' ? -stepSize : stepSize

  var nextDestination = carouselPosition + stepInstance
  // var nextStatePosition
  if (nextDestination > 0 && nextDestination < maxDistance) {
    carouselPosition = nextDestination
    // nextStatePosition = carouselPosition + stepInstance
  } else if (nextDestination <= 0) {
    carouselPosition = 0
  }

  $('#carousel').css({
    '-webkit-transform': `translate(-${carouselPosition}px)`,
    '-ms-transform': `translate(-${carouselPosition}px)`,
    'transform': `translate(-${carouselPosition}px)`
  })
}