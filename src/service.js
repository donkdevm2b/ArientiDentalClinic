import './style/style.scss'
const menu = require('./menu.js')

const services = ['ortodonzia-invisibile']

window.onload = () => {
  document.getElementsByTagName('body')[0].classList.toggle('is-off')
  $('#footerInjection').load('/html/footer.html')
  $('#menuInjection').load('/html/menu.html', () => { menu.init() })
}
