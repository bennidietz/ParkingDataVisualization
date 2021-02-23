<p align="center"><img src="https://gins.christian-terbeck.de/img/logo_transparent.png" /></p>

### IntelliPark

Geoinformation in Society project at the ifgi in Münster: Visualization of parking data in Münster

### Using the app ([-> IntelliPark](https://gins.christian-terbeck.de/))

##### How to use this app
We intend to visualize data of parking lots in Münster.
Two user groups can benefit from our application:
1) **Car drivers** who want to find the best parking solution
2) **Analysts** can look at occupancy of parking lots - this may be helpful for city planners or simply citienzens that are interested in parking statistics

The car driver or **Citizen View** is the default view and looks like this:

<p align="center"><img src="https://github.com/bennidietz/ParkingDataVisualization/blob/main/public/img/screenshots/basic_citizen_view.png?raw=true" /></p>

We have divided our application into four components. The main component is the map that visualizes the location of the parking lots in Münster. On a side bar we have a table view with all the parking lots that can be filtered and further inspected regarding semantic information. Each of the components are intended to interact with each other, so that the user's interaction on one component also have an effect on the others. With a temporal slider the user can change the time and weekday where the visualized data should be related to.
The app should also work on a mobile device so that a car driver can plan their trip according to their current position and desired destination (Please do NOT use the app while driving!).

Furthermore, in the Citizen View, the user can select a destination either by typing an address in the autocomplete geocoder textview or selecting a place on the map by a click on it. When clicking on the navigation option then, the three most appropriate parking lots are shown as routes for that destination:
<p align="center"><img src="https://github.com/bennidietz/ParkingDataVisualization/blob/main/public/img/screenshots/route1.png?raw=true" /></p>

When clicking on one of these routes, the user can either directly click on the Google Maps icon to start the navigation to that destination on the device she is currently working on. Beside that, a QR-Code can be scanned so that the navigation can be started on a smartphone - which may be more intuitive in most cases:
<p align="center"><img src="https://github.com/bennidietz/ParkingDataVisualization/blob/main/public/img/screenshots/route2.png?raw=true" /></p>

The **Analyst View** looks like this:
<p align="center"><img src="https://github.com/bennidietz/ParkingDataVisualization/blob/main/public/img/screenshots/basic_analyst%20view.png?raw=true" /></p>

##### Provide us with feeback
If you would like to contribute to our study project and the app, we are looking forward to getting feedback from you. You can give feeback [here](https://docs.google.com/forms/d/e/1FAIpQLSdoKJBwL_Rw2-jPqeUjufPlhpxg7leSQ8wx81N6hnmSbeLCGw/viewform). Thanks a lot in advance :) 

### Developing the app

##### Set up the programming environment 
In order to *debug* the app and develop it on your own machine, php and npm are required.
Once installed, you need to execute the following commands in the project directory:
\
`composer install`\
`npm install`\
\
And once installed the necessary packages, starting php locally is done by this command:
\
`php artisan serve`

When updating laravel scripts:
\
`npm run watch`
