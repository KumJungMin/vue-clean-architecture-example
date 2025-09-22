<script lang="ts" setup>
import { useSearchAddressVM } from '../viewModels/searchAddressVM';

const { search } = useSearchAddressVM();

const showTitle = ref(true);

function toggleTitle() {
  showTitle.value = !showTitle.value;
}

</script>


<template>
  <div>
    <h1>Search Address Page</h1>

    <button @click="toggleTitle">
      {{ showTitle ? 'Hide' : 'Show' }} Title
    </button>

    <div v-if="showTitle">
      <h2>Address Search</h2>
        <form @submit.prevent="search">
            <input type="text" v-model="searchQuery" placeholder="Enter address" />
            <button type="submit">Search</button>
        </form>
    </div>
  </div>
</template>