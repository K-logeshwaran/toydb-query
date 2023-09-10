/**
 * Represents a client for interacting with the ToyDB API.
 * @class
 */
class ToyDbQuery {
  /**
   * Create a new instance of ToyDbQuery with the specified API URL.
   * @constructor
   * @param {string} url - The URL of the ToyDB API.
   */
  constructor(url) {
    this.url = new URL(url);
    this.urlString = this.url.toJSON();
  }

  /**
   * Retrieves a list of all collections in the database.
   * @method
   * @returns {Promise} A promise that resolves to an array of collection names.
   */

  listCollection() {
    let u = this.urlString;
    let p = new Promise(async (resolve, reject) => {
      try {
        let res = await fetch(u + "/collection");

        let json = await res.json();
        if (json === null) {
          resolve("No collection Created yet");
        } else {
          resolve(json);
        }
      } catch (err) {
        reject(err);
      }
    });
    return p;
  }

  /**
   * Creates a new collection with the specified name.
   * @method
   * @param {string} collectionName - The name of the new collection.
   * @returns {Promise} A promise that resolves to a success message.
   */

  createColllection(collectionName) {
    let u = this.urlString + "collection?";
    let params = new URLSearchParams();
    params.append("collection", collectionName);
    const URL = u + params.toString();
    let p = new Promise(async (resolve, reject) => {
      console.log(u + params.toString());
      try {
        let res = await fetch(URL, {
          method: "POST",
        });
        let txt = await res.text();

        resolve(txt);
      } catch (err) {
        reject(err);
      }
    });
    return p;
  }

  /**
   * Adds a new record to the specified collection.
   * @method
   * @param {string} collectionName - The name of the collection to add the record to.
   * @param {object} data - An object containing the data to be added as a new record.
   * @returns {Promise} A promise that resolves to a success message.
   */

  addRecord(collectionName, data) {
    let u = this.urlString + "records?";
    let params = new URLSearchParams();
    params.append("collection", collectionName);
    const URL = u + params.toString();
    let p = new Promise(async (resolve, reject) => {
      console.log(u + params.toString());

      try {
        let res = await fetch(URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        let txt = await res.text();

        resolve(txt);
      } catch (err) {
        reject(err);
      }
    });
    return p;
  }

  /**
   * Queries records from a collection with optional limiting.
   * @method
   * @param {Object} options - The query options.
   * @param {string} options.collection - The name of the collection to query.
   * @param {number} [options.limit=10] - The maximum number of records to retrieve (default: 10).
   * @returns {Promise} A promise that resolves to an array of queried records.
   */

  query({ collection, limit }) {
    if (!collection) {
      let p = new Promise((resolve, reject) => {
        reject(Error("Collection must be specified"));
      });
      return p;
    }
    if (!limit) limit = 10;
    let u = this.urlString + "records?";
    let params = new URLSearchParams();
    params.append("collection", collection);
    params.append("limit", limit);
    const URL = u + params.toString();
    let p = new Promise(async (resolve, reject) => {
      console.log(u + params.toString());

      try {
        let res = await fetch(URL);
        let txt = await res.json();
        resolve(txt);
      } catch (err) {
        reject(err);
      }
    });
    return p;
  }

  /**
   * Finds a record in a collection by its ID.
   * @method
   * @param {Object} options - The find options.
   * @param {string} options.collection - The name of the collection to search.
   * @param {string} options.id - The ID of the record to find.
   * @returns {Promise} A promise that resolves to the found record.
   */

  find({ collection, id }) {
    if (!collection || !id) {
      let p = new Promise((resolve, reject) => {
        reject(Error("Collection and ID must be specified"));
      });
      return p;
    }
    let u = this.urlString + "findone?";
    let params = new URLSearchParams();
    params.append("collection", collection);
    params.append("id", id);
    const URL = u + params.toString();
    let p = new Promise(async (resolve, reject) => {
      console.log(u + params.toString());

      try {
        let res = await fetch(URL);
        if (res.status != 200) {
          reject(await res.text());
          return;
        }
        let txt = await res.json();
        resolve(txt);
      } catch (err) {
        reject(err);
      }
    });
    return p;
  }

  /**
   * Queries records from a collection where a specific field matches a value.
   * @method
   * @param {Object} options - The query options.
   * @param {string} options.collection - The name of the collection to query.
   * @param {string} options.field - The field to match.
   * @param {any} options.value - The value to match against the specified field.
   * @returns {Promise} A promise that resolves to an array of matching records.
   */
  where({ field, value, collection }) {
    if (!collection || !field || !value) {
      let p = new Promise((resolve, reject) => {
        reject(Error("Collection , ID, field,value must be specified"));
      });
      return p;
    }
    let u = this.urlString + "where?";
    let params = new URLSearchParams();
    params.append("collection", collection);
    params.append("value", value);
    params.append("field", field);
    const URL = u + params.toString();
    let p = new Promise(async (resolve, reject) => {
      console.log(u + params.toString());

      try {
        let res = await fetch(URL);
        if (res.status != 200) {
          reject(await res.text());
          return;
        }
        let txt = await res.json();
        resolve(txt);
      } catch (err) {
        reject(err);
      }
    });
    return p;
  }

  /**
   * Updates a record in a collection with a new value for a specific field.
   * @method
   * @param {Object} options - The update options.
   * @param {string} options.collection - The name of the collection to update.
   * @param {string} options.field - The field to update.
   * @param {any} options.value - The new value to set for the specified field.
   * @param {string} options.id - The ID of the record to update.
   * @returns {Promise} A promise that resolves to a success message.
   */
  updateRecord({ field, value, collection, id }) {
    if (!collection || !field || !value || !id) {
      let p = new Promise((resolve, reject) => {
        reject(Error("Collection , ID, field,value must be specified"));
      });
      return p;
    }
    let u = this.urlString + "update?";
    let params = new URLSearchParams();
    params.append("collection", collection);
    params.append("value", value);
    params.append("field", field);
    params.append("id", id);

    const URL = u + params.toString();
    let p = new Promise(async (resolve, reject) => {
      console.log(u + params.toString());

      try {
        let res = await fetch(URL, { method: "PUT" });
        if (res.status != 200) {
          reject(await res.text());
          return;
        }
        let txt = await res.json();
        resolve(txt);
      } catch (err) {
        reject(err);
      }
    });
    return p;
  }

  /**
   * Adds a new field with a value to a record in a collection.
   * @method
   * @param {Object} options - The add field options.
   * @param {string} options.collection - The name of the collection to update.
   * @param {string} options.field - The new field to add.
   * @param {any} options.value - The value to set for the new field.
   * @param {string} options.id - The ID of the record to update.
   * @returns {Promise} A promise that resolves to a success message.
   */
  addNewField({ field, value, collection, id }) {
    if (!collection || !field || !value || !id) {
      let p = new Promise((resolve, reject) => {
        reject(Error("Collection , ID, field,value must be specified"));
      });
      return p;
    }
    let u = this.urlString + "addField?";
    let params = new URLSearchParams();
    params.append("collection", collection);
    params.append("value", value);
    params.append("field", field);
    params.append("id", id);

    const URL = u + params.toString();
    let p = new Promise(async (resolve, reject) => {
      console.log(u + params.toString());

      try {
        let res = await fetch(URL, { method: "PUT" });
        if (res.status != 200) {
          reject(await res.text());
          return;
        }
        let txt = await res.json();
        resolve(txt);
      } catch (err) {
        reject(err);
      }
    });
    return p;
  }
}

export default ToyDbQuery;
