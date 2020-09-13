<template>
  <div>
    <app-header></app-header>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import Header from "./components/shared/Header";

export default {
  components: {
    appHeader: Header,
  },
  created() {
    this.$store.dispatch("initAuth");
    this.$store.dispatch("initApp");
  },
};
</script>
<style>
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 0.6s ease-out;
}
.fade-leave-active {
  transition: opacity 0.6s ease-out;
  transition: 0;
}
.slide-enter-active {
  animation: slide-in 1s ease-out forwards;
  transition: opacity 0.5s;
}
.slide-leave-active {
  animation: slide-out 1s ease-out forwards;
  transition: opacity 1s;
  opacity: 0;
  position: absolute;
}

.slide-move {
  transition: transform 1s;
}

@keyframes slide-in {
  from {
    transform: translateY(20px);
  }
  to {
    transform: translateY(0px);
  }
}
@keyframes slide-out {
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(20px);
  }
}
</style>