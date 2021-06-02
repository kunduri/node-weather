console.log('You are in script.js')
const form = document.querySelector('form')
const loc = document.querySelector('#search-box')
const msg1 = document.querySelector('#p1')
const msg2 = document.querySelector('#p2')

form.addEventListener('submit', (e) => {
    e.preventDefault();
    msg1.textContent = 'loading..'
    msg2.textContent = ''
    if (loc.value) {
        fetch('http://localhost:3000/weather?address=' + loc.value).then((response) => {
            response.json().then((data) => {
                if(data.error) {
                    msg1.textContent = data.error
                } else {
                    msg1.textContent = data.latitude
                    msg2.textContent = data.longitude
                }
            })
        })
    } else {
        console.log('No location..')
    }
})