<script setup lang="ts">

</script>

<template>
  <main>
    <div class="button"> 
   <RouterLink to="/"> <button>Canvas</button></RouterLink>
   <RouterLink to="/about"> <button>div</button></RouterLink>
    
    </div>
      <RouterView></RouterView>
  
  
  </main>
</template>
<style scoped>
    main{
      width: 100vw;
      overflow: hidden;
      height: 100vh;
      flex-direction: column;
      display: flex;
        
      align-items: center;
    }
    .button{
      width: 200px;
      height: 100px;
      border: 1px black solid;
      border-top: 0px;
      display: flex;
      align-items: center;
      justify-content:space-around;
    }
    button{
      width: 50px;
      border: 0;
    background: #e6aeae;
      height: 40px;
    
      cursor: pointer;
      padding: 2px;
      text-align: center;
      transition:.3s ;
        }
    button:hover{
      box-shadow: black 0 0 3px;
      
    }
</style>
