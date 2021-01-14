<!--<h1>Basic table</h1>
<table style="width:100%">
  <tr>
    <th>Key</th>
    <th>Capacity</th>
  </tr>
  <tr v-for="(parkingLot, index) in parkingLots">
    <td>@{{ parkingLot.name }}</td>
    <td>@{{ parkingLot.capacity }}</td>
  </tr>
</table>-->
<!--<div id="accordion">-->
  <div class="card" v-for="(parkingLot, index) in parkingLots">
    <div class="class=card-header" id="headingOne">
      <h2 class="mb-0">
        @{{ parkingLot.name }}
<!--        <button class="btn btn-link" id="buttonOne" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          @{{ parkingLot.name }}
          <i class="fas fa-charging-station"></i>
          <i class="fas fa-female"></i>
        </button>-->
      </h5>
        <table id="tableID">
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
        <!--<button class="btn btn-link" id="buttonOne" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" @click="selectedParkingLot=index">
          Select
        </button>-->
    </div>
<!--    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-mdb-parent="#accordion">-->
