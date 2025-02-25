<script lang="ts">
  export let data: any[] = [];
  let headers: string[] = [];

  $: {
    // Dynamically update headers based on the first row's keys
    headers = data.length > 0 ? Object.keys(data[0]) : [];
  }
</script>

<div class="overflow-x-auto">
  <table class="table w-full table-zebra">
    <thead>
      <tr>
        {#each headers as header}
          <th class="bg-base-200">{header}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each data as row}
        <tr>
          {#each headers as header}
            <td>{row[header]}</td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>

{#if data.length === 0}
  <div class="text-center py-4 text-gray-500">No data available</div>
{/if}