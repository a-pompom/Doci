console.log('hello')

const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')
const pastedImage = new Image()

document.addEventListener('paste', (event) => {

    const clipboardItem = event.clipboardData.items
    
    if (!clipboardItem) {
        return
    }

    let is_image = false

    for (let i = 0; i < clipboardItem.length; i++) {
        const blob = clipboardItem[i].getAsFile()
        const URLObj = window.URL 
        const source = URLObj.createObjectURL(blob)

        pastedImage.onload = () => {
            ctx.drawImage(pastedImage, 100, 100)
        }

        pastedImage.src = source

        is_image = true
    }

    if (is_image) {
        event.preventDefault()
    }



})


canvas.addEventListener('click', (event) => {
    console.log(event.clientX)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(pastedImage, 100, 100)
    ctx.strokeStyle = '#FF0000'
    ctx.strokeRect(event.clientX, event.clientY -30, 150, 100)
})
