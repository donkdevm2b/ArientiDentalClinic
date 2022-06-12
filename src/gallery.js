const galleryImgNumber = 9


function init () {

  for (let index = 1; index <= galleryImgNumber; index++) {
    $('#gallery').append(
      `
      <div class='img-gallery' style='background-image:url(/asset/img/gallery/${index}.jpeg);'>
      <\div>
      `
    )
  }
}


module.exports = {
  init
}


