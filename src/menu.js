// header
const { debounce } = require('underscore')

const headerHeight = 62
const isHomepage = window.location.pathname.split('/').pop()
  .replace('.html', '') === ''

let setMenuType
let setMenuScrollEffect
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

function handleNavClick(id) {
  if (menuIsOpen()) handleMenuClick()
  if (isHomepage) {
    $('html,body').animate({ scrollTop: $(id).offset().top - headerHeight }, 500)
  } else {
    window.location = `/${id}`
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

function init() {
  // handleMenuHighlight()

  $('.menu-chi-siamo,#logo-container').click(() => { handleNavClick('#chi-siamo') })
  $('.menu-servizi').click(() => { handleNavClick('#servizi') })
  $('.menu-staff').click(() => { handleNavClick('#staff') })
  $('.menu-dove').click(() => { handleNavClick('#dove') })
  $('.menu-contatti').click(() => { handleNavClick('#contatti') })
  $('.menu-studio').click(() => { window.location = '/studio.html' })
  $('.menu-convenzioni').click(() => { window.location = '/convenzioni.html' })

  document.getElementById('hamburger-button').onclick = () => {
    handleMenuClick()
  }

  window.addEventListener('resize', () => {
    if (menuIsOpen()) {
      handleMenuClick()
    }

    if (isHomepage) {
      handleMenuType()
    }
  })

  if (window.location.hash) {
    scrollToId(window.location.hash)
  }

  if (isHomepage) {
    handleMenuType()

    window.addEventListener('scroll', debounce(() => {
      handleMenuType('scroll')
      // handleMenuHighlight()
    }, 100))
  }
}

module.exports = {
  init
}
