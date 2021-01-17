<?php

namespace App\Services;

class CSVAnalysisService {
  public array $datasets;

  function __construct()
  {
    $this->datasets = [];
  }

  /** Adds a dataset
  *
  * @param array $dataset
  * @return void
  */
  public function addDataset(array $dataset): void
  {
    $this->datasets[] = $dataset;
  }

  /** Truncates the dataset array
  *
  * @return void
  */
  public function truncateDataset(): void
  {
    $this->datasets = [];
  }

  /** Returns the amount of datasets
  *
  * @return int
  */
  public function amountDatasets(): int
  {
    return count($this->datasets);
  }

  /** Cleans the given data and creates more struturized pattern.
  *
  * @param array $dataset
  */
  public function sanitizeOccupancyData(array $dataset): array
  {
    $sanitizedDataset = [];

    for ($i = 0; $i < count($dataset); $i++) {
      $tmpDataset = $dataset[$i];

      $date = new \DateTime($tmpDataset['Datum und Uhrzeit']);
      unset($tmpDataset['Datum und Uhrzeit']);
      $tmpDataset = array_map('intval', $tmpDataset);

      // $tmpDataset['date'] = $date->format('Y-m-d');
      $tmpDataset['day'] = $date->format('l');
      $tmpDataset['hour'] = (int) $date->format('G');

      $sanitizedDataset[] = $tmpDataset;
    }

    $groupedSanitizedDataset = [];
    $groupSize = 1;
    $ignoreColumns = ['date', 'day', 'hour'];

    for ($i = 0; $i < count($sanitizedDataset); $i++) {
      if ($i < 1) {
        $groupedSanitizedDataset[] = $sanitizedDataset[$i];
      } else {
        if ($groupedSanitizedDataset[count($groupedSanitizedDataset) - 1]['hour'] === $sanitizedDataset[$i]['hour']) {
          foreach ($sanitizedDataset[$i] as $key => $value) {
            if (!in_array($key, $ignoreColumns)) {
              $groupedSanitizedDataset[count($groupedSanitizedDataset) - 1][$key] += $sanitizedDataset[$i][$key];
            }
          }

          $groupSize++;
        } else {
          if ($groupSize > 1) {
            foreach ($groupedSanitizedDataset[count($groupedSanitizedDataset) - 1] as $key => $value) {
              if (!in_array($key, $ignoreColumns)) {
                $groupedSanitizedDataset[count($groupedSanitizedDataset) - 1][$key] = (int) ceil($groupedSanitizedDataset[count($groupedSanitizedDataset) - 1][$key] / $groupSize);
              }
            }
          }

          $groupedSanitizedDataset[] = $sanitizedDataset[$i];
          $groupSize = 1;
        }
      }
    }

    if ($groupSize > 1) {
      foreach ($groupedSanitizedDataset[count($groupedSanitizedDataset) - 1] as $key => $value) {
        if (!in_array($key, $ignoreColumns)) {
          $groupedSanitizedDataset[count($groupedSanitizedDataset) - 1][$key] = (int) ceil($groupedSanitizedDataset[count($groupedSanitizedDataset) - 1][$key] / $groupSize);
        }
      }
    }

    return $groupedSanitizedDataset;
  }

  /** Calculates the mean values of the datasets
  *
  * @return array
  */
  public function calculateMeanValues(): array
  {
    $amountDatasets = $this->amountDatasets();
    $dataMean = [];
    $groupSize = [
      'Monday' => 1,
      'Tuesday' => 1,
      'Wednesday' => 1,
      'Thursday' => 1,
      'Friday' => 1,
      'Saturday' => 1,
      'Sunday' => 1,
    ];
    $ignoreColumns = ['date', 'day', 'hour'];

    for ($i = 0; $i < $amountDatasets; $i++) {
      $curDataset = $this->datasets[$i];

      if ($i < 1) {
        $dataMean[] = $curDataset;
      } else {
        $existingIndex = 0;

        for ($j = 0; $j < count($dataMean); $j++) {
          if ($dataMean[$j][0]['day'] == $curDataset[0]['day']) {
            $existingIndex = $j;
            $groupSize[$dataMean[$j][0]['day']]++;

            break;
          }
        }

        if ($existingIndex > 0) {
          for ($j = 0; $j < count($dataMean[$existingIndex]); $j++) {
            foreach ($dataMean[$existingIndex][$j] as $key => $value) {
              if (!in_array($key, $ignoreColumns)) {
                $dataMean[$existingIndex][$j][$key] += $curDataset[$j][$key];
                $dataMean[$existingIndex][$j][$key] = (int) ceil($dataMean[$existingIndex][$j][$key] / $groupSize[$dataMean[$existingIndex][$j]['day']]);
              }
            }
          }
        } else {
          $dataMean[] = $curDataset;
        }
      }
    }

    $dataMeanOrdered = [
      'Monday' => [],
      'Tuesday' => [],
      'Wednesday' => [],
      'Thursday' => [],
      'Friday' => [],
      'Saturday' => [],
      'Sunday' => [],
    ];

    foreach ($dataMeanOrdered as $key => $value) {
      for ($j = 0; $j < count($dataMean); $j++) {
        if ($dataMean[$j][0]['day'] == $key) {
          $dataMeanOrdered[$key] = $dataMean[$j];
        }
      }
    }

    return $dataMeanOrdered;
  }
}
