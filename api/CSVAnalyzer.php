<?php

class CSVAnalyzer {
  public array $datasets;

  function __construct()
  {
    $this->datasets = [];
  }

  /* Adds a dataset
  *
  * @param array $dataset
  * @return void
  */
  public function addDataset(array $dataset): void
  {
    $this->datasets[] = $dataset;
  }

  /* Returns the amount of datasets
  *
  * @return int
  */
  public function amountDatasets(): int
  {
    return count($this->datasets);
  }

  /* Calculates the mean values of the datasets
  *
  * @return array
  */
  public function calculateMeanValues(): array
  {
    $amountDatasets = $this->amountDatasets();
    $dataMean = [];

    for ($i = 0; $i < count($this->datasets[0]); $i++) {
      $tmpData = [];

      for ($j = 0; $j < count($this->datasets[0][$i]); $j++) {
        $tmpData[] = 0;
      }

      $dataMean[] = $tmpData;
    }

    for ($i = 0; $i < $amountDatasets; $i++) {
      for ($j = 0; $j < count($this->datasets[$i]); $j++) {
        for ($k = 0; $k < count($this->datasets[$i][$j]); $k++) {
          if (($i < 1 && $j < 1) || $k < 1) {
            $dataMean[$j][$k] = $this->datasets[$i][$j][$k];
          } else {
            if ($j > 0 && $k > 0) {
              $dataMean[$j][$k] += (int) $this->datasets[$i][$j][$k];
            }
          }
        }
      }
    }

    for ($i = 1; $i < count($dataMean); $i++) {
      for ($j = 1; $j < count($dataMean[$i]); $j++) {
        $dataMean[$i][$j] = ceil($dataMean[$i][$j] / $amountDatasets);
      }
    }

    return $dataMean;
  }
}
