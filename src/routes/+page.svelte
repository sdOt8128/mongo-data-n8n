<script lang="ts">
    import DataTable from '$lib/components/DataTable.svelte';
    import type { PageData } from './$types';
  
    export let data: PageData;
  </script>
  
  <h1>Data from CSV</h1>
  <DataTable data={data.data} />