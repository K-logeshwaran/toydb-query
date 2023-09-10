class ToyDbQuery {
  constructor(url) {
    this.url = new URL(url);
    this.urlString = this.url.toJSON();
  }

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
