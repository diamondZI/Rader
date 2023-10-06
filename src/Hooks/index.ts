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
     ctx.arc(200,200,R,0,Math.PI*2,true)
     ctx.strokeStyle=`hsl(0, 0%, 86%,${num}%)`
     ctx.stroke() 
 }
 function ArcDarwfill(ctx:CanvasRenderingContext2D) {
     ctx.beginPath();
     ctx.arc(200,200,8,0,Math.PI*2,true)
 
    ctx.fill('evenodd')
 
  ctx.stroke() 
 }
 function line(ctx:CanvasRenderingContext2D ,x:number,y:number,nx:number,ny:number) {
     ctx.beginPath()
     ctx.setLineDash([1,4])
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
     ctx.fillStyle='blue'
    ctx.fill();
     ctx.closePath()
     ctx.stroke()
 }
 function PointDraw(ctx:CanvasRenderingContext2D,X_Y:{x:number,y:number}) {
    const {x,y}=X_Y
     ctx.beginPath()
     ctx.arc(x,y,10,0,Math.PI*2,true)
     ctx.fillStyle='blue'
     ctx.fill();
     ctx.closePath()
     ctx.stroke()
 }
 function Redline(ctx:CanvasRenderingContext2D,key?:number) {
     ctx.beginPath()
     ctx.strokeStyle='red'
    line(ctx,200,200,200,320)
 }
 export {leftline,rightline,PointDraw,line,CameraDraw ,ArcDarw,ArcDarwfill,Redline}