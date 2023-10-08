function leftline(ctx:CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.moveTo(50,50)
    ctx.lineTo(45,50)
    ctx.lineTo(45,350)
    ctx.lineTo(50,350)
    ctx.stroke()
 }
 function rightline(ctx:CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.moveTo(350,50)
    ctx.lineTo(355,50)
    ctx.lineTo(355,350)
    ctx.lineTo(350,350)
    ctx.stroke()
 }
 function ArcDarw(ctx:CanvasRenderingContext2D,R:number,num=30) {
     ctx.beginPath();
     ctx.arc(200,200,R,0,Math.PI*2)
     ctx.strokeStyle=`hsl(0, 0%, 86%,${num}%)`
     ctx.stroke() 
 }
 function ArcDarwfill(ctx:CanvasRenderingContext2D,X_Y:{x:number,y:number}) {
     ctx.beginPath();
     ctx.arc(X_Y.x,X_Y.y, 8,0,Math.PI*2,true)
     ctx.fillStyle='green'
    ctx.fill()

   ctx.stroke() 
 }
 function line(ctx:CanvasRenderingContext2D ,x:number,y:number,nx:number,ny:number) {
    ctx.setLineDash([1,4])
    ctx.beginPath()
     ctx.moveTo(x,y)
     ctx.lineTo(nx,ny)
     ctx.stroke()
     ctx.setLineDash([])
 }
 function linereal(ctx:CanvasRenderingContext2D ,x:number,y:number,nx:number,ny:number) {
   ctx.beginPath()
   ctx.setLineDash([])
   ctx.lineWidth=1.2
    ctx.strokeStyle='rbg(0,181,26)'
    ctx.moveTo(x,y)
    ctx.lineTo(nx,ny)
    ctx.stroke()
  
 }
 function CameraDraw(ctx:CanvasRenderingContext2D,X_Y:{x:number,y:number}) {
 
    const {x,y}=X_Y
     ctx.beginPath()
     ctx.moveTo(x,y+10)
     ctx.lineTo(x,y-10)
     ctx.lineTo(x+20,y)
     ctx.fillStyle='green'
    ctx.fill();
     ctx.closePath()
     ctx.stroke()
 }
 function PointDraw(ctx:CanvasRenderingContext2D,X_Y:{x:number,y:number}) {
    const {x,y}=X_Y
     ctx.beginPath()
     ctx.arc(x,y,10,0,Math.PI*2,true)
     ctx.fillStyle='green'
     ctx.fill();
     ctx.closePath()
     ctx.stroke()
 }
 function Redline(ctx:CanvasRenderingContext2D,key=0) {
     const  a=[{
        x:200,
        y:210,
        x1:200,
        y1:320
     },{
        x:200,
        y:192,
        x1:200,
        y1:80
     },{
        x:210,
        y:200,
        x1:320,
        y1:200
     },{
        x:192,
        y:200,
        x1:80,
        y1:200
     }]
     ctx.beginPath()
     ctx.strokeStyle='red'
     
     ctx.beginPath()
     ctx.setLineDash([])
     //  ctx.strokeStyle='green'
      ctx.moveTo(a[key].x,a[key].y)
      ctx.lineTo(a[key].x1,a[key].y1)
      ctx.stroke()
      ctx.setLineDash([])
    ctx.strokeStyle='black'
 }

 function ArcLineDarw(ctx:CanvasRenderingContext2D,x:number,y:number,angle:number) {
     ctx.beginPath();  
  ctx.arc(x,y,10,0,Math.PI*2)
   //   ctx.moveTo(x,y)
   //   ctx.lineTo(x+20,y)
   //   ctx.lineTo(x+10,y+20)
     ctx.fillStyle='green'

    ctx.fill();
     ctx.stroke() 
     
 }
 function textDraw(ctx:CanvasRenderingContext2D,x:number,y:number,size=18,text='1') {
    ctx.font =`${size}px serif`;
    ctx.fillStyle = 'aliceblue';
    ctx.fillText(text, x, y);
 }
 export {leftline,rightline,PointDraw,line,CameraDraw ,ArcDarw,ArcDarwfill,Redline,ArcLineDarw,textDraw,linereal}