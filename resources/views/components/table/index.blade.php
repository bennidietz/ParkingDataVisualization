<h1>Some info about this fabulous parking lot</h1>
<div id="accordion">
  <div class="card" v-for="parkingLot in parkingLots">
    <div class="class=card-header" id="headingOne">
      <h5 class="mb-0">
        <button class="btn btn-link" id="buttonOne" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          @{{ parkingLot.name }}
          <i class="fas fa-wheelchair"></i>
          <i class="fas fa-charging-station"></i>
          <i class="fas fa-female"></i>
        </button>
      </h5>
    </div>
    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-mdb-parent="#accordion">
      <div id="bodyOne" class="card-body">
      </div>
    </div>
  </div>
</div>
<!--<script type="text/javascript" src="js/testdata.js"></script>-->
