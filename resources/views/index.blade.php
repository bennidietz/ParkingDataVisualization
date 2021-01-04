<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Parking Data Visualization</title>

    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Main script and styles -->
    <script src="{{ asset('js/app.js') }}" defer></script>
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
  </head>
  <body>

    <!-- map component -->

    <div id="map" class="map">
      <img src="{{ asset('img/demo-map.PNG') }}" />
    </div>

    <!-- side bar -->

    <aside class="sidebar">

      <ul class="sidebar__tabs">

        <li class="active">
          <span class="fas fa-chart-line"></span> Analyst view
        </li>

        <li>
          <span class="fas fa-user"></span> Basic user view
        </li>

      </ul>

      <!-- slider component -->

      <div id="slider" class="slider"></div>

      <!-- chart component -->

      <div id="chart" class="chart"></div>

      <!-- list component -->

      <div id="list" class="list"></div>

    <aside>

  </body>
</html>
