<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Parking Data Visualization</title>

    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Main script and styles -->
    <script src="{{ asset('js/app.js') }}" defer></script>
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">

    <!-- Component scripts -->

    <script src="{{ asset('js/map/index.js') }}"></script>
    <script src="{{ asset('js/chart/index.js') }}"></script>
    <script src="{{ asset('js/table/index.js') }}"></script>
    <script src="{{ asset('js/slider/index.js') }}"></script>

  </head>
  <body>

    <!-- map component -->

    <div id="map" class="map">
      @include('components.map.index')
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

      <div id="slider" class="slider">
        @include('components.slider.index')
      </div>

      <!-- chart component -->

      <div id="chart" class="chart">
        @include('components.chart.index')
      </div>

      <!-- table component -->

      <div id="table" class="table">
        @include('components.table.index')
      </div>

    <aside>

  </body>
</html>
