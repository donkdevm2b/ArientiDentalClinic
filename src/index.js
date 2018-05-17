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
  var nowClass = document.getElementById('hamburger-button').innerHTML
  var isOpening = nowClass === 'menu'
  // change hb icon
  document.getElementById('hamburger-button').innerHTML = isOpening ? 'close' : 'menu'
  // open | close section menu
  var animation = isOpening ? 
  [
    { height: '120px' },
    { height: '500px' },
  ] :
  [
    { height: '500px' },
    { height: '120px' },
  ]

  document.getElementsByTagName('header')[0].animate(animation, 1000)
  // show menu section
  document.getElementById("menu-section").classList.toggle("is-off")
    
}

// function scrollToId(id) { $('html,body').animate({ scrollTop: $(id).offset().top - headerHeight }, 500) }

// // switch menu
// $('#menuInjection').on('click', '.menu-trigger', function () {
//   menuTrigger()
// })