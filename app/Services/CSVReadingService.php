<?php

namespace App\Services;

class CSVReadingService {

  function __construct()
  {

  }

  /*
  * This methods reads the csv file and returns an array
  *
  * @return array
  */
  public function dataToArray(string $filePath): array
  {
    if (!file_exists($filePath)) {
      die('Unable to create instance: File ' . $filePath . ' not found.');
    }

    $rawData = file($filePath);
    $headers = [];
    $arrayData = [];

    $i = 0;

    foreach ($rawData as $line) {
      if ($i < 1) {
        $headerData = str_getcsv($line);

        for ($j = 0; $j < count($headerData); $j++) {
          $headers[$j] = $headerData[$j];
        }
      } else {
        $tmpData = array_flip($headers);
        $lineData = str_getcsv($line);

        for ($j = 0; $j < count($tmpData); $j++) {
          $tmpData[$headers[$j]] = $lineData[$j];
        }
        
        $arrayData[] = $tmpData;
      }

      $i++;
    }

    return $arrayData;
  }
}
