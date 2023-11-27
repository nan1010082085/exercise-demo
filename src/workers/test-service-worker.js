if ('serviceWorker' in navigator) {
}

navigator.serviceWorker.addEventListener('message', (e) => {
  console.log('get message -> sevice worker js', e)
})

navigator.serviceWorker.onmessage = () => {
  console.log('get message -> sevice worker js')
}

addEventListener('message', (e) => {
  console.log('get message -> sevice worker js', e)
})
