<?php

// import classes to read and analyze data

require_once('CSVReader.php');
require_once('CSVAnalyzer.php');

// read latest files from data directory

$amountFiles = 14;
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

// write mean values to new csv

$newFile = __DIR__ . '/data/_mean.csv';
$fp = fopen($newFile, 'w');

  foreach ($meanData as $line) {
    fputcsv($fp, $line);
  }

fclose($fp);
