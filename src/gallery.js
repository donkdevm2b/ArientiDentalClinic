const galleryImgNumber = 9

const counterElements = [
  {
    text: 'ANNI DI ESPERIENZA',
    value: 20
  },
  {
    text: 'PAZIENTI SODDISFATTI',
    value: 6630
  },
  {
    text: "CERTIFICAZIONI D'ECCELLENZA",
    value: 16
  },
  {
    text: "COLLABORATORI",
    value: 8
  },
]


function init () {

  for (let index = 1; index <= galleryImgNumber; index++) {
    $('#gallery').append(
      `
      <div class='img-gallery' style='background-image:url(/asset/img/gallery/${index}.jpeg);'>
      <\div>
      `
    )
  }


  counterElements.forEach(element => {
    $('#counter').append(`
    <div class="my-small-12 my-medium-6 my-large-3">
    <div class='my-small-12'>
      <h1 class='counterNumber' style='visibility: hidden'>${element.value}</h1>
    </div>
    <div class='my-small-12'>
      <h4>${element.text}</h4>
    </div>
  </div>
    `)
  })


}


module.exports = {
  init
}


