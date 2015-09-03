<?php get_header(); ?>
    <style>
      .contentHolder { position:relative; margin:0px auto; padding:0px; width: 640px; height: 360px; overflow: auto; }
      .contentHolder .content-x {width: 1000px; height: 360px; }

      .filmstrip {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 1000px;
      }

      .item {
        width: 100px;
        background: #ccc;
        float: left;
        height: 100%;
      }

      .item:nth-child(odd){
        background: #333;
      }

/* perfect-scrollbar v0.6.5-1 */
.ps-container {
  -ms-touch-action: none;
  overflow: hidden !important; }
  .ps-container.ps-active-x > .ps-scrollbar-x-rail, .ps-container.ps-active-y > .ps-scrollbar-y-rail {
    display: block; }
  .ps-container.ps-in-scrolling {
    pointer-events: none; }
    .ps-container.ps-in-scrolling.ps-x > .ps-scrollbar-x-rail {
      background-color: #eee;
      opacity: 0.9; }
      .ps-container.ps-in-scrolling.ps-x > .ps-scrollbar-x-rail > .ps-scrollbar-x {
        background-color: #999; }
    .ps-container.ps-in-scrolling.ps-y > .ps-scrollbar-y-rail {
      background-color: #eee;
      opacity: 0.9; }
      .ps-container.ps-in-scrolling.ps-y > .ps-scrollbar-y-rail > .ps-scrollbar-y {
        background-color: #999; }
  .ps-container > .ps-scrollbar-x-rail {
    display: none;
    position: absolute;
    /* please don't change 'position' */
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    -ms-border-radius: 4px;
    border-radius: 4px;
    opacity: 0;
    -webkit-transition: background-color .2s linear, opacity .2s linear;
    -moz-transition: background-color .2s linear, opacity .2s linear;
    -o-transition: background-color .2s linear, opacity .2s linear;
    transition: background-color .2s linear, opacity .2s linear;
    bottom: 3px;
    /* there must be 'bottom' for ps-scrollbar-x-rail */
    height: 8px; }
    .ps-container > .ps-scrollbar-x-rail > .ps-scrollbar-x {
      position: absolute;
      /* please don't change 'position' */
      background-color: #aaa;
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      -ms-border-radius: 4px;
      border-radius: 4px;
      -webkit-transition: background-color .2s linear;
      -moz-transition: background-color .2s linear;
      -o-transition: background-color .2s linear;
      transition: background-color .2s linear;
      bottom: 0;
      /* there must be 'bottom' for ps-scrollbar-x */
      height: 8px; }
  .ps-container > .ps-scrollbar-y-rail {
    display: none;
    position: absolute;
    /* please don't change 'position' */
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    -ms-border-radius: 4px;
    border-radius: 4px;
    opacity: 0;
    -webkit-transition: background-color .2s linear, opacity .2s linear;
    -moz-transition: background-color .2s linear, opacity .2s linear;
    -o-transition: background-color .2s linear, opacity .2s linear;
    transition: background-color .2s linear, opacity .2s linear;
    right: 3px;
    /* there must be 'right' for ps-scrollbar-y-rail */
    width: 8px; }
    .ps-container > .ps-scrollbar-y-rail > .ps-scrollbar-y {
      position: absolute;
      /* please don't change 'position' */
      background-color: #aaa;
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      -ms-border-radius: 4px;
      border-radius: 4px;
      -webkit-transition: background-color .2s linear;
      -moz-transition: background-color .2s linear;
      -o-transition: background-color .2s linear;
      transition: background-color .2s linear;
      right: 0;
      /* there must be 'right' for ps-scrollbar-y */
      width: 8px; }
  .ps-container:hover.ps-in-scrolling {
    pointer-events: none; }
    .ps-container:hover.ps-in-scrolling.ps-x > .ps-scrollbar-x-rail {
      background-color: #eee;
      opacity: 0.9; }
      .ps-container:hover.ps-in-scrolling.ps-x > .ps-scrollbar-x-rail > .ps-scrollbar-x {
        background-color: #999; }
    .ps-container:hover.ps-in-scrolling.ps-y > .ps-scrollbar-y-rail {
      background-color: #eee;
      opacity: 0.9; }
      .ps-container:hover.ps-in-scrolling.ps-y > .ps-scrollbar-y-rail > .ps-scrollbar-y {
        background-color: #999; }
  .ps-container:hover > .ps-scrollbar-x-rail, .ps-container:hover > .ps-scrollbar-y-rail {
    opacity: 0.6; }
  .ps-container:hover > .ps-scrollbar-x-rail:hover {
    background-color: #eee;
    opacity: 0.9; }
    .ps-container:hover > .ps-scrollbar-x-rail:hover > .ps-scrollbar-x {
      background-color: #999; }
  .ps-container:hover > .ps-scrollbar-y-rail:hover {
    background-color: #eee;
    opacity: 0.9; }
    .ps-container:hover > .ps-scrollbar-y-rail:hover > .ps-scrollbar-y {
      background-color: #999; }

    </style>

    <h1 style="text-align:center">Can scroll X axis with Y axis wheel.</h1>
    <div id="CanScrollWithYAxis" class="contentHolder">
      <div class="content-x">
        <div class="filmstrip">
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
        </div>
      </div>
    </div>
    <script>
    </script>       
<?php get_footer(); ?>