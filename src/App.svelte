<script>
  // # # # # # # # # # # # # #
  //
  //  paletten.net
  //
  // # # # # # # # # # # # # #

  // IMPORTS
  import { Router, Route } from "svelte-routing"
  import { fade } from "svelte/transition"

  // STORES
  import { menuActive, currentPost } from "./stores.js"

  // COMPONENTS
  import MenuBar from "./Components/MenuBar.svelte"
  import MetaData from "./Components/MetaData.svelte"

  // LANDING
  import Landing from "./Routes/Landing.svelte"
  // LIST
  import List from "./Routes/List/List.svelte"
  // ARTIKLAR
  import ArtiklarSingle from "./Routes/Single/ArtiklarSingle.svelte"
  // TIDSKRIFT
  import TidskriftSingle from "./Routes/Single/TidskriftSingle.svelte"
  // PROJEKT
  import ProjektSingle from "./Routes/Single/ProjektSingle.svelte"
  // MEDVERKANDE
  import MedverkandeSingle from "./Routes/Single/MedverkandeSingle.svelte"
  // PAGE
  import PageSingle from "./Routes/Single/PageSingle.svelte"
  // 404
  import Error404 from "./Routes/Error404.svelte"

  $: {
    if ($menuActive) {
      document.body.classList.add("no-scroll")
    } else {
      document.body.classList.remove("no-scroll")
    }
  }
</script>

