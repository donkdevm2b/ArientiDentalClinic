console.log('*************\nArientiDentalClinic\n' + new Date + '\n************')

import './style/style.scss'

// catch hamburger-button click
document.getElementById('hamburger-button').onclick = function () {
  handleMenuClick() 
}

function handleMenuClick () {
  // change hb icon
  document.getElementById('hamburger-button').innerHTML = menuIsOpen() ? 'menu' : 'close'
  // open | close header height
  var headerStartHeight = 120
  var startHeight = headerStartHeight + 'px'
  var endHeight = headerStartHeight + document.getElementById('menu-section').offsetHeight + 'px'
  var finalPosition = menuIsOpen() ? endHeight : startHeight
  document.getElementsByTagName('header')[0].style.height = finalPosition   
}

// resize event
window.addEventListener('resize', function () { 
  // close menu section if it's open
  if (menuIsOpen()) {
    handleMenuClick()
  }
})

// check if menu is open
function menuIsOpen() {
  return document.getElementById('hamburger-button').innerHTML === 'close'
}

// function menuTrigger () {
//   $('#menu-section').toggleClass('is-on is-off')
//   $('#hamburger-button').toggleClass('fa-bars fa-times')

//   var nowClass = document.getElementById('hamburger-button').innerHTML
//   console.log(nowClass)
//   // document.getElementById('hamburger-button').innerHTML
// }


// function scrollToId(id) { $('html,body').animate({ scrollTop: $(id).offset().top - headerHeight }, 500) }

// // switch menu
// $('#menuInjection').on('click', '.menu-trigger', function () {
//   menuTrigger()
// })