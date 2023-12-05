migrate((db) => {
  const collection = new Collection({
    "id": "rps6tdxfk9yizet",
    "created": "2023-07-18 20:38:30.126Z",
    "updated": "2023-07-18 20:38:30.126Z",
    "name": "register_category",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "tzljz3pq",
        "name": "label",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 3,
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
  const collection = dao.findCollectionByNameOrId("rps6tdxfk9yizet");

  return dao.deleteCollection(collection);
})
