import './style/style.scss'
var menu = require('./menu.js')

window.onload = function () {
  document.getElementsByTagName('body')[0].classList.toggle('is-off')
  $("#footerInjection").load("/html/footer.html")
  $("#menuInjection").load("/html/menu.html", function () {menu.init()})
}
