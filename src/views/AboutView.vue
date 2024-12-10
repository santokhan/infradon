<script lang="ts">

import PouchDB from 'pouchdb'
declare interface post {
  _id: string,
  doc: {
    post_name: string,
    post_content: string,
    attributes: {
      creation_date: string
    }
  }
}
export default {
  data() {

    return {

      datas: [],
      db: null, //as PouchDB.databaseReference<{}> | null,
      databaseReference: null,

    };

  },

  methods: {
    async addPost() {
      if (this.db) {
        const newPost: post = {
          _id: new Date().toISOString(),
          doc: {
            post_name: "Mon premier post",
            post_content: "ceci est mon premier exemple",
            attributes: {
              creation_date: new Date().toISOString(),
              //author: "Loïc Frei"
            }
          }
        }

        try {
          //const response = await this.db.put(newPost);
          //console.log('Document ajouté avevc succès', response);

        } catch (error) { console.error('erreur lors de lajout du document', error) }
      }

    },
    fetchData() {


    },

    inc() {

      // old

      // this.total++;

    },
    //http://admin:admin@localhost:5500/post


    initDatabase() {
      const db = new PouchDB('http://admin:admin@localhost:5986/post');
      if (db) {
        console.log("Connected to collection 'post'");
      } else {
        console.warn("Something went wrong");
      }

    },

  },

  mounted() {

    this.initDatabase();
  }

};

</script>



<template>

  <h1>InfraDon2</h1>

  <p>Counter: {{ datas }}</p>

  <button type="button" role="button" @click="inc">

    +1

  </button>

</template>