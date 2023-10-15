const Game = function () {
    const next = document.querySelector('.body__btn')
    const description = document.querySelector('.game__description')
    const tutorial = document.querySelector('.game__tutorial')
    const gridCards = document.querySelectorAll('.grid__item')
    const countdown = document.querySelector('.countdown__text')
    const countdownDiv = document.querySelector('.game__countdown')
    const start = document.querySelector('.game__start')
    const time = document.querySelector('.time')
    const targetNumber = document.querySelector('.start__number')
    const level = document.querySelector('.level')
    const score = document.querySelector('.score')
    const multiplier = document.querySelector('.multiplier')
    const bonusCircle = document.querySelectorAll('.info__circle')
    const colors = ['#4cb7eb', '#6d7adb', '#a595cd', '#f28e37', '#70c09b', '#8f4af9']
    const cardMods = ['infinite__opacity', 'infinite__rocking', 'infinite__decrease']
    const reactTrue = document.querySelector('.reaction__true')
    const reactFalse = document.querySelector('.reaction__false')
    const cardsGrid = document.querySelector('.start__grid')
    const gameResults = document.querySelector('.game__results')
    const currentResult = document.querySelector('.current-result')
    const rightAnswer = document.querySelector('.right-answer')
    const accuracy = document.querySelector('.accuracy')
    const benefit = document.querySelector('.benefit')
    const neuron = document.querySelector('.neuron')
    const playAgain = document.querySelector('.results__btn')


    let secs = 3
    let timer = 59
    let answers = 0
    let rightAnswers = 0



    const generationLoops = function (level) {
        const generatedValues = document.querySelectorAll('.start__item-value')
        let cardNumbers = new Set()
        while (cardNumbers.size !== generatedValues.length) {
            if (level === 1) {
                cardNumbers.add(Math.floor(Math.random()*10) + 1)
            } else if (level === 2) {
                cardNumbers.add(Math.floor(Math.random()*89) + 10)
            } else if (level >= 3 && level< 7) {
                cardNumbers.add(Math.floor(Math.random()*899) + 100)
            } else {
                cardNumbers.add(Math.floor(Math.random()*8999) + 1000)
            }

        }
        for (let i = 0; i !== cardNumbers.size; i++) {
            generatedValues[i].innerHTML = Array.from(cardNumbers)[i]
        }
        generatedValues.forEach((i) => {
            checkCards(i)
        })
    }


    const generationNums = function () {
        let currentLevel = Number(level.innerHTML[0])
        if (currentLevel === 1) {
            generationLoops(currentLevel)
        }
        else if(currentLevel === 2) {
            generationLoops(currentLevel)
        }
        else if (currentLevel >= 3 && currentLevel< 7) {
            generationLoops(currentLevel)
        }
        else {
            generationLoops(currentLevel)
        }
    }

    const checkLevel = function () {
        let currentLevel = Number(level.innerHTML[0])

        if(currentLevel <= 3) {
            cardsGeneration(3, 2, currentLevel)
        }
        else if(currentLevel <= 6) {
            cardsGeneration(4, 3, currentLevel)
        }
        else if(currentLevel === 7) {
            cardsGeneration(4, 4, currentLevel)
        }
        else if(currentLevel >= 8) {
            cardsGeneration(5,5, currentLevel)
        }
    }

    const checkFinish = function () {
        if (timer === 0){
            rightChoice()
            setTimeout(()=>{
                start.style.display = 'none'
                gameResults.style.display = 'grid'
                currentResult.innerHTML = score.innerHTML
                rightAnswer.innerHTML = rightAnswers + ' из ' + answers
                accuracy.innerHTML = `${Math.floor(rightAnswers*100/answers)}%`
                benefit.innerHTML = Math.floor(Math.random()*100)
                neuron.innerHTML = Math.floor(Math.random()*20)+40
            }, 400)

        }
    }

    const modify = function (col, row) {
        const generatedValues = document.querySelectorAll('.start__item-value')
        const generatedCards = document.querySelectorAll('.start__item')
        for(let i=0; i!==col*row; i++) {
            let currentMod = cardMods[Math.floor(Math.random()*cardMods.length)]
            currentMod === 'infinite__rocking' ?
                generatedValues[i].classList.value += " " + currentMod :
                generatedCards[i].classList.value += " " + currentMod
        }
    }

    const sizing = function (col, row, level) {
        const generatedCards = document.querySelectorAll('.start__item')
        if (level >= 4) {
            if (level < 6) {
                cardsGrid.style.gridGap = '1.5rem'
            } else {
                cardsGrid.style.gridGap = '1rem'
            }

            if (level < 8) {
                generatedCards.forEach((i) => {i.style.fontSize = '3rem'})
            } else {
                generatedCards.forEach((i) => {i.style.fontSize = '2rem'})
            }

            modify(col, row)
            cardsGrid.style.gridTemplateColumns = `repeat(${col}, 1fr)`

            if (level < 7) {
                cardsGrid.style.gridTemplateRows = `repeat(${row}, 6.25rem)`
            } else if (level < 8) {
                cardsGrid.style.gridTemplateRows = `repeat(${row}, 5.2rem)`
            } else {
                cardsGrid.style.gridTemplateRows = `repeat(${row}, 4.1rem)`
            }
        }
    }

    const cardsGeneration = function (col, row, level= 1) {
        const cardsGrid = document.querySelector('.start__grid')
        const card = `<div class="start__item"><span class="start__item-value"></span></div>`
        cardsGrid.innerHTML = ''
        console.log(col, row)
        for (let i = 0; i !== col*row; i++) {
            cardsGrid.insertAdjacentHTML('beforeend', card)
        }
        const generatedCards = document.querySelectorAll('.start__item')
        sizing(col, row, level)
        generatedCards.forEach((item) => {
            item.style.backgroundColor = colors[Math.floor(Math.random()*colors.length)]
        })
        generationNums()

    }

    const targetCard = function () {
        let newCards = document.querySelectorAll('.start__item-value')
        targetNumber.innerHTML = newCards[Math.floor(Math.random()*newCards.length)].innerHTML
    }

    const bgColor = function () {
        start.style.backgroundColor = colors[Math.floor(Math.random()*colors.length)]
    }

    const hideReaction = function () {
        setTimeout(() => {
            reactTrue.style.display = 'none'
            reactFalse.style.display = 'none'
        }, 300)
    }

    const bonusUp = function () {
        let multiplierVal = Number(multiplier.innerHTML[1])
        if(Number(multiplier.innerHTML[1]) < 5) {
            multiplier.innerHTML = 'x' + (Number(multiplier.innerHTML[1]) + 1)
            bonusCircle[multiplierVal].className = 'fa-solid fa-circle info__circle'
        }
    }

    const newCards = function () {
        setTimeout(() => {
            cardsGrid.classList.replace('animation--disappearance', 'animation--appearance')
            targetNumber.classList.replace('animation--disappearance', 'animation--appearance')
        }, 500)
    }

    const rightChoice = function () {
        cardsGrid.classList.replace('animation--appearance', 'animation--disappearance')
        targetNumber.classList.replace('animation--appearance', 'animation--disappearance')
    }


    const checkCards = function (card) {
        card.addEventListener('click', (e) => {
            if (e.currentTarget.innerHTML === targetNumber.innerHTML) {
                setTimeout(() => {
                    newCards()
                    checkLevel()
                }, 300)
                bgColor()
                rightChoice()
                reactTrue.style.display = 'grid'
                rightAnswers++
                answers++
                hideReaction()
                score.innerHTML = Number(score.innerHTML) + 42 * Number(multiplier.innerHTML[1])
                level.innerHTML !== '9-9' ? level.innerHTML = (Number(level.innerHTML[0]) + 1) + '-9' : ''
                bonusUp()
            }
            else {
                answers++
                reactFalse.style.display = 'grid'
                hideReaction()
                Array.from(bonusCircle).slice(1).forEach((element) => {
                    element.className = 'fa-regular fa-circle info__circle'
                    multiplier.innerHTML = 'x1'
                })
            }
            checkFinish()

        })
        targetCard()
    }



    const startGame = function () {
        time.innerHTML = `00:${String(timer).padStart(2, '0')}`
        const gameTimer = setInterval(function () {
            if (timer <= 0) {
                countdownDiv.style.display = 'none'
                clearInterval(gameTimer)
            }
            else {
                timer--;
                time.innerHTML = `00:${String(timer).padStart(2, '0')}`
            }
        }, 1000)
        checkLevel()
    }

    const prepareTutor = function () {
        secs = 3
        timer = 59
        answers = 0
        rightAnswers = 0
        level.innerHTML = '1-9'
        score.innerHTML = '0'
        cardsGrid.style = ''
        gridCards.forEach((card) => {
            card.style.backgroundColor = colors[Math.floor(Math.random()*colors.length)]
        })
        tutorial.style.display = 'grid'
    }

    next.addEventListener('click', () => {
        description.style.display = 'none'
        prepareTutor()
    })

    playAgain.addEventListener('click', () => {
        gameResults.style.display = 'none'
        prepareTutor()
        newCards()
    })

    tutorial.addEventListener('click', () => {
        tutorial.style.display = 'none'
        countdownDiv.style.display = 'grid'
        countdown.innerHTML = secs;
        const beforeGame = setInterval(function () {
            if (secs === 1) {
                countdownDiv.style.display = 'none'
                start.style.display = 'grid'
                startGame()
                clearInterval(beforeGame)
            }
            else {
                secs--;
                countdown.innerHTML = secs;
            }
        }, 1000)
    })
}
Game()



