function init () {
  var iwPicEl = $('#iw-pic')
  var pics = [
    'girlSmiling.JPG',
    'barackObamaSmiling.JPG',
    'happyMan.JPG',
    'manSmiling.JPG',
    'marilynMonroeSmiling.JPG',
    'robertoBenigniSmiling.JPG'
  ]
  var counter = 0
  setInterval(function () {
    console.log('xxx ', counter)
    counter = counter === pics.length - 1 ? 0 : counter + 1
    // iwPicEl.attr('background-url', '/asset/img/introwall/' + pics[counter])
    iwPicEl.css('background-image', 'url(/asset/img/introwall/' + pics[counter] + ')')
  }, 2000)
}

module.exports = {
  init
}
