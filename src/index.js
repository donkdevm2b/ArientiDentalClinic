console.log(`*************\nArientiDentalClinic\n + ${new Date()} + \n************`)
const _ = require('underscore')
const video = require('./video.js')
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
const counterAnimationExecuted = [false, false, false, false]
let sizedElements = []

let setMenuType
let setMenuScrollEffect

const menuList = ['chi-siamo', 'servizi', 'staff', 'dove', 'contatti']

// *********************
// ******* methods *****
// *********************
function handleMenuScrollEffect(trigger) {
  if (trigger) {
    // trigger effect ON
    if (trigger !== setMenuScrollEffect) {
      console.log('123 set Effect: ON')
      setMenuScrollEffect = true
      $('header').addClass('effectON')
      $('#logo-container').children('img')
        .attr('src', '/asset/img/logoWhite.png')
    }
  } else {
    // trigger effect OFF
    setMenuScrollEffect = false
    $('header').removeClass('effectON')
    $('#logo-container').children('img')
      .attr('src', '/asset/img/logo.png')
  }
}
// menu
function handleMenuType(action) {
  if (action !== 'scroll') {
    // handle menu type according to viewport width
    const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    const menuType = w > 919 ? 'desktop-menu' : 'mobile-menu'
    if (menuType !== setMenuType) {
      $('header').removeClass(setMenuType)
        .addClass(menuType)
      setMenuType = menuType
      if (setMenuType === 'mobile-menu') {
        handleMenuScrollEffect(false)
      }
    }
  }

  // handle menu effect according to scroll
  console.log('xxx', $(window).scrollTop())
  if (setMenuType === 'desktop-menu') {
    handleMenuScrollEffect($(window).scrollTop() === 0)
  }
}

function calcBoundaries(elem) {
  const boundaries = {}
  const elementTop = $(elem).offset().top
  const elementBottom = elementTop + $(elem).outerHeight()
  boundaries.bottom = elementBottom
  boundaries.top = elementTop
  elem.boundaries = boundaries
  sizedElements.push(elem)
  console.log('calcBoundaries', sizedElements.length)
}

function isInViewport(elem) {
  if (!elem.boundaries) {
    calcBoundaries(elem)
  }

  const viewportTop = $(window).scrollTop()
  const viewportBottom = viewportTop + $(window).height()
  console.log(elem.boundaries)
  console.log(viewportBottom, viewportTop)
  return elem.boundaries.bottom > viewportTop + 200 && elem.boundaries.top < viewportBottom
}

function handleMenuHighlight() {
  // highlight menu onview section
  menuList.some(elName => {
    const element = document.getElementById(elName)
    if (isInViewport(element)) {
      console.log('IN VIEW: ', elName)
      // add hovered class
      $(`.menu-${elName}`).addClass('hovered')

      // remove from others
      let globalString = ''
      menuList.forEach(str => {
        if (str !== elName) globalString += `.menu-${str},`
      }, this)
      // remove last comma
      globalString = globalString.slice(0, -1)
      $(globalString).removeClass('hovered')
      // exit from loop
      return true
    }
    return false
  }, this)
}

// check if menu is open
function menuIsOpen() {
  return document.getElementById('hamburger-button').innerHTML === 'close'
}

function handleMenuClick() {
  // change hb icon
  document.getElementById('hamburger-button').innerHTML = menuIsOpen() ? 'menu' : 'close'
  $('header').toggleClass('is-closed, is-open')
}

function scrollToId(id) {
  if (menuIsOpen()) handleMenuClick()
  $('html,body').animate({ scrollTop: $(id).offset().top - headerHeight }, 500)
}

// function isInViewport (elem) {
//   if (elem) {
//     if (!elem._boundingSizes) {
//       elem._boundingSizes = elem.getBoundingClientRect()
//       sizedElements.push(elem)
//     }
//     let bounding2 = elem._boundingSizes
//     let bounding = elem.getBoundingClientRect()
//     console.log(elem)
//     console.log(bounding)
//     console.log(bounding2)
//     if (bounding.top >= 0 && bounding.top <= (window.innerHeight
//        || document.documentElement.clientHeight)) return true
//     if (bounding.top < 0 && bounding.bottom > 200) return true
//   }
// }

