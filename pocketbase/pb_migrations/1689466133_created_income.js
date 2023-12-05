migrate((db) => {
  const collection = new Collection({
    "id": "dixl9v0llb3xsr9",
    "created": "2023-07-16 00:08:53.541Z",
    "updated": "2023-07-16 00:08:53.541Z",
    "name": "income",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "osjg3jvp",
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
        "id": "rtw81bgl",
        "name": "description",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "pdxwlsic",
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
        "id": "g0mtx8u7",
        "name": "category_id",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "vem1oonpwdcwn6w",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": [
            "label",
            "id"
          ]
        }
      },
      {
        "system": false,
        "id": "qenb8wba",
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
            "avatar",
            "username",
            "name"
          ]
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("dixl9v0llb3xsr9");

  return dao.deleteCollection(collection);
})
