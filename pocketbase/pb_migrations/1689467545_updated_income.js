migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dixl9v0llb3xsr9")

  // update
  collection.schema.addField(new SchemaField({
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
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dixl9v0llb3xsr9")

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})
