<script>
 import * as Table from "$lib/components/ui/table/index.js";
 import { projects, selectedProject, currentView } from './store.js';
 import { onMount } from 'svelte';
 import { listProjects, getProject } from './backend.js';
 
  onMount(async () => {
    // Fetch data when the component mounts
    await listProjects();
  });
  
  async function selectProject(p) {
    await getProject(p);
    selectedProject.set(p);
    currentView.set('project');
  }

</script>
 
<h2>Projects</h2>
<Table.Root>
 <Table.Caption>A list of repos with scan results.</Table.Caption>
 <Table.Header>
  <Table.Row>
   <Table.Head class="w-[100px]">Name</Table.Head>
  </Table.Row>
 </Table.Header>
 <Table.Body>
  {#each $projects as p}
   <Table.Row onclick={() => selectProject(p)}>
    <Table.Cell class="font-medium">{p}</Table.Cell>
   </Table.Row>
  {/each}
 </Table.Body>
 <Table.Footer>
  <Table.Row>
   <Table.Cell>Total</Table.Cell>
  </Table.Row>
 </Table.Footer>
</Table.Root>
