<div class="toast__message" :class="{'h-clickable': routes.length != 1}" v-if="view =='citizen'" v-for="(route,index) in routes" @click="routes=[route]" @mouseover="hoveredRoute = index" @mouseleave="hoveredRoute = null">
    <div class="toast__controls">
        <div class="toast__control-button fas fa-times" @click="routes=[]; hoveredRoute = null" onclick="event.stopPropagation()"  v-if="routes.length == 1"></div>
    </div>
    <div class="toast__header">@{{ route[1].name }}:</div>
    <table style="width:100%">
        <tr>
            <td style="padding-right:30px; padding-left:30px;">
                <div class="toast__icon fas fa-parking fa-3x" style="color: green"></div>
            </td>
            <td style="padding-right:60px">
                <div class="toast__icon fas fa-coins fa-3x" style="color: orange"></div>
            </td>
            <td style="padding-right:40px">
                <div class="toast__icon fas fa-walking fa-3x" style="color: lightblue"></div>
            </td>
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
    </table>
    <div v-if="routes.length == 1" style="height: 0; width: 100%; border-top: 1px dotted #ffffff; padding-bottom: 20px;"></div>
    <table v-if="routes.length == 1">
        <tr>
            <td style="padding-left: 40px; padding-right: 40px;">
                <small>Open link:</small><br>
                <img class="h-clickable toast__clickable" height="200px" src="{{ asset('img/google-maps-logo.png') }}" width="300" @click="openNavigation(route[1].lat, route[1].lon)" />
            </td>
            <td style="padding-right: 40px;">
                <small>Scan Code:</small>
                <img :src="qrCodeLinkNavigation(route[1].lat, route[1].lon)">
            </td>
        </tr>
    </table>
</div>
