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
      <td>
        <div class="dropdown">
          <button class="dropbtn"><i class="fas fa-clock"></i>&nbsp; Today</button>
          <div class="dropdown-content">
            <p>Mo-Th: @{{ parkingLot.opening_times_mo_to_th.split(':').join(' - ').substring(1,parkingLot.opening_times_mo_to_th.split(':').join(' - ').length - 1) }}</p>
            <p>Fr: @{{ parkingLot.opening_times_fr.split(':').join(' - ').substring(1,parkingLot.opening_times_fr.split(':').join(' - ').length - 1) }}</p>
            <p>Sa: @{{ parkingLot.opening_times_sa.split(':').join(' - ').substring(1,parkingLot.opening_times_sa.split(':').join(' - ').length - 1) }}</p>
            <p v-if="parkingLot.opening_times_su.length > 0">Su: @{{ parkingLot.opening_times_su.split(':').join(' - ').substring(1,parkingLot.opening_times_su.split(':').join(' - ').length - 1) }}</p>
            <p v-else>Su: CLOSED</p>
          </div>
        </div>
      </td>
      <td v-if="day < 5"> @{{ parkingLot.opening_times_mo_to_th.split(':').join(' - ').substring(1,parkingLot.opening_times_mo_to_th.split(':').join(' - ').length - 1) }}</td>
      <td v-if="day == 5">@{{ parkingLot.opening_times_fr.split(':').join(' - ').substring(1,parkingLot.opening_times_fr.split(':').join(' - ').length - 1) }}</td>
      <td v-if="day == 6">@{{ parkingLot.opening_times_sa.split(':').join(' - ').substring(1,parkingLot.opening_times_sa.split(':').join(' - ').length - 1) }}</td>
      <td v-if="day == 7 & parkingLot.opening_times_su.length > 0">@{{ parkingLot.opening_times_su.split(':').join(' - ').substring(1,parkingLot.opening_times_su.split(':').join(' - ').length - 1) }}</td>
      <td v-else>CLOSED</td>
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
        <td><i class="fas fa-coins"></i></td>
        <td v-if="parkingLot.price_per_hour > 0">@{{ parkingLot.price_per_hour }} € /hour</td>
        <td v-if="parkingLot.price_per_30_minutes > 0">@{{ parkingLot.price_per_30_minutes }} € /30min</td>
      </tr>
      <tr>
        <td><i class="fas fa-coins"></i></td>
        <td>@{{ parkingLot.price_per_day }} € /day</td>
      </tr>
      <tr>
        <td><i class="fas fa-link"></i></td>
        <td><a v-bind:href ="parkingLot.website" target="_blank" style="color:yellow;">@{{ parkingLot.website }}</a></td>
      </tr>
      <tr v-if="parkingLot.notes.length > 0">
        <td><i class="fas fa-sticky-note"></i></td>
        <td>@{{ parkingLot.notes }}</td>
      </tr>
    </template>
  </table>
</div>
<div class="table__no-data" v-if="filteredParkingLots.length < 1">No parking lot matches your filters.</div>
