<script setup lang="ts">

import {onMounted,computed, ref,reactive,watch} from 'vue'
import {leftline,rightline,PointDraw,line,linereal,
  CameraDraw,textDraw, ArcDarw,ArcDarwfill,Redline,ArcLineDarw} from '@/Hooks/index'
import {useMouse,useMouseInElement} from '@vueuse/core'
const canvas =ref<HTMLCanvasElement|undefined>()
const canvas2 =ref<HTMLCanvasElement|undefined>()
const canvas3 =ref<HTMLCanvasElement|undefined>()
const canvas4 =ref<HTMLCanvasElement|undefined>()
const {elementX:x,elementY:y}=useMouseInElement(canvas)
const time=reactive({
  open:false,
  content:'10'
})
const focal_length=reactive({
  open:false,
  content:'50-120'
})
const W=400
const H=400
let angle=0

const shottype=ref(3)
const Arccenter={
  x:W/2,
  y:H/2

}
function createHDCanvas (w=400,h=400,canvas:HTMLCanvasElement|undefined) {
  const ratio = window.devicePixelRatio || 1;
  canvas!.width = w * ratio; // 实际渲染像素
  canvas!.height = h * ratio; // 实际渲染像素
  canvas!.style.width = `${w}px`; // 控制显示大小
  canvas!.style.height = `${h}px`; // 控制显示大小
  canvas!.getContext('2d')!.setTransform(ratio, 0, 0, ratio, 0, 0);
 
  return canvas;
}
// 本地存储
const Camera_height=reactive({
   x:35,
   y:70
})
const point_height=reactive({
   x:352.5,
   y:70
})


