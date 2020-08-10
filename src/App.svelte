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

  // LIST
  import List from "./Routes/List/List.svelte";
  // ARTIKLAR
  import ArtiklarSingle from "./Routes/Single/ArtiklarSingle.svelte";
  // TIDSKRIFT
  import TidskriftSingle from "./Routes/Single/TidskriftSingle.svelte";
  // PROJEKT
  import ProjektSingle from "./Routes/Single/ProjektSingle.svelte";
  // MEDVERKANDE
  import MedverkandeSingle from "./Routes/Single/MedverkandeSingle.svelte";
  // PAGE
  import PageSingle from "./Routes/Single/PageSingle.svelte";
  // 404
  import Error404 from "./Routes/Error404.svelte";
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

  .content {
    counter-reset: fnoteCounter;
  }

  .footnote-link {
    counter-increment: fnoteCounter;
    color: inherit;
    text-decoration: none;

    &:after {
      // vertical-align: super;
      position: relative;
      top: -6px;

      font-weight: bold;
      font-size: 0.8em;
      line-height: $line-height;
      content: "(" counter(fnoteCounter) ")";
      padding-left: 4px;
    }

    &:hover {
      color: grey;
    }

    &:target {
      background: lightgrey;
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
      max-width: calc(100% - 20px);

      li {
        margin-bottom: $line-height;

        p {
          // margin-bottom: 0;
          display: inline;
          margin: 0;
          padding: 0;
        }

        &:target {
          background: lightgrey;
        }

        a {
          color: inherit;
        }

        .back-link {
          color: inherit;
          background: $grey;
          padding: 2px;
          text-decoration: none;

          &:hover {
            background: grey;
          }
        }
      }
    }
  }

  .tags {
    margin-top: $line-height;
    margin-bottom: $line-height;
    border-top: 1px solid $grey;

    padding-top: $line-height;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-size: $font_size_small;
    font-family: $sans-stack;
    line-height: $line-height;
    margin-left: auto;
    margin-right: auto;
    width: $text_width;
    max-width: calc(100% - 20px);

    div {
      margin-bottom: $line-height;
      float: left;
      margin-right: 10px;
      padding: 5px;
      border: 1px solid $grey;

      &:hover {
        background: $grey;
      }

      a {
        color: inherit;
        text-decoration: none;
      }
    }
  }

  .content {
    a {
      color: inherit;
    }

    figcaption {
      p {
        margin-bottom: 0em;
        padding-left: 0;
        margin-left: 0;
      }
    }
  }

  .content {
    // width: calc(66.6666% - 16px);
    // margin-left: calc(33.3333% + 8px);

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
      width: $text_width * 1.4;
      margin-left: auto;
      margin-right: auto;
      max-width: calc(100% - 20px);
    }
  }

  .ingress {
    // width: calc(66.6666% - 16px);
    // margin-left: calc(33.3333% + 8px);

    p,
    h1,
    h2,
    h3,
    h4,
    ol,
    ul {
      max-width: 90%;
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
</style>

<MenuBar />

<Router>
  <Route path="/" component={Landing} title="landing" } />
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
  <!-- PAGE -->
  <Route path="/:slug" component={PageSingle} />
  <!-- 404 -->
  <Route component={Error404} />
</Router>

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
