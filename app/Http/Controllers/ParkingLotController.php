<?php

namespace App\Http\Controllers;

use App\Services\ParkingLotService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ParkingLotController extends Controller
{
  protected ParkingLotService $parkingLotService;

  /**
   * Create a new controller instance.
   *
   * @return void
   */
  public function __construct()
  {
    $this->parkingLotService = new ParkingLotService();
  }

  /**
   * Returns all parking lots.
   *
   * @return array
   */
  public function showAll(): array
  {
    return $this->parkingLotService->getParkingLots();
  }
}
