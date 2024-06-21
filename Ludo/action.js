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
var tour = 0
var centre = 'centre.gif'
var redPositions = getPositions('pion-red');
var yellowPositions = getPositions('pion-jaune');

var est_bloquer_jaune = true;
var est_bloquer_rouge = true;

function updateGameState() {
    var player1 = String(document.getElementById('p1').style.visibility)
    var player2 = String(document.getElementById('p2').style.visibility)
    var redPositions = getPositions('pion-red');
    var yellowPositions = getPositions('pion-jaune');


    var diceValue = val;
    $.ajax({
        url: 'update_state.php',
        type: 'POST',
        data: {
            dice_value: diceValue,
            red_positions: redPositions,
            yellow_positions: yellowPositions,
            player1_etat: player1,
            player2_etat: player2,
            centre_etat : centre,
            nbP1_sortie : nbP1,
            nbP2_sortie : nbP2,
        },
        success: function(response) {
            console.log(response);
        }
    });
// fetchGameState
}

function getPositions(className) {
    var positions = [];
    var elements = document.getElementsByClassName(className);
    for (var i = 0; i < elements.length; i++) {
        var position = elements[i].parentElement.id;
        var valeur = Math.floor(elements[i].textContent);
        var id = elements[i].id;
        positions.push(`${id},${valeur},${position}`);
    }
    return positions.join('|');
}



function resetGame() {
    $.ajax({
        url: 'reset_state.php',
        type: 'POST',
        success: function(response) {
            console.log(response);
            // Rediriger vers la page d'accueil
            window.location.href = 'index.html';
        }
    });
}

function findPionById(positionsString, pionId) {
    var positions = positionsString.split('|');
    
    for (var i = 0; i < positions.length; i++) {
        var elements = positions[i].split(',');
        var id = elements[0];
        
        if (id === pionId) {
            return id
        }
    }
    return null; // Retourne null si aucun pion avec cet ID n'est trouvé
}

function fetchGameState() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'get_state.php', true);

    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 400) {
            var data = JSON.parse(xhr.responseText);
            
            // Affichage des données récupérées dans la console pour vérification
            console.log(data);

            // Mettre à jour l'affichage avec les données récupérées
            document.getElementById('p1').style.visibility = data.gameState.player1;
            document.getElementById('p2').style.visibility = data.gameState.player2;
            if(data.gameState.dice == 1){
                document.getElementById("centre").style.backgroundImage = "url('IMG/1.jpg')"
                centre = 'IMG/1.jpg'
            }
            if(data.gameState.dice == 2){
                document.getElementById("centre").style.backgroundImage = "url('IMG/2.jpg')"
                centre = 'IMG/2.jpg'
            }
            if(data.gameState.dice == 3){
                document.getElementById("centre").style.backgroundImage = "url('IMG/3.jpg')"
                centre = 'IMG/3.jpg'
            }
            if(data.gameState.dice == 4){
                document.getElementById("centre").style.backgroundImage = "url('IMG/4.jpg')"
                centre = 'IMG/4.jpg'
            }
            if(data.gameState.dice == 5){
                document.getElementById("centre").style.backgroundImage = "url('IMG/5.jpg')"
                centre = 'IMG/5.jpg'
            }
            if(data.gameState.dice == 6){
                document.getElementById("centre").style.backgroundImage = "url('IMG/6.jpg')"
                centre = 'IMG/6.jpg'
            }
            if(data.gameState.dice == 0){
                document.getElementById("centre").style.backgroundImage = "url('IMG/centre.gif')"
                centre = 'centre.gif'
            }
            // Mettre à jour les pions rouges
            data.redPions.forEach(pion => {
                let id = findPionById(redPositions,pion.id)
                if (id && pion.position != -1) {
                    let pionElt = document.getElementById(id)
                    pionElt.parentElement.removeChild(pionElt)
                    document.getElementById(pion.position).appendChild(pionElt);
                    pionElt.textContent = pion.valeur;
                }
                if(pion.position + val <= 55 || pion.valeur >= 0){
                    est_bloquer_rouge = false
                }
            });
            rouges = data.redPions
            // Mettre à jour les pions jaunes
            data.yellowPions.forEach(pion => {
                let id = findPionById(yellowPositions,pion.id)
                if (id && pion.position != -1) {
                    let pionElt = document.getElementById(id)
                    pionElt.parentElement.removeChild(pionElt)
                    document.getElementById(pion.position).appendChild(pionElt);
                    pionElt.textContent = pion.valeur;
                }
                if(pion.position + val <= 55 || pion.valeur >= 0){
                    est_bloquer_jaune = false
                }
            });
            jaunes = data.yellowPions
        } else {
            console.error('Error fetching game state. Status:', xhr.status);
        }
    };

    xhr.onerror = function() {
        console.error('Request failed');
    };

    xhr.send();
}



