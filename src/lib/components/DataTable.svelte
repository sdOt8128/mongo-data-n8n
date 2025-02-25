<script lang="ts">
    interface DataItem {
      _id?: string;
      id: number;
      name: string;
      value: number;
      createdAt: Date;
      updatedAt: Date;
    }
  
    export let data: DataItem[] = [];
  </script>
  
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      {#each data as row}
        <tr>
          <td>{row.id}</td>
          <td>{row.name}</td>
          <td>{row.value}</td>
        </tr>
      {/each}
    </tbody>
  </table>
  
  <style>
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 8px; border: 1px solid #ddd; }
    th { background-color: #f5f5f5; }
  </style>