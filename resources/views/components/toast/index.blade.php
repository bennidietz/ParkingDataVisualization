<div class="toast__message" v-for="route in routes" @click="routes=[route]">
    <div class="toast__header">@{{ route[1].name }}:</div>
    <table style="width:100%">
  <tr>
  <td style="padding-right:30px; padding-left:30px;"><div class="toast__icon fas fa-parking fa-3x" style="color: green"></div></td>
    <td style="padding-right:60px"><div class="toast__icon fas fa-coins fa-3x" style="color: orange"></div></td>
    <td style="padding-right:40px"><div class="toast__icon fas fa-walking fa-3x" style="color: lightblue"></div></td>
  </tr>
  <tr>
    <td style="color:green; padding-left:30px;">
    <b>@{{ route[2] }}</b>
    </td>
    <td style="color:orange">
    <b>@{{ priceToString(route[1]) }}</b>
    </td>
    <td style="color:lightblue">
    <b>@{{ Math.round(route[0]*15) }} min</b>
    </td>
  </tr>
</td>
<td>
</table>
<table v-if="routes.length == 1">
<hr v-if="routes.length == 1" style="border-top: dotted 4px; padding-bottom: 20px;">     
<tr>
    <td style="padding-left: 30px;"><img height="200px" src="{{ asset('img/google-maps-logo.png') }}" width="300" 
    @click="openNavigation(route[1].lat, route[1].lon)"/></td>
    <td><img :src="qrCodeLinkNavigation(route[1].lat, route[1].lon)"></td>
</tr>
</td>
</table>
    </div>
  </div>
</table>
</div>