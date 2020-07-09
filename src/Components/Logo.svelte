<style lang="scss">
  @import "../variables.scss";

  svg {
    &:hover {
      path {
        fill: $half-grey;
      }
      @include screen-size("small") {
        path {
          fill: black;
        }
      }
    }
    &:active {
      path {
        fill: $full-grey;
      }
    }
  }
</style>

<svg
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  x="0px"
  y="0px"
  height="100%"
  viewBox="0 0 307.1 34.3"
  style="overflow:visible;enable-background:new 0 0 307.1 34.3;"
  xml:space="preserve">
  <g>
    <defs>
      <rect id="SVGID_1_" width="307.1" height="34.3" />
    </defs>
    <clipPath id="SVGID_2_">
      <use xlink:href="#SVGID_1_" style="overflow:visible;" />
    </clipPath>
    <path
      class="st0"
      d="M277.9,34.3V12.6l16.5,21.6h12.7V0h-11v21.5L280.1,0h-13.2v34.3H277.9z
      M262.7,34.3v-7.4h-22.9v-6.2h21.5v-7.1 h-21.5V7.4h22.9V0h-34.3v34.3H262.7z
      M202,7.7v26.6h11.4V7.7H226V0h-36.6v7.7H202z
      M163.2,7.7v26.6h11.4V7.7h12.6V0h-36.6v7.7 H163.2z
      M148.3,34.3v-7.4h-22.9v-6.2h21.5v-7.1h-21.5V7.4h22.9V0H114v34.3H148.3z
      M111.7,34.3v-8H90.8V0H79.4v34.3H111.7z M50.5,21.6l4.8-13h0.1l4.8,13H50.5z
      M45.7,34.3l2.1-5.6h15l2.1,5.6h12.2L62.4,0h-14L33.5,34.3H45.7z
      M11.4,34.3V22.8h14.4
      c4.3,0,7.4-1.2,9.5-3.6c1.7-2,2.6-4.6,2.6-7.8C38,3.8,33.8,0,25.3,0H0v34.3H11.4z
      M21.6,7.1c3,0,4.6,1.4,4.6,4.3s-1.5,4.3-4.6,4.3 H11.4V7.1H21.6z" />
  </g>
</svg>
