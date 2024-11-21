ancien code
<script lang="ts">
import { ref } from 'vue';
import PouchDB from 'pouchdb';

// Définition de l'interface du document
interface TestDocument {
  _id: string;
  doc: {
    test_name: string;
    test_content: string;
    attributes: {
      creation_date: string;
      author: string;
    };
  };
}

// Initialisation de la base de données CouchDB
const dbName = 'http://admin:admin@localhost:5986/test';
const db = new PouchDB(test);

export default {
  setup() {
    const message = ref<string | null>(null); // Pour afficher le message de retour

    // Méthode pour ajouter un document
    const addTestDocument = async () => {
      const newDocument: TestDocument = {
        _id: new Date().toISOString(), // Génération d'un ID unique
        doc: {
          test_name: "Nouveau Test",
          test_content: "Contenu du test",
          attributes: {
            creation_date: new Date().toISOString(),
            author: "Loïc Frei"
          }
        }
      };

      try {
        // Ajouter le document à la base de données
        const response = await db.put(newDocument);
        message.value = "Document ajouté avec succès !";
        console.log("Réponse de CouchDB:", response);
      } catch (error) {
        message.value = "Erreur lors de l'ajout du document.";
        console.error("Erreur:", error);
      }
    };

    return {
      message,
      addTestDocument
    };
  }
};
</script>

<template>
  <div>
    <h1>Ajouter un document à CouchDB</h1>
    <button @click="addTestDocument">Ajouter un document</button>
    <p v-if="message">{{ message }}</p>
  </div>
</template>