const D1=reactive({
  x:200,
  y:140,
})
const D2=computed(()=>{
  return{ 
    x:400-D1.x,
  y:400-D1.y
  }
})
const Arc=reactive({
  x:200+120*Math.cos(angle),
  y:200+120*Math.sin(angle),
})
const Draw1=(ctx:CanvasRenderingContext2D)=>{
  leftline(ctx)
 rightline(ctx)
 for (let index = 30; index <=130; index+=30) {
   ArcDarw(ctx,index,index-10)
 }
 line(ctx,80,200,320,200)
 line(ctx,200,80,200,320)
  ArcDarwfill(ctx,Arccenter)
}
function ArcmoVE() {
        calAngle(200,200,x.value,y.value)
    Arc.x=200+shottype.value*30*Math.cos(angle)
      Arc.y=200+shottype.value*30*Math.sin(angle)
}
function calAngle(cx:number, cy:number, x:number, y:number) {
    const radian =  Math.atan2(x-cx, y - cy);
     angle = Math.floor(180/(Math.PI/radian))
    if(cx <= x && cy > y){
        angle = Math.abs(90 - angle);
    }
  
    if(cx > x && cy >= y){
        angle -= 90;
    }
 
    if(cx >= x && cy < y){
        angle = 270 +  angle;
    }

    if(cx < x && cy <= y){
        angle += 270;
    }
    
    
    angle = 360-angle
   angle=(angle==360 ? 0 : angle)
  
angle=(Math.PI * angle) / 180

}
function Dctx4() {
  Arc.x=200+30*shottype.value*Math.cos(angle)
  Arc.y=200+30*shottype.value*Math.sin(angle)
}
function name(ctx:CanvasRenderingContext2D) {

function calculateGradientCoordinate(
  width:number,
  height:number,
  angle = 180,
) {
  if (angle >= 360) angle = angle - 360;
  if (angle < 0) angle = angle + 360;
  angle = Math.round(angle);

  // 当渐变轴垂直于矩形水平边上的两种结果
  if (angle === 0) {
    return {
      x0: Math.round(width / 2),
      y0: height,
      x1: Math.round(width / 2),
      y1: 0,
    };
  }
  if (angle === 180) {
    return {
      x0: Math.round(width / 2),
      y0: 0,
      x1: Math.round(width / 2),
      y1: height,
    };
  }

  // 当渐变轴垂直于矩形垂直边上的两种结果
  if (angle === 90) {
    return {
      x0: 0,
      y0: Math.round(height / 2),
      x1: width,
      y1: Math.round(height / 2),
    };
  }
  if (angle === 270) {
    return {
      x0: width,
      y0: Math.round(height / 2),
      x1: 0,
      y1: Math.round(height / 2),
    };
  }

  // 从矩形左下角至右上角的对角线的角度
  const alpha = Math.round(
    (Math.asin(width / Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2))) *
      180) /
      Math.PI,
  );

  // 当渐变轴分别于矩形的两条对角线重合情况下的四种结果
  if (angle === alpha) {
    return {
      x0: 0,
      y0: height,
      x1: width,
      y1: 0,
    };
  }
  if (angle === 180 - alpha) {
    return {
      x0: 0,
      y0: 0,
      x1: width,
      y1: height,
    };
  }
  if (angle === 180 + alpha) {
    return {
      x0: width,
      y0: 0,
      x1: 0,
      y1: height,
    };
  }
  if (angle === 360 - alpha) {
    return {
      x0: width,
      y0: height,
      x1: 0,
      y1: 0,
    };
  }

  // 以矩形的中点为坐标原点，向上为Y轴正方向，向右为X轴正方向建立直角坐标系
  let x0 = 0,
    y0 = 0,
    x1 = 0,
    y1 = 0;

  // 当渐变轴与矩形的交点落在水平线上
  if (
    angle < alpha || // 处于第一象限
    (angle > 180 - alpha && angle < 180) || // 处于第二象限
    (angle > 180 && angle < 180 + alpha) || // 处于第三象限
    angle > 360 - alpha // 处于第四象限
  ) {
    // 将角度乘以（PI/180）即可转换为弧度
    const radian = (angle * Math.PI) / 180;
    // 当在第一或第四象限，y是height / 2，否则y是-height / 2
    const y = angle < alpha || angle > 360 - alpha ? height / 2 : -height / 2;
    const x = Math.tan(radian) * y;
    // 当在第一或第二象限，l是width / 2 - x，否则l是-width / 2 - x
    const l =
      angle < alpha || (angle > 180 - alpha && angle < 180)
        ? width / 2 - x
        : -width / 2 - x;
    const n = Math.pow(Math.sin(radian), 2) * l;
    x1 = x + n;
    y1 = y + n / Math.tan(radian);
    x0 = -x1;
    y0 = -y1;
  }

  // 当渐变轴与矩形的交点落在垂直线上
  if (
    (angle > alpha && angle < 90) || // 处于第一象限
    (angle > 90 && angle < 180 - alpha) || // 处于第二象限
    (angle > 180 + alpha && angle < 270) || // 处于第三象限
    (angle > 270 && angle < 360 - alpha) // 处于第四象限
  ) {
    // 将角度乘以（PI/180）即可转换为弧度
    const radian = ((90 - angle) * Math.PI) / 180;
    // 当在第一或第二象限，x是width / 2，否则x是-width / 2
    const x =
      (angle > alpha && angle < 90) || (angle > 90 && angle < 180 - alpha)
        ? width / 2
        : -width / 2;
    const y = Math.tan(radian) * x;
    // 当在第一或第四象限，l是height / 2 - y，否则l是-height / 2 - y
    const l =
      (angle > alpha && angle < 90) || (angle > 270 && angle < 360 - alpha)
        ? height / 2 - y
        : -height / 2 - y;
    const n = Math.pow(Math.sin(radian), 2) * l;
    x1 = x + n / Math.tan(radian);
    y1 = y + n;
    x0 = -x1;
    y0 = -y1;
  }
  // 坐标系更改为canvas标准，Y轴向下为正方向
  x0 = Math.round(x0 + width / 2);
  y0 = Math.round(height / 2 - y0);
  x1 = Math.round(x1 + width / 2);
  y1 = Math.round(height / 2 - y1);

  return { x0, y0, x1, y1 };
}
var { x0, y0, x1, y1 } = calculateGradientCoordinate(500, 500, 270)
var gi = ctx.createLinearGradient(x0, y0, x1, y1)
gi.addColorStop(0, 'rgb(111, 255, 111,1)')
gi.addColorStop(1, 'rgb(111, 255, 111,.2)')
ctx.fillStyle=gi;
  ctx.beginPath()
  ctx.strokeStyle=''
  D1.x=200+60*Math.sin(-angle)
      D1.y=200+60*Math.cos(-angle)
  ctx.moveTo(Arc.x,Arc.y)
  ctx.lineTo(D2.value.x,D2.value.y)
  ctx.lineTo(D1.x,D1.y)
  ctx.closePath()
  ctx.fill()

}