// Appel de la fonction pour récupérer les données lorsque la page est chargée
window.onload = fetchGameState;


setInterval(fetchGameState, 500);

function lancement(id1,id2){
    if ( est_bloquer_jaune && id1 ==='p1' || est_bloquer_rouge && id1 === 'p2' || val == 0){
        updateGameState()
        audio2.src = "Media/dice-142528.mp3"
        audio2.removeAttribute('loop')
        val = Math.floor((Math.random() * 6) + 1);
        
        if(val == 1){
        document.getElementById("centre").style.backgroundImage = "url('IMG/1.jpg')"
        centre = 'IMG/1.jpg'
        }
        if(val == 2){
            document.getElementById("centre").style.backgroundImage = "url('IMG/2.jpg')"
            centre = 'IMG/2.jpg'
        }
        if(val == 3){
            document.getElementById("centre").style.backgroundImage = "url('IMG/3.jpg')"
            centre = 'IMG/3.jpg'
        }
        if(val == 4){
            document.getElementById("centre").style.backgroundImage = "url('IMG/4.jpg')"
            centre = 'IMG/4.jpg'
        }
        if(val == 5){
            document.getElementById("centre").style.backgroundImage = "url('IMG/5.jpg')"
            centre = 'IMG/5.jpg'
        }
        if(val == 6){
            document.getElementById("centre").style.backgroundImage = "url('IMG/6.jpg')"
            centre = 'IMG/6.jpg'
        }
        if(val != 6){
            player += 1
            document.getElementById(id1).style.visibility = "hidden"
            document.getElementById(id2).style.visibility = "visible"
        }
        tour += 1
        updateGameState();
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
                if(document.getElementById(player).style.visibility === "hidden" || tour == 1){
                    point.style.top = "0px"
                    point.style.left = "0px"
                    point.style.bottom = "0px"
                    point.style.right = "0px"
                    
                    manger('0','pion-red','HomeJaune')
                    
                    document.getElementById('0').appendChild(point)
                    point.style.left = "14px"
                    point.style.top = "14px"
                    value += 1
                    point.textContent = value
                    sound()
                    val = 0
                    updateGameState();
                }else{
                    alert("c'est le tour de "+player)
                }
            }else{
                if(document.getElementById(player).style.visibility === "hidden"){
                    point.style.left = "25px"
                    point.style.top = "21px"
                    
                    manger('26','pion-jaune','HomeRouge')
                    
                    document.getElementById('26').appendChild(point)
                    value += 1
                    point.textContent = value
                    point.style.left = "14px"
                    point.style.top = "14px"
                    val = 0
                    sound()
                    updateGameState();
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
                                sound()
                                var pos = 52 + (val+value)%51
                                document.getElementById(pos).appendChild(point)
                                value += val
                                point.textContent = value
                                val = 0
                                updateGameState();
                            }else{
                                var parent = point.parentElement
                                var indice = Math.floor(parent.id)+val
                                var counter = 0;
                                var moveInterval = setInterval(function() {
                                    var parent = point.parentElement
                                    var pos = Math.floor(parent.id)
                                    if (counter < val) {
                                        sound()
                                        parent = point.parentElement
                                        parent.removeChild(point)
                                        pos += 1
                                        document.getElementById(pos).appendChild(point)
                                        counter++;
                                        updateGameState();
                                    } else {
                                        clearInterval(moveInterval);
                                        value += val
                                        point.textContent = value
                                        val = 0
                                        updateGameState();
                                    }
                                }, 500);
                                manger(indice,'pion-red','HomeJaune')
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
                                val = 0
                                updateGameState();
                            }else{
                                var parent = point.parentElement
                                var indice = Math.floor(parent.id)+val
                                var counter = 0;
                                var moveInterval = setInterval(function() {
                                    var parent = point.parentElement
                                    var pos = Math.floor(parent.id)
                                    if (counter < val) {
                                        sound()
                                        parent = point.parentElement
                                        parent.removeChild(point)
                                        pos += 1
                                        document.getElementById(pos).appendChild(point)
                                        counter++;
                                        updateGameState();
                                    } else {
                                        clearInterval(moveInterval);
                                        value += val
                                        point.textContent = value
                                        val = 0
                                        updateGameState();
                                    }
                                }, 500);
                                manger(indice,'pion-red','HomeJaune')
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
                                val = 0
                                updateGameState();
                            }else{
                                var parent = point.parentElement
                                var id = parent.id
                                if(Math.floor(id) +val >= 52){
                                    var indice = (Math.floor(id)+val) % 52
                                    var counter = 0;
                                    var moveInterval = setInterval(function() {
                                        var parent = point.parentElement
                                        if (counter <= (Math.floor(id)+val) % 52) {
                                            sound()
                                            parent = point.parentElement
                                            parent.removeChild(point)
                                            var pos = counter
                                            document.getElementById(pos).appendChild(point)
                                            counter++;
                                            updateGameState();
                                        } else {
                                            clearInterval(moveInterval);
                                            value += val
                                            point.textContent = value
                                            val = 0
                                            updateGameState();
                                        }
                                    }, 500);
                                    manger(indice,'pion-jaune','HomeRouge')
                                }else{
                                    var parent = point.parentElement
                                    var indice = Math.floor(parent.id)+val
                                    var counter = 0;
                                    var moveInterval = setInterval(function() {
                                        var parent = point.parentElement
                                        var pos = Math.floor(parent.id)
                                        if (counter < val) {
                                            sound()
                                            parent = point.parentElement
                                            parent.removeChild(point)
                                            pos += 1
                                            document.getElementById(pos).appendChild(point)
                                            counter++;
                                            updateGameState();
                                        } else {
                                            clearInterval(moveInterval);
                                            value += val
                                            point.textContent = value
                                            val = 0
                                            updateGameState();
                                        }
                                    }, 500);
                                    manger(indice,'pion-jaune','HomeRouge')
                                }
                            }
                        }else{
                            alert("c'est le tour de "+player)
                        }
                    }else{
                        if(document.getElementById(player).style.visibility !== "hidden"){
                            if((value+val) >= 51 && (value+val) <= 55){
                                sound()
                                var pos = 62 + (val+value)%51
                                document.getElementById(pos).appendChild(point)
                                value += val
                                point.textContent = value
                                val = 0
                                updateGameState();
                            }else{
                                var parent = point.parentElement
                                var id = parent.id
                                if(Math.floor(id) +val >= 52){
                                    var indice = (Math.floor(id)+val) % 52
                                    var counter = 0;
                                    var moveInterval = setInterval(function() {
                                        var parent = point.parentElement
                                        if (counter <= (Math.floor(id)+val) % 52) {
                                            sound()
                                            parent = point.parentElement
                                            parent.removeChild(point)
                                            var pos = counter
                                            document.getElementById(pos).appendChild(point)
                                            counter++;
                                            updateGameState();
                                        } else {
                                            clearInterval(moveInterval);
                                            value += val
                                            point.textContent = value
                                            val = 0
                                            updateGameState();
                                        }
                                    }, 500);
                                    manger(indice,'pion-jaune','HomeRouge')
                                }else{
                                    var parent = point.parentElement
                                    var indice = Math.floor(parent.id)+val
                                    var counter = 0;
                                    var moveInterval = setInterval(function() {
                                        var parent = point.parentElement
                                        var pos = Math.floor(parent.id)
                                        if (counter < val) {
                                            sound()
                                            parent = point.parentElement
                                            parent.removeChild(point)
                                            pos += 1
                                            document.getElementById(pos).appendChild(point)
                                            counter++;
                                            updateGameState();
                                        } else {
                                            clearInterval(moveInterval);
                                            value += val
                                            point.textContent = value
                                            val = 0
                                            updateGameState();
                                        }
                                    }, 500);
                                    manger(indice,'pion-jaune','HomeRouge')
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
                updateGameState();
            }else{
                nbP2 += 1
                updateGameState();
            }
            audio3.src = "Media/goodresult-82807.mp3"
            audio3.removeAttribute('loop')
        }
    }
    if(val == 0 || value == -1){
        audio3.src = "Media/rapid-wind-sound-effect-1-108398.mp3"
        audio3.removeAttribute('loop')
    }
    audio2.src = "Media/bone-shell-85732.mp3"
    audio2.setAttribute('loop','loop')
    document.getElementById("centre").style.backgroundImage = "url('IMG/centre.gif')"
    updateGameState();
}

addEventListener('keydown', function (e){
    if(e.keyCode == 32){
        if(player % 2 == 0){
            lancement("p1","p2")
        }else{
            lancement("p2","p1")
        }
    }
    updateGameState();
})

addEventListener('mouseover',fini)

function fini(){
    if(nbP1 == 4){
        alert("Le player 1 a gagner !!\n la partie a duree "+tour+"Tours")
        audio.src = "Media/goodresult-82807.mp3"
        audio.removeAttribute('loop')
        audio2.src = "Media/goodresult-82807.mp3"
        audio2.removeAttribute('loop')
        audio3.src = "Media/goodresult-82807.mp3"
        audio3.removeAttribute('loop')
    }
    if(nbP2 == 4){
        alert("Le player 2 a gagner !!\n la partie a duree "+tour+"Tours")
        audio.src = "Media/goodresult-82807.mp3"
        audio.removeAttribute('loop')
        audio2.src = "Media/goodresult-82807.mp3"
        audio2.removeAttribute('loop')
        audio3.src = "Media/goodresult-82807.mp3"
        audio3.removeAttribute('loop')
    }
    updateGameState()
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
