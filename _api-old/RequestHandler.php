<?php

class RequestHandler {
  public array $config;

  function __construct()
  {
    $this->config = [
      'parameters' => [
        [
          'name' => 'type',
          'arguments' => [
            'basedata',
            'occupancy',
          ],
          'required' => true,
        ],
        [
          'name' => 'format',
          'arguments' => [
            'csv',
            'json',
          ],
          'required' => false,
        ],
      ],
    ];
  }

  /* Validates the incoming request
  *
  * @param array $request
  * @return array
  */
  public function validate(array $request): array
  {
    $response = [];

    foreach ($this->config['parameters'] as $parameter) {
      if ($parameter['required'] && !isset($request[$parameter['name']])) {
        $response[] = ['message' => 'Missing parameter: ' . $parameter['name']];

        continue;
      }

      if (isset($request[$parameter['name']]) && !in_array($request[$parameter['name']], $parameter['arguments'])) {
        $response[] = ['message' => 'Invalid argument for parameter: ' . $parameter['name'] . '. Valid arguments are: ' . implode(', ', $parameter['arguments'])];
      }
    }

    return $response;
  }

  /* Checks if the request is valid
  *
  * @param array $request
  * @return bool
  */
  public function isValid(array $request): bool
  {
    return count($this->validate($request)) < 1;
  }
}
