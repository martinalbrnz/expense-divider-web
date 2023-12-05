migrate((db) => {
  const collection = new Collection({
    "id": "jbesc4ivbfzvgo1",
    "created": "2023-07-16 00:02:50.434Z",
    "updated": "2023-07-16 00:02:50.434Z",
    "name": "outcome_category",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "gsynpokv",
        "name": "label",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 2,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("jbesc4ivbfzvgo1");

  return dao.deleteCollection(collection);
})
