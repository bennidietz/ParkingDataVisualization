<!DOCTYPE html>
<html>
  <head>
    <!--
    	Story by HTML5 UP
    	html5up.net | @ajlkn
    	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
     -->
    <title>Why?</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
    <style>
      body {
        margin: 0px;
        padding: 0px;
        background: #444444;
        color: #FFFFFF;
        overflow-x: hidden;
        overflow-y: auto;
        font-size: 100%;
        vertical-align: baseline;
      }
    </style>
    <link href="{{ asset('css/about/index.css') }}" rel="stylesheet">
  </head>
  <body>
    <section class="banner style1 orient-left content-align-left image-position-right fullscreen onload-image-fade-in onload-content-fade-right">
      <div class="content">
        <h1>Sick of waiting in a line of cars?</h1>
        <ul class="actions stacked">
          <li><a href="#first" class="button big wide smooth-scroll-middle">Use our web app to...</a></li>
        </ul>
      </div>
      <!-- Photo by Lisa Fotios from Pexels -->
      <div class="image">
        <img src="{{ asset('img/line_of_cars.jpg') }}" alt="Line of cars" />
      </div>
    </section>

    <section class="spotlight style1 orient-right content-align-left image-position-center onscroll-image-fade-in" id="first">
      <div class="content">
        <h2>find parking lots that will definitevely have a free spot for you!</h2>
        <ul class="actions stacked">
          <li><a href="#second" class="button">What else?</a></li>
        </ul>
      </div>
      <!--Photo by Josh Sorenson from Pexels -->
      <div class="image">
        <img src="{{ asset('img/free_parking_space.jpg') }}" alt="free parking space" />
      </div>
    </section>

    <!-- Three -->
      <section class="spotlight style1 orient-left content-align-left image-position-center onscroll-image-fade-in" id="second">
        <div class="content">
          <h2>identify crowded areas where building a new car park would pay off!</h2>
          <ul class="actions stacked">
            <li><a href="#third" class="button">That's it?</a></li>
          </ul>
        </div>
        <!-- Photo by Stephan Müller from Pexels -->
        <div class="image">
          <img src="{{ asset('img/crowded_car_park.jpg') }}" alt="Crowded Area?" />
        </div>
      </section>

      <!-- Four -->
        <section class="spotlight style1 orient-right content-align-left image-position-center onscroll-image-fade-in" id="third">
          <div class="content">
            <h2>detect unprofitable opening times of your car park!</h2>
            <ul class="actions stacked">
              <li><a href="{{ route('map') }}" class="button">Show me!</a></li>
            </ul>
          </div>
          <!-- Photo by K HOWARD from Pexels -->
          <div class="image">
            <img src="{{ asset('img/empty_car_park.jpg') }}" alt="Empty car park" />
          </div>
        </section>
  </body>
</html>
