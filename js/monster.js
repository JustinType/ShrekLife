// Etape 4

let name;
let life;
let money;
let awake = true;

function init(n, l, m) {
	name = n;
	life = l;
	money = m;
}

function showme() {
	let monster = document.querySelector("#monster");
	monster.style.backgroundImage = "url('images/show.jpeg')";
	let message = "Je m'appelle "+name+" j'ai "+life+" points de vie et "+money+" d'argent";
	if (!awake) {
		message+=" (en ce moment je dors)"
		monster.style.backgroundImage = "url('images/dort.jpg')";
	}
	
	log(message);
}

let run = document.getElementById('b2');
let fight = document.getElementById('b3');
let work = document.getElementById('b7');
let sleep = document.getElementById('b4');
let eat = document.getElementById('b5');
let show = document.getElementById('b6');


function go() {
	init("Shrek", 20, 0);
	displayStatus(life, money, awake);
	showme();
	show.addEventListener('click', showme);
	setInterval(hasard, 12000);
}




window.addEventListener("load", go());




function log(message) {
	let actionBox = document.getElementById('actionbox');
	let p = document.createElement("p");
	let mess = document.createTextNode(message);
	p.appendChild(mess)
	actionBox.prepend(p);
}




function displayStatus(life, money, awake) {

	let status = document.getElementById('status');

	// Supprime toutes les balises <li> de .status
	for (let i = status.childNodes.length ; i > 0; i--) {
        status.removeChild(status.childNodes[0]);
    }

    // On remplace par les nouvelles balises <li>
    let li1 = document.createElement("li");
    let l = document.createTextNode("Life : "+life);
    li1.appendChild(l);
    status.appendChild(li1);

    let li2 = document.createElement("li");
    let m = document.createTextNode("Money : "+money);
    li2.appendChild(m);
    status.appendChild(li2);

    let li3 = document.createElement("li");
    let a = document.createTextNode("Awake : "+awake);
    li3.appendChild(a);
    status.appendChild(li3);

}



run.addEventListener('click', courir);
fight.addEventListener('click', combattre);
work.addEventListener('click', travailler);
sleep.addEventListener('click', dormir);
eat.addEventListener('click', manger);



function courir() {
	if (life > 0 && awake) {
		life--;
		displayStatus(life, money, awake);
		log('Shrek court');
		let monster = document.querySelector("#monster");
		monster.style.backgroundImage = "url('images/court.gif')";
		if (life <= 0) {
			log("Shrek est MORT en courant");
		}	
	} else if (life <= 0) {
		log('Shrek ne peut pas courir car il est mort');
	} else if (!awake) {
		log('Shrek ne peut pas courir car il est endormi');
	}
}


function combattre() {
	if (life > 0 && awake) {
		life -= 3;
		displayStatus(life, money, awake);
		log('Fiona et Shrek se battent');
		let monster = document.querySelector("#monster");
		monster.style.backgroundImage = "url('images/combat.gif')";
		monster.style.backgroundSize = "cover";
		if (life <= 0) {
			log("Shrek est MORT en combattant");
		}
	} else if (life <= 0) {
		log('Shrek ne peut pas se battre car il est mort');
	} else if (!awake) {
		log('Shrek ne peut pas se battre car il est endormi');
	}	
}


function travailler() {
	if (life > 0 && awake) {
		life--;
		money += 2;
		let monster = document.querySelector("#monster");
		monster.style.backgroundImage = "url('images/travail.gif')";
		displayStatus(life, money, awake);
		log('Shrek travaille');
		if (life <= 0) {
			log("Shrek est MORT en travaillant (quelle vie !)");
		}
	} else if (life <= 0) {
		log('Shrek ne peut pas travailler car il est mort');
	} else if (!awake) {
		log('Shrek ne peut pas travailler car il est endormi');
	}

			
}


function manger() {
	if (life > 0 && money-3 >= 0 && awake) {
		life += 2;
		money -= 3;
		displayStatus(life, money, awake);
		log('Shrek boit');
		let monster = document.querySelector("#monster");
		monster.style.backgroundImage = "url('images/boit.gif')";
	} else if (life <= 0) {
		log('Shrek ne peut pas boire car il est mort');
	} else if (!awake) {
		log('Shrek ne peut pas boire car il est endormi');
	} else if (money-3 < 0) {
		log("Shrek ne peut pas boire car il n'a pas assez d'argent");
	}	
}



function dormir() {
	if (life > 0 && awake) {
		awake = false;
		log("Shrek ronfle zzz");
		displayStatus(life, money, awake)
		let monster = document.querySelector("#monster");
		monster.style.backgroundImage = "url('images/dort.jpg')";
		setTimeout(reveille, 7000);
	} else if (life <= 0) {
		log('Shrek ne peut pas dormir car il est mort');
	} else if (!awake) {
		log('Shrek dort déjà !');
	}
}

function reveille() {
	log("Shrek se réveille !");
	let monster = document.querySelector("#monster");
	monster.style.backgroundImage = "url('images/reveille.gif')";
	life++;
	awake = true;
	displayStatus(life, money, awake);
}




let tab = [courir, combattre, travailler, manger, dormir];

let newlife = document.getElementById('b1').addEventListener('click', revivre);
let kill = document.getElementById('k').addEventListener('click', tuer);



function hasard() {
	if (life > 0 && awake) {
		let i = Math.floor(Math.random() * tab.length);
		tab[i]();
	}
}


function revivre() {
	if (life <= 0) {
		money = 0;
		life = 20;
		displayStatus(life,money,awake);
		log("NOUVELLE VIE")
		let monster = document.querySelector("#monster");
		monster.style.backgroundImage = "url('images/show.jpeg')";
	} else {
		log("Shrek est toujours vivant");
	}
}


function tuer() {
	if (life > 0 && awake) {
		life = 0;
		displayStatus(life,money,awake);
		log("MORT")
		let monster = document.querySelector("#monster");
		monster.style.backgroundImage = "url('images/petitfond.png')";
	} else if (life <= 0) {
		log("Shrek est déjà mort");
	} else if (!awake) {
		life = -1;
		displayStatus(life,money,awake);
		log("MORT DANS SON SOMMEIL")
	}
}