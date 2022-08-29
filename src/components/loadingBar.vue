<template>
  <div class="wraps">
    <div ref="bar" class="bar"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
let speed = ref<number>(1);
let bar = ref<HTMLElement>();
// 用于接受 AnimationFrame 返回的 ID
let timer = ref<number>(0)

const startLoading = () => {
  let dom = bar.value as HTMLElement;
  // 使用定时器时，每回调一次都会对页面造成回流与重绘，而 requestAnimationFrame 会把回流与重绘收集起来只走一次,
  // 所以性能上要比定时器要好，而且它是以每秒60帧的帧率去绘制动画，在视觉上也要比定时器要好。
  // AnimationFrame 与定时器一样会返回一个 ID
  timer.value = window.requestAnimationFrame(function fn() {  // 这里不使用箭头函数是因为下面要使用该函数的名字来进行递归
    if (speed.value < 90) {
      speed.value += 1;
      dom.style.width = speed.value + '%';
      timer.value = window.requestAnimationFrame(fn)
    } else {
      speed.value = 1;
      window.cancelAnimationFrame(timer.value)
    }
  });
};

const endLoading = () => {
  let dom = bar.value as HTMLElement
  window.requestAnimationFrame(() => {
    speed.value = 100
    dom.style.width = speed.value + '%'
  })
  setTimeout(() => {
    window.requestAnimationFrame(() => {
      // speed.value = 100
      dom.style.width = '0'
    })
  }, 20)
};

//对外暴露 当前组件的属性和方法
defineExpose({
  startLoading,
  endLoading,
});
</script>

<style scoped lang="less">
.wraps {
  position: fixed;
  top: 0;
  width: 100%;
  height: 2px;

  .bar {
    height: inherit;
    width: 0;
    background: orange;
  }
}
</style>
