<template>
  <main>
    <transition name="fade" mode="out-in">
      <h1 key="welcome" class="centered-text">Welcome</h1>
    </transition>
  </main>
</template>

<style scoped>
  .centered-text {
    text-align: center;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>

