<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>IntelliPark | Map</title>

    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Main script and styles -->
    <script src="{{ asset('js/app.js') }}"></script>
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">

    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
     integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
     crossorigin=""/>
    <script src="https://d3js.org/d3.v6.js"></script>

    <!--<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>-->

    <!-- Component scripts and styles -->

    <script src="{{ asset('js/map/index.js') }}" defer></script>
    <link href="{{ asset('css/map/index.css') }}" rel="stylesheet">
    <link href="{{ asset('css/table/index.css') }}" rel="stylesheet">

  </head>
  <body>

    <div id="main">

      <!-- map component -->

      <div class="map">
        @include('components.map.index')
      </div>

      <!-- side bar -->

      <aside id="preferences" class="sidebar" v-cloak>

        <ul class="sidebar__tabs">
          <li :class="{'active': view == 'citizen'}" @click="view = 'citizen'">
            <span class="fas fa-user"></span> Citizen view
          </li>

          <li :class="{'active': view == 'analyst'}" @click="view = 'analyst'">
            <span class="fas fa-chart-line"></span> Analyst view
          </li>

        </ul>

        <div class="sidebar__main">

          <!-- sumchart component -->

          <div v-if="view == 'analyst'" class="sumchartoverweek">
            @include('components.sumchart.index')
          </div>

          <!-- table component -->

          <div class="table">
            @include('components.table.index')
          </div>

          <!-- popup component (containing slider and chart) -->

          <div class="popup">
            <div class="slider">
              @include('components.slider.index')
            </div>
            @include('components.popup.index')
          </div>

          <!-- feedback component -->

          <div class="feedback__button">
            @include('components.feedback.index')
          </div>

          <!-- toast component -->

          <div class="toast">
              @include('components.toast.index')
          </div>

        </div>

      <aside>

    </div>

  </body>
</html>
