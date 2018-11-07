var getNum = () => {
    num = [];

    while (num.length < 4) {
        let newNum = Math.floor(Math.random() * 10);
        if (num.indexOf(newNum) < 0) {
            num.push(newNum);
        }
    }
    // console.log(num);
    return num;
};

var goal = getNum();

var guess = () => {
    let playersNumber = document.querySelector('#player').value;
    let arr = [];

    for (let i = 0; i < 4; i++) {
        let newUserArrElement = parseInt(playersNumber.substr(i, 1));
        arr.push(newUserArrElement);
    }
    // console.log(arr);

    check(arr);
};
var check = (par) => {
    let bulls = 0;
    let cows = 0;
    let turns = parseInt(document.querySelector('.turns').innerHTML);

    for (let i = 0; i < 4; i++) {
        if (par[i] == goal[i]) {
            bulls++;
        } else if (goal.indexOf(par[i]) >= 0) {
            cows++;
        }

    }

    turns--;
    document.querySelector('.turns').innerHTML = turns;

    if (turns == 0 || bulls == 4) {
        let status = ' Loose ';
        if (bulls == 4) {
            status = ' win ';
        }
        endGame(par, turns, status);
    }

    writeTurn(par, bulls, cows);
    // console.log(goal);
    // console.log('b ' + bulls);
    // console.log('c ' + cows);
};

var writeTurn = (par, bulls, cows) => {
    let table = document.querySelector('.turnsList');
    let newLine = document.createElement('p');
    newLine.innerHTML = '<span class = "guessed">' + par + ' быки: ' + bulls + '; коровы: ' + cows;
    table.appendChild(newLine);
};

var endGame = (par, bulls, status) => {
    document.querySelector('.number').innerHTML = goal;
    alert('You ' + status + ' \r\nЗагаданное число: ' + goal);
}