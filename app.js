const pageFunction = () => {
    const generateQuote = document.getElementById('button')

    const source = 'https://type.fit/api/quotes'

    const getQuote = async () => {
        generateQuote.disabled = true

        try {
            const response = await fetch(source)

            if (!response.ok) {
                throw Error(response.statusText)
            }

            const data = await response.json()

            const randomNum = Math.floor(Math.random() * data.length)
            const quoteObject = data[randomNum]
            displayQuote(quoteObject.text, quoteObject.author)
        } catch (error) {
            console.log(error)
        } finally {
            generateQuote.disabled = false
        }
    }

    getQuote()

    const displayQuote = (quote, author) => {
        const quoteText = document.getElementById('text')
        const quoteAuthor = document.getElementById('author')
        quoteText.textContent = quote
        quoteAuthor.textContent = `~${author}`
        if (author === null) {
            quoteAuthor.textContent = '~Anonymous'
        }
    }
    generateQuote.addEventListener('click', getQuote)
}

pageFunction()
