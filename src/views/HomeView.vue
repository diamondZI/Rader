<script setup lang="ts">

import {onMounted, ref,reactive,watch} from 'vue'
import {leftline,rightline,PointDraw,line,CameraDraw ,ArcDarw,ArcDarwfill,Redline} from '@/Hooks/index'
import {useMouse} from '@vueuse/core'

const canvas =ref<HTMLCanvasElement|undefined>()
const canvas2 =ref<HTMLCanvasElement|undefined>()
const canvas3 =ref<HTMLCanvasElement|undefined>()
const {x,y}=useMouse()
function createHDCanvas (w=400,h=400,canvas:HTMLCanvasElement|undefined) {
  const ratio = window.devicePixelRatio || 1;
  canvas!.width = w * ratio; // 实际渲染像素
  canvas!.height = h * ratio; // 实际渲染像素
  canvas!.style.width = `${w}px`; // 控制显示大小
  canvas!.style.height = `${h}px`; // 控制显示大小
  canvas!.getContext('2d')!.setTransform(ratio, 0, 0, ratio, 0, 0);
 
  return canvas;
}
const Camera_height=reactive({
   x:35,
   y:70
})
const point_height=reactive({
   x:352.5,
   y:70
})

const Draw1=(ctx:CanvasRenderingContext2D)=>{
  leftline(ctx)
 rightline(ctx)
 for (let index = 30; index <=130; index+=30) {
   ArcDarw(ctx,index,index-10)
 }
 line(ctx,80,200,320,200)
 line(ctx,200,80,200,320)
  ArcDarwfill(ctx)
}

onMounted(()=>{
   createHDCanvas(400,400,canvas.value)
   createHDCanvas(400,400,canvas2.value)
   createHDCanvas(400,400,canvas3.value)
  const ctx= canvas.value?.getContext('2d')!
  const ctx2= canvas2.value?.getContext('2d')!
  const ctx3= canvas3.value?.getContext('2d')!
  ctx.strokeStyle='hsl(180, 100%, 97%)'
  ctx.lineWidth=1 
  ctx.lineCap='round'
Draw1(ctx)
Redline(ctx3)
  CameraDraw(ctx2,Camera_height)
  PointDraw(ctx3,point_height)
 addEventListener('mousemove',()=>{
   if (x.value<62&&x.value>30&&y.value==Camera_height.y||x.value<=360&&x.value>=345&&y.value==point_height.y) {
  document.documentElement.style.cursor='pointer'
   }else{
    document.documentElement.style.cursor=''
   }
 })
    const a=()=>{
      Camera_height.y=y.value
    }
    const b=()=>{
      point_height.y=y.value
      console.log(y.value);
    }
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
   console.log("1");
   
   removeEventListener('mousemove',a)
   removeEventListener('mousemove',b)
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
</script>

<template>
  <div style="background-color: black;">
     <canvas ref="canvas" width="400" height="400" id="Canvas" style=" border: 1px black solid; "></canvas>
     <canvas ref="canvas2" width="400" height="400" id="Canvas2" style="border: 1px rgb(0, 0, 0) solid; "></canvas>
     <canvas ref="canvas3" width="400" height="400" id="Canvas2" style="border: 1px rgb(0, 0, 0) solid;"></canvas>
  </div>
</template>
<style>
canvas{
  position: absolute;
margin: 0 au;
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
  background: rgb(255, 255, 255,0);
}


</style>