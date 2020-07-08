<script>
  // # # # # # # # # # # # # #
  //
  //  paletten.net
  //
  // # # # # # # # # # # # # #

  // IMPORTS
  import { Router, Route } from "svelte-routing";
  import { fade } from "svelte/transition";

  // COMPONENTS
  import Footer from "./Components/Footer.svelte";
  import MenuBar from "./Components/MenuBar.svelte";

  // ROUTES
  import Landing from "./Routes/Landing.svelte";
  import Single from "./Routes/Single.svelte";
  import Error404 from "./Routes/Error404.svelte";
</script>

<style lang="scss" global>
  @import "./variables.scss";

  html,
  body {
    padding: 0;
    margin: 0;
    background: $secondColor;
    font-family: "Janson Text LT Std";
  }

  p {
    margin: 0;
  }

  * {
    box-sizing: border-box;
  }

  /*! Flickity v2.2.1
https://flickity.metafizzy.co
---------------------------------------------- */

  .flickity-enabled {
    position: relative;
  }

  .flickity-enabled:focus {
    outline: none;
  }

  .flickity-viewport {
    overflow: hidden;
    position: relative;
    height: 100%;
  }

  .flickity-slider {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  /* draggable */

  .flickity-enabled.is-draggable {
    -webkit-tap-highlight-color: transparent;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .flickity-enabled.is-draggable .flickity-viewport {
    cursor: move;
    cursor: -webkit-grab;
    cursor: grab;
  }

  .flickity-enabled.is-draggable .flickity-viewport.is-pointer-down {
    cursor: -webkit-grabbing;
    cursor: grabbing;
  }

  /* ---- flickity-button ---- */

  .flickity-button {
    position: absolute;
    background: hsla(0, 0%, 100%, 0.75);
    border: none;
    color: #333;
  }

  .flickity-button:hover {
    background: white;
    cursor: pointer;
  }

  .flickity-button:focus {
    outline: none;
    box-shadow: 0 0 0 5px #19f;
  }

  .flickity-button:active {
    opacity: 0.6;
  }

  .flickity-button:disabled {
    opacity: 0.3;
    cursor: auto;
    /* prevent disabled button from capturing pointer up event. #716 */
    pointer-events: none;
  }

  .flickity-button-icon {
    fill: currentColor;
  }

  /* ---- previous/next buttons ---- */

  .flickity-prev-next-button {
    top: 50%;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    /* vertically center */
    transform: translateY(-50%);
  }

  .flickity-prev-next-button.previous {
    left: 10px;
  }
  .flickity-prev-next-button.next {
    right: 10px;
  }
  /* right to left */
  .flickity-rtl .flickity-prev-next-button.previous {
    left: auto;
    right: 10px;
  }
  .flickity-rtl .flickity-prev-next-button.next {
    right: auto;
    left: 10px;
  }

  .flickity-prev-next-button .flickity-button-icon {
    position: absolute;
    left: 20%;
    top: 20%;
    width: 60%;
    height: 60%;
  }

  /* ---- page dots ---- */

  .flickity-page-dots {
    position: absolute;
    width: 100%;
    bottom: -25px;
    padding: 0;
    margin: 0;
    list-style: none;
    text-align: center;
    line-height: 1;
  }

  .flickity-rtl .flickity-page-dots {
    direction: rtl;
  }

  .flickity-page-dots .dot {
    display: inline-block;
    width: 10px;
    height: 10px;
    margin: 0 8px;
    background: #333;
    border-radius: 50%;
    opacity: 0.25;
    cursor: pointer;
  }

  .flickity-page-dots .dot.is-selected {
    opacity: 1;
  }

  footer {
    font-size: $large;
    height: 50vh;
    width: 100vw;
    z-index: 1000;
    background: $secondColor;
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

  figure {
    padding: 0;
    margin: 0;
  }

  .align-left {
    text-align: left;
  }

  .align-center {
    text-align: center;
  }

  .align-right {
    text-align: right;
  }

  p {
    margin-bottom: 1em;
  }

  iframe,
  video,
  audio,
  img {
    max-width: 100%;
  }
</style>

<MenuBar />

<Router>
  <Route path="/" component={Landing} title="landing" } />
  <Route path="/artikel/:slug" component={Single} title="single" />
  <Route component={Error404} title="404" />
</Router>

<Footer />
