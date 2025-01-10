<script setup lang="ts">
import TablePagination from '@/components/tables/collection/TablePagination.vue';
import useParams from '@/hooks/useParams';

const params = useParams();
const collection = params.collection;

type Row = {
  id: string;
  name: string;
  content: string;
};

// Simulating a database call
function getDocuments(db: string | string[]): Row[] | null {
  const documents: Record<string, Row[]> = {
    "product_collection": [
      { id: "1", name: "Product 1", content: "This is the content of Product 1." },
      { id: "2", name: "Product 2", content: "This is the content of Product 2." },
      { id: "3", name: "Product 3", content: "This is the content of Product 3." },
    ],
  };

  if (typeof db !== 'string' || !(db in documents)) {
    return null;
  }

  return documents[db];
}

const documents = getDocuments(collection);
</script>

<template>
  <div>
    <div class="flex">
      <div class="bg-white rounded-t-lg px-4 py-2">
        <span class="font-semibold text-lg">{{ params.collection }}</span>
      </div>
    </div>

    <div class="bg-white flex items-center justify-start gap-4 p-4 rounded-lg">
      <select class="border border-gray-300 rounded-lg p-2 w-20">
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
      </select>
      <select class="border border-gray-300 rounded-lg p-2 w-28">
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      <form class="flex-shrink">
        <input type="text" placeholder="Search..." class="border border-gray-300 rounded-lg px-3 py-2 w-60" />
      </form>
      <button class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">Search</button>
    </div>

    <table v-if="documents" class="min-w-full table-auto bg-white rounded-lg">
      <thead>
        <tr class="border-b">
          <th class="px-6 py-3 text-left text-sm font-medium text-gray-600">ID</th>
          <th class="px-6 py-3 text-left text-sm font-medium text-gray-600">Name</th>
          <th class="px-6 py-3 text-left text-sm font-medium text-gray-600">Content</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="document in documents" :key="document.id" class="border-b">
          <td class="px-6 py-4 text-sm text-gray-700">{{ document.id }}</td>
          <td class="px-6 py-4 text-sm text-gray-700">{{ document.name }}</td>
          <td class="px-6 py-4 text-sm text-gray-700">{{ document.content }}</td>
        </tr>
      </tbody>
    </table>
    <TablePagination />
  </div>
</template>
