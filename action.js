var val = 0
var player = 0
var audio = document.getElementById('background-music');
var audio2 = document.getElementById('effect-music')
var audio3 = document.getElementById('effect-music2')

audio.volume = 0.5;
audio2.volume = 1.0;
audio3.volume = 1.0;
var nbP1 = 0;
var nbP2 = 0;
val = 6

function lancement(id1,id2){
    audio2.src = "Media/dice-142528.mp3"
    audio2.removeAttribute('loop')
    val = Math.floor((Math.random() * 6) + 1);

    if(val == 1){
        document.getElementById("centre").style.backgroundImage = "url('IMG/1.jpg')"
    }
    if(val == 2){
        document.getElementById("centre").style.backgroundImage = "url('IMG/2.jpg')"
    }
    if(val == 3){
        document.getElementById("centre").style.backgroundImage = "url('IMG/3.jpg')"
    }
    if(val == 4){
        document.getElementById("centre").style.backgroundImage = "url('IMG/4.jpg')"
    }
    if(val == 5){
        document.getElementById("centre").style.backgroundImage = "url('IMG/5.jpg')"
    }
    if(val == 6){
        document.getElementById("centre").style.backgroundImage = "url('IMG/6.jpg')"
    }
    if(val != 6){
        player += 1
        document.getElementById(id1).style.visibility = "hidden"
        document.getElementById(id2).style.visibility = "visible"
    }
}

if(val <= 0){
    document.getElementById("centre").style.backgroundImage = "url('IMG/centre.gif')"
}

function deplacer(id,nature,player){
    if (val != 0){
        var point = document.getElementById(id)
        var value = Math.floor(point.textContent)
        if (val == 6 && value == -1 ){
            if(nature == 'red'){
                if(document.getElementById(player).style.visibility === "hidden"){
                    point.style.top = "0px"
                    point.style.left = "0px"
                    point.style.bottom = "0px"
                    point.style.right = "0px"
                    sound()
                    
                    manger('0','pion-red','HomeJaune')
                    
                    document.getElementById('0').appendChild(point)
                    point.style.left = "25px"
                    point.style.top = "25px"
                    value += 1
                    point.textContent = value
                    val = 0
                }else{
                    alert("c'est le tour de "+player)
                }
            }else{
                if(document.getElementById(player).style.visibility === "hidden"){
                    point.style.left = "25px"
                    point.style.top = "21px"
                    sound()
                    
                    manger('26','pion-jaune','HomeRouge')
                    
                    document.getElementById('26').appendChild(point)
                    value += 1
                    point.textContent = value
                    val = 0
                }else{
                    alert("c'est le tour de "+player)
                }
            }
        }else{
            if(value+val <= 55 && value >= 0){
                if(nature == 'red'){
                    if(val == 6){
                        if(document.getElementById(player).style.visibility === "hidden"){
                            if((value+val) >= 51 && (value+val) <= 55){
                                var pos = 52 + (val+value)%51
                                document.getElementById(pos).appendChild(point)
                                value += val
                                point.textContent = value
                                // val = 0
                            }else{
                                var parent = point.parentElement
                                var indice = Math.floor(parent.id)+val
                                var counter = 0;
                                var moveInterval = setInterval(function() {
                                    var parent = point.parentElement
                                    var pos = Math.floor(parent.id)
                                    sound()
                                    if (counter < val) {
                                        parent = point.parentElement
                                        parent.removeChild(point)
                                        pos += 1
                                        document.getElementById(pos).appendChild(point)
                                        counter++;
                                    } else {
                                        clearInterval(moveInterval);
                                    }
                                }, 200);
                                manger(indice,'pion-red','HomeJaune')
                                value += val
                                point.textContent = value
                                // val = 0
                            }
                        }else{
                            alert("c'est le tour de "+player)
                        }
                    }else{
                        if(document.getElementById(player).style.visibility !== "hidden"){
                            if((value+val) >= 51 && (value+val) <= 55){
                                var pos = 52 + (val+value)%51
                                document.getElementById(pos).appendChild(point)
                                value += val
                                point.textContent = value
                                // val = 0
                            }else{
                                var parent = point.parentElement
                                var indice = Math.floor(parent.id)+val
                                var counter = 0;
                                var moveInterval = setInterval(function() {
                                    var parent = point.parentElement
                                    var pos = Math.floor(parent.id)
                                    sound()
                                    if (counter < val) {
                                        parent = point.parentElement
                                        parent.removeChild(point)
                                        pos += 1
                                        document.getElementById(pos).appendChild(point)
                                        counter++;
                                    } else {
                                        clearInterval(moveInterval);
                                    }
                                }, 200);
                                manger(indice,'pion-red','HomeJaune')
                                value += val
                                point.textContent = value
                                // val = 0
                            }
                        }else{
                            alert("c'est le tour de "+player)
                        }
                    }
                }else{
                    if(val == 6){
                        if(document.getElementById(player).style.visibility === "hidden"){
                            if((value+val) >= 51 && (value+val) <= 55){
                                var pos = 62 + (val+value)%51
                                document.getElementById(pos).appendChild(point)
                                value += val
                                point.textContent = value
                                // val = 0
                            }else{
                                var parent = point.parentElement
                                var id = parent.id
                                if(Math.floor(id) +val >= 52){
                                    var indice = (Math.floor(id)+val) % 52
                                    var counter = 0;
                                    var moveInterval = setInterval(function() {
                                        var parent = point.parentElement
                                        sound()
                                        if (counter <= (Math.floor(id)+val) % 52) {
                                            parent = point.parentElement
                                            parent.removeChild(point)
                                            var pos = counter
                                            document.getElementById(pos).appendChild(point)
                                            counter++;
                                        } else {
                                            clearInterval(moveInterval);
                                        }
                                    }, 200);
                                    manger(indice,'pion-jaune','HomeRouge')
                                    value += val
                                    point.textContent = value
                                    // val = 0
                                }else{
                                    var parent = point.parentElement
                                    var indice = Math.floor(parent.id)+val
                                    var counter = 0;
                                    var moveInterval = setInterval(function() {
                                        var parent = point.parentElement
                                        var pos = Math.floor(parent.id)
                                        sound()
                                        if (counter < val) {
                                            parent = point.parentElement
                                            parent.removeChild(point)
                                            pos += 1
                                            document.getElementById(pos).appendChild(point)
                                            counter++;
                                        } else {
                                            clearInterval(moveInterval);
                                        }
                                    }, 200);
                                    manger(indice,'pion-jaune','HomeRouge')
                                    value += val
                                    point.textContent = value
                                    // val = 0
                                }
                            }
                        }else{
                            alert("c'est le tour de "+player)
                        }
                    }else{
                        if(document.getElementById(player).style.visibility !== "hidden"){
                            if((value+val) >= 51 && (value+val) <= 55){
                                var pos = 62 + (val+value)%51
                                document.getElementById(pos).appendChild(point)
                                value += val
                                point.textContent = value
                                // val = 0
                            }else{
                                var parent = point.parentElement
                                var id = parent.id
                                if(Math.floor(id) +val >= 52){
                                    var indice = (Math.floor(id)+val) % 52
                                    var counter = 0;
                                    var moveInterval = setInterval(function() {
                                        var parent = point.parentElement
                                        sound()
                                        if (counter <= (Math.floor(id)+val) % 52) {
                                            parent = point.parentElement
                                            parent.removeChild(point)
                                            var pos = counter
                                            document.getElementById(pos).appendChild(point)
                                            counter++;
                                        } else {
                                            clearInterval(moveInterval);
                                        }
                                    }, 200);
                                    manger(indice,'pion-jaune','HomeRouge')
                                    value += val
                                    point.textContent = value
                                    // val = 0
                                }else{
                                    var parent = point.parentElement
                                    var indice = Math.floor(parent.id)+val
                                    var counter = 0;
                                    var moveInterval = setInterval(function() {
                                        var parent = point.parentElement
                                        var pos = Math.floor(parent.id)
                                        sound()
                                        if (counter < val) {
                                            parent = point.parentElement
                                            parent.removeChild(point)
                                            pos += 1
                                            document.getElementById(pos).appendChild(point)
                                            counter++;
                                        } else {
                                            clearInterval(moveInterval);
                                        }
                                    }, 200);
                                    manger(indice,'pion-jaune','HomeRouge')
                                    value += val
                                    point.textContent = value
                                    // val = 0
                                }
                            }
                        }else{
                            alert("c'est le tour de "+player)
                        }
                    }
                }
            }
        }
        if(value == 55){
            point.style.visibility = "hidden"
            if(nature == 'red'){
                nbP1 += 1
            }else{
                nbP2 += 1
            }
            audio3.src = "Media/goodresult-82807.mp3"
            audio3.removeAttribute('loop')
        }
        // val = 0
    }
    if(val == 0 || value == -1){
        audio3.src = "Media/rapid-wind-sound-effect-1-108398.mp3"
        audio3.removeAttribute('loop')
    }
    audio2.src = "Media/bone-shell-85732.mp3"
    audio2.setAttribute('loop','loop')
    document.getElementById("centre").style.backgroundImage = "url('IMG/centre.gif')"
}