function init() {
  const ctx= canvas.value?.getContext('2d')!
  const ctx2= canvas2.value?.getContext('2d')!
  const ctx3= canvas3.value?.getContext('2d')!
  const ctx4= canvas4.value?.getContext('2d')!
  ctx.strokeStyle='hsl(180, 100%, 97%)'
  Dctx4()
  name(ctx4)
  Draw1(ctx)
  CameraDraw(ctx2,Camera_height)
  PointDraw(ctx3,point_height)
  Redline(ctx)
 textDraw(ctx,195,75,18,"8")
 textDraw(ctx,200-100,115,18,"7")
 textDraw(ctx,200-100,75*4,18,"1")
 textDraw(ctx,200+100,75*4,18,"3")
 textDraw(ctx,200+100,115,18,"9")
 textDraw(ctx,195,335,18,"2")
 textDraw(ctx,60,205,18,"4")
 textDraw(ctx,330,205,18,"6")
}
const a=()=>{
      Camera_height.y=y.value
 }
 const b=()=>{
      point_height.y=y.value
      console.log(y.value);
 }
   
onMounted(()=>{
   createHDCanvas(400,400,canvas.value)
   createHDCanvas(400,400,canvas2.value)
   createHDCanvas(400,400,canvas3.value)
   createHDCanvas(400,400,canvas4.value)
 init()
  
 canvas4.value!.onmousedown=()=>{

  
  if (x.value<=Arc.x+20&&x.value>=Arc.x-20&&y.value<=Arc.y+10&&y.value>=Arc.y-10) {
      canvas4.value!.addEventListener('mousemove',ArcmoVE)
  }
 }
 canvas4.value!.onmouseup=()=>{
   canvas4.value!.removeEventListener('mousemove',ArcmoVE)
 }
 addEventListener('mousemove',()=>{
  console.log(x.value);
  console.log(y.value);
  
   if (x.value<62&&x.value>30&&y.value==Camera_height.y||x.value<=Arc.x+20&&x.value>=Arc.x-20&&y.value==Arc.y||x.value<=360&&x.value>=345&&y.value==point_height.y) {
  document.documentElement.style.cursor='pointer'
   }else{
    document.documentElement.style.cursor=''
   }
 })
 
   
 addEventListener('mousedown',()=>{
  if (x.value<62&&x.value>30&&y.value==Camera_height.y) {
    document.documentElement.style.cursor='pointer'
    removeEventListener('mousemove', b, false); // 
    addEventListener('mousemove',a,false)
    console.log("1");
  }else  if(x.value<=360&&x.value>=345&&y.value==point_height.y) {
    addEventListener('mousemove',b,false)
  }
 
 }

  )
  addEventListener('mouseup',()=>{

   removeEventListener('mousemove',a)
   removeEventListener('mousemove',b)
 }) 
 addEventListener('keydown',(even:KeyboardEvent)=>{
  if (time.open==false&&focal_length.open==false) {
    if (even.key==='ArrowUp') {
    angle+=0.2
    Dctx4()
   }else if(even.key==='ArrowDown'){
    angle-=0.2
    Dctx4()
   }else if(even.key==='5'){
    shottype.value>3?shottype.value=0:shottype.value++
    Dctx4()
   }else if(even.key>='1'&&even.key<='9'&&even.key!=='5'){
    switch (even.keyCode-49) {
      case 0:
             angle=((even.keyCode-49)*Math.PI/4)+Math.PI*(3/4)    
        break;
      case 1:
             angle=((even.keyCode-49)*Math.PI/4)+Math.PI/4  
        break;
      case 2:
             angle=((even.keyCode-49)*Math.PI/4)-Math.PI/4 
        break;
      case 3:
             angle=((even.keyCode-49)*Math.PI/4)+Math.PI/4  
        break;
      case 5:
             angle=((even.keyCode-49)*Math.PI/4)+Math.PI*(3/4)   
        break;
      case 6:
             angle=((even.keyCode-49)*Math.PI/4)-Math.PI/4  
        break;
      case 7:
             angle=((even.keyCode-49)*Math.PI/4)-Math.PI/4  
        break;
      case 8:
             angle=((even.keyCode-49)*Math.PI/4)-Math.PI/4  
        break;
    
      default:
        break;
    }
    Dctx4()
    
   }
   
  }
 })
})
     
    watch(Camera_height,()=>{
      const ctx2= canvas2.value!.getContext('2d')!
      ctx2.clearRect(0,0,400,400)
      CameraDraw(ctx2,Camera_height)
    })
    watch(point_height,()=>{
      const ctx3= canvas3.value!.getContext('2d')!
      ctx3.clearRect(0,0,400,400)
      PointDraw(ctx3,point_height)
    })
    watch(Arc,()=>{
     const ctx4= canvas4.value!.getContext('2d')!
     ctx4.clearRect(0,0,400,400)
     ArcLineDarw(ctx4,Arc.x,Arc.y,angle)
     name(ctx4)
     linereal(ctx4,Arc.x,Arc.y,Arccenter.x,Arccenter.y)
    })
