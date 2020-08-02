<style lang="scss" scoped>
.error {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  svg {
    height: 2em;
    line-height: 2em;
    width: 5em;
    text-align: center;
    font-family: "title";
    letter-spacing: 0.2em;
    font-size: 250px;
    .anim-shape {
      transform-origin: 0x 150px;
      transform: scale(0, 1) translate(0, 0);
      animation: moving-panel 3s infinite alternate;
    }
    .shadow {
      transform: translate(10px, 10px);
    }
    .anim-shape--shadow {
      fill: #000;
      fill-opacity: 0.2;
    }
  }
}
@-webkit-keyframes moving-panel {
  100% {
    transform: scale(1, 1) translate(20px, 0);
  }
}
@keyframes moving-panel {
  100% {
    transform: scale(1, 1) translate(20px, 0);
  }
}
</style>
<template>
  <div class="error">
    <svg>
      <clipPath id="cp-text1">
        <text text-anchor="middle" x="50%" y="50%" dy=".35em" class="text--line">404</text>
      </clipPath>
      <g clip-path="url(#cp-text1)" class="shadow">
        <rect width="100%" height="100%" class="anim-shape anim-shape--shadow" />
      </g>
      <g clip-path="url(#cp-text1)" class="colortext">
        <rect width="100%" height="100%" fill="#0E1826" class="anim-shape" />
        <rect width="80%" height="100%" fill="#166973" class="anim-shape" />
        <rect width="60%" height="100%" fill="#65BFA6" class="anim-shape" />
        <rect width="40%" height="100%" fill="#F2CD5C" class="anim-shape" />
        <rect width="20%" height="100%" fill="#F26444" class="anim-shape" />
      </g>
    </svg>
  </div>
</template>
