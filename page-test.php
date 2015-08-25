<?php get_header(); ?>
        <div id="container">
            <div id="bottom"></div>
        </div>

        <style>
            body,
            html {
                height: 100%;
                width: 100%;
                margin: 0;
                padding: 0;
            }
            body {
                background: #cc2e8b;
                border: 8px solid #f7f2ec;
            }
            * {
                box-sizing: border-box;
            }
            .logo-wrap {
                position: absolute;
                top: 50%;
                left: 50%;
                -ms-transform: translate(-50%,-50%); /* IE 9 */
                -webkit-transform: translate(-50%,-50%); /* Chrome, Safari, Opera */
                transform: translate(-50%,-50%);
                width: 80%;
                height: 50%;
                max-width: 400px;
            }
            #bottom,
            #top,
            #middle {
                position:absolute;
                width: 100%;
                height: 100%;
            }
            #bottom {
                margin:4px 0 0 -4px;
            }
        </style>        
<?php get_footer(); ?>