<script setup lang="ts">
import { RouterView } from 'vue-router';
import HeaderComponent from './components/header/HeaderComponent.vue';
import { onUnmounted, onMounted } from 'vue';
import PouchDb from 'pouchdb-browser';
import { remote_db_url } from './utils/api';

const dbs = { products_db: "products_db", orders_db: "orders_db" };
const db = new PouchDb(dbs.products_db);

let syncHandler: PouchDB.Replication.Sync<any> | null = null;

const startSync = async () => {
  if (!syncHandler) {
    syncHandler = db.sync(remote_db_url(dbs.orders_db), { live: true, retry: true });
    console.log('Sync started.');
  }
};

const stopSync = async () => {
  if (syncHandler) {
    syncHandler.cancel();
    syncHandler = null;
    console.log('Sync stopped.');
  }
};

onMounted(async () => {
  await startSync();
})

onUnmounted(async () => {
  await stopSync();
});
</script>

<template>
  <HeaderComponent />
  <RouterView />
</template>
