<template v-if="view == 'citizen'">
  <ul class="table__filters">
    <li class="fas fa-wheelchair" :class="{'active': filters.disabled}" @click="filters.disabled = !filters.disabled"></li>
    <li class="fas fa-female" :class="{'active': filters.women}" @click="filters.women = !filters.women"></li>
    <li class="fas fa-charging-station" :class="{'active': filters.electric}" @click="filters.electric = !filters.electric"></li>
    <li class="fas fa-exchange-alt" :class="{'active': filters.parkandride}" @click="filters.parkandride = !filters.parkandride"></li>
  </ul>
</template>
<div class="table__row" :class="{'active': index == selectedParkingLot}" v-for="(parkingLot, index) in filteredParkingLots">
  <div class="table__heading" @click="selectedParkingLot = index">@{{ parkingLot.name }}</div>
  <table class="table__data" v-if="selectedParkingLot == index">
    <template v-if="view == 'citizen'">
    <tr>
      <td width ="20%">
        <div class="dropdown">
          <button class="dropbtn"><i class="fas fa-clock"></i>&nbsp; Today</button>
          <div class="dropdown-content">
            <p>Mo-Th: @{{ parkingLot.opening_times_mo_to_th.substring(1,parkingLot.opening_times_mo_to_th.indexOf(':')) +
              " AM - " + String(parseFloat(parkingLot.opening_times_mo_to_th.substring(parkingLot.opening_times_mo_to_th.indexOf(':') + 1 ,parkingLot.opening_times_mo_to_th.length -1)) - 12) + " PM"}}</p>
            <p>Fr:  @{{ (parseInt(parkingLot.opening_times_fr.substring(parkingLot.opening_times_fr.indexOf(':') + 1 ,parkingLot.opening_times_fr.length -1)) - 12) > 0 ? parkingLot.opening_times_fr.substring(1,parkingLot.opening_times_fr.indexOf(':')) +
              " AM - " + String(parseFloat(parkingLot.opening_times_fr.substring(parkingLot.opening_times_fr.indexOf(':') + 1 ,parkingLot.opening_times_fr.length -1)) - 12) + " PM" :
              parkingLot.opening_times_fr.substring(1,parkingLot.opening_times_fr.indexOf(':')) +
                " AM - " + parkingLot.opening_times_fr.substring(parkingLot.opening_times_fr.indexOf(':') + 1 ,parkingLot.opening_times_fr.length -1) + " AM"}}</p>
            <p>Sa:  @{{ (parseInt(parkingLot.opening_times_sa.substring(parkingLot.opening_times_sa.indexOf(':') + 1 ,parkingLot.opening_times_sa.length -1)) - 12) > 0 ? parkingLot.opening_times_sa.substring(1,parkingLot.opening_times_sa.indexOf(':')) +
              " AM - " + String(parseFloat(parkingLot.opening_times_sa.substring(parkingLot.opening_times_sa.indexOf(':') + 1 ,parkingLot.opening_times_sa.length -1)) - 12) + " PM" :
              parkingLot.opening_times_sa.substring(1,parkingLot.opening_times_sa.indexOf(':')) +
                " AM - " + parkingLot.opening_times_sa.substring(parkingLot.opening_times_sa.indexOf(':') + 1 ,parkingLot.opening_times_sa.length -1) + " AM"}}</p>
            <p v-if="parkingLot.opening_times_su.length > 0">Su: @{{ parkingLot.opening_times_su.substring(1,parkingLot.opening_times_su.indexOf(':')) +
              " AM - " + String(parseFloat(parkingLot.opening_times_su.substring(parkingLot.opening_times_su.indexOf(':') + 1 ,parkingLot.opening_times_su.length -1)) - 12) + " PM"}}</p>
            <p v-else>Su: CLOSED</p>
          </div>
        </div>
      </td>
      <td v-if="day < 5">  @{{ parkingLot.opening_times_mo_to_th.substring(1,parkingLot.opening_times_mo_to_th.indexOf(':')) +
        " AM - " + String(parseFloat(parkingLot.opening_times_mo_to_th.substring(parkingLot.opening_times_mo_to_th.indexOf(':') + 1 ,parkingLot.opening_times_mo_to_th.length -1)) - 12) + " PM"}}</td>
      <td v-if="day == 5"> @{{ (parseInt(parkingLot.opening_times_fr.substring(parkingLot.opening_times_fr.indexOf(':') + 1 ,parkingLot.opening_times_fr.length -1)) - 12) > 0 ? parkingLot.opening_times_fr.substring(1,parkingLot.opening_times_fr.indexOf(':')) +
        " AM - " + String(parseFloat(parkingLot.opening_times_fr.substring(parkingLot.opening_times_fr.indexOf(':') + 1 ,parkingLot.opening_times_fr.length -1)) - 12) + " PM" :
        parkingLot.opening_times_fr.substring(1,parkingLot.opening_times_fr.indexOf(':')) +
          " AM - " + parkingLot.opening_times_fr.substring(parkingLot.opening_times_fr.indexOf(':') + 1 ,parkingLot.opening_times_fr.length -1) + " AM"}}</td>
      <td v-if="day == 6"> @{{ (parseInt(parkingLot.opening_times_sa.substring(parkingLot.opening_times_sa.indexOf(':') + 1 ,parkingLot.opening_times_sa.length -1)) - 12) > 0 ? parkingLot.opening_times_sa.substring(1,parkingLot.opening_times_sa.indexOf(':')) +
        " AM - " + String(parseFloat(parkingLot.opening_times_sa.substring(parkingLot.opening_times_sa.indexOf(':') + 1 ,parkingLot.opening_times_sa.length -1)) - 12) + " PM" :
        parkingLot.opening_times_sa.substring(1,parkingLot.opening_times_sa.indexOf(':')) +
          " AM - " + parkingLot.opening_times_sa.substring(parkingLot.opening_times_sa.indexOf(':') + 1 ,parkingLot.opening_times_sa.length -1) + " AM"}}</td>
      <td v-if="day == 7 & parkingLot.opening_times_su.length > 0"> @{{ parkingLot.opening_times_su.substring(1,parkingLot.opening_times_su.indexOf(':')) +
        " AM - " + String(parseFloat(parkingLot.opening_times_su.substring(parkingLot.opening_times_su.indexOf(':') + 1 ,parkingLot.opening_times_su.length -1)) - 12) + " PM"}}</td>
      <td v-if="day == 7 & parkingLot.opening_times_su.length == 0">CLOSED</td>
    </tr>
      <tr v-if="parkingLot.capacity_disabled > 0">
        <td><i class="fas fa-wheelchair"></i></td>
        <td>@{{ parkingLot.capacity_disabled }}</td>
      </tr>
      <tr v-if="parkingLot.capacity_electric > 0">
        <td><i class="fas fa-charging-station"></i></td>
        <td>@{{ parkingLot.capacity_electric }}</td>
      </tr>
      <tr v-if="parkingLot.capacity_women > 0">
        <td><i class="fas fa-female"></i></td>
        <td>@{{ parkingLot.capacity_women }}</td>
      </tr>
      <tr v-if="parkingLot.height > 0">
        <td><i class="fas fa-ruler-vertical"></i></td>
        <td>@{{ parkingLot.height }} m</td>
      </tr>
      <tr>
        <td v-if="parkingLot.price_1st_hour > 0 | parkingLot.night_price_per_hour_20_to_8">
          <div class="dropdown">
            <button class="dropbtn"><i class="fas fa-coins"></i></button>
            <div class="dropdown-content"></i>
              <p v-if="parkingLot.price_until_30_minutes> 0"> @{{ parkingLot.price_until_30_minutes }} € /max 30 min</p>
              <p v-if="parkingLot.price_1st_hour > 0">1st & 2nd hour: @{{ parkingLot.price_1st_hour }} € ea</p>
              <p v-if="parkingLot.night_price_per_hour_20_to_8 > 0">8 PM - 8 AM: @{{ parkingLot.night_price_per_hour_20_to_8 }} € /hour</p>
            </div>
          </div>
        </td>
        <td v-else> <i class="fas fa-coins"></i></td>
        <td v-if="parkingLot.night_price_per_hour_20_to_8 > 0 & (hour >= 20 | hour < 8)">@{{ parkingLot.night_price_per_hour_20_to_8 }} € /hour</td>
        <td v-if="parkingLot.price_per_hour > 0 & (hour < 20 & hour >= 8)">@{{ parkingLot.price_per_hour }} € /hour</td>
        <td v-if="parkingLot.price_per_hour > 0 & parkingLot.night_price_per_hour_20_to_8 == 0 ">@{{ parkingLot.price_per_hour }} € /hour</td>
        <td v-if="parkingLot.price_per_30_minutes > 0 & day != 7">@{{ parkingLot.price_per_30_minutes }} € /30min</td>
        <td v-if="parkingLot.su_price_30_minutes > 0 & day == 7">@{{ parkingLot.su_price_30_minutes }} € /30min</td>
      </tr>
      <tr>
        <td v-if="parkingLot.night_price_max > 0 | parkingLot.su_price_day > 0">
          <div class="dropdown">
            <button class="dropbtn"><i class="fas fa-coins"></i></button>
            <div class="dropdown-content"></i></i>
              <p v-if="parkingLot.night_price_max > 0">8 PM - 8 AM: @{{ parkingLot.night_price_max	}} € max</p>
              <p v-if="parkingLot.su_price_day > 0">Mo-Sa: @{{ parkingLot.price_per_day	}} € /day</p>
              <p v-if="parkingLot.su_price_day > 0">Su: @{{ parkingLot.su_price_day	}} € /day</p>
        </td>
        <td v-else> <i class="fas fa-coins"></i></td>
        <td v-if="day == 7 & parkingLot.su_price_day > 0">@{{ parkingLot.su_price_day }} € /day</td>
        <template v-else>
          <td v-if="hour < 20 & hour >= 8">@{{ parkingLot.price_per_day }} € /day</td>
          <td v-if="parkingLot.night_price_max == 0">@{{ parkingLot.price_per_day }} € /day</td>
          <td v-if="parkingLot.night_price_max > 0 & (hour >= 20 | hour < 8)">@{{ parkingLot.night_price_max }} € /night</td>
        </template>
      </tr>
      <tr>
        <td><i class="fas fa-link"></i></td>
        <td><a v-bind:href ="parkingLot.website" target="_blank" style="color:yellow;">Visit Website</a></td>
      </tr>
      <tr v-if="parkingLot.notes.length > 0">
        <td><i class="fas fa-sticky-note"></i></td>
        <td>@{{ parkingLot.notes }}</td>
      </tr>
    </template>
  </table>
</div>
<div class="table__no-data" v-if="filteredParkingLots.length < 1">No parking lot matches your filters.</div>
