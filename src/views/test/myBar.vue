<template>

    <div
    class="bar"
    :style="`background-image: linear-gradient(to right,#42D49A 1% , ${color} ${size}%, #F1F1F1 ${size}%);width: ${width}px;`" ></div>
    <!-- tail:  {{ tail }} -->
   <!-- props传递 sizeRef:{{  sizeRef}} -->
  size:{{ size }}%

  <div class="mask">
    <div class="dsb" v-for="item of length" :style="{ marginLeft: marginLeft }"></div>
  </div>

</template>
<script lang="ts" setup>
import { ref, computed, useAttrs ,watch,toRefs} from 'vue'


const props = defineProps({
// const props = defineProps({
  size: {
    type: Number,
    default: 60,
  },
  width: {
    type: Number,
    default: 400,
  },
  length: {
    type: Number,
    default: 3,
  
  },
  color: {
    type: String,
    default: '#99F0B2',
  }

})
const { size, width, length } = toRefs(props)



watch(()=>props.size,()=>{
  console.log('监视的改变了');
})




// 横条的左边距
const marginLeft = computed(() => {
  return (width.value - length.value * 2) / (length.value + 1) + 'px'
})



// 颜色跟踪
// const tail = computed(() => {
//   // console.log('计算的属性发生了变化这是计算后的跟随')
//   return sizes
//   // return size / 2
// })

// const tail = computed(()=>{
//       return (100-props.size) / 2
// })




</script>

<style>
.bar {
  /* width: 400px; */
  height: 20px;
  background-color: blue;
}

.bar {
  position: absolute;
  border-radius: 3px;
}
.mask {
  display: flex;
}
.dsb {
  width: 2px;
  height: 50px;
  z-index: 1;
  background-color: rgb(255, 255, 255);
  /* background-color:	#C0C0C0; */
  /* margin-right: 53px; */
}

body {
  background-color: rgb(255, 255, 255);
}
</style>
