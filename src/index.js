console.log('*************\nArientiDentalClinic\n' + new Date + '\n************')
var $ = require('jquery')
var _ = require('underscore')
import './style/style.scss'
import 'owl.carousel'
import 'owl.carousel/dist/owl.carousel.min.js'
import 'owl.carousel/dist/assets/owl.carousel.min.css'
import 'owl.carousel/dist/assets/owl.theme.default.min.css'

// *********************
// ***** variables *****
// *********************

// header
const headerHeight = 62
// counter
var counterAnimationExecuted = [false, false, false, false]
const values = [20, 1630, 16, 8]
// carousel
// var carouselPosition = 0
// var stepSize, cardsNumber, maxDistance

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
  // setCarouselMeasures()
  handleCarouselColor()

  // carousel
  // $('.carousel-button').click(e => { handleMoveCarousel(e) })

  // photo carousel
  $('.owl-carousel.docs-carousel').owlCarousel({
    loop: true,
    margin: 30,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplaySpeed: 500,        
    responsive: {
      0: {
        items: 1
      },
      640: {
        items: 2
      },
      1024: {
        items: 3
      }
    }
  })
  $('.owl-carousel.services-carousel').owlCarousel({
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplaySpeed: 500,    
    responsive: {
      0: {
        items: 1
      },
      640: {
        items: 2
      },
      1024: {
        items: 4
      }
    }
  })

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

  window.addEventListener('resize', _.debounce(function () {
    console.log('resize listener')
    // close menu section if it's open
    if (menuIsOpen()) {
      handleMenuClick()
    }
    // setCarouselMeasures()
    // handleMoveCarousel('resize')
    handleRensponsivness()
  }, 500))

  // counter
  var counterNumbersEl = document.querySelectorAll('.counterNumber')
  
  window.addEventListener('scroll', _.debounce(function () {
    console.log('debounced scroll')
    //handle counters
    if (!counterAnimationWasExecuted()) {
      counterNumbersEl.forEach(function (element, index) {
        if (isInViewport(element) && !counterAnimationExecuted[index]) {
          fireCounterAnimation(element, index)
        }
      }, this)
    }

    handleMenuHighlight()
  }, 250))
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
  $("header").toggleClass('is-closed, is-open')
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
    var bounding = elem.getBoundingClientRect()

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
  counterAnimationExecuted[index] = true

  var totalTime = 1630

  element.style.visibility = 'visible'
  $(element).prop('Counter', 0).animate({
    Counter: $(element).text()
  }, {
      duration: totalTime,
      easing: 'linear',
      step: function (now) {
        $(element).text(Math.ceil(now))
      }
    })
}

function handleCarouselColor () {
  var colors = ['#a9d7de', '#a3b1b4', '#c4deb7', '#89bd97']

  const cards = document.querySelectorAll(".service-box")

  console.log(cards)
  var colorIndex = 0
  for (var i = 0; i < cards.length; i++) {
    $(cards[i]).css('background-color', colors[colorIndex])
    colorIndex < colors.length - 1 ? colorIndex++ : colorIndex = 0
  }
}
