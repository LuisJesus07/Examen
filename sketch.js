const btn = document.querySelector('#btn-revanadas')
var inputRevandas = document.querySelector('#revanadas')
let revanadas = 0



var r;		//radio
var angle 
var step  //ditancia entre pasos en radianes

//guarda los puntos x,y
let pointsDDA = []
let pointsBresenham = []
let pointsEcuapp = []


function setup() {
	createCanvas(windowWidth, 300)
  	angle = 0;
  	step  = 0; 
}

function draw() {

}

btn.addEventListener('click', function(){


	if(inputRevandas.value % 2 == 0){
		clear()
		dividirPizza(270,100,180,180,'dda')
		dividirPizza(350,0,180,180,'bresenham')
		dividirPizza(430,0,180,180,'ecuapp')
	}else{
		alert("Ingrese un numero par")
	}
	
})

function dividirPizza(ell_x,ell_y,w,h,algoritmo){

	//obtener cantidad de revanadas
	revanadas = inputRevandas.value

	//dibujar pizzas
	stroke('#f6b439')
	strokeWeight(8)
	let c = color('#fdf6c2')
	fill(c)
	ellipse(ell_x,ell_y,w,h)
	

	step = TWO_PI/revanadas

	//reiniciar angle
	angle = 0
	//limpiar arreglo de puntos
	pointsBresenham.splice(0,pointsBresenham.length)
	pointsEcuapp.splice(0,pointsEcuapp.length)
	pointsDDA.splice(0,pointsDDA.length)
	
	//mover 0,0 al centro del circulo
 	translate(ell_x, ell_y);

 	//obtener el radio 
 	r = w/2

	for(let i = 1; i<=revanadas; i++){
		  
		//convertir cordenadas polares a cordenadas cartesianas
		var x = floor(r * sin(angle));
		var y = floor(r * cos(angle));

		//guardar punto
		let punto = {x,y}

		//guardar punto en el array(de cada pizza)
		switch(algoritmo){
			case 'dda':
					pointsDDA.push(punto)
				break;
			case 'bresenham':
					pointsBresenham.push(punto)
				break;
			case 'ecuapp':
					pointsEcuapp.push(punto)
				break;
		}
		  
		//ellipse(x, y, 30);
		  
		//incrementar angulo 
		angle+= step;

	}

	let puntoInicio = revanadas/2
	let puntoFin = 0

	stroke('black');
	strokeWeight(1)

	for(let i=1; i<=revanadas/2;i++){

		switch(algoritmo){
			case 'dda':
					dda(pointsDDA[puntoInicio],pointsDDA[puntoFin])
				break;
			case 'bresenham':
					bresenham(pointsBresenham[puntoInicio],pointsBresenham[puntoFin])
				break;
			case 'ecuapp':
					ecuapp(pointsEcuapp[puntoInicio],pointsEcuapp[puntoFin])
				break;
		}

		puntoInicio++
		puntoFin++

	}

	

}

function dda(p1, p2){

	let lim
	let xi
	let yi
	let x
	let y

	const dx = round(p2.x - p1.x)
	const dy = round(p2.y - p1.y)

	if(round(dx) > round(dy)){
		lim = round(dx)
	}else{
		lim = round(dy)
	}

	xi = dx/lim
	yi = dy/lim

	x = p1.x
	y = p1.y

	let i = 0

	while(i < lim){
		point(x,y)
		x += xi
		y += yi 

		i++
	}

}

function bresenham(p1, p2){
	
	let pasoY
	let pasoX
	let x
	let y
	let p
	let incE
	let incNE

	let dx = p2.x - p1.x
	let dy = p2.y - p1.y


	if(dy < 0) {
		dy = -dy
		pasoY = -1
	}else{
		pasoY = 1
	}

	if(dx < 0) {
		dx = -dx
		pasoX = -1
	}else{
		pasoX = 1
	}

	x = p1.x
	y = p1.y
	
	point(x,y)


	//dibujar los puntos de la linea
	if(dx > dy) {

		p = 2 * dy - dx
		incE = 2 * dy
		incNE = 2 * (dy - dx)

		while(x != p2.x) {
			x += pasoX

			if(p < 0) {
				p += incE
			}else {
				y += pasoY
				p += incNE
			}

			point(x,y)
		}
	
	}else{

		p = 2 * dx - dy
		incE = 2 * dx
		incNE = 2 * (dx - dy)

		while(y != p2.y) {
			y += pasoY

			if(p < 0) {
				p += incE
			}else {
				x += pasoX
				p += incNE
			}

			point(x,y)

		}

	}

	
}

function ecuapp(p1, p2){

	const dx = p2.x - p1.x
	const dy = p2.y - p1.y

	const m = dy / dx
	const b = p1.y - m * p1.x

	point(p1.x, p1.y)
	
	let x = p1.x + 1
	
	let y 
	while(x != p2.x){

		y = m * x + b

		point(x, y)

		//si la x de p2 es mayor a la x de p1 amuentar x
		if(p2.x > p1.x){
			x++
		}else{
			x--
		}

	}

	//si las x de p1 y p2 estan en la misma posicion diminuir y
	if(p1.x == p2.x){
		y = p1.y 
		while(y != p2.y){
			point(x, y)
			y++
		}
	}


}


