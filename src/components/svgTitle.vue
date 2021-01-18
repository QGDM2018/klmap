<style scoped lang="scss">

.svgTitle {
  display: flex;
  justify-content: center;
  letter-spacing: 0.1em;
  height: 10vh;
  svg {
    height: 10vh;
    width: 22em;
    font-size: 6vh;
  }
  .text-line {
    font-family: Heiti;
    letter-spacing: 0.1em;
    font-weight: bold;
  }
  .anim-shape {
    transform: translate(0, 0);
    animation: moving-panel 1s ease-in-out infinite alternate;
  }
  .shadow {
    transform: translate(0.05em, 0.05em);
  }
  .anim-shape--shadow {
    fill: #000;
    fill-opacity: 0.3;
  }
}
@keyframes moving-panel {
  0% {
    transform: translate(-1.5em, 0);
  }
  100% {
    transform: translate(1.5em, 0);
  }
}
</style>

<template>
  <div class="svgTitle">
    <svg xmlns="http://www.w3.org/2000/svg"version="1.1">
      <clipPath id="cp-text">
        <text text-anchor="middle" x="50%" y="50%" dy=".35em" class="text-line">{{msg}}</text>
      </clipPath>
      <g clip-path="url(#cp-text)" class="shadow">
        <rect width="100%" height="100%" class="anim-shape anim-shape--shadow" />
      </g>
      <g clip-path="url(#cp-text)" class="colortext">
        <rect width="100%" height="100%" fill="#9E1826" class="anim-shape" />
        <rect width="80%" height="100%" fill="#111111" class="anim-shape" />
        <rect width="60%" height="100%" fill="#65BFA6" class="anim-shape" />
        <rect width="40%" height="100%" fill="#F2CD5C" class="anim-shape" />
        <rect width="20%" height="100%" fill="#F26444" class="anim-shape" />
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    msg: String
  }
};
</script>


