<div class="table__row" :class="{'active': index == selectedParkingLot}" v-for="(parkingLot, index) in parkingLots">
  <div class="table__heading" @click="selectedParkingLot = index">@{{ parkingLot.name }}</div>
  <table class="table__data" v-if="selectedParkingLot == index">
    <tr>
      <td><i class="fas fa-wheelchair"></i></td>
      <td>@{{ parkingLot.capicity_disabled }}</td>
    </tr>
    <tr>
      <td><i class="fas fa-charging-station"></i></td>
      <td>@{{ parkingLot.capacity_electric }}</td>
    </tr>
    <tr>
      <td><i class="fas fa-female"></i></td>
      <td>@{{ parkingLot.capacity_women }}</td>
    </tr>
    <tr>
      <td><i class="fas fa-ruler-vertical"></i></td>
      <td>@{{ parkingLot.height }} m</td>
    </tr>
    <tr>
      <td><i class="fas fa-euro-sign">/h</i></td>
      <td>@{{ parkingLot.price_per_hour }}</td>
    </tr>
    <tr>
      <td>Website</td>
      <td>@{{ parkingLot.website }}</td>
    </tr>
  </table>
</div>
