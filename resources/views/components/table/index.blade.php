<h4>Filter:
  <button class ="btn btn-primary" @click=""><i class="fas fa-wheelchair"></i></button>
  <button class ="btn btn-primary" @click=""><i class="fas fa-charging-station"></i></button>
  <button class ="btn btn-primary" @click=""><i class="fas fa-female"></i></button>
  <button class ="btn btn-primary" @click="">Open <i class="fas fa-door-open"></i></button>
</h4>
<div class="table__row" :class="{'active': index == selectedParkingLot}" v-for="(parkingLot, index) in parkingLots">
  <div class="table__heading" @click="selectedParkingLot = index">@{{ parkingLot.name }}</div>
  <table class="table__data" v-if="selectedParkingLot == index">
    <tr v-if="day < 5">
      <td><i class="fas fa-clock"></i></td>
      <td>@{{ parkingLot.opening_times_mo_to_th }}</td>
    </tr>
    <tr v-if="day == 5">
      <td><i class="fas fa-clock"></i></td>
      <td>@{{ parkingLot.opening_times_fr }}</td>
    </tr>
    <tr v-if="day == 6">
      <td><i class="fas fa-clock"></i></td>
      <td>@{{ parkingLot.opening_times_sa }}</td>
    </tr>
    <tr v-if="day == 7">
      <td><i class="fas fa-clock"></i></td>
      <td v-if="parkingLot.opening_times_su.length > 0">@{{ parkingLot.opening_times_su }}</td>
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
<!--    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-mdb-parent="#accordion">-->
