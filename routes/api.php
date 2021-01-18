<?php

use App\Http\Controllers\ParkingLotController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/parking-lot', [ParkingLotController::class, 'showAll']);
Route::get('/occupancy', [ParkingLotController::class, 'showOccupancy']);
