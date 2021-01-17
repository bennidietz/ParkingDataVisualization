<?php

namespace App\Services;

use App\Services\CSVAnalysisService;
use App\Services\CSVReadingService;

class ParkingLotService
{
  protected CSVReadingService $CSVReadingService;
  protected CSVAnalysisService $CSVAnalysisService;

  public function __construct()
  {
    $this->CSVReadingService = new CSVReadingService();
    $this->CSVAnalysisService = new CSVAnalysisService();
  }

  public function getParkingLots(): array
  {
    $filePath = resource_path('/data/_baseData.csv');

    return $parkingLots = $this->CSVReadingService->dataToArray($filePath);
  }
}
