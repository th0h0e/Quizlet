<script setup lang="ts">
</script>

<template>
  <div class="w-full h-[280px] rounded-lg border border-default bg-elevated overflow-hidden">
    <div class="p-0 h-full">
      <div class="animation-container">
        <div class="bar" />
        <div class="bar" />
        <div class="bar" />
        <div class="bar" />
        <div class="bar" />
        <div class="bar" />
        <div class="bar" />
        <div class="bar" />
        <div class="bar" />
        <div class="bar" />
        <div class="bar" />
        <div class="bar" />
        <div class="bar" />
        <div class="bar" />
        <div class="bar" />
        <div class="bar" />
        <div class="bar" />
        <div class="bar" />
        <div class="bar" />
        <div class="bar" />
        <div class="bar" />
        <div class="bar" />
        <div class="bar" />
        <div class="bar" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.animation-container {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2%;
  padding: 10%;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
}

.bar {
  flex: 1;
  max-width: 4px;
  min-width: 2px;
  background-color: var(--ui-primary);
  border-radius: 1px;
  transform-origin: center;
}

.bar:nth-child(1) {
  animation: wav1 3s ease-in-out infinite;
}

.bar:nth-child(2) {
  animation: wav2 2.8s ease-in-out infinite;
}

.bar:nth-child(3) {
  animation: wav3 3.2s ease-in-out infinite;
}

.bar:nth-child(4) {
  animation: wav4 2.5s ease-in-out infinite;
}

.bar:nth-child(5) {
  animation: wav5 3.5s ease-in-out infinite;
}

.bar:nth-child(6) {
  animation: wav6 2.9s ease-in-out infinite;
}

.bar:nth-child(7) {
  animation: wav7 3.1s ease-in-out infinite;
}

.bar:nth-child(8) {
  animation: wav8 2.7s ease-in-out infinite;
}

.bar:nth-child(9) {
  animation: wav9 3.3s ease-in-out infinite;
}

.bar:nth-child(10) {
  animation: wav10 2.6s ease-in-out infinite;
}

.bar:nth-child(11) {
  animation: wav11 3.4s ease-in-out infinite;
}

.bar:nth-child(12) {
  animation: wav12 2.4s ease-in-out infinite;
}

.bar:nth-child(13) {
  animation: wav13 3.6s ease-in-out infinite;
}

.bar:nth-child(14) {
  animation: wav12 2.4s ease-in-out infinite;
}

.bar:nth-child(15) {
  animation: wav11 3.4s ease-in-out infinite;
}

.bar:nth-child(16) {
  animation: wav10 2.6s ease-in-out infinite;
}

.bar:nth-child(17) {
  animation: wav9 3.3s ease-in-out infinite;
}

.bar:nth-child(18) {
  animation: wav8 2.7s ease-in-out infinite;
}

.bar:nth-child(19) {
  animation: wav7 3.1s ease-in-out infinite;
}

.bar:nth-child(20) {
  animation: wav6 2.9s ease-in-out infinite;
}

.bar:nth-child(21) {
  animation: wav5 3.5s ease-in-out infinite;
}

.bar:nth-child(22) {
  animation: wav4 2.5s ease-in-out infinite;
}

.bar:nth-child(23) {
  animation: wav3 3.2s ease-in-out infinite;
}

.bar:nth-child(24) {
  animation: wav2 2.8s ease-in-out infinite;
}

.bar:nth-child(25) {
  animation: wav1 3s ease-in-out infinite;
}

@keyframes wav1 {

  0%,
  100% {
    height: 15%;
  }

  25% {
    height: 85%;
  }

  50% {
    height: 45%;
  }

  75% {
    height: 70%;
  }
}

@keyframes wav2 {

  0%,
  100% {
    height: 30%;
  }

  33% {
    height: 90%;
  }

  66% {
    height: 20%;
  }
}

@keyframes wav3 {

  0%,
  100% {
    height: 10%;
  }

  20% {
    height: 60%;
  }

  40% {
    height: 95%;
  }

  60% {
    height: 25%;
  }

  80% {
    height: 75%;
  }
}

@keyframes wav4 {

  0%,
  100% {
    height: 40%;
  }

  50% {
    height: 80%;
  }
}

@keyframes wav5 {

  0%,
  100% {
    height: 20%;
  }

  25% {
    height: 55%;
  }

  50% {
    height: 90%;
  }

  75% {
    height: 35%;
  }
}

@keyframes wav6 {

  0%,
  100% {
    height: 35%;
  }

  30% {
    height: 75%;
  }

  70% {
    height: 50%;
  }
}

@keyframes wav7 {

  0%,
  100% {
    height: 25%;
  }

  40% {
    height: 85%;
  }

  60% {
    height: 15%;
  }
}

@keyframes wav8 {

  0%,
  100% {
    height: 45%;
  }

  25% {
    height: 20%;
  }

  50% {
    height: 95%;
  }

  75% {
    height: 60%;
  }
}

@keyframes wav9 {

  0%,
  100% {
    height: 15%;
  }

  33% {
    height: 70%;
  }

  66% {
    height: 40%;
  }
}

@keyframes wav10 {

  0%,
  100% {
    height: 50%;
  }

  50% {
    height: 85%;
  }
}

@keyframes wav11 {

  0%,
  100% {
    height: 30%;
  }

  20% {
    height: 80%;
  }

  40% {
    height: 25%;
  }

  60% {
    height: 90%;
  }

  80% {
    height: 45%;
  }
}

@keyframes wav12 {

  0%,
  100% {
    height: 40%;
  }

  33% {
    height: 15%;
  }

  66% {
    height: 75%;
  }
}

@keyframes wav13 {

  0%,
  100% {
    height: 20%;
  }

  25% {
    height: 95%;
  }

  50% {
    height: 30%;
  }

  75% {
    height: 65%;
  }
}
</style>
