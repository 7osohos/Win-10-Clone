setTimeout(() => {
    document.querySelector(".windows_opening").remove()
}, 4000);



let body = document.querySelector("body");

// Real Time  & Date   Copied!!!
function currentTime() {
    // CLOCK
    let date = new Date();
    let hh = date.getHours();
    let mm = date.getMinutes();
    // let ss = date.getSeconds();
    let session = "AM";

    if (hh === 0) {
        hh = 12;
    }
    if (hh > 12) {
        hh = hh - 12;
        session = "PM";
    }

    hh = (hh < 10) ? "0" + hh : hh;
    mm = (mm < 10) ? "0" + mm : mm;
    // ss = (ss < 10) ? "0" + ss : ss;

    let time = hh + ":" + mm + " " + session;

    document.getElementById("clock").innerText = time;
    let t = setTimeout(function () { currentTime() }, 1000);

    //  DATA
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mo = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mo + '/' + dd + '/' + yyyy;
    document.getElementById("date").innerText = today;
}
//---------- Real Time  & Date END  Copied!!!----------/

currentTime();

// ---------Dark Mode----------//
{
    let darkMode = document.getElementById("darkMode");
    darkMode.onclick = function () {
        body.classList.toggle("light");
        localStorage.setItem("body_class", body.className);

    }
}
// ---------Dark Mode END----------//


//------ Start Menu ------ //
{

    let is_start_show = false;

    function closeStartMenu() {
        document.querySelector(".start_menu").style.display = "none";
        is_start_show = false;

    }
    document.getElementById("start").onclick = function () {

        if (is_start_show == false) {
            document.querySelector(".start_menu").style.display = "block";
            is_start_show = true;

        }
        else {
            closeStartMenu();
        }

    }
}


//--------- Opening Apps ----------//
{
    // Notes
    document.getElementById("note").onclick = function () {

        document.querySelector(".note").style.display = "block";
        closeStartMenu();
    }

    // Wallpaper Changer
    document.getElementById("wallpaper").onclick = function () {
        document.getElementById("change_wp").style.display = "block";
        closeStartMenu();
    }
    // Calculator
    document.getElementById("calc").onclick = function () {
        document.getElementById("calculator").style.display = "block";
        closeStartMenu();
    }
    // To Do List
    document.getElementById("todo").onclick = function () {
        document.getElementById("todo_list").style.display = "block";
        closeStartMenu();
    }
    //Whack a Mole
    document.getElementById("mole").onclick = function () {
        document.getElementById("w_a_m").style.display = "block";
        closeStartMenu();
        mole_score = 0;
        document.querySelector(".wam_score span").innerHTML = 0;
    }

    //X-O Game
    document.getElementById("x_o_game").onclick = function () {
        document.getElementById("x_o").style.display = "block";
        closeStartMenu();
        restart_game(1);
    }

}
//--------- Opening Apps END ----------//


// ---- Defaults --- //

document.addEventListener("click", function (e) {

    // if (e.target.id != "start" && e.target.classList != ("start_menu") && e.target.classList != ("buttons") && e.target.classList != ("app_container")) {
    //     document.querySelector(".start_menu").style.display = "none";
    // }
    let active_icon = document.querySelector(".active");
    if (active_icon) {
        document.querySelector(".active").classList.remove("active");
    }
})
// --------Closing Apps--------- //
{
    document.addEventListener('click', function (event) {
        if (event.target.classList == 'close') {
            event.target.parentNode.parentNode.style.display = "none";
            console.log("Closed")

            if (event.target.parentNode.parentNode.classList.contains("chrome")) {
                document.getElementById("start_chrome").classList.remove("start_icon_open");
            }
            if (event.target.parentNode.parentNode.classList.contains("this_pc")) {
                document.getElementById("file").classList.remove("start_icon_open");
            }
        }

    })
}
// --------Closing Apps END--------- //

//--------------- Change background --------------//
{
    // Old Code*******************
    // document.getElementById("default").onclick = function () {
    //     // body.className = "default";
    //     body.id = "default";
    // }
    // document.getElementById("colorful").onclick = function () {
    //     // body.className = "colorful";
    //     body.id = 'colorful';
    // }
    // document.getElementById("dark").onclick = function () {
    //     // body.className = "dark";
    //     body.id = "dark";
    // }
    // document.getElementById("dark_pink").onclick = function () {
    //     // body.className = "dark_pink";
    //     body.id = "dark_pink";
    // }
    // document.getElementById("nature").onclick = function () {
    //     // body.className = "nature";
    //     body.id = "nature";
    // }

    // improved code***********

    window.onload = function () {
        body.id = localStorage.getItem("body_id");
        body.className = localStorage.getItem("body_class");
    }
    document.addEventListener('click', function (event) {
        if (event.target.parentNode.classList == 'wallPaper') {
            body.id = event.target.parentNode.id;
            // body.style.background = `url(../Images/background/${event.target.parentNode.id});`;
            localStorage.setItem("body_id", body.id);
            console.log("Pressed");
        }

    })
}
//--------------- Change background END --------------//

