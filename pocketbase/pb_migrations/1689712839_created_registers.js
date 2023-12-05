migrate((db) => {
  const collection = new Collection({
    "id": "gsrb4gyyzeuikg0",
    "created": "2023-07-18 20:40:39.380Z",
    "updated": "2023-07-18 20:40:39.380Z",
    "name": "registers",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "vjkiqvla",
        "name": "date",
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
        "id": "pnreiyxm",
        "name": "description",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 3,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "xsdoognu",
        "name": "type",
        "type": "select",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "income",
            "expense"
          ]
        }
      },
      {
        "system": false,
        "id": "arstpdio",
        "name": "amount",
        "type": "number",
        "required": true,
        "unique": false,
        "options": {
          "min": 0.01,
          "max": null
        }
      },
      {
        "system": false,
        "id": "ti8bvwze",
        "name": "user_id",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "uxnicxgb",
        "name": "category",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "rps6tdxfk9yizet",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "5c3rpnty",
        "name": "receipt_url",
        "type": "file",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "maxSize": 5242880,
          "mimeTypes": [],
          "thumbs": [],
          "protected": false
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
  const collection = dao.findCollectionByNameOrId("gsrb4gyyzeuikg0");

  return dao.deleteCollection(collection);
})
