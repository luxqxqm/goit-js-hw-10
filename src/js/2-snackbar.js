// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";
const form = document.querySelector('.form')


form.addEventListener("submit", submitHandle)

function submitHandle(event) {
    event.preventDefault()
    const delayValue = Number(event.target.elements.delay.value)
    
    const promise = new Promise((resolve, reject) => {
        
            if (event.target.elements.state.value === "fulfilled") {
                resolve(delayValue)            
            } else {
                reject(delayValue)
            }    
    })

    promise
        .then((delay) => {
            setTimeout(() => {
                iziToast.show({
                    message: `✅ Fulfilled promise in ${delayValue}ms`,
                    color: 'green',
                    messageColor: 'green',
                    position : 'topRight'
                })    
    },delayValue)
})
        .catch((error) => {
    setTimeout(() => {
                iziToast.show({
                    message: `❌ Rejected promise in ${delayValue}ms`,
                    color: 'red',
                    messageColor: 'red',
                    position : 'topRight'
                })    
    },delayValue)
    
})
}