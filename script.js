const massive1_19 = ['', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять', 'десять',
    'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать',
    'восемнадцать', 'девятнадцать'
];

const massive20_90 = ['', '', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят',
    'восемьдесят', 'девяносто'
];

const massive100_900 = ['', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот',
    'семьсот', 'восемьсот', 'девятьсот'
];


let close_number = document.getElementById('button');
let close_number2 = document.getElementById('button2');
let close_number3 = document.getElementById('button3');
let close_number4 = document.getElementById('button4');
let number = document.getElementById('number');
let number2 = document.getElementById('number2');
let number3 = document.getElementById('number3');
let number4 = document.getElementById('number4');
let text4 = document.getElementById('number_txt4');
let minValue;
let maxValue;

close_number.onclick = function () {
    number.classList.add('number_lst');
    number2.classList.add('number_lst2');
}

close_number2.onclick = function (event) {
    event.preventDefault();
    minValue = parseInt(document.getElementById("minValue").value) || 0;
    minValue = (minValue < -999) ? -999 : minValue;
    number2.classList.remove('number_lst2');
    number3.classList.add('number_lst3');

}

close_number3.onclick = function (event) {
    event.preventDefault();
    maxValue = parseInt(document.getElementById("maxValue").value) || 100;
    maxValue = (maxValue > 999) ? 999 : maxValue;
    if (maxValue < minValue) {
        minValue = 0;
        maxValue = 100;
    }
    text4.textContent = `Загадайте любое число от ${minValue} до ${maxValue}, а я его угадаю`;
    number3.classList.remove('number_lst3');
    number4.classList.add('number_lst4');
}

close_number4.onclick = function () {
    number4.classList.remove('number_lst4');
    game();
}

function game() {
    let gameRun = true;
    let answerNumber = Math.floor((minValue + maxValue) / 2);
    let textOfNumber;
    let orderNumber = 1;

    const orderNumberField = document.getElementById('orderNumberField');
    const answerField = document.getElementById('answerField');

    orderNumberField.innerText = orderNumber;
    answerField.innerText = `Вы загадали число ${answerNumber }?`;


    function textNumber() {
        let textCount = Math.abs(answerNumber);
        if (textCount < 20) {
            textOfNumber = massive1_19[textCount];
        } else if (textCount < 100) {
            let result1 = textCount % 10;
            textCount = parseInt(textCount / 10);
            textOfNumber = massive20_90[textCount] + " " + massive1_19[result1];
        } else if (textCount < 1000) {
            result1 = textCount % 100;
            if (result1 < 20) {
                textCount = parseInt(textCount / 100);
                textOfNumber = massive100_900[textCount] + " " + massive1_19[result1];
            } else {
                let result2 = result1 % 10;
                result1 = parseInt(result1 / 10);
                textCount = parseInt(textCount / 100);
                textOfNumber = massive100_900[textCount] + " " + massive20_90[result1] + " " + massive1_19[result2];
            }
        }

        if (answerNumber == 0) {
            textOfNumber = "ноль"
        }
        if (textOfNumber.length > 20) {
            textOfNumber = answerNumber.toString();
        } else if (answerNumber < 0) {
            textOfNumber = 'минус ' + textOfNumber;
        }

        return textOfNumber;
    }

    textNumber();

    orderNumberField.innerText = orderNumber;
    answerField.innerText = `Вы загадали число ${textOfNumber }?`;

    document.getElementById('btnOver').addEventListener('click', function () {
        if (gameRun) {
            if (minValue === maxValue) {
                const phraseRandom = Math.round(Math.random());
                const answerPhrase = (phraseRandom === 1) ?
                    `Вы загадали неправильное число!\n\u{1F914}` :
                    `Я сдаюсь..\n\u{1F92F}`;

                answerField.innerText = answerPhrase;
                gameRun = false;
            } else {
                minValue = answerNumber + 1;
                answerNumber = Math.floor((minValue + maxValue) / 2);
                textNumber();
                orderNumber++;
                orderNumberField.innerText = orderNumber;
                answerField.innerText = `Вы загадали число ${answerNumber }?`;
                let numr1 = Math.round(Math.random() * 2);
                switch (numr1) {
                    case 0:
                        answerField.innerText = `Вы загадали число ${textOfNumber }?`;
                        break;
                    case 1:
                        answerField.innerText = `Возможно, это число ${textOfNumber }?`;
                        break;
                    case 2:
                        answerField.innerText = `Cлишком просто! Ваше число ${textOfNumber }?`;
                        break;
                }
            }
        }
    })

    document.getElementById('btnLess').addEventListener('click', function () {
        if (gameRun) {
            if (minValue === maxValue) {
                const numr = Math.round(Math.random());
                const answerPhrase = (numr === 1) ?
                    `Вы загадали неправильное число!\n\u{1F914}` :
                    `Я сдаюсь..\n\u{1F92F}`;

                answerField.innerText = answerPhrase;
                gameRun = false;
            } else {
                maxValue = answerNumber - 1;
                answerNumber = Math.floor((minValue + maxValue) / 2);
                textNumber();
                orderNumber++;
                orderNumberField.innerText = orderNumber;
                let numr2 = Math.round(Math.random() * 2);
                switch (numr2) {
                    case 0:
                        answerField.innerText = `Сейчас угадаю! Это ${textOfNumber }?`;
                        break;
                    case 1:
                        answerField.innerText = `Возможно, это ${textOfNumber }?`;
                        break;
                    case 2:
                        answerField.innerText = `Ваше число ${textOfNumber }?`;
                        break;
                }
            }
        }
    })

    document.getElementById('btnEqual').addEventListener('click', function () {
        if (gameRun) {
            let numr3 = Math.round(Math.random() * 3);
            switch (numr3) {
                case 0:
                    answerField.innerText = `Я всегда угадываю!\n\u{1F600}`;
                    break;
                case 1:
                    answerField.innerText = `Снова угадал!\n\u{1F601}`;
                    break;
                case 2:
                    answerField.innerText = `Угадал, как всегда!\n\u{1F609}`;
                    break;
                case 3:
                    answerField.innerText = `Слишком просто!\n\u{1F60E}`;
                    break;
            }
            document.body.classList.add('btnEqual');
            gameRun = false;
        }
    })
}

document.getElementById('btnRetry').addEventListener('click', function () {
    minValue = 0;
    maxValue = 100;
    orderNumber = 0;
})