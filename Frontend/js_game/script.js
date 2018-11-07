var scores, roundScore, activePlayer, dice, gamePlaying;
init();

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0; //True or false
    gamePlaying = true;
    $('.dice').css('display', 'none');
    $('#corrent-0').text('0');
    $('#corrent-1').text('0');
    $('#score-0').text('0');
    $('#score-1').text('0');
    $('#name-0').text("Player1");
    $('#name-1').text("Player2");
    $('.player-0-panel').removeClass('winner');
    $('.player-1-panel').removeClass('winner');
    $('.player-0-panel').removeClass('active');
    $('.player-1-panel').removeClass('active');
    $('.player-0-panel').addClass('active');

}

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    $('#corrent-0').text('0');
    $('#corrent-1').text('0');
    $('.player-0-panel').toggleClass('active');
    $('.player-1-panel').toggleClass('active');
    $('.dice').css('display', 'none');
}

$('.btn-roll').click(function () {
    if (gamePlaying) {
        dice = Math.floor(Math.random() * 6) + 1;
        $('.dice').css('display', 'block');
        $('.dice').attr('src', 'img/dice-' + dice + '.png')

        if (dice !== 1) {
            // roundScore = roundScore + dice
            roundScore += dice;
            $('#current-' + activePlayer).text(roundScore);
        } else {
            nextPlayer();
        }
    }
})

$('.btn-hold').click(function () {
    if (gamePlaying) {
        //Добавляем очки раунда к сохраненному счету
        scores[activePlayer] += roundScore;

        //отобразить новый счет к контейнере с id score-0
        $('#score-' + activePlayer).text(scores[activePlayer]);

        // проверяем выйграл ли игрок
        if (scores[activePlayer] >= 100) {
            $('#name-' + activePlayer).text("Winner!");
            $('.dice').css('display', 'none');
            $('.player-' + activePlayer + '-panel').addClass('active');
            $('.player-' + activePlayer + '-panel').addClass('winner');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
})

$('.btn-new').click(init);