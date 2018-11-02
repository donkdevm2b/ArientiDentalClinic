import './style/style.scss'
const menu = require('./menu.js')

const services = ['ortodonzia-invisibile', 'odontoiatria-pediatrica', 'cosmetic-dentistry', 'sedazione-cosciente', 'ortodonzia', 'odontoiatria-protesica', 'chirurgia-implantare', 'implantologia-all-on-4']

function handleNavigation(direction) {
  // get actual location
  const location = window.location.pathname.split('/').pop()
    .replace('.html', '')
  const index = services.indexOf(location)
  let next
  if (direction === 'next') {
    next = services[index + 1] || services[0]
  } else {
    next = services[index - 1] || services[services.length - 1]
  }
  window.location = `/servizi/${next}.html`
}

window.onload = () => {
  document.getElementsByTagName('body')[0].classList.toggle('is-off')
  $('#footerInjection').load('/html/footer.html')
  $('#menuInjection').load('/html/menu.html', () => { menu.init() })

  document.getElementById('nav-left').onclick = () => {
    handleNavigation('prev')
  }
  document.getElementById('nav-right').onclick = () => {
    handleNavigation('next')
  }
  document.getElementsByTagName('section')[0].style.marginTop = '62px'
  // console.log(section.style)
  // section.style.marginTop = '62px'
}
