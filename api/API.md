# API usage

The API can be accessed by calling `/api?foo=bar` via `GET`.

Here are the supported parameters with their arguments:

```
type: basedata, occupancy
format (only applicable when accessing occupancy): json (default), csv (writes to CSV file)
```

Here is a working example:

```
/api?type=occupancy&format=csv
```

# Please note

As of now, the JSON objects are just displaying the raw data of the CSV files. This means the keys are not assigned yet and the attributes can only be accessed via index. The order of the rows and columns is also not correct yet.
