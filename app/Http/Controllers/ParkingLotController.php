<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ParkingLotController extends Controller
{
  /**
   * Create a new controller instance.
   *
   * @return void
   */
  public function __construct()
  {

  }

  /**
   * Returns all parking lots.
   *
   * @return JSON
   */
  public function showAll(): JsonResponse
  {
    $jsonData = [
      [
        'id' => 1,
        'name' => 'PH Theater',
        'capacity' => 793,
        'capacity_electric' => 0,
        'capacity_women' => 46,
        'parent_child_parking_available' => true,
        'disabled_available' => true,
        'capicity_disabled' => 10,
        'opening_times_mo-th' => '07:00 - 24:00',
        'opening_times_fr' => '07:00 - 24:00',
        'opening_times_sa' => '09:00 - 24:00',
        'opening_times_su' => '09:00 - 24:00',
        'height' => 2,
        'price_per_30_minutes' => null,
        'price_until_30_minutes' => null,
        'price_1st_hour' => 2,
        'price_2nd_hour' => 2,
        'price_per_hour' => 1.5,
        'price_per_day' => 15,
        'night_price_per_hour' => 1,
        'night_price_max' => 5,
        'su_price_30_minutes' => null,
        'su_price_day' => null,
        'website' => 'https://www.wbi-muenster.de/parken-in-muenster/uebersicht.php',
        'lat' => 51.965812,
        'lon' => 7.626812,
        'address' => 'Tibusstraße 18, 48143 Münster, Germany',
        'notes' => null,
      ],
    ];

    return response()->json($jsonData);
  }

  /**
   * Returns a parking lot by ID.
   *
   * @param int $id
   *
   * @return JSON
   */
  public function showOne(int $id)
  {

  }
}
