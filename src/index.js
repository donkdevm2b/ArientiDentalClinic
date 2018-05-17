console.log('*************\nArientiDentalClinic\n' + new Date + '\n************')

import './style.scss'

function menuTrigger () {
  $('#menu-section').toggleClass('is-on is-off')
  $('#hamburger-button').toggleClass('fa-bars fa-times')

  var nowClass = document.getElementById('hamburger-button').innerHTML
  console.log(nowClass)
  // document.getElementById('hamburger-button').innerHTML
}

// hamburger-button click
document.getElementById('hamburger-button').onclick = function () {
  handleMenuClick() 
}

function menuIsOpen() {
  return document.getElementById('hamburger-button').innerHTML === 'close'
}

function handleMenuClick () {
  var menuSection = document.getElementById('menu-section')
  var hamburgerButton = document.getElementById('hamburger-button')
  var nowClass = hamburgerButton.innerHTML
  var isOpening = nowClass === 'menu'
  // change hb icon
  hamburgerButton.innerHTML = isOpening ? 'close' : 'menu'
  // open | close header height
  var headerStartHeight = 120
  var startHeight = headerStartHeight + 'px'
  var endHeight = headerStartHeight + menuSection.offsetHeight + 'px'
  var finalPosition = isOpening ? endHeight : startHeight
  document.getElementsByTagName('header')[0].style.height = finalPosition   
}

window.addEventListener('resize', function () { 
  console.log('resize')
  // close menu section if it's open
  if (menuIsOpen()) {
    handleMenuClick()
  }
})


// function scrollToId(id) { $('html,body').animate({ scrollTop: $(id).offset().top - headerHeight }, 500) }

// // switch menu
// $('#menuInjection').on('click', '.menu-trigger', function () {
//   menuTrigger()
// })