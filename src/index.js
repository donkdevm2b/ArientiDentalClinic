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
  var menuSection = document.getElementById('menu-section')
  var hamburgerButton = document.getElementById('hamburger-button')
  console.log(menuSection.offsetHeight)
  var nowClass = hamburgerButton.innerHTML
  var isOpening = nowClass === 'menu'
  // change hb icon
  hamburgerButton.innerHTML = isOpening ? 'close' : 'menu'
  // open | close section menu
  var headerStartHeight = 120
  // var headerEndHeight = menuSection.offsetHeight
  var startHeight = headerStartHeight + 'px'
  var endHeight = headerStartHeight + menuSection.offsetHeight + 'px'

  console.log(startHeight, endHeight)

  var finalPosition = isOpening ? endHeight : startHeight

  document.getElementsByTagName('header')[0].style.height = finalPosition
  // show menu section
  // document.getElementById("menu-section").classList.toggle("is-off")
  // var animation2 = isOpening ?
  //   [
  //     { height: '120px' },
  //     { height: '500px' },
  //   ] :
  //   [
  //     { height: '500px' },
  //     { height: '120px' },
  //   ]
  // document.getElementById("menu-section").animate(animation2, 1000)
    
}

// function scrollToId(id) { $('html,body').animate({ scrollTop: $(id).offset().top - headerHeight }, 500) }

// // switch menu
// $('#menuInjection').on('click', '.menu-trigger', function () {
//   menuTrigger()
// })