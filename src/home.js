function init () {
  var textEL = $('#message-area')
  $(textEL).keyup(function () {
    console.log($(this).val().length)
    var showSend = $(this).val().length > 0
    $('#send-button').css('display', showSend ? 'block': 'none')
    
  })
}

module.exports = {
  init
}
