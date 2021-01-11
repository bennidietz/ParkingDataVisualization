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
