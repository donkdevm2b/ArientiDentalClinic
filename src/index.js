console.log('*************\nArientiDentalClinic\n' + new Date + '\n************')

import './style/style.scss'

window.onload = function () {
  // show body  
  document.getElementsByTagName('body')[0].classList.toggle('is-off')

  // catch hamburger-button click
  document.getElementById('hamburger-button').onclick = function () {
    handleMenuClick()
  }

  // handle rensponsive elements
  handleRensponsivness()

  function handleMenuClick() {
    // change hb icon
    document.getElementById('hamburger-button').innerHTML = menuIsOpen() ? 'menu' : 'close'
    // open | close header height
    var headerStartHeight = 62
    var startHeight = headerStartHeight + 'px'
    var endHeight = headerStartHeight + document.getElementById('menu-section').offsetHeight + 'px'
    var finalPosition = menuIsOpen() ? endHeight : startHeight
    document.getElementsByTagName('header')[0].classList.toggle('is-closed')
    document.getElementsByTagName('header')[0].style.height = finalPosition
  }

  // resize event
  window.addEventListener('resize', function () {
    // close menu section if it's open
    if (menuIsOpen()) {
      handleMenuClick()
    }

    handleRensponsivness()
  })

  // check if menu is open
  function menuIsOpen() {
    return document.getElementById('hamburger-button').innerHTML === 'close'
  }

  // counter
  var counterAnimationExecuted = [false, false, false, false]
  var values = [20, 1630, 16, 8]

  function counterAnimationWasExecuted() {
    var res = true
    counterAnimationExecuted.forEach(function (element) {
      if (element === false) res = false
    }, this);
    return res
  }

  var counterNumbersEl = document.querySelectorAll('.counterNumber');

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

  window.addEventListener('scroll', function (e) {
    //do stuff
    if (!counterAnimationWasExecuted()) {
      counterNumbersEl.forEach(function (element, index) {
        if (isInViewport(element) && !counterAnimationExecuted[index]) {
          fireCounterAnimation(element, index)
        }
      }, this);
    }
  })

  var isInViewport = function (elem) {
    var bounding = elem.getBoundingClientRect();
    return (
      bounding.top >= 0 &&
      bounding.left >= 0 &&
      bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };
}

function handleRensponsivness () {
  var sbElement = document.getElementsByClassName('side-box')
  for (var index = 0; index < sbElement.length; index++) {
    var element = sbElement[index];
    console.log(element.parentElement.clientHeight)
    element.style.height = document.getElementById('map_wrapper').clientHeight / 2 + 'px'
    // element.style.height = element.parentElement.clientHeight / 2 + 'px'
  }
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