<!doctype html>
<html class="no-js" lang="">
<head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>Boilerplate</title>
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">

  <!-- Webfonts -->

  <!-- Styles -->
  <link rel="stylesheet" href="assets/css/app.min.css">

  <!-- Modernizr -->
  <script src="assets/js/vendor/modernizr-custom.min.js"></script>

  <!-- Favicon -->
  <link rel="apple-touch-icon-precomposed" sizes="57x57" href="assets/images/favicon/apple-touch-icon-57x57.png" />
  <link rel="apple-touch-icon-precomposed" sizes="114x114" href="assets/images/favicon/apple-touch-icon-114x114.png" />
  <link rel="apple-touch-icon-precomposed" sizes="72x72" href="assets/images/favicon/apple-touch-icon-72x72.png" />
  <link rel="apple-touch-icon-precomposed" sizes="144x144" href="assets/images/favicon/apple-touch-icon-144x144.png" />
  <link rel="apple-touch-icon-precomposed" sizes="60x60" href="assets/images/favicon/apple-touch-icon-60x60.png" />
  <link rel="apple-touch-icon-precomposed" sizes="120x120" href="assets/images/favicon/apple-touch-icon-120x120.png" />
  <link rel="apple-touch-icon-precomposed" sizes="76x76" href="assets/images/favicon/apple-touch-icon-76x76.png" />
  <link rel="apple-touch-icon-precomposed" sizes="152x152" href="assets/images/favicon/apple-touch-icon-152x152.png" />
  <link rel="icon" type="image/png" href="assets/images/favicon/favicon-196x196.png" sizes="196x196" />
  <link rel="icon" type="image/png" href="assets/images/favicon/favicon-96x96.png" sizes="96x96" />
  <link rel="icon" type="image/png" href="assets/images/favicon/favicon-32x32.png" sizes="32x32" />
  <link rel="icon" type="image/png" href="assets/images/favicon/favicon-16x16.png" sizes="16x16" />
  <link rel="icon" type="image/png" href="assets/images/favicon/favicon-128.png" sizes="128x128" />
  <meta name="application-name" content="Boilerplate"/>
  <meta name="msapplication-TileColor" content="#E60000" />
  <meta name="msapplication-TileImage" content="assets/images/favicon/mstile-144x144.png" />
  <meta name="msapplication-square70x70logo" content="assets/images/favicon/mstile-70x70.png" />
  <meta name="msapplication-square150x150logo" content="assets/images/favicon/mstile-150x150.png" />
  <meta name="msapplication-wide310x150logo" content="assets/images/favicon/mstile-310x150.png" />
  <meta name="msapplication-square310x310logo" content="assets/images/favicon/mstile-310x310.png" />

</head>
<body>

  <!-- WebsiteWrapper -->
  <div class="websiteWrapper">

    Hello World.

  </div>

  <!-- JS Scripts & Plugins -->
  <script src="assets/js/scripts.min.js"></script>
  <script src="assets/js/app.min.js"></script>

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