// ------- Make Apps Draggable Start------ //
{
    let draggable;
    function move(id) {
        let App_window = document.getElementById(id);
        App_window.onmousedown = function (h) {
            over_top == true ? draggable = App_window : draggable = null;


        }
    }
    document.onmouseup = function (e) {
        draggable = null;
    }
    document.onmousemove = function (e) {
        var x = -50 + e.pageX;
        var y = e.pageY;
        if (draggable != null) {
            draggable.style.left = x + "px";
            draggable.style.top = y + "px";
            draggable.style.transform = "translate(0% , 0%) ";
        }
    }

    document.addEventListener("mouseover", function (e) {
        if (e.target.className == "top_bar") {
            console.log(e.target.parentNode.id);
            over_top = true;
            move(e.target.parentNode.id);
        }
        else {
            over_top = false;
        }
    })


    document.addEventListener("dblclick", function (e) {
        if (e.target.className == "top_bar") {
            e.target.parentNode.classList.toggle("fullScreen");
        }

    })
}
// ------- Make Apps Draggable End------ //

// -------- Calculator ---------//
{
    let calcScreen = document.querySelector(".screen");
    let btn = document.querySelectorAll(".numbers span");

    for (i = 0; i < btn.length; i++) {
        btn[i].addEventListener("click", function () {
            if (this.className == "equal") {
                calcScreen.innerHTML = eval(calcScreen.innerHTML);
            }
            else if (this.className == "clear") {
                calcScreen.innerHTML = "0";
                calcScreen.style.fontSize = "60px";
                calcScreen.style.lineHeight = "1";
            }
            // else if (this.className == "delete") {
            //     calcScreen.innerHTML.replace(calcScreen.length - 1, '');
            // }
            else if (this.className == "module") {
                calcScreen.innerHTML = calcScreen.innerHTML / 100;
            }

            else {
                if (calcScreen.innerHTML == 0) {
                    calcScreen.innerHTML = "";
                }
                else if (calcScreen.innerHTML.length > 7) {
                    calcScreen.style.fontSize = "20px";
                    calcScreen.style.lineHeight = "3.5";
                }
                else if (calcScreen.innerHTML.length < 7) {
                    calcScreen.style.fontSize = "60px";
                    calcScreen.style.lineHeight = "1";
                }
                calcScreen.innerHTML += this.innerHTML;
            }

        })
    }
}
//------- Calculator End ----- //

//------- Todo List Start ----- //
{
    document.addEventListener("click", function (e) {
        if (e.target.id == "del") {
            e.target.parentNode.remove();
        }

        if (e.target.id == "add_task") {
            if (input_text.value != "") {

                adding_new_task();
                input_text.focus();
                input_text.value = "";
            }
            else {
                input_text.placeholder = "Place Enter Your Task !!!";
            }
        }
    })


    let task_body = document.querySelector(".tasks");
    let input_text = document.getElementById("input_text");
    let new_task = document.createElement("div");
    function adding_new_task() {
        new_task.innerHTML += `
                    <div class="task">
                        <h4>${input_text.value}</h4>
                        <span id="del" class="del">Delete</span>
                    </div>
    `;
        task_body.appendChild(new_task);

    }
    document.addEventListener("dblclick", function (e) {
        // document.querySelector(".task")
        if (e.target.classList.contains("task")) {
            e.target.classList.toggle("finished_task")
        }
    })

}
//------- Todo List End ----- //


//------- Chrome Start-------- //
{
    document.addEventListener("click", function (e) {
        let tab = document.querySelectorAll(".tab");
        if (e.target.classList.contains("tab")) {
            for (let i = 0; i < tab.length; i++) {
                tab[i].classList.remove("selected");
                e.target.classList.add("selected");
            }
        }

    })
}
//------- Chrome End-------- //



// ----- Desktop Icons ---- //

document.addEventListener("click", function (e) {
    let icons = document.querySelectorAll(".icon");
    if (e.target.classList.contains("icon")) {
        for (let i = 0; i < icons.length; i++) {
            icons[i].classList.remove("active");
            e.target.classList.add("active");
        }
    }

})

//  This PC
// document.addEventListener("dblclick", function (e) {
// })
function open_thisPC() {
    document.getElementById("thisPC").style.display = "block";
    document.getElementById("file").classList.add("start_icon_open");
}



// Chrome
// document.addEventListener("dblclick", function (e) {
// })
function open_chrome() {
    document.getElementById("chrome").style.display = "block";
    document.getElementById("start_chrome").classList.add("start_icon_open");
}
