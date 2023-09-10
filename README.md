# ToyDbQuery Class Documentation

The `ToyDbQuery` class is a client library for interacting with the [ToyDB](https://github.com/K-logeshwaran/toyBB) . It provides methods for performing various database operations, including listing collections, creating collections, adding records, querying records, finding records by ID, and more.

## Class: ToyDbQuery

### Constructor: ToyDbQuery(url: string)

Creates a new instance of `ToyDbQuery` with the specified ToyDB API URL.

- `url` (string): The URL of the ToyDB API.

### Method: listCollection()

Retrieves a list of all collections in the database.

- Returns: Promise resolving to an array of collection names.

### Method: createColllection(collectionName: string)

Creates a new collection with the specified name.

- `collectionName` (string): The name of the new collection.
- Returns: Promise resolving to a success message.

### Method: addRecord(collectionName: string, data: object)

Adds a new record to the specified collection.

- `collectionName` (string): The name of the collection to add the record to.
- `data` (object): An object containing the data to be added as a new record.
- Returns: Promise resolving to a success message.

### Method: query(options: { collection: string, limit?: number })

Queries records from a collection with optional limiting.

- `options` (object):
  - `collection` (string): The name of the collection to query.
  - `limit` (optional, number): The maximum number of records to retrieve (default: 10).
- Returns: Promise resolving to an array of queried records.

### Method: find(options: { collection: string, id: string })

Finds a record in a collection by its ID.

- `options` (object):
  - `collection` (string): The name of the collection to search.
  - `id` (string): The ID of the record to find.
- Returns: Promise resolving to the found record.

### Method: where(options: { collection: string, field: string, value: any })

Queries records from a collection where a specific field matches a value.

- `options` (object):
  - `collection` (string): The name of the collection to query.
  - `field` (string): The field to match.
  - `value` (any): The value to match against the specified field.
- Returns: Promise resolving to an array of matching records.

### Method: updateRecord(options: { collection: string, field: string, value: any, id: string })

Updates a record in a collection with a new value for a specific field.

- `options` (object):
  - `collection` (string): The name of the collection to update.
  - `field` (string): The field to update.
  - `value` (any): The new value to set for the specified field.
  - `id` (string): The ID of the record to update.
- Returns: Promise resolving to a success message.

### Method: addNewField(options: { collection: string, field: string, value: any, id: string })

Adds a new field with a value to a record in a collection.

- `options` (object):
  - `collection` (string): The name of the collection to update.
  - `field` (string): The new field to add.
  - `value` (any): The value to set for the new field.
  - `id` (string): The ID of the record to update.
- Returns: Promise resolving to a success message.

## Usage
```bash
npm install @k-logeshwaran/toydb-query
```
```javascript
const ToyDbQuery = require('toy-db-query'); // For CommonJS
// or
import ToyDbQuery from 'toy-db-query'; // For ES6 modules

// Create a new instance with the ToyDB API URL
const toyDb = new ToyDbQuery('https://example.com/toydb-api');

// List all collections
toyDb.listCollection()
  .then((collections) => {
    console.log('Collections:', collections);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

// Create a new collection
toyDb.createCollection('myNewCollection')
  .then((message) => {
    console.log('Collection created:', message);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

// Add a new record to a collection
const data = { name: 'John', age: 30 };
toyDb.addRecord('myCollection', data)
  .then((message) => {
    console.log('Record added:', message);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

// Query records from a collection
const queryOptions = { collection: 'myCollection', limit: 5 };
toyDb.query(queryOptions)
  .then((records) => {
    console.log('Queried records:', records);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

// Find a record by ID
const findOptions = { collection: 'myCollection', id: '123456' };
toyDb.find(findOptions)
  .then((record) => {
    console.log('Found record:', record);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

// Query records where a specific field matches a value
const whereOptions = { collection: 'myCollection', field: 'age', value: 30 };
toyDb.where(whereOptions)
  .then((matchingRecords) => {
    console.log('Matching records:', matchingRecords);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

// Update a record in a collection
const updateOptions = { collection: 'myCollection', field: 'name', value: 'UpdatedName', id: '123456' };
toyDb.updateRecord(updateOptions)
  .then((message) => {
    console.log('Record updated:', message);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

// Add a new field to a record in a collection
const addFieldOptions = { collection: 'myCollection', field: 'newField', value: 'NewFieldValue', id: '123456' };
toyDb.addNewField(addFieldOptions)
  .then((message) => {
    console.log('New field added:', message);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
```
## License

This project is licensed under the ISC License. See the LICENSE file for details.

## Author

[Logeshwaran K](https://github.com/K-logeshwaran)

## Repository

[GitHub Repository](https://github.com/K-logeshwaran/toydb-query)

## Bugs and Issues

Please report bugs and issues on the [GitHub Issues](https://github.com/K-logeshwaran/toydb-query/issues) page.
