<?php get_header(); ?>

<style>
    #main-logo,
    #loader {
        display: none;
    }

    .frame { width: 100%; height: 160px; padding: 0; }
    .frame .slidee { margin: 0; padding: 0; height: 100%; list-style: none; }
    .frame .slidee li { float: left; margin: 0 5px 0 0; padding: 0; width: 120px; height: 100%; }

    .scrollbar { width: 100%; height: 10px; }
    .scrollbar .handle {
        width: 100px; /* overriden if dynamicHandle: 1 */
        height: 100%;
        background: #222;
    }        
</style>

    <div id="frame">
        <div class="slidee">
            <h2>This in here...</h2>
            <p>Hey</p>
        </div>
    </div>

    <div class="scrollbar">
        <div class="handle"></div>
    </div>         
<?php get_footer(); ?>