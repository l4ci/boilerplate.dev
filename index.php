  <!doctype html>
  <html class="no-js" lang="">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">

    <title>Pagetitle</title>
    <meta name="description" content="">

    <!-- Webfonts -->

    <!-- Modernizr -->
    <script src="assets/js/modernizr.js"></script>

    <link rel="stylesheet" href="assets/css/all.min.css">

    <link rel="apple-touch-icon-precomposed" href="assets/images/apple-touch-icon-precomposed.png">
    <link rel="shortcut icon" href="assets/images/favicon.ico" type="image/x-icon">
  </head>
  <body>

    <!-- WebsiteWrapper -->
    <div class="websiteWrapper">

      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis lectus metus, at posuere neque. Sed pharetra nibh eget orci convallis at posuere leo convallis. Sed blandit augue vitae augue scelerisque bibendum. Vivamus sit amet libero turpis, non venenatis urna. In blandit, odio convallis suscipit venenatis, ante ipsum cursus augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis lectus metus, at posuere neque. Sed pharetra nibh eget orci convallis at posuere leo convallis. Sed blandit augue vitae augue scelerisque bibendum. Vivamus sit amet libero turpis, non venenatis urna. In blandit, odio convallis suscipit venenatis, ante ipsum cursus augue.

    </di>

    <!-- jQuery -->
    <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="assets/js/jquery.min.js"><\/script>')</script>

    <!-- Main Scripts file -->
    <script src="assets/js/all.min.js"></script>

    <!-- Google Analytics JavaScript here -->


    <?php
      $host = $_SERVER['HTTP_HOST'];
      if($host == "localhost" or $host == "boilerplate.dev") {
    ?>
      <!-- BrowserSync -->
      <script type='text/javascript' id="__bs_script__">
        //<![CDATA[
        document.write("<script async src='http://HOST:3000/browser-sync/browser-sync-client.2.7.13.js'><\/script>".replace("HOST", location.hostname));
        //]]>
      </script>
    <?php } ?>
  </body>
  </html>