<?php

class CSVReader {
  public String $basePath;
  public String $fileName;

  function __construct(String $fileName)
  {
    $this->basePath = __DIR__ . '/data/';

    if (!file_exists($this->basePath . $fileName)) {
      die('Unable to create instance: File ' . $fileName . ' not found.');
    }

    $this->fileName = $fileName;
  }

  /* Returns the whole file path of the current file
  *
  * @return String
  */
  public function filePath(): String
  {
    return $this->basePath . $this->fileName;
  }

  /*
  * This methods reads the csv file and returns an array
  *
  * @return array
  */
  public function dataToArray(): array
  {
    $rawData = file($this->filePath());
    $arrayData = [];

    foreach ($rawData as $line) {
      $arrayData[] = str_getcsv($line);
    }

    return $arrayData;
  }
}
