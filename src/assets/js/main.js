let questNumber = document.querySelector('.questNumber')
let valueOne = document.querySelector('.quest span:nth-child(1)')
let valueTwo = document.querySelector('.quest span:nth-child(2)')
let radio = document.querySelectorAll('li input')
let radioContent = document.querySelectorAll('li span')
let submit = document.querySelector('.submit input')

let animationImg = document.querySelector('.animation img')
let animationTxt = document.querySelector('.animation span span')
let sound = document.querySelector('audio')

let vetorQuest = []

let vetorA = []
let vetorB = []
let vetorC = []
let vetorD = []

let indice = 0

let valor1
let valor2
let max = 5

let minhaResposta

let quest = {
  pergunta: `Quanto é ${valor1} + ${valor2}?`,
  resposta: `${descobrirResposta(valor1, valor2)}`
}


function descobrirResposta(valorNumerico1, valorNumerico2) {
  return valorNumerico1 + valorNumerico2
}
function valoresErrados(valor1, valor2) {
  let max = 50
  let min = 0
  return Math.floor(Math.random() * (max - min + 1)) + min
}
function embaralharVetoresABCD() {
  let abcd = ['A', 'B', 'C', 'D']
  let arr = []

  //Inserindo valores de 1 - 4 no array
  for (let i = 0; i < abcd.length; i++) {
    arr[i] = i + 1;
  }

  //Algorítimo de Fisher-Yates shuffle para embaralhar de 1 - 4
  let p, n, tmp;
  for (p = arr.length; p;) {
    n = Math.random() * p-- | 0;
    tmp = arr[n];
    arr[n] = arr[p];
    arr[p] = tmp;
  }

  return arr
}
function verificarMinhaResposta() {
  for (let i = radio.length - 1; i >= 0; i--) {
    if (radio[i].checked) {
      minhaResposta = parseInt(radioContent[i].textContent)
      if (descobrirResposta(valor1, valor2) === minhaResposta) {
        console.log('Certo!')
        rightAnswer()
        indice += 1
        setTimeout(() => {
          radio[i].checked = false
          animationImg.setAttribute('src', '')
          animationTxt.textContent = ''
          questNumber.style.color = ''
          main()
        }, 2000)
      } else {
        while (indice > 0) {
          vetorQuest.pop()
          vetorA.pop()
          vetorB.pop()
          vetorC.pop()
          vetorD.pop()
          indice -= 1
        }
        setTimeout(() => {
          radio[i].checked = false
          animationImg.setAttribute('src', '')
          animationTxt.textContent = ''
          questNumber.style.color = ''
          main()
        }, 2000)
        console.log('Errado!')
        wrongAnswer()
      }
    }
  }
}
function rightAnswer(){
  setTimeout(() => {
    animationImg.setAttribute('src', './src/assets/img/right.svg')
    animationTxt.textContent = 'Correto!'
    sound.setAttribute('src', './src/assets/sound/correct.wav')
    questNumber.style.color = 'green'
    sound.play()
  }, 250)
}
function wrongAnswer(){
  setTimeout(() => {
    animationImg.setAttribute('src', './src/assets/img/wrong.svg')
    animationTxt.textContent = 'Errado!'
    sound.setAttribute('src', './src/assets/sound/incorrect.wav')
    questNumber.style.color = 'red'
    sound.play()
  }, 250)
}
function setarValores() {
  let abcd = embaralharVetoresABCD()
  if (abcd[0] == 1) {
    vetorA[indice] = vetorQuest[indice].resposta
    vetorB[indice] = valoresErrados(valor1, valor2)
    vetorC[indice] = valoresErrados(valor1, valor2)
    vetorD[indice] = valoresErrados(valor1, valor2)
  } else if (abcd[1] == 2) {
    vetorB[indice] = vetorQuest[indice].resposta
    vetorC[indice] = valoresErrados(valor1, valor2)
    vetorD[indice] = valoresErrados(valor1, valor2)
    vetorA[indice] = valoresErrados(valor1, valor2)
  } else if (abcd[2] == 3) {
    vetorC[indice] = vetorQuest[indice].resposta
    vetorD[indice] = valoresErrados(valor1, valor2)
    vetorA[indice] = valoresErrados(valor1, valor2)
    vetorB[indice] = valoresErrados(valor1, valor2)
  } else if (abcd[3] == 4) {
    vetorD[indice] = vetorQuest[indice].resposta
    vetorA[indice] = valoresErrados(valor1, valor2)
    vetorB[indice] = valoresErrados(valor1, valor2)
    vetorC[indice] = valoresErrados(valor1, valor2)
  } else {
    abcd = embaralharVetoresABCD()
    setarValores()
  }
}



function main() {
  valor1 = Math.floor(Math.random() * (max - 0 + 1)) + 0
  valor2 = Math.floor(Math.random() * (max - 0 + 1)) + 0
  quest = {
    pergunta: `Quanto é ${valor1} + ${valor2}?`,
    resposta: `${descobrirResposta(valor1, valor2)}`
  }
  vetorQuest[indice] = quest
  setarValores();

  questNumber.textContent = `Questão ${indice + 1}`
  valueOne.textContent = valor1
  valueTwo.textContent = valor2
  radioContent[0].textContent = vetorA[indice]
  radioContent[1].textContent = vetorB[indice]
  radioContent[2].textContent = vetorC[indice]
  radioContent[3].textContent = vetorD[indice]
  max++
  console.log(max)
}
main()

submit.addEventListener('click', () => {
  verificarMinhaResposta()
})