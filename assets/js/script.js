const bar = document.querySelector('#bar')
const close = document.querySelector('#close')
const navbar = document.querySelector('.navbar ul')

if(bar) {
  bar.addEventListener('click', () => {
    navbar.classList.add('active')
  })
}

if(close) {
  close.addEventListener('click', () => {
    navbar.classList.remove('active')
  })
}