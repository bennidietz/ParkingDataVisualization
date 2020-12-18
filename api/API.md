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
