window.onload = () => {
  console.log("Start");
  //choose a parking lot
  j = 1;
  var parklots = basedata[0];
  console.log(parklots[13]);
  const container = document.getElementById('accordion');
  // create button with all icons
  const content = `
  <div class="card">
    <div class="class=card-header" id="headingOne">
      <h5 class="mb-0">
        <button class="btn btn-link" id="buttonOne" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          ${basedata[0][j][1]}
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
  `;
  container.innerHTML+= content;
  var attributes = parklots[j];
  // list uf attributes we don't want to display
  var select_atts = ["id","name","lat","lon","address","capacity","su_price_30_minutes","su_price_day"];

  // add todays opening times
  var d = new Date();
  var n = d.getDay();
  var h = d.getHours();
  var open;
  var times_today;
  switch(n) {
    case 1:
    case 2:
    case 3:
    case 4:
      times_today = basedata[0][j][8]
      break;
    case 5:
      times_today = basedata[0][j][9]
      break;
    case 6:
      times_today = basedata[0][j][10]
      break;
    case 7:
      times_today = basedata[0][j][11]
      // display sunday prices
      select_atts.pop()
      select_atts.pop()
      break;
    default:
  }
  console.log("Closing_TIME:" + times_today);
  var arr_times_today = times_today.match(/[0-9]+/g);
  var opening_time = arr_times_today[0];
  var closing_time = arr_times_today[2];
  if(h-closing_time <= 0 && h-opening_time >= 0){
    document.getElementById("buttonOne").innerHTML+= `<i class="fas fa-door-open"></i>`;
    // closing soon?
    if (h-closing_time == -1){
      document.getElementById("buttonOne").innerHTML+= `<i class="fas fa-stopwatch"></i>`;
    }
  }
  else{
    document.getElementById("buttonOne").innerHTML+= `<i class="fas fa-door-closed"></i>`;
  }
  document.getElementById("bodyOne").innerHTML += `<i class="fas fa-clock"></i> ${times_today}`;
  // just display night prices if it is between 8 pm and 8 am
  if(h>=20||h<8){
    select_atts.push("price_1st_hour","price_2nd_hour","price_per_hour","price_per_day");
  }
  else{
    select_atts.push("night_price_per_hour(20-8)","night_price_max");
  }
  // iterate over attributes of one parking lot and display some of them
  for (k in attributes){
    var att_name = basedata[0][0][k];
    var att = basedata[0][j][k];
    var bodyContent ="";
    const innerContainer = document.getElementById("bodyOne");
    // don't display NA and TRUE values or opening times
    if(att != "NA" && att != "TRUE" && !select_atts.includes(att_name) && !att_name.startsWith("opening_times")){
      switch(att_name) {
        case "capacity_electric":
          if(att > 0){
            bodyContent = `
            <br><i class="fas fa-charging-station"></i> ${att}
            `;
          }
          break;
        case "capacity_women":
          if(att > 0){
            bodyContent = `
            <br><i class="fas fa-female"></i>  ${att}
            `;
          }
          break;
        case "capacity_disabled":
          if(att > 0){
            bodyContent = `
            <br><i class="fas fa-wheelchair"></i> ${att}
            `;
          }
          break;
        case "height":
          if(att > 0){
            bodyContent = `
            <br><i class="fas fa-ruler-vertical"></i>  ${att}m
            `;
          }
          break;
        case "notes":
          bodyContent = `
          <br><i class="fas fa-sticky-note"></i>  ${att}
          `;
          break;
        case "website":
          bodyContent = `
          <br><a href=${att} target="_blank" style="color:yellow;">WEBSITE</a>
          `;
          break;
        case "price_per_30_minutes":
        case "price_per_day":
        case "price_per_hour":
        case "price_1st_hour":
        case "price_2nd_hour":
          bodyContent = `
          <br><i class="fas fa-euro-sign"></i> ${att_name.substr(6)}: ${att}
          `;
          break;
        default:
          bodyContent = `
          <br>${att_name}: ${att}
          `;
      }
      innerContainer.innerHTML += bodyContent;
    }
  }
}

/*
// This file helps to display the parking lots as an accordion
window.onload = () => {
  const container = document.getElementById('accordion');
  for (i in basedata) {
    var parklots = basedata[i];
    // iterate over parking lots
    for (j in parklots){
      // skip the column names
      if(j > 0){
        // Create card element
        const card = document.createElement('div');
        card.classList = 'card-body';
        // Construct card content for each parking lot
        const content = `
          <div class="card">
          <div class="card-header" id="heading-${basedata[0][j][1]}">
            <h5 class="mb-0">
              <button class="btn btn-link" data-toggle="collapse" data-target="#collapse-${basedata[0][j][1]}" aria-expanded="true" aria-controls="collapse-${basedata[0][j][1]}">
                      ${basedata[0][j][1]}
                      </button>
            </h5>
          </div>
            <div id="collapse-${basedata[0][j][1]}" class="collapse " aria-labelledby="heading-${basedata[0][j][1]}" data-parent="#accordion">
          </div>
        </div>
        `;
        // Append newyly created card element (one parking lot) to the container
        container.innerHTML += content;

        var parklotID = "collapse-" + basedata[0][j][1]
        var attributes = parklots[j];
        // iterate over attributes of one parking lot and add them as paragraph inside the parking lot card
        for (k in attributes){
          const innerContainer = document.getElementById(parklotID);
          const content2 = `
          <p>${basedata[0][0][k]}: ${basedata[0][j][k]}</p>
          `;
          innerContainer.innerHTML += content2;
        }
      }
    }
  }
}
*/
