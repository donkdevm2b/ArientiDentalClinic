const galleryImgNumber = 3
let currentImg = 1

var timerId = setInterval(rotateCounterBackgroundIMages, 3000)

function rotateCounterBackgroundIMages() {

    currentImg = currentImg == galleryImgNumber ? 1 : currentImg + 1
    console.log('current img: ', currentImg)
  $('#counter-background').css('background-image',`url(/asset/img/gallery/${currentImg}.jpg)`)
}

// function abortTimer() { // to be called when you want to stop the timer
//   clearInterval(timerId);
// }