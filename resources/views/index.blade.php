<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Parking Data Visualization</title>

    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Main script and styles -->
    <script src="{{ asset('js/app.js') }}"></script>
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">

    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
     integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
     crossorigin=""/>
    <script src="https://d3js.org/d3.v6.js"></script>
    <script src="https://unpkg.com/d3-simple-slider"></script>

    <!--<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>-->

    <!-- Component scripts and styles -->

    <script src="{{ asset('js/map/index.js') }}" defer></script>
    <script src="{{ asset('js/chart/index.js') }}" defer></script>
    <!--<script src="{{ asset('js/table/index.js') }}" defer></script>-->
    <script src="{{ asset('js/slider/index.js') }}" defer></script>

    <link href="{{ asset('css/map/index.css') }}" rel="stylesheet">
    <link href="{{ asset('css/chart/index.css') }}" rel="stylesheet">
    <link href="{{ asset('css/table/index.css') }}" rel="stylesheet">
    <link href="{{ asset('css/slider/index.css') }}" rel="stylesheet">

  </head>
  <body>

    <!-- map component -->

    <div class="map">
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

      <div class="sidebar__main">

        <!-- slider component -->

        <div class="slider">
          @include('components.slider.index')
        </div>

        <!-- chart component -->

        <div class="chart">
          @include('components.chart.index')
        </div>

        <!-- table component -->

        <div class="table">
          @include('components.table.index')
        </div>

      </div>

    <aside>

  </body>
</html>
