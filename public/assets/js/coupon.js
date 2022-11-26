const couponBtn = document.querySelector('.coupon-btn')
const couponBtnBefore = window.getComputedStyle(couponBtn,'::before')
const couponBtnAfter = window.getComputedStyle(couponBtn,'::after')


couponBtn.addEventListener('click', () => {
  copyContent()
  couponBtn.style.setProperty('--beforeDisplay', 'block')
  couponBtn.style.setProperty('--afterDisplay', 'block')
  window.getSelection().removeAllRanges()
  setTimeout(() => {
    couponBtn.style.setProperty('--beforeDisplay', 'none')
    couponBtn.style.setProperty('--afterDisplay', 'none')
  }, 1000)
})

async function copyContent() {
  try {
    await navigator.clipboard.writeText('FEITOAMAO');
    console.log('Conteúdo copiado');
  } catch (err) {
    console.error('Falha ao copiar: ', err);
  }
}
