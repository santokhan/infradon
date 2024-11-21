
<script lang="ts">
import {ref} from 'vue';
import PouchDB from 'pouchdb';

declare interface Post {
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



export default {
  data(){
    return {
    total:0,
    postData: [] as Post[],
    document: null as Post | null,
    storage: null as PouchDB.Database | null
  };

 

},
/*
mounted(){
    this.initDatabase(){
      const db new PouchDP('http://lolalhost:5984/')
    if (db){
      console.log("conecte")
    }else{console.warn("Erreur")}
    this.storage = db
    }
  },
*/
methods: {
  
  inc() {
    this.total++;
  },
  initDatabase(){
  },
  fetchDatabase(){}
}
}



</script>

<template>
    <h1>C'est une page pour générer des post</h1>
    <p>ajouter un post: {{total}}</p>
    <button type="button" role="button" @click="inc">+1</button>
  
</template>


<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

<script lang="ts">
import { ref } from 'vue'
import PouchDB from 'pouchdb'

declare interface Post {
  _id: string
  doc: {
    title: string
    content: string
    author: string
    comments_count: Int16Array

    comments: {
      comment: string
      author: string
    }
  }
}
export default {
  data() {
    return {
      total: 0,
      postsData: [] as Post[],
      document: null as Post | null,
      storage: null as PouchDB.Database | null
    }
  },

  mounted() {
    this.initDatabase()
    this.fetchData()
  },

  methods: {
    inc() {
      // old
      // this.total++;
    },

    initDatabase() {
      const db = new PouchDB('http://admin:IloveNikeAirForce2..@localhost:5984/cours3')
      if (db) {
        console.log("Connected to collection 'cours3'")
      } else {
        console.warn('Something went wrong')
      }
      this.storage = db

      // Start replication after initializing the database
      this.startReplication()
    },

    startReplication() {
      //replicate synchronise vue avec pouchdb
      const remoteDB = new PouchDB('http://admin:IloveNikeAirForce2.@localhost:5984/cours3')

      // Set up continuous replication
      this.storage.replicate
        .from('http://admin:IloveNikeAirForce2.@localhost:5984/cours3', remoteDB, {
          live: true,
          retry: true
        })
        .on('complete', (info) => {
          console.log('Replication complete', info)
        })
        .on('error', (err) => {
          console.error('Replication error', err)
        })
    },

    //met un document dans la db
    putDocument(document: Post) {
      const db = ref(this.storage).value
      if (db) {
        db.put(document)
          .then(() => {
            console.log('Add ok')
          })
          .catch((error) => {
            console.log('Add ko', error)
          })
      }
    },

    //Créer un document en dur qui retourne tjrs le même objet
    fakeData() {
      return {
        post: {
          title: 'New Fake document',
          content: "Bravo t'as un nouveau doc",
          author: 'Stella',
          comments_count: 3,
          comments: [
            {
              comment: 'Commentaire 1',
              author: 'Auteur 1'
            },
            {
              comment: 'Commentaire 2',
              author: 'Auteur 2'
            },
            {
              comment: 'Commentaire 3',
              author: 'Auteur 3'
            }
          ]
        }
      }
    },
    //méthode qui permet de mettre mon doc fake data dans la db
    putFakeData() {
      //const db = ref(this.storage).value;
      this.storage?.post(this.fakeData())
      console.log('bravo tu as bien ajouté ton document')
    },

    fetchData() {
      const storage = ref(this.storage)
      const self = this
      if (storage.value) {
        storage.value
          .allDocs({
            include_docs: true,
            attachments: true
          })
          .then(
            function (result: any) {
              console.log('fetchData success', result)
              self.postsData = result.rows
            }.bind(this)
          )
          .catch(function (error: any) {
            console.log('fetchData error', error)
          })
      }
    }
  }
}
</script>

<template>
  <h1>Nombre de post:</h1>
  <button @click="putFakeData()">add document</button>
  <ul>
    <li v-for="post in postsData" :key="post._id">
      <div class="ucfirst">
        {{ post.doc.title
        }}<em style="font-size: x-small" v-if="post.doc.comments?.comment">
          - {{ post.doc.comments?.comment }}
        </em>
      </div>
    </li>
  </ul>
</template>