// handle rensponsive elements
function handleRensponsivness() {
  const sbElement = document.getElementsByClassName('side-box')
  for (let index = 0; index < sbElement.length; index++) {
    const element = sbElement[index]
    element.style.height = `${document.getElementById('dove').clientHeight / 2}px`
    // element.style.height = element.parentElement.clientHeight / 2 + 'px'
  }
}

// counter
function counterAnimationWasExecuted() {
  let res = true
  counterAnimationExecuted.forEach(element => {
    if (element === false) res = false
  }, this)
  return res
}

function fireCounterAnimation(element, index) {
  counterAnimationExecuted[index] = true

  const totalTime = 1630

  element.style.visibility = 'visible'
  $(element).prop('Counter', 0)
    .animate({
      Counter: $(element).text()
    }, {
      duration: totalTime,
      easing: 'linear',
      step: now => {
        $(element).text(Math.ceil(now))
      }
    })
}

function handleCarouselColor() {
  const colors = ['#a9d7de', '#a3b1b4', '#A7CBAA', '#76c491']

  const cards = document.querySelectorAll('.service-box')

  let colorIndex = 0
  for (let i = 0; i < cards.length; i++) {
    $(cards[i]).css('background-color', colors[colorIndex])
    colorIndex < colors.length - 1 ? colorIndex++ : colorIndex = 0
  }
}

function initCarousel() {
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
}

window.onload = () => {
  // show body
  document.getElementsByTagName('body')[0].classList.toggle('is-off')

  // catch hamburger-button click
  document.getElementById('hamburger-button').onclick = () => {
    handleMenuClick()
  }

  $('#footerInjection').load('/html/footer.html')

  // handle rensponsive elements
  handleRensponsivness()
  handleMenuHighlight()
  handleCarouselColor()
  handleMenuType()
  initCarousel()

  // handle navigation
  $('.menu-chi-siamo,#logo-container').click(() => { scrollToId('#chi-siamo') })
  $('.menu-servizi').click(() => { scrollToId('#servizi') })
  $('.menu-staff').click(() => { scrollToId('#staff') })
  $('.menu-dove').click(() => { scrollToId('#dove') })
  $('.menu-contatti').click(() => { scrollToId('#contatti') })

  // handle message
  $('#message-area').keyup(() => {
    console.log($(this).val().length)
    const showSend = $(this).val().length > 0
    $('#send-button').css('display', showSend ? 'block' : 'none')
  })

  // panel
  $('.button-panel').click(e => {
    const id = e.target.id.slice(-1)
    const otherButtonId = `#button-panel${id === '1' ? '2' : '1'}`
    console.log('button panel was clicked', id)
    console.log('otherButtonId', otherButtonId)
    if (!$(e.target).hasClass('hovered')) {
      console.log('is not hovered')
      $(e.target).toggleClass('hovered')
      $(otherButtonId).toggleClass('hovered')
      $('#panel1, #panel2').toggleClass('zero-opacity')
      setTimeout(() => { $('#panel1, #panel2').toggleClass('hidden') }, 300)
    }
  })

  function clearSizedElements() {
    for (const el of sizedElements) el.boundaries = undefined
    sizedElements = []
  }

  window.addEventListener('resize', () => {
    console.log('resize listener')
    // close menu section if it's open
    if (menuIsOpen()) {
      handleMenuClick()
    }
    // setCarouselMeasures()
    // handleMoveCarousel('resize')
    handleMenuType()
    handleRensponsivness()
    clearSizedElements()
  })

  // counter
  const counterNumbersEl = document.querySelectorAll('.counterNumber')

  window.addEventListener('scroll', _.debounce(() => {
    console.log('debounced scroll')
    console.log($(window).scrollTop())
    // handle counters
    if (!counterAnimationWasExecuted()) {
      counterNumbersEl.forEach((element, index) => {
        if (isInViewport(element) && !counterAnimationExecuted[index]) {
          fireCounterAnimation(element, index)
        }
      }, this)
    }
    handleMenuType('scroll')
    handleMenuHighlight()
  }, 100))

  video.init()
  // test.init()
}
