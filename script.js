import DrawingHandler from './drawingHandler.js'

const pointDrawer = (() => {

    return {

        init() {

            const pastedImage = new Image()
            const drawingHandler = new DrawingHandler()

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
                    }

                    pastedImage.src = source

                    is_image = true
                }

                if (is_image) {
                    event.preventDefault()
                }



            })
        }
    }
    
})()

pointDrawer.init()