addEventListener('keydown', function (e){
    if(e.keyCode == 32){
        if(player % 2 == 0){
            lancement("p1","p2")
        }else{
            lancement("p2","p1")
        }
    }
})

addEventListener('mouseover',fini)


function fini(){
    if(nbP1 == 4){
        alert("Le player 1 a gagner !!")
        audio.src = "Media/goodresult-82807.mp3"
        audio.removeAttribute('loop')
        audio2.src = "Media/goodresult-82807.mp3"
        audio2.removeAttribute('loop')
        audio3.src = "Media/goodresult-82807.mp3"
        audio3.removeAttribute('loop')
    }
    if(nbP2 == 4){
        alert("Le player 2 a gagner !!")
        audio.src = "Media/goodresult-82807.mp3"
        audio.removeAttribute('loop')
        audio2.src = "Media/goodresult-82807.mp3"
        audio2.removeAttribute('loop')
        audio3.src = "Media/goodresult-82807.mp3"
        audio3.removeAttribute('loop')
    }
}

function sound(){
    audio2.src = "Media/pop-39222.mp3"
    audio2.removeAttribute('loop')
}

function manger(pos,famille,maison){
    if(document.getElementById(pos).hasChildNodes()){
        if(document.getElementById(pos).firstElementChild.classList.contains(famille)){

        }else{
            document.getElementById(pos).firstElementChild.textContent = -1
            document.getElementById(maison).appendChild(document.getElementById(pos).firstElementChild)
            audio3.src = "Media/big-boom-202678.mp3"
            audio3.removeAttribute('loop')
        }
    }
}