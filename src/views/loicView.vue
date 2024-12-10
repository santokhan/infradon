<script lang="ts">
import { ref } from 'vue';
import PouchDB from 'pouchdb';

declare interface Post {
  _id: string;
  title: string;
  content: string;
  author: string;
  comments_count: number;
  comments: { comment: string; author: string }[];
}

export default {
  data() {
    return {
      postsData: [] as Post[], // Stocke les posts récupérés depuis la DB
      storage: null as PouchDB.Database | null, // Instance PouchDB
    };
  },

  async mounted() {
    await this.initDatabase(); // Attendez que la DB soit initialisée
    await this.putFakeData(); // Attendez l'ajout des données
    await this.fetchData();  // Récupérez les données après l'ajout
  },

  methods: {
    // Initialise la base de données PouchDB
    async initDatabase() {
      try {
        this.storage = new PouchDB('http://admin:admin@localhost:5986/LoicView');
        console.log("Connexion réussie à la collection 'LoicView'");
      } catch (error) {
        console.error('Erreur lors de la connexion à la base de données:', error);
      }
    },

    // Données fictives pour les tests
    fakeData() {
      return {
        _id: 'unique-id-' + new Date().toISOString().replace(/[:.]/g, '-'),
        title: 'New Fake Document',
        content: 'This is a fake post content.',
        author: 'Loïc',
        comments_count: 3,
        comments: [
          { comment: 'Commentaire 1', author: 'Auteur 1' },
          { comment: 'Commentaire 2', author: 'Auteur 2' },
          { comment: 'Commentaire 3', author: 'Auteur 3' },
        ],
      };
    },

    // Ajoute un document fictif dans la DB
    async putFakeData() {
      if (!this.storage) {
        console.error('Base de données non initialisée.');
        return;
      }
      const data = this.fakeData();
      try {
        await this.storage.put(data);
        console.log('Document ajouté avec succès :', data);
      } catch (error) {
        console.error('Erreur lors de l\'ajout du document:', error);
      }
    },

    // Récupère tous les documents de la DB
    async fetchData() {
      if (!this.storage) {
        console.error('Base de données non initialisée.');
        return;
      }
      try {
        const result = await this.storage.allDocs({ include_docs: true });
        console.log('Données récupérées:', result);
        // Assurez-vous que les données récupérées correspondent au format attendu
        //this.postsData = result.rows.map((row) => row.doc).filter((doc) => !!doc) as Post[];
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    }
  }
}

   // },
  //},
//};
</script>

<template>
  <div>
    <h1>Nombre de posts : {{ postsData.length }}</h1>
    <button @click="putFakeData">Ajouter un document</button>
    <ul>
      <li v-for="post in postsData" :key="post._id">
        <div>
          <strong>{{ post.title }}</strong>
          <p>{{ post.content }}</p>
          <em>Author: {{ post.author }}</em>
          <ul>
            <li v-for="(comment, index) in post.comments" :key="index">
              {{ comment.comment }} - <em>{{ comment.author }}</em>
            </li>
          </ul>
        </div>
      </li>
    </ul>
    <p v-if="postsData.length === 0">Aucun post disponible</p>
  </div>
</template>
