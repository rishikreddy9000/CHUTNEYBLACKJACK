
var hit = function() {
	var http = new XMLHttpRequest();
	http.open("POST", '/game', false);
	http.onreadystatechange = function() {
		var myArr = JSON.parse(http.responseText);
		var playerHand = myArr.playerHand[myArr.playerHand.length - 1];
		var status = myArr.status;
    addImage(playerHand.imgSrc, 'playerBoard');
		console.log(status);
		if (status.localeCompare('bust') == 0) {
			document.getElementById('result').style.display = 'block';
			document.getElementById('result').innerHTML = "BUST! You're a loser";
			document.getElementById('controls').style.display = 'none';
			location.reload();
		}
  };
	http.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
	http.send("hit");
};

var naw = function() {
	document.getElementById('controls').style.display = 'none';
  var http = new XMLHttpRequest
	http.open("POST", '/game', false);
	http.onreadystatechange = function() {
		var myArr = JSON.parse(http.responseText);
		var dealerHand = myArr.dealerHand;
		var status = myArr.status;
		document.getElementById('x').src = dealerHand[0].imgSrc;
		console.log(dealerHand);
		setTimeout(function() {
			for (var i = 2; i < myArr.length; i++) {
				console.log(myArr[i]);
				addImage(dealerHand[i].imgSrc, 'dealerBoard');
			}}, 100);
		if (status.localeCompare('win') == 0) {
			document.getElementById('result').style.display = 'block';
			document.getElementById('result').innerHTML = "WINNER, WINNER Chicken Dinner!";
		} else if (status.localeCompare('lose') == 0) {
			document.getElementById('result').style.display = 'block';
			document.getElementById('result').innerHTML = "LOSER! Sucks to suck";
		}
		setTimeout(function(){
			location.reload();

		},2000)
  };
	http.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
	http.send("naw");
};

var addImage = function (imgSrc, where) {
	var elm = document.createElement('img');
	elm.setAttribute('src', imgSrc);
	elm.setAttribute('width', '120');
	elm.setAttribute('height', '170');
	elm.style.borderRadius = "4px";
	document.getElementById(where).appendChild(elm);
};

var home = function() {
	window.location.href = './dashboard';
};

var reset = function() {
	var http = new XMLHttpRequest();
	http.open("POST", '/game', false);
	http.onreadystatechange = function() {
		location.reload();
  };
	http.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
	http.send("reset");
};
