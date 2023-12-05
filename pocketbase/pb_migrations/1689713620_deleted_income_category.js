migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("vem1oonpwdcwn6w");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "vem1oonpwdcwn6w",
    "created": "2023-07-16 00:03:18.243Z",
    "updated": "2023-07-16 00:03:54.012Z",
    "name": "income_category",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "sn1ydcgo",
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
})
