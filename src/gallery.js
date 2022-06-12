const galleryImgNumber = 9


function init () {

  for (let index = 1; index <= galleryImgNumber; index++) {
    console.log(index, 'ah')
    
    $('#gallery').append(
      
      `
      <div class='img-gallery' style='background-image:url(/asset/img/gallery/${index}.jpeg);'>
      <\div>
      `
      // <img class='img-box' src="/asset/img/gallery/${index}.jpeg" alt="Gallery image number ${index}"><\img>
      )
      
    }
  }


module.exports = {
  init
}


