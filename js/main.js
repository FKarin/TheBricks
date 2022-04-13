	function lose() {
	  Swal.fire({
		  title: "<h4>Oh no!</h4>",
		  text: "You've failed to make the krabby patties requested, and a customer has left unsatisfied!",
		  confirmButtonText: "RESTART",
	  }).then((result) => {
		  restart();
	  })
	}
	function win() {
	  Swal.fire({
		  title: "<h4>Good job!</h4>",
		  text: "You have fed your customer the iconic krabby patty!",
		  confirmButtonText: "RESTART",
	  }).then((result) => {
		  restart();
	  })
	}
function restart(){
	document.location.reload();
}	
function drawIt() {
	var interval;
	var x = 400;
	var y = 300;
	var dx = 0;
	var dy = 5;
	var width=700;
	var height=450;
	var r=15;
	var ctx;
	var canvas;
	var ctx2;
	var canvas2;
	
	var paddlex;
	var paddleh;
	var paddlew;
				
	var rightDown = false;
	var leftDown = false;
				
	var canvasMinX;
	var canvasMaxX;
	
	var bricks;
	var NROWS;
	var NCOLS;
	var BRICKWIDTH;
	var BRICKHEIGHT;
	var PADDING;
	var i;
	var j;
	var bricks_x;
	var bricks_y;
	
	var tocke;
	
	var level=1;
	
	
	var patty = new Image();
	patty.src = "../krusty krab/img/patty.png";
	
	var lettuce=new Image();
	lettuce.src="../krusty krab/img/lettuce.png";
	
	var images=[patty,lettuce];
	
	//timer
	var sekunde;
	var sekundeI;
	var minuteI;
	var intTimer;
	var izpisTimer="00:00";
	//timer
	function nextLevel(){
		level=2;
		r=12;
		paddlew=125;
		initbricks();
	}
	
	if(start==true){
		sekunde++;

		sekundeI = ((sekundeI = (sekunde % 60)) > 9) ? sekundeI : "0"+sekundeI;
		minuteI = ((minuteI = Math.floor(sekunde / 60)) > 9) ? minuteI : "0"+minuteI;
		izpisTimer = minuteI + ":" + sekundeI;

		$("#cas").html(izpisTimer);
	}
	else{
		sekunde=0;
		izpisTimer = "00:00";
		$("#cas").html(izpisTimer);
	}	
		function timer(){
          if (start)
          {
          sekunde++;
          sekundeI = ((sekundeI = (sekunde % 60)) > 9) ? sekundeI : "0"+sekundeI;
          minuteI = ((minuteI = Math.floor(sekunde / 60)) > 9) ? minuteI : "0"+minuteI;
          izpisTimer = minuteI + ":" + sekundeI;
          $("#cas").html(izpisTimer);
          }
          else{
            sekunde=0;
            izpisTimer = "00:00";
            $("#cas").html(izpisTimer);
            }
          }
	function onKeyDown(evt) {
		if (evt.keyCode == 39)
			rightDown = true;
		else if (evt.keyCode == 37) 
			leftDown = true;
	}
	function onKeyUp(evt) {
		if (evt.keyCode == 39)
			rightDown = false;
		else if (evt.keyCode == 37) 
			leftDown = false;
	}
	
	function init_mouse() {
		canvasMinX = $("canvas").offset().left;
		canvasMaxX = canvasMinX + width;
	}
	
	function onMouseMove(evt){
        if(evt.pageX>canvasMinX+paddlew/2 && evt.pageX<canvasMaxX-paddlew/2){
            paddlex=evt.pageX-canvasMinX-paddlew/2;
        }
    }
	
	function initbricks(level) { //inicializacija opek - polnjenje v tabelo
		NROWS = 6;
		bricks_x=[90,650,150,504,50,420];
		bricks_y=[170,285,255,228,330,228];
		BRICKWIDTH = 35;
		BRICKHEIGHT = 25;
		PADDING = 1;
		bricks = new Array(NROWS);
		for (i=0; i < bricks.length; i++) {
			bricks[i] = 1;
		}
	}
	
	$(document).mousemove(onMouseMove);
	
	$(document).keydown(onKeyDown);
	$(document).keyup(onKeyUp); 
	function win() {
	  Swal.fire({
		  title: "<h4>You won!</h4>",
		  text: "You've failed to make the krabby patties requested, and a customer has left unsatisfied!",
		  confirmButtonText: "RESTART",
		  confirmButtonColor: '#593c02'
	  }).then((result) => {
		  restart();
	  })
	}
	function init_paddle() {
		paddlex = width / 2;
		paddleh = 10;
		paddlew = 150;
	}
	function init() {
		canvas=document.getElementById('canvas');
		ctx = canvas.getContext('2d');
		tocke = 0;
		$("#tocke").html(tocke);
		sekunde = 0;
		izpisTimer = "00:00";
		intTimer = setInterval(timer, 1000);
		interval = setInterval(draw, 10);
		return interval;
	}
	var start=true;
	function draw() { 
		ctx.clearRect(0,0,width,height);
		ctx.beginPath();
		ctx.arc(x, y, r, 0, Math.PI*2, true);
		ctx.fill();
		
	
		//premik ploščice levo in desno
		if(rightDown){
			if((paddlex+paddlew) < width){
				paddlex += 5;
			}else{
				paddlex = width-paddlew;
			}
		}
		else if(leftDown){
			if(paddlex>0){
				paddlex -=5;
			}else{
				paddlex=0;
			}
		}
	
		ctx.fillStyle="#000";
		ctx.beginPath();
		ctx.rect(paddlex, height-paddleh, paddlew, paddleh);
		
		//riši opeke
		for (i=0; i < bricks.length; i++) {
			if(bricks[i]==1&&level==1){
				if(bricks_x[i]==420&&bricks_y[i]==228||bricks_x[i]==504&&bricks_y[i]==228)
					ctx.drawImage(images[0],bricks_x[i],bricks_y[i],25, 20);
				else
					ctx.drawImage(images[0],bricks_x[i],bricks_y[i],BRICKWIDTH, BRICKHEIGHT);
			}
			else if(bricks[i]==2||bricks[i]==1&&level==2){
				if(bricks_x[i]==420&&bricks_y[i]==228||bricks_x[i]==504&&bricks_y[i]==228)
					ctx.drawImage(images[1],bricks_x[i],bricks_y[i],25, 20);
				else
					ctx.drawImage(images[1],bricks_x[i],bricks_y[i],BRICKWIDTH, BRICKHEIGHT);
			}
		}
		ctx.fill();
		ctx.closePath();
		
		rowheight = BRICKHEIGHT + PADDING; //Smo zadeli opeko?
		row = Math.floor(y/rowheight);
		//Če smo zadeli opeko, vrni povratno kroglo in označi v tabeli, da opeke ni več
			if (x>=bricks_x[0] && x<=(bricks_x[0]+BRICKWIDTH) && y>=bricks_y[0] && y<=bricks_y[0]+BRICKHEIGHT && bricks[0]==1||bricks[0]==2) {
				dy = -dy; bricks[0]--;
				tocke += 1;
				$("#tocke").html(tocke);
			}
			if (x>=bricks_x[1] && x<=(bricks_x[1]+BRICKWIDTH) && y>=bricks_y[1] && y<=bricks_y[1]+BRICKHEIGHT && bricks[1]==1||bricks[1]==2) {
				dy = -dy; bricks[1]--;
				tocke += 1;
				$("#tocke").html(tocke);
			}
			if (x>=bricks_x[2] && x<=(bricks_x[2]+BRICKWIDTH) && y>=bricks_y[2] && y<=bricks_y[2]+BRICKHEIGHT && bricks[2]==1||bricks[2]==2) {
				dy = -dy; bricks[2]--;
				tocke += 1;
				$("#tocke").html(tocke);
			}
			if (x>=bricks_x[3] && x<=(bricks_x[3]+25) && y>=bricks_y[3] && y<=bricks_y[3]+20 && bricks[3]==1||bricks[3]==2) {
				dy = -dy; bricks[3]--;
				tocke += 3;
				$("#tocke").html(tocke);
			}
			if (x>=bricks_x[4] && x<=(bricks_x[4]+BRICKWIDTH) && y>=bricks_y[4] && y<=bricks_y[4]+BRICKHEIGHT && bricks[4]==1||bricks[4]==2) {
				dy = -dy; bricks[4]--;
				tocke += 1;
				$("#tocke").html(tocke);
			}
			if (x>=bricks_x[5] && x<=(bricks_x[5]+25) && y>=bricks_y[5] && y<=bricks_y[5]+20 && bricks[5]==1||bricks[5]==2) {
				dy = -dy; bricks[5]--;
				tocke += 3;
				$("#tocke").html(tocke);
			}
		
		if(tocke>=10&&level==1){
			nextLevel();
		}
		if(tocke>=20&&level==2){
			clearInterval(intTimer);
			clearInterval(interval);
			win();
		}
		
		if (x + dx > width -r || x + dx < 0 +r){
			dx=-dx;
		}
		if (y + dy < 0 +r){
			dy=-dy;
		}
		else if (y + dy > height - r) {
			start=false;
				if (x > paddlex && x < paddlex + paddlew){
					dx = 8 * ((x-(paddlex+paddlew/2))/paddlew);
					dy = -dy;
					start=true;
				}
			else if (y + dy > height-r){
				clearInterval(intTimer);
				clearInterval(interval);
				lose();
			}
			 
			}
		x=x+dx;
		y=y+dy;
	}
	init();
	init_paddle();
	init_mouse();
	initbricks(level);
}