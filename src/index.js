/* eslint func-names:0*/
/* eslint max-statements:0*/

const { debounce } = require('underscore')
const video = require('./video.js')
const menu = require('./menu.js')
const gallery = require('./gallery.js')

import { staff } from './content'

import './style/style.scss'
import 'owl.carousel'
import 'owl.carousel/dist/owl.carousel.min.js'
import 'owl.carousel/dist/assets/owl.carousel.min.css'
import 'owl.carousel/dist/assets/owl.theme.default.min.css'

// *********************
// ***** variables *****
// *********************

// counter
const counterAnimationExecuted = [false, false, false, false]
let sizedElements = []
const menuList = ['chi-siamo', 'servizi', 'staff', 'dove', 'contatti']

// *********************
// ******* methods *****
// *********************


function calcBoundaries(elem) {
  const boundaries = {}
  const elementTop = $(elem).offset().top
  const elementBottom = elementTop + $(elem).outerHeight()
  boundaries.bottom = elementBottom
  boundaries.top = elementTop
  elem.boundaries = boundaries
  sizedElements.push(elem)
  // console.log('calcBoundaries', sizedElements.length)
}

function isInViewport(elem) {
  if (!elem.boundaries) {
    calcBoundaries(elem)
  }

  const viewportTop = $(window).scrollTop()
  const viewportBottom = viewportTop + $(window).height()
  // console.log(elem.boundaries)
  // console.log(viewportTop, viewportBottom)
  return elem.boundaries.bottom > viewportTop + 200 && elem.boundaries.top < viewportBottom
}

function handleMenuHighlight() {
  // highlight menu onview section
  menuList.some(elName => {
    const element = document.getElementById(elName)
    if (isInViewport(element)) {
      // console.log('IN VIEW: ', elName)
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
    // clear all
    let globalString = ''
    menuList.forEach(str => {
      globalString += `.menu-${str},`
    }, this)
    globalString = globalString.slice(0, -1)
    $(globalString).removeClass('hovered')
    return false
  }, this)
}
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

function addStaff() {
  staff.forEach(element => {
    // console.log('add staff', element)
    $('#staffContainer1').append(
      `<div class= "item">
      <div class='team-member'>
        <img src="/asset/img/staff/${element.img}" alt="Chiara Arienti Dentist"/>
          <div class='team-member-info'>
            <h3>${element.name.toUpperCase()}</h3>
            <p>${element.title.toUpperCase()}</p>
            <p><i>${element.subTitle ? element.subTitle.toUpperCase() : ''}</i></p>
          </div>
        </div>
      </div>`
    )

  })

}

function initCarousel() {
  addStaff()
  $('.owl-carousel.docs-carousel').owlCarousel({
    dots: false,
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
    dots: false,
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

  $('.owl-carousel.gallery-carousel').owlCarousel({
    dots: true,
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplaySpeed: 1000,
    responsive: {
      0: {
        items: 1
      }
    }
  
  })
}

function submitForm () {
  document.getElementById('send-button').innerHTML = 'INVIO IN CORSO'
  document.getElementById('send-button').style.backgroundColor = 'cyan'

  const data = {
    name: $('#form-name')[0].value,
    email: $('#form-email')[0].value,
    tel: $('#form-tel')[0].value,
    message: $('#form-message')[0].value
  }

  emailjs.send('mailjet', 'template_f7p4PRaz', data)
    .then(function (response) {
      // console.log('SUCCESS!', response.status, response.text);
      document.getElementById('send-button').innerHTML = 'MESSAGGIO INVIATO'
      document.getElementById('send-button').style.backgroundColor = 'green'
      $('#contact-form')[0].reset()
    }, function (error) {
        document.getElementById('send-button').innerHTML = 'ERRORE RIPROVA PIÙ TARDI'
        document.getElementById('send-button').style.backgroundColor = 'tomato'

      // console.log('FAILED...', error);
    });
}

window.onload = () => {
  gallery.init()

  $('#menuInjection').load('/html/menu.html', () => { menu.init() })
  $('#footerInjection').load('/html/footer.html')

  // show body
  document.getElementsByTagName('body')[0].classList.toggle('is-off')

  // handle rensponsive elements
  handleRensponsivness()
  handleMenuHighlight()
  handleCarouselColor()
  initCarousel()

  // handle message
  $('#form-message').keyup(function() {
    const showSend = $(this).val().length > 0
    $('#send-button').css('display', showSend ? 'block' : 'none')
  })

  // panel
  $('.button-panel').click(e => {
    const id = e.target.id.slice(-1)
    const otherButtonId = `#button-panel${id === '1' ? '2' : '1'}`
    // console.log('button panel was clicked', id)
    // console.log('otherButtonId', otherButtonId)
    if (!$(e.target).hasClass('hovered')) {
      // console.log('is not hovered')
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
    handleRensponsivness()
    clearSizedElements()
  })

  // counter
  const counterNumbersEl = document.querySelectorAll('.counterNumber')

  window.addEventListener('scroll', debounce(() => {
    // console.log('debounced scroll')
    // console.log($(window).scrollTop())
    // handle counters
    if (!counterAnimationWasExecuted()) {
      counterNumbersEl.forEach((element, index) => {
        if (isInViewport(element) && !counterAnimationExecuted[index]) {
          fireCounterAnimation(element, index)
        }
      }, this)
    }
    handleMenuHighlight()
  }, 100))

  video.init()

  // form
  document.getElementById('send-button').onclick = event => {
    event.preventDefault()
    submitForm()
  }
}
