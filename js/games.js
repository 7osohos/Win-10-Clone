//---------------  Whack A Mole Game ----------
{
    let mole_score = 0;
    // let sound = document.getElementById("myAudio");
    document.addEventListener("click", function (e) {
        let score_up = new Audio("https://www.fesliyanstudios.com/play-mp3/5255");
        if (e.target.className == "mole") {
            e.target.classList.add("attacked");
            mole_score++;
            document.querySelector(".wam_score span").innerHTML = mole_score;
            score_up.play();
        }
    })


    let num = 0;
    let block = document.querySelectorAll(".block");
    function whack_a_mole() {
        let randomSpot = Math.floor(Math.random() * 9);
        if (randomSpot == num) {
            randomSpot += 1;
        }
        block[num].innerHTML = " ";

        block[randomSpot].innerHTML = (`     
    <div class="mole">
    <span class="eye"></span>
    <span class="eye"></span>
    <span class="mouth"></span>
    </div>
    `)

        num = randomSpot;

    }

    setInterval(() => {
        whack_a_mole();
    }, 1000);

}

// --------- XO Game ---------------
{
    let player_turn = "X";
    let square_blocks = document.querySelectorAll(".square");
    let squares = [];

    for (let i = 0; i < square_blocks.length; i++) {
        square_blocks[i].id = "square" + (i + 1);
    }
    // Player Turn Clicks
    document.addEventListener("click", function (e) {
        if (e.target.classList.contains("square")) {

            if (e.target.innerHTML == "" && player_turn == "X") {
                e.target.innerHTML = "X";
                player_turn = "O";
            }
            else if (e.target.innerHTML == "" && player_turn == "O") {
                e.target.innerHTML = "O";
                e.target.classList.add("o");
                player_turn = "X";

            }
            winner();
        }
    })

    function endGame(num1, num2, num3) {
        document.getElementById("square" + num1).classList.add("win");
        document.getElementById("square" + num2).classList.add("win");
        document.getElementById("square" + num3).classList.add("win");
        player_turn = '';
        restart_game(2000);
    }

    function winner() {
        console.log(squares);
        for (let i = 1; i < 10; i++) {
            squares[i] = document.getElementById('square' + i).innerHTML;
        }
        if (squares[1] == squares[2] && squares[2] == squares[3] && squares[3] != '') {
            endGame(1, 2, 3);
        }
        else if (squares[4] == squares[5] && squares[5] == squares[6] && squares[6] != '') {
            endGame(4, 5, 6);
        }
        else if (squares[7] == squares[8] && squares[8] == squares[9] && squares[9] != '') {
            endGame(7, 8, 9);
        }
        else if (squares[1] == squares[4] && squares[4] == squares[7] && squares[1] != '') {
            endGame(1, 4, 7);
        }
        else if (squares[2] == squares[5] && squares[5] == squares[8] && squares[8] != '') {
            endGame(2, 5, 8);
        }
        else if (squares[3] == squares[6] && squares[6] == squares[9] && squares[9] != '') {
            endGame(3, 6, 9);
        }
        else if (squares[1] == squares[5] && squares[5] == squares[9] && squares[9] != '') {
            endGame(1, 5, 9);
        }
        else if (squares[3] == squares[5] && squares[5] == squares[7] && squares[7] != '') {
            endGame(3, 5, 7);
        }
        else if (squares[1] != '' && squares[2] != '' && squares[3] != '' && squares[4] != '' && squares[5] != '' && squares[6] != '' && squares[7] != '' && squares[8] != '' && squares[9] != '') {
            restart_game(2000);
        }
    }

    function restart_game(timer) {
        setTimeout(() => {
            for (let i = 0; i < square_blocks.length; i++) {
                square_blocks[i].innerHTML = "";
                square_blocks[i].classList.remove("o", "win");
            }
            player_turn = "X";
        }, timer);

    }
}