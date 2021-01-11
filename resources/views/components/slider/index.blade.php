<div class="container">
    <div class="row">
        <div class="range">
            <input type="range" min="1" max="7" steps="1" value="1" onInput="inputChange('dayslider','daylabel')" id="dayslider">
        </div>

        <ul class="range-labels" id="daylabel">
            <li class="active selected" onclick="clicked(1,'dayslider','daylabel')">Mon</li>
            <li onclick="clicked(2,'dayslider','daylabel')">Tue</li>
            <li onclick="clicked(3,'dayslider','daylabel')">Wed</li>
            <li onclick="clicked(4,'dayslider','daylabel')">Thu</li>
            <li onclick="clicked(5,'dayslider','daylabel')">Fri</li>
            <li onclick="clicked(6,'dayslider','daylabel')">Sat</li>
            <li onclick="clicked(7,'dayslider','daylabel')">Sun</li>
        </ul>
    </div>
    <br>
    <div class="row">
        <div class="range">
            <input type="range" min="1" max="24" steps="1" value="1" onInput="inputChange('hourslider','hourlabel')" id="hourslider">
        </div>

        <ul class="range-labels" id="hourlabel">
            <li class="active selected" onclick="clicked(1,'hourslider','hourlabel')">0</li>
            <li onclick="clicked(2,'hourslider','hourlabel')">1</li>
            <li onclick="clicked(3,'hourslider','hourlabel')">2</li>
            <li onclick="clicked(4,'hourslider','hourlabel')">3</li>
            <li onclick="clicked(5,'hourslider','hourlabel')">4</li>
            <li onclick="clicked(6,'hourslider','hourlabel')">5</li>
            <li onclick="clicked(7,'hourslider','hourlabel')">6</li>
            <li onclick="clicked(8,'hourslider','hourlabel')">7</li>
            <li onclick="clicked(9,'hourslider','hourlabel')">8</li>
            <li onclick="clicked(10,'hourslider','hourlabel')">9</li>
            <li onclick="clicked(11,'hourslider','hourlabel')">10</li>
            <li onclick="clicked(12,'hourslider','hourlabel')">11</li>
            <li onclick="clicked(13,'hourslider','hourlabel')">12</li>
            <li onclick="clicked(14,'hourslider','hourlabel')">13</li>
            <li onclick="clicked(15,'hourslider','hourlabel')">14</li>
            <li onclick="clicked(16,'hourslider','hourlabel')">15</li>
            <li onclick="clicked(17,'hourslider','hourlabel')">16</li>
            <li onclick="clicked(18,'hourslider','hourlabel')">17</li>
            <li onclick="clicked(19,'hourslider','hourlabel')">18</li>
            <li onclick="clicked(20,'hourslider','hourlabel')">19</li>
            <li onclick="clicked(21,'hourslider','hourlabel')">20</li>
            <li onclick="clicked(22,'hourslider','hourlabel')">21</li>
            <li onclick="clicked(23,'hourslider','hourlabel')">22</li>
            <li onclick="clicked(24,'hourslider','hourlabel')">23</li>
        </ul>
    </div>
    <br>
</div>
