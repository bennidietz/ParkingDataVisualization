<?php

namespace App\Services;

use App\Services\CSVAnalysisService;
use App\Services\CSVReadingService;

class ParkingLotService
{
  protected CSVReadingService $CSVReadingService;
  protected CSVAnalysisService $CSVAnalysisService;
  protected int $amountDataFiles;

  public function __construct()
  {
    $this->CSVReadingService = new CSVReadingService();
    $this->CSVAnalysisService = new CSVAnalysisService();
    $this->amountDataFiles = 14; //adjust to needs
  }

  /**
   * Returns all parking lots.
   *
   * @return array
   */
  public function getParkingLots(): array
  {
    $filePath = resource_path('/data/_baseData.csv');

    return $this->CSVReadingService->dataToArray($filePath);
  }

  /**
   * Returns all occupancy data.
   *
   * @return array
   */
  public function getOccupancy(): array
  {
    $files = [];
    $path = resource_path('/data');
    $dir = opendir($path);
    $ignoreFiles = ['.', '..', '_baseData.csv', '_mean.csv'];

    while ($file = readdir($dir)) {
      if (!in_array($file, $ignoreFiles)) {
        $files[] = $file;
      }
    }

    rsort($files);

    if (count($files) > $this->amountDataFiles) {
      $files = array_slice($files, 0, $this->amountDataFiles);
    }

    foreach ($files as $file) {
      $csvArray = $this->CSVReadingService->dataToArray(resource_path('/data/' . $file));
      $csvArray = $this->CSVAnalysisService->sanitizeOccupancyData($csvArray);
      $this->CSVAnalysisService->addDataset($csvArray);
    }

    $meanData = $this->CSVAnalysisService->calculateMeanValues();

    /*$newFile = resource_path('/data/_mean.csv');
    $fp = fopen($newFile, 'w');

      foreach ($meanData as $line) {
        fputcsv($fp, $line);
      }

    fclose($fp);*/

    return $meanData;
  }
}
