function init () {
  // handleMenuHighlight()

  $('.menu-chi-siamo,#logo-container').click(() => { handleNavClick("#chi-siamo") })
  $('.menu-servizi').click(() => { handleNavClick("#servizi") })
  $('.menu-staff').click(() => { handleNavClick("#staff") })
  $('.menu-dove').click(() => { handleNavClick("#dove") })
  $('.menu-contatti').click(() => { handleNavClick("#contatti") })

  document.getElementById('hamburger-button').onclick = function () {
    handleMenuClick()
  }

  window.addEventListener('resize', function () {
    if (menuIsOpen()) {
      handleMenuClick()
    }
  })
}

// *********************
// ***** variables *****
// *********************

// header
const headerHeight = 62
var isHomepage
// const menuList = ['chi-siamo', 'servizi', 'staff', 'dove', 'contatti']

// *********************
// ******* methods *****
// *********************

// menu
// function handleMenuHighlight() {
//   // highlight menu onview section
//   menuList.some(function (elName) {
//     var element = document.getElementById(elName)
//     if (isInViewport(element)) {
//       console.log('IN VIEW: ', elName)
//       // add hovered class
//       $('.menu-' + elName).addClass('hovered')

//       // remove from others
//       var globalString = ''
//       menuList.forEach(function (str) {
//         if (str !== elName) globalString += '.menu-' + str + ','
//       }, this)
//       // remove last comma
//       globalString = globalString.slice(0, -1);
//       $(globalString).removeClass('hovered')
//       // exit from loop
//       return true
//     }
//   }, this)
// }

function handleMenuClick() {
  // change hb icon
  document.getElementById('hamburger-button').innerHTML = menuIsOpen() ? 'menu' : 'close'
  $("header").toggleClass('is-closed, is-open')
}

// check if menu is open
function menuIsOpen() {
  return document.getElementById('hamburger-button').innerHTML === 'close'
}

function handleNavClick(id) {
  if (menuIsOpen()) handleMenuClick()
  if (isHomepage) {
    $('html,body').animate({ scrollTop: $(id).offset().top - headerHeight }, 500)
  } else {
    window.location = '/' + id
  }
}

module.exports = {
  init
}
