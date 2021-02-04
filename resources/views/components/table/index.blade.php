<ul class="table__filters">
  <li class="fas fa-wheelchair" :class="{'active': filters.disabled}" @click="filters.disabled = !filters.disabled"></li>
  <li class="fas fa-female" :class="{'active': filters.women}" @click="filters.women = !filters.women"></li>
  <li class="fas fa-charging-station" :class="{'active': filters.electric}" @click="filters.electric = !filters.electric"></li>
  <li class="fas fa-exchange-alt" :class="{'active': filters.parkandride}" @click="filters.parkandride = !filters.parkandride"></li>
</ul>
<div class="table__row" :class="{'active': index == selectedParkingLot}" v-for="(parkingLot, index) in filteredParkingLots">
  <div class="table__heading" @click="selectedParkingLot = index">@{{ parkingLot.name }}</div>
  <table class="table__data" v-if="selectedParkingLot == index">
    <tr v-if="day < 5">
      <td><i class="fas fa-clock"> Today</i></td>
      <td>@{{ parkingLot.opening_times_mo_to_th.split(':').join(' - ').substring(1,parkingLot.opening_times_mo_to_th.split(':').join(' - ').length - 1) }}</td>
    </tr>
    <tr v-if="day == 5">
      <td><i class="fas fa-clock"></i></td>
      <td>@{{ parkingLot.opening_times_fr.split(':').join(' - ').substring(1,parkingLot.opening_times_fr.split(':').join(' - ').length - 1) }}</td>
    </tr>
    <tr v-if="day == 6">
      <td><i class="fas fa-clock"></i></td>
      <td>@{{ parkingLot.opening_times_sa.split(':').join(' - ').substring(1,parkingLot.opening_times_sa.split(':').join(' - ').length - 1) }}</td>
    </tr>
    <tr v-if="day == 7">
      <td><i class="fas fa-clock"></i></td>
      <td v-if="parkingLot.opening_times_su.length > 0">@{{ parkingLot.opening_times_su.split(':').join(' - ').substring(1,parkingLot.opening_times_su.split(':').join(' - ').length - 1) }}</td>
      <td v-else>CLOSED</td>
    </tr>
    <template v-if="view == 'citizen'">
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
      <tr v-if="parkingLot.price_per_hour > 0">
        <td><i class="fas fa-euro-sign"> /h</i></td>
        <td>@{{ parkingLot.price_per_hour }}</td>
      </tr>
      <tr v-if="parkingLot.price_per_30_minutes > 0">
        <td><i class="fas fa-euro-sign"> /30min</i></td>
        <td>@{{ parkingLot.price_per_30_minutes }}</td>
      </tr>
      <tr>
        <td><i class="fas fa-euro-sign"> /d</i></td>
        <td>@{{ parkingLot.price_per_day }}</td>
      </tr>
      <tr>
        <td>Website</td>
        <td><a v-bind:href ="parkingLot.website" target="_blank" style="color:yellow;">@{{ parkingLot.website }}</a></td>
      </tr>
      <tr v-if="parkingLot.notes.length > 0">
        <td><i class="fas fa-sticky-note"></i></td>
        <td>@{{ parkingLot.notes }}</td>
      </tr>
    </template>
    <template v-if="view == 'analyst'">
      <tr>
        <td>Average free spaces Monday at 3pm</td>
        <td>@{{ occupancy.Monday[15][parkingLot.name] }}</td>
      </tr>
      <tr>
        <td>Average free spaces Tuesday at 3pm</td>
        <td>@{{ occupancy.Tuesday[15][parkingLot.name] }}</td>
      </tr>
    </template>
  </table>
</div>
<div class="table__no-data" v-if="filteredParkingLots.length < 1">No parking lot matches your filters.</div>
