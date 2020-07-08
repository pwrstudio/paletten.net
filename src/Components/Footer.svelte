<style lang="scss">
  @import "../variables.scss";

  footer {
    font-size: $large;
    height: 50vh;
    width: 100vw;
    z-index: 1000;
    background: $grey;
    font-family: "Janson Text LT Std";
    font-size: $large;
    font-weight: 600;
    line-height: 0.95em;
    overflow: hidden;
    user-select: none;

    @include screen-size("small") {
      font-size: $mobile_large;
      line-height: 1.5em;
    }

    .title {
      white-space: nowrap;
      padding-left: 10px;
    }
  }

  .meta {
    p {
      display: inline;
    }
  }
</style>

<footer>
  <span class="title">PALETTEN</span>
</footer>