<style lang="scss" global>
  @import "./variables.scss";

  html,
  body {
    font-size: $font_size_normal;
    line-height: $line-height;
    padding: 0;
    margin: 0;
    background: white;
    font-family: "Janson Text LT Std";
    scroll-behavior: smooth;

    &.no-scroll {
      overflow: hidden;
    }
  }

  p {
    margin: 0;
  }

  * {
    box-sizing: border-box;
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
    // padding-left: 16px;
    // padding-right: 16px;
  }

  .align-right {
    text-align: right;
    // padding-left: 16px;
  }

  p {
    margin-bottom: $line-height;
  }

  iframe,
  video,
  audio,
  img {
    max-width: 100%;
  }

  .right-aligned {
    text-align: right;
  }

  .center-aligned {
    text-align: center;
  }

  .embed-container {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
    max-width: 720px;
    width: 100%;
    margin-bottom: $line-height;

    iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 0;
    }
  }

  .soundcloud-container {
    // height: 300px;
    width: 100%;
    overflow: hidden;
    max-width: 100%;
    margin-bottom: $line-height;

    iframe {
      width: 100%;
      height: 100%;
      border: 0;
    }
  }

  .note {
    font-size: $font_size_caption;
    line-height: $line-height;
  }

  .tags {
    margin-top: $line-height;
    margin-bottom: $line-height;
    border-top: 1px solid $grey;
    padding-top: $line-height;
    margin: 0;
    letter-spacing: 0.1em;
    font-size: $font_size_small;
    font-family: $sans-stack;
    line-height: $line-height;
    margin-left: auto;
    margin-right: auto;
    width: $text_width;
    max-width: 100%;

    a {
      margin-bottom: $line-height;
      float: left;
      margin-right: 10px;
      padding: 5px;
      border: 1px solid $grey;
      color: inherit;
      text-decoration: none;

      &:hover {
        background: $grey;
      }
    }
  }

  .medverkande {
    a {
      text-decoration: none;
      &:hover {
        color: #555555;
      }
    }
  }

  .content {
    counter-reset: fnoteCounter;

    a {
      text-decoration: underline;
      color: inherit;

      &:hover {
        text-decoration: none;
      }
    }

    figcaption {
      p {
        margin-bottom: 0em;
        padding-left: 0;
        margin-left: 0;
      }
    }

    p,
    h1,
    h2,
    h3,
    h4,
    ol,
    ul {
      margin-left: auto;
      margin-right: auto;
      width: $text_width;
      max-width: calc(100% - 20px);
      max-width: 100%;

      @include screen-size("small") {
        max-width: calc(100%);
      }
    }

    h1,
    h2,
    h3,
    h4,
    h5 {
      margin-top: $line-height;
      margin-bottom: $line-height;
    }

    blockquote {
      font-size: $font_size_normal * 0.9;
      width: $text_width;
      padding-left: 40px;
      margin-left: auto;
      margin-right: auto;
      max-width: calc(100% - 20px);
    }

    &.intervju {
      font-size: $font_size_large;
      line-height: $line-height_large;

      p,
      h1,
      h2,
      h3,
      h4,
      ol,
      ul {
        font-size: $font_size_large;
        margin-left: auto;
        margin-right: auto;
        width: $text_width_wider;
        max-width: calc(100% - 20px);
        max-width: 100%;

        @include screen-size("small") {
          max-width: calc(100%);
        }
      }

      .caption {
        p {
          font-size: $font_size_small;
        }
      }
    }

    &.manifest {
      font-size: $font_size_large;
      line-height: $line-height_large;

      p,
      h1,
      h2,
      h3,
      h4,
      ol,
      ul {
        font-size: $font_size_large;
        margin-left: auto;
        margin-right: auto;
        width: $text_width_wider;
        max-width: calc(100% - 20px);
        max-width: 100%;

        @include screen-size("small") {
          max-width: calc(100%);
        }
      }

      .caption {
        p {
          font-size: $font_size_small;
        }
      }
    }
  }

  .footnotes {
    margin-top: $line-height;
    margin-bottom: $line-height;

    ol {
      border-top: 1px solid $grey;
      padding-top: $line-height;
      margin: 0;
      padding-left: 20px;
      font-size: $font_size_caption;
      line-height: $line-height;
      margin-left: auto;
      margin-right: auto;
      width: $text_width;
      max-width: 100%;

      li {
        margin-bottom: $line-height;

        p {
          // margin-bottom: 0;
          display: inline;
          margin: 0;
          padding: 0;
        }

        &:target {
          p {
            background: $yellow;
          }
        }

        a {
          color: inherit;
        }

        .back-link {
          color: inherit;
          padding: 4px;
          text-decoration: none;
          font-family: $sans-stack;
          font-size: $font_size_small;
          letter-spacing: 0.1em;
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }

  .footnote-link {
    counter-increment: fnoteCounter;
    color: inherit;
    text-decoration: none !important;

    &:after {
      // vertical-align: super;
      position: relative;
      top: -6px;
      font-family: $sans-stack;
      // font-size: $font_size_small;
      font-size: 0.8em;
      line-height: $line-height;
      content: "(" counter(fnoteCounter) ")";
      padding-left: 4px;
    }

    &:hover {
      text-decoration: underline !important;
    }

    &:target {
      background: $yellow;
    }
  }

  .ingress {
    p,
    h1,
    h2,
    h3,
    h4,
    ol,
    ul {
      max-width: 60ch;
    }
  }

  .bio {
    p,
    h1,
    h2,
    h3,
    h4,
    ol,
    ul {
      max-width: 60ch;
    }
  }

  blockquote {
    font-size: $font_size_large;
    line-height: $line-height;
    margin-bottom: $line-height;
  }

  h2,
  h3,
  h4 {
    font-size: $font_size_normal;
    font-weight: bold;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  .grid {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    display: none;
    height: 6000px;
    pointer-events: none;
    z-index: 100000;
    opacity: 0.2;
    .line {
      width: 100vw;
      height: $line-height;
      border-bottom: 1px solid red;
    }
  }

  main {
    &.disabled {
      transition: opacity 0.3s ease-out;
      opacity: 0.35;
      pointer-events: none;
      filter: grayscale(1);
    }
  }

  .interview-name {
    font-family: $sans-stack;
    font-weight: bold;
    font-size: $font_size_large * 0.9;
  }

  .caption {
    p {
      font-size: $font_size_small !important;
    }
    text-align: left;
    float: left;
  }
</style>

<!-- METADATA -->
<MetaData post={$currentPost} />

<!-- MENU -->
<MenuBar />

<!-- MAIN -->
<main class:disabled={$menuActive}>
  <Router>
    <Route path="/" component={Landing} title="landing" />
    <!-- ARTIKLAR -->
    <Route path="/artiklar" component={List} category="artikel" />
    <Route path="/artiklar/:slug" component={ArtiklarSingle} />
    <!-- TIDSKRIFT -->
    <Route path="/tidskrift" component={List} category="tidskrift" />
    <Route path="/tidskrift/:slug" component={TidskriftSingle} />
    <!-- PROJEKT -->
    <Route path="/projekt" component={List} category="projekt" />
    <Route path="/projekt/:slug" component={ProjektSingle} />
    <!-- MEDVERKANDE -->
    <Route path="/medverkande/:slug" component={MedverkandeSingle} />
    <!-- SEARCH -->
    <Route path="/search/:term" component={List} category="search" />
    <!-- SEARCH -->
    <Route path="/taxonomy/:term" component={List} category="taxonomy" />
    <!-- PAGE -->
    <Route path="/:slug" component={PageSingle} />
    <!-- 404 -->
    <Route component={Error404} />
  </Router>
</main>

<!-- GRID -->
<div class="grid">
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
  <div class="line" />
</div>
