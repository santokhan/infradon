<template>
  <div>
    <button type="button" class="primary" @click="populateDatabase('product_collection', 5)">
      Populate
    </button>
  </div>
</template>

<script setup lang="ts">
import PouchDB from 'pouchdb'

async function populateDatabase(dbName: string, numDocuments: number) {
  // Initialize the PouchDB instance
  const db = new PouchDB(dbName)

  console.log(`Populating database "${dbName}" with ${numDocuments} documents...`)

  // Generate an array of documents
  const docs = Array.from({ length: numDocuments }, (_, index) => ({
    _id: `doc_${index + 1}`, // Unique document ID
    image: 'https://placehold.co/150',
    name: `Document Title ${index + 1}`,
    content: `This is a description for document ${index + 1}.`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }))

  try {
    // Bulk insert the documents
    const result = await db.bulkDocs(docs)
    console.log('Documents inserted successfully:', result)

    // Handle any errors for failed inserts
    const failed = result.filter((doc: any) => doc.error)
    if (failed.length > 0) {
      console.error('Some documents failed to insert:', failed)
    } else {
      console.log('All documents were inserted successfully!')
    }
  } catch (error) {
    console.error('Error during bulk insert:', error)
  }
}
</script>
