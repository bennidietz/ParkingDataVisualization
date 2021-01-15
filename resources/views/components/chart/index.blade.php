<line-chart :chartdata="{labels: ['', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: 'Fee parking places',
            data: [12, 19, 3, 4, 3, 12],
            fill: false,
            backgroundColor: [
              'rgba(255, 165, 0, 1)',
              'rgba(255, 165, 0, 1)',
              'rgba(255, 165, 0, 1)',
              'rgba(255, 165, 0, 1)',
              'rgba(255, 165, 0, 1)',
              'rgba(255, 165, 0, 1)'
            ],
            borderColor: 'rgba(255, 165, 0, 1)',
            borderWidth: 1,
            radius: 4
        }]
}" :options="{}" :selectedparkinglot="1" :hour="hour" />

<!--<script type="text/javascript" src="js/testdata.js"></script>-->
