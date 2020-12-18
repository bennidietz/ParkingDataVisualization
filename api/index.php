<?php

header('Content-type: application/json');

require_once('RequestHandler.php');
require_once('CSVReader.php');
require_once('CSVAnalyzer.php');

$requestHandler = new RequestHandler();
$request = $_GET;
$response = [];

  if (!$requestHandler->isValid($request)) {
    $response = ['status' => 400, $requestHandler->validate($request)];
  } else {
    if ($request['type'] == 'basedata') {
      // read base data csv from data directory

      $baseDataFile = '_baseData.csv';
      $csvReader = new CSVReader($baseDataFile);
      $csvArray = $csvReader->dataToArray();

      $response = ['status' => 200, $csvArray];
    } else if ($request['type'] == 'occupancy') {
      // read latest files from data directory

      $amountFiles = 14; // adjust to your needs
      $files = [];
      $path = __DIR__ . '/data';
      $dir = opendir($path);

        while ($file = readdir($dir)) {
          if ($file != '.' && $file != '..') {
            $files[] = $file;
          }
        }

      //sort by name DESC

      rsort($files);

        if (count($files) > $amountFiles) {
          $files = array_slice($files, 0, $amountFiles);
        }

      // read files

      $csvAnalyzer = new CSVAnalyzer();

        foreach ($files as $file) {
          $csvReader = new CSVReader($file);
          $csvArray = $csvReader->dataToArray();
          $csvAnalyzer->addDataset($csvArray);
        }

      // analyze files

      $meanData = $csvAnalyzer->calculateMeanValues();

      if (isset($request['format']) && $request['format'] == 'csv') {
        // write mean values to new csv

        $newFile = __DIR__ . '/data/_mean.csv';
        $fp = fopen($newFile, 'w');

          foreach ($meanData as $line) {
            fputcsv($fp, $line);
          }

        fclose($fp);

        $response = ['status' => 200, 'Data written to CSV file.'];
      } else {
        $response = ['status' => 200, $meanData];
      }
    }
  }

echo json_encode($response);
