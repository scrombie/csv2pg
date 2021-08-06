# CSV2PG
A Simple app to help migrate data from a csv to a postgres database.


### CSV Upload
Upload a csv and migrate its content

`POST /v1/data-source`

Request Type: `multipart/form-data`
Required Data:


| Data          | Description         | Format |
| ------------- | ------------------- | -------- |
| `data-source` | csv file            | `^[a-z0-9A-Z]+(?:_[a-z0-9A-Z]+)*$`         |
|  `schema`     | Database table schema|   JSON       |
| `source_name` | Database table Name | `^[a-z0-9A-Z]+(?:_[a-z0-9A-Z]+)*$`     |


### Schema
In order to properly parse and copy data from the csv to the appropriate columns in the database, a schema is required when making uploads.
The schema follows the format below

```
[
    {"key":"header_name","type":"data_type"},
    {"key":"header_name","type":"data_type"},
    ...
]
```

Available Types are: 


| Type       | Column Data Type |
| ---------- | ---------------- |
| `string`   | VARCHAR(50)      |
| `longtext` | TEXT             |
| `integer`  | INTEGER          |
| `float`    | DECIMAL          |
| `money`    | MONEY            |
| `date`     | TIMESTAMP        |
| `bool`     | BOOLEAN          |


## TODO:

- [ ] Upload UI: Simple User Interface for uploads
- [ ] Schema Validator Endpoint
- [ ] [Update] Allow appending data (default is truncate and insert)
- [ ] [Optimization] Batched Copy
- [ ] [Update] Allow upload using url
- [ ] [Update] Saving and downloading uploaded csv files (Currently deletes after upload)



### License

MIT

