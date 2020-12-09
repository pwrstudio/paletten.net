<script>
  // # # # # # # # # # # # # #
  //
  //  MENUBAR
  //
  // # # # # # # # # # # # # #

  // IMPORTS
  import { navigate } from "svelte-routing"
  import { links } from "svelte-routing"

  // STORES
  import { menuActive } from "../stores.js"

  $: {
    if (searchActive && searchInputElement) {
      searchInputElement.focus()
    }
  }

  // DOM REFERENCES
  let searchInputElement = {}

  // VARIABLES
  let menuOpen = false
  let searchActive = false
  let searchInputValue = ""

  $: {
    menuActive.set(menuOpen)
  }
</script>

<style lang="scss">
  @import "../variables.scss";

  .bar {
    position: fixed;
    top: 0;
    left: 0;
    height: $menu_bar_height;
    line-height: $line-height;
    width: 100vw;
    z-index: 1000;
    background: white;
    overflow: hidden;
    user-select: none;
    border-bottom: 1px solid #e4e4e4;
    font-size: 28px;
    opacity: 1;
    font-size: $font_size_normal;

    &.open {
      transition: height 0.2s ease-out;
      height: $line-height * 14;

      @include screen-size("small") {
        height: $line-height * 17;
      }
    }
  }

  .search {
    input {
      font-size: $font_size_normal;
      height: $line-height;
      font-family: $serif-stack;
      background: transparent;
      border: 0;
      border-radius: 0;
      border-bottom: 1px solid $grey;
      outline: 0;
      line-height: $line-height;
      font-weight: bold;
      padding-right: 5px;
      margin-right: auto;
      margin-left: auto;
      color: black;
      text-decoration: none;
      display: block;
      text-align: center;
    }
    opacity: 0;

    &.active {
      opacity: 1;
    }
  }

  .logo {
    margin-top: $line-height;
    margin-left: $margin;
    display: inline-block;
    font-family: $logo-stack;
    color: inherit;
    text-decoration: none;
    font-weight: 900;
    letter-spacing: 0.05em;
    cursor: pointer;

    &:hover {
      color: $half-grey;
    }

    @include screen-size("small") {
      margin-left: auto;
      margin-right: auto;
      display: block;
      text-align: center;

      &:hover {
        color: black;
      }
    }

    &:active {
      color: $full-grey;
    }
  }

  .hamburger {
    cursor: pointer;
    float: right;
    margin-right: $margin;
    padding-top: $line-height;
    font-family: $logo-stack;
    color: inherit;
    text-decoration: none;
    font-weight: 900;
    letter-spacing: 0.05em;

    @include screen-size("small") {
      display: none;
    }

    &:hover {
      color: $half-grey;
    }

    &:active {
      color: $full-grey;
    }
  }

  .menu {
    display: inline-block;
    width: 100%;
    padding-right: $margin;
    padding-left: $margin;
    font-size: 16px;
    z-index: 100;
    background: white;
    overflow: hidden;
    user-select: none;
    padding-top: $line-height;
    letter-spacing: 0.05em;
    line-height: $line-height;

    @include screen-size("small") {
      padding-right: $phone-margin;
      padding-left: $phone-margin;
    }

    .column {
      width: 100%;
      float: right;
      margin-bottom: $line-height;
      overflow-y: auto;
      position: relative;
    }

    .menu-item {
      font-family: $serif-stack;
      font-weight: bold;
      text-align: center;
      color: black;
      text-decoration: none;
      display: block;
      cursor: pointer;

      a,
      span {
        @include screen-size("small") {
          display: inline-block;
          padding-top: 4px;
          padding-bottom: 4px;
        }

        &:hover {
          color: $half-grey;
        }

        &:active {
          color: $full-grey;
        }
      }
    }
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
  }
</style>

<div class="bar" use:links class:open={menuOpen}>
  <!-- Logo -->
  <span
    class="logo"
    on:click={e => {
      if (window.matchMedia('(max-width: 900px)').matches) {
        menuOpen = !menuOpen
        searchActive = false
        searchInputValue = ''
      } else {
        menuOpen = false
        searchActive = false
        searchInputValue = ''
        navigate('/')
      }
    }}>
    PALETTEN
  </span>

  <div
    class="hamburger"
    on:click={e => {
      menuOpen = !menuOpen
      searchActive = false
      searchInputValue = ''
    }}>
    {#if menuOpen}STÄNG{:else}MENY{/if}
  </div>

  <div
    class="menu"
    use:links
    on:click={e => {
      menuOpen = false
      searchActive = false
      searchInputValue = ''
    }}>
    <div class="column second">
      <div class="menu-item"><a href="/artiklar">Artiklar</a></div>
      <div class="menu-item"><a href="/tidskrift">Tidskrift</a></div>
      <div class="menu-item"><a href="/projekt">Projekt</a></div>
    </div>
    <div class="column first">
      <div class="menu-item"><a href="/om-paletten">Om Paletten</a></div>
      <div class="menu-item">
        <a href="/prenumerationer">Prenumerationer</a>
      </div>
      <div class="menu-item"><a href="/nyhetsbrev">Nyhetsbrev</a></div>
      <div class="menu-item"><a href="/kontakt">Kontakt</a></div>
    </div>
    <div class="column third">
      {#if !searchActive}
        <div
          class="menu-item"
          on:click={e => {
            searchActive = true
            e.stopPropagation()
          }}>
          <span>Sök</span>
        </div>
      {/if}
      <div class="search" class:active={searchActive}>
        <input
          bind:this={searchInputElement}
          bind:value={searchInputValue}
          on:keyup={e => {
            if (e.keyCode === 13) {
              navigate('/search/' + searchInputValue)
              searchActive = false
              searchInputValue = ''
              menuOpen = false
              searchInputElement.blur()
            }
          }} />
      </div>
    </div>
  </div>
</div>

{#if menuOpen}
  <div
    class="overlay"
    on:click={e => {
      menuOpen = false
      searchActive = false
      searchInputValue = ''
    }} />
{/if}
