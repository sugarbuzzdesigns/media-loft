<!doctype html>
<html>
    <head>
        <title>Cascading Grid Layout Example</title>
        <!-- Include this if you want responsive design -->
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
        <div id="container">
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
    </body>
    <style>
        #container
        {
            background-color: grey;
        }
                
        .item
        {
            width: 320px;
            height: 250px;
            background-color: green;
        }

    </style>
    <script src="http://masonry.desandro.com/masonry.pkgd.min.js"></script>
    <script>
        var container = document.querySelector('#container');
        var msnry = new Masonry( container, {
          //here we define grid system column width to be 320px. This remains constant throughout all viewport sizes. Columns are dropped when they have no space which makes them a responsive grid system similarly columns are added when viewport size increases.
          columnWidth: 320,
          //select all grid boxes
          itemSelector: '.item'
        });
    </script>    
</html>