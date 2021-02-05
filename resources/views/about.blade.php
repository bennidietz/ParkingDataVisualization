<!DOCTYPE html>
<html>
  <head>
    <title>Why?</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
    <style>
      body {
        margin: 0px;
        padding: 0px;
        background: #444444;
        font-family: "Montserrat";
        color: #FFFFFF;
        overflow-x: hidden;
        overflow-y: auto;
        font-size: 100%;
        vertical-align: baseline;
      }
    </style>
    <link href="{{ asset('css/about/index.css') }}" rel="stylesheet">
    <!--<noscript><link rel="stylesheet" href="html5up-story/assets/css/noscript.css" /></noscript>-->
  </head>
  <body>
    <section class="banner style1 orient-left content-align-left image-position-right fullscreen onload-image-fade-in onload-content-fade-right">
      <div class="content">
        <h1>Sick of waiting in a line of cars?</h1>
        <ul class="actions stacked">
          <li><a href="#first" class="button big wide smooth-scroll-middle">Try out our web app for...</a></li>
        </ul>
      </div>
      <div class="image">
        <img src="{{ asset('img/line_of_cars.jpg') }}" alt="Line of cars" />
      </div>
    </section>

    <section class="spotlight style1 orient-right content-align-left image-position-center onscroll-image-fade-in" id="first">
      <div class="content">
        <h2>finding parking lots that will definitevely have a free spot for you!</h2>
        <ul class="actions stacked">
          <li><a href="#second" class="button">What else?</a></li>
        </ul>
      </div>
      <!--Photo by Josh Sorenson from Pexels-->
      <div class="image">
        <img src="{{ asset('img/free_parking_space.jpg') }}" alt="free parking space" />
      </div>
    </section>

    <!-- Three -->
      <section class="spotlight style1 orient-left content-align-left image-position-center onscroll-image-fade-in" id="second">
        <div class="content">
          <h2>identifying crowded areas where building a new parking garage would pay off!</h2>
          <ul class="actions stacked">
            <li><a href="#third" class="button">That's it?</a></li>
          </ul>
        </div>
        <!-- Photo by Stephan Müller from Pexels-->
        <div class="image">
          <img src="{{ asset('img/crowded_car_park.jpg') }}" alt="Crowded Area?" />
        </div>
      </section>

      <!-- Four -->
        <section class="spotlight style1 orient-right content-align-left image-position-center onscroll-image-fade-in" id="third">
          <div class="content">
            <h2>detecting unprofitable opening times of your car park!</h2>
            <ul class="actions stacked">
              <li><a href="{{ route('map') }}" class="button">Show me!</a></li>
            </ul>
          </div>
          <div class="image">
            <img src="{{ asset('img/empty_car_park.jpg') }}" alt="Empty car park" />
          </div>
        </section>
  </body>
</html>
