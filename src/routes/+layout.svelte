<script lang="ts">
  import '../app.css';
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();
</script>

<div class="min-h-screen bg-gray-100">
  <header class="bg-blue-600 text-white p-4">
    <h2 class="text-xl">1300Tempfence</h2>
  </header>
  <main class="p-4">
    {@render children()}
  </main>
</div>


