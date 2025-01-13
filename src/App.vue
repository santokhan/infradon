<script setup lang="ts">
import { RouterView } from 'vue-router';
import HeaderComponent from './components/header/HeaderComponent.vue';
import { onUnmounted, onMounted } from 'vue';
import PouchDb from 'pouchdb-browser';
import { remote_db_url } from './utils/api';

const dbs = { products_db: "products_db", orders_db: "orders_db" };
const products_db = new PouchDb(dbs.products_db);
const orders_db = new PouchDb(dbs.orders_db);

let syncHandlerProductsDB: PouchDB.Replication.Sync<any> | null = null;
let syncHandlerOrdersDB: PouchDB.Replication.Sync<any> | null = null;

const startSync = async () => {
  if (!syncHandlerProductsDB) {
    syncHandlerProductsDB = products_db.sync(remote_db_url(dbs.products_db), { live: true, retry: true });
    console.log('Sync started products_db.');
  }
  if (!syncHandlerOrdersDB) {
    syncHandlerOrdersDB = orders_db.sync(remote_db_url(dbs.orders_db), { live: true, retry: true });
    console.log('Sync started orders_db.');
  }
};

const stopSync = async () => {
  if (syncHandlerProductsDB) {
    syncHandlerProductsDB.cancel();
    syncHandlerProductsDB = null;

    console.log('Sync stopped products_db.');
  }
  if (syncHandlerOrdersDB) {
    syncHandlerOrdersDB.cancel();
    syncHandlerOrdersDB = null;

    console.log('Sync stopped orders_db.');
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
