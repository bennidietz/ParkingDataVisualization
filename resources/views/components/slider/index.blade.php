<div class="container">
    <div class="row">
        <div class="range">
            <input type="range" min="1" max="7" steps="1" value="1" onInput="inputChange('dayslider','daylabel')" id="dayslider">
        </div>

        <ul class="range-labels" id="daylabel">
            <li class="active selected" onclick="clicked(1,'dayslider','daylabel')">Mon</li>
            <li onclick="clicked(2)">Tue</li>
            <li onclick="clicked(3)">Wed</li>
            <li onclick="clicked(4)">Thu</li>
            <li onclick="clicked(5)">Fri</li>
            <li onclick="clicked(6)">Sat</li>
            <li onclick="clicked(7)">Sun</li>
        </ul>
    </div>
<br>
    <div class="row">
        <div class="range">
            <input type="range" min="1" max="24" steps="1" value="1" onInput="inputChange('hourslider','hourlabel')" id="hourslider">
        </div>

        <ul class="range-labels" id="hourlabel">
            <li class="active selected" onclick="clicked(1,'hourslider','hourlabel')">0</li>
            <li onclick="clicked(2)">1</li>
            <li onclick="clicked(3)">2</li>
            <li onclick="clicked(4)">3</li>
            <li onclick="clicked(5)">4</li>
            <li onclick="clicked(6)">5</li>
            <li onclick="clicked(7)">6</li>
            <li onclick="clicked(8)">7</li>
            <li onclick="clicked(9)">8</li>
            <li onclick="clicked(10)">9</li>
            <li onclick="clicked(11)">10</li>
            <li onclick="clicked(12)">11</li>
            <li onclick="clicked(13)">12</li>
            <li onclick="clicked(14)">13</li>
            <li onclick="clicked(15)">14</li>
            <li onclick="clicked(16)">15</li>
            <li onclick="clicked(17)">16</li>
            <li onclick="clicked(18)">17</li>
            <li onclick="clicked(19)">18</li>
            <li onclick="clicked(20)">19</li>
            <li onclick="clicked(21)">20</li>
            <li onclick="clicked(22)">21</li>
            <li onclick="clicked(23)">22</li>
            <li onclick="clicked(24)">23</li>
        </ul>
    </div>
    <br>
</div>
