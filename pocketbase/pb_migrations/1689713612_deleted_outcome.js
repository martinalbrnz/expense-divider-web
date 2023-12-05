migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("yibf692xigywe0c");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "yibf692xigywe0c",
    "created": "2023-07-16 00:07:12.721Z",
    "updated": "2023-07-16 00:07:12.721Z",
    "name": "outcome",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "3fnpdlhq",
        "name": "field",
        "type": "date",
        "required": true,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      },
      {
        "system": false,
        "id": "yuzwiw8o",
        "name": "description",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 2,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "xtiphzvv",
        "name": "amount",
        "type": "number",
        "required": true,
        "unique": false,
        "options": {
          "min": 0,
          "max": null
        }
      },
      {
        "system": false,
        "id": "hvxx6jam",
        "name": "category_id",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "jbesc4ivbfzvgo1",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": [
            "id",
            "label"
          ]
        }
      },
      {
        "system": false,
        "id": "z32ajf6f",
        "name": "user_id",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": [
            "id",
            "name",
            "avatar",
            "username"
          ]
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
