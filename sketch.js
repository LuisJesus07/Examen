const btn = document.querySelector('#btn-revanadas')

var mitadW,mitadH


function setup() {
	createCanvas(windowWidth, 300)

  	mitadW=windowWidth/2
  	mitadH=windowHeight/2
}

function draw() {

    stroke('#f6b439')
	strokeWeight(3)
	let c = color('#fdf6c2')
	fill(c)

    ellipse(200,150,150,150)
    ellipse(mitadW, 150, 150, 150)
    ellipse(windowWidth-200,150,150,150)
    noLoop()

}

btn.addEventListener('click', function(){
	
	dividirPizza()
	
})


function dividirPizza(){

	  revanadas = parseInt(document.getElementById("revanadas").value);

	  if(revanadas>1)
	  {

	   
	    let radio=75;
	    let grados=360/revanadas
	    let aux=grados;

		let xCp1 = windowWidth-200
		let xCp2=  200
		let xCp3 = mitadW

		let yCentro = 150		

		draw()

	    while(grados<=360){
	     
	      
	      let x2=radio*Math.cos(grados* Math.PI / 180)
	      let y2=radio*Math.sin(grados * Math.PI / 180)


		  let x2P1=xCp1+x2;
		  let x2P2 = xCp2 + x2
		  let x2P3 = xCp3 + x2;
		  y2=yCentro+y2;
		  
		  x2P1=floor(x2P1)
		  x2P2=floor(x2P2)
		  x2P3 = floor(x2P3)
		  y2=floor(y2)
		  
		  ecuapp(xCp1,yCentro,x2P1,y2);
		  dda(xCp2,yCentro,x2P2,y2)
		  bresenham(xCp3,yCentro,x2P3,y2)
	        
	      grados+=aux;

	    } 


	  }


}

function dda(x1, y1, x2, y2){

	  let dx=x2-x1
	  let dy=y2-y1

	  let limite
	  if(Math.abs(dx)>Math.abs(dy))
	    limite=Math.abs(dx)
	  else
	    limite=Math.abs(dy)

	  let xi=dx/limite
	  let yi=dy/limite

	  let x=x1
	  let y= y1
	  
	  for(let i=0;i<limite;i++)
	  {
	    point(x, y)
	    x+=xi
	    y+=yi
	  }

}

function bresenham(x1, y1, x2, y2){
	
	let pasoY
	let pasoX
	let x
	let y
	let p
	let incE
	let incNE

	let dx = x2 - x1
	let dy = y2 - y1


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

	x = x1
	y = y1
	
	point(x,y)


	//dibujar los puntos de la linea
	if(dx > dy) {

		p = 2 * dy - dx
		incE = 2 * dy
		incNE = 2 * (dy - dx)

		while(x != x2) {
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

		while(y != y2) {
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

function ecuapp(x1, y1, x2, y2){

	if(x2<x1)
	{
		let aux=x2;
		x2=x1;
		x1=aux

		aux = y2
		y2=y1
		y1=aux
	}

	const dx = x2 - x1
	const dy = y2 - y1

	const m = dy / dx
	const b = y1 - (m * x1)

	
	point( x1, y1 )


	if(x1===x2){
	
		if(y1>y2)
		{
			let aux=y1;
			y1=y2;
			y2=aux
		}
		let y = y1 + 1
		while(y!=y2)
		{
			point(x1,y)
			y++
		}

	}
	else{

		
		
		let x = x1+ 1
		let y = m * x + b
		
		while(x !=x2){
			y = m * x + b
			y = floor(y)
			point(x, y)
			x++
		}
  }
  


}


