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
  // ARTIKLAR
  import ArtiklarList from "./Routes/List/ArtiklarList.svelte";
  import ArtiklarSingle from "./Routes/Single/ArtiklarSingle.svelte";
  // TIDSKRIFT
  import TidskriftList from "./Routes/List/TidskriftList.svelte";
  import TidskriftSingle from "./Routes/Single/TidskriftSingle.svelte";
  // PROJEKT
  import ProjektList from "./Routes/List/ProjektList.svelte";
  import ProjektSingle from "./Routes/Single/ProjektSingle.svelte";
  // MEDVERKANDE
  import MedverkandeSingle from "./Routes/Single/MedverkandeSingle.svelte";
  // SEARCH
  import SearchList from "./Routes/List/SearchList.svelte";
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
    line-height: 1.4em;
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
    padding-left: 16px;
    padding-right: 16px;
  }

  .align-right {
    text-align: right;
    padding-left: 16px;
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
    margin-bottom: 0.5em;

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
    margin-bottom: 0.5em;

    iframe {
      width: 100%;
      height: 100%;
      border: 0;
    }
  }

  .note {
    font-size: $font_size_caption;
    line-height: 1.4em;
  }

  .content {
    counter-reset: fnoteCounter;
  }

  .footnote-link {
    counter-increment: fnoteCounter;
    color: inherit;
    text-decoration: none;

    &:after {
      vertical-align: super;
      font-weight: bold;
      font-size: 0.8em;
      content: "(" counter(fnoteCounter) ")";
      margin-left: 3px;
    }

    &:hover {
      color: grey;
    }

    &:target {
      background: lightgrey;
    }
  }

  .footnotes {
    margin-top: 2rem;
    margin-bottom: 2rem;

    ol {
      border-top: 1px solid $grey;
      padding-top: 2rem;
      margin: 0;
      padding-left: 20px;
      font-size: $font_size_caption;
      line-height: 1.4em;
      margin-left: auto;
      margin-right: auto;
      width: $text_width;
      max-width: calc(100% - 20px);

      li {
        margin-bottom: 0.5em;

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
    margin-top: 2rem;
    margin-bottom: 2rem;
    border-top: 1px solid $grey;

    padding-top: 2rem;
    margin: 0;
    padding-left: 20px;
    font-size: $font_size_caption;
    font-family: $sans-stack;
    line-height: 1.4em;
    margin-left: auto;
    margin-right: auto;
    width: $text_width;
    max-width: calc(100% - 20px);

    div {
      margin-bottom: 0.5em;
      float: left;
      margin-right: 10px;
      padding: 5px;
      background: $grey;

      &:hover {
        background: #c5c5c5;
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

  .content,
  .ingress {
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

    blockquote {
      width: $text_width * 1.4;
      margin-left: auto;
      margin-right: auto;
      max-width: calc(100% - 20px);
    }
  }

  blockquote {
    font-size: $font_size_large;
    line-height: 1.2em;
    margin-bottom: 2rem;
  }

  h2,
  h3,
  h4 {
    font-size: $font_size_normal;
    font-weight: bold;
  }
</style>

<MenuBar />

<Router>
  <Route path="/" component={Landing} title="landing" } />
  <!-- ARTIKLAR -->
  <Route path="/artiklar" component={ArtiklarList} />
  <Route path="/artiklar/:slug" component={ArtiklarSingle} />
  <!-- TIDSKRIFT -->
  <Route path="/tidskrift" component={TidskriftList} />
  <Route path="/tidskrift/:slug" component={TidskriftSingle} />
  <!-- PROJEKT -->
  <Route path="/projekt" component={ProjektList} />
  <Route path="/projekt/:slug" component={ProjektSingle} />
  <!-- MEDVERKANDE -->
  <Route path="/medverkande/:slug" component={MedverkandeSingle} />
  <!-- SEARCH -->
  <Route path="/search/:term" component={SearchList} />
  <!-- PAGE -->
  <Route path="/:slug" component={PageSingle} />
  <!-- 404 -->
  <Route component={Error404} />
</Router>