</script>

<template>
  <div >
     <canvas ref="canvas" width="400" height="400" id="Canvas" style=" border: 1px black solid; ">
    </canvas>
     <canvas ref="canvas2" width="400" height="400" id="Canvas2" style="border: 1px rgb(0, 0, 0) solid; "></canvas>
     <canvas ref="canvas3" width="400" height="400" id="Canvas2" style="border: 1px rgb(0, 0, 0) solid;"></canvas>
     <canvas ref="canvas4" width="400" height="400" id="Canvas2" style="border: 1px rgb(0, 0, 0) solid; "></canvas>
     <section class="one">
       <p v-if="!time.open"  @click="time.open=!time.open"><b style="font-size: 26px;">{{ time.content.toString() }}</b>s</p>
       <input v-else type="text" focus  v-model="time.content" @focusout="time.open=!time.open" @keydown.enter="
        time.open=!time.open ">
     </section>
     <section class="two">
       <p v-if="!focal_length.open"  @click="focal_length.open=!focal_length.open">
        <span>mm</span>
        <b style="font-size: 19px;">{{ focal_length.content.toString() }}</b></p>
        <input type="text" v-else v-model="focal_length.content" @focusout="focal_length.open=!focal_length.open" @keydown.enter="focal_length.open=!focal_length.open">
     </section>
     <!-- <section >2</section> -->
  </div>
</template>
<style scoped>
div{
  margin-top:200px;
  width: 400px;
  height: 400px;
  position: absolute;
  user-select: none;
  -webkit-user-seletct: none;-moz-user-seletct: none;
}
.one {
left: 290px;
top: 50px;
 color: aliceblue;
  position: relative;
}
.two {

left: 280px;
top: 270px;
 color: aliceblue;
  position: relative;
}
.two input,.one input{
  outline-style: none ;
    border: 1px solid #ccc; 
    background: #000;
    color: aliceblue;
    border-radius: 3px;
    width: 50px;
    font-size: 14px;
    font-family: "Microsoft soft";
}
.two p{
  height: 20px;
  
  display: flex;
  flex-direction: column;
  /* justify-content: start; */
  align-items: start;
}
.two p b{
  padding: 0;
}
canvas{
  position: absolute;
margin: 0 ;
}
#Canvas {
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
 
  background: #000;
}

#Canvas2 {
  position: absolute;
  left: 0;
  top: 0;
  }


</style>