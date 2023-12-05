migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vem1oonpwdcwn6w")

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vem1oonpwdcwn6w")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sn1ydcgo",
    "name": "label",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
