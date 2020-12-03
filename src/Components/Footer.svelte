<script>
  // # # # # # # # # # # # # #
  //
  //  FOOTER
  //
  // # # # # # # # # # # # # #

  // IMPORTS
  import { links } from "svelte-routing"
  import { loadData, renderBlockText } from "../sanity.js"

  const query = '*[_type == "footer"][0]'
  let post = loadData(query)
</script>

<style lang="scss">
  @import "../variables.scss";

  footer {
    width: 100vw;
    background: #f4f4f4;
    line-height: $line-height;
    overflow: hidden;
    user-select: none;
    padding-left: $margin;
    padding-right: $margin;
    padding-top: $line-height;
    padding-bottom: $line-height * 4;
    font-weight: normal;
    margin-top: $line-height;

    @include screen-size("small") {
      padding-left: $phone-margin;
      padding-right: $phone-margin;
      padding-bottom: $line-height * 2;
    }

    font-size: $font_size_small;
    font-family: $sans-stack;
    letter-spacing: 0.1em;

    .logo {
      display: inline-block;
    }
  }

  .meta {
    p {
      display: inline;
    }
  }

  .column {
    width: calc(33.3333% - 28px);
    float: left;

    &.second {
      margin-left: $margin;
    }
    &.third {
      margin-left: $margin;

      a {
        &:hover {
          text-decoration: underline;
        }
      }
    }

    p {
      max-width: 40ch;
    }

    @include screen-size("small") {
      width: 100%;
      // text-align: center;

      // p {
      //   display:block;
      //   margin-left: auto;
      //   margin-right: auto;
      // }

      &.second {
        margin-left: 0;
      }
      &.third {
        margin-left: 0;
        display: none;
      }
    }
  }

  .menu-item {
    display: block;
  }
</style>

<footer>
  {#await post then post}
    <div class="column first">
      {@html renderBlockText(post.description.content)}
    </div>

    <div class="column second">
      {@html renderBlockText(post.address.content)}
    </div>

    <div class="column third" use:links>
      <div class="menu-item"><a href="/artiklar">Artiklar</a></div>
      <div class="menu-item"><a href="/projekt">Projekt</a></div>
      <div class="menu-item"><a href="/tidskrift">Tidskrift</a></div>
      <div class="menu-item"><a href="/om-paletten">Om Paletten</a></div>
      <div class="menu-item"><a href="/prenumerationer">Prenumeration</a></div>
      <div class="menu-item"><a href="/kontakt">Kontakt</a></div>
    </div>
  {/await}
</footer>
