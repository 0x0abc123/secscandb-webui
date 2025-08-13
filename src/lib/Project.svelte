<script>
  import { items, selectedProject, selectedItem, currentView } from './store.js';
 import * as Table from "$lib/components/ui/table/index.js";
  import { Badge } from "$lib/components/ui/badge/index.js";
  import TriangleAlert from "@lucide/svelte/icons/triangle-alert";

  function selectItem(i) {
    selectedItem.set(i);
    currentView.set('item');
  }
  
   function isoTimestamp(t) {
 	const date = new Date(t * 1000);
 	return date.toISOString();
 }

 function isStatusNew(item) {
    let s = item.status;
    return !s || ((s != 'POS') && (s != 'IGN'))
 }

 function isStatusConfirmed(item) {
    let s = item.status;
    return s && (s == 'POS')
 }

 function isStatusIgnored(item) {
    let s = item.status;
    return s && (s == 'IGN')
 }
 
</script>

<h2>Scan Results for {$selectedProject}</h2>
<Table.Root>
 <Table.Caption>A list of results for this project.</Table.Caption>
 <Table.Header>
  <Table.Row>
   <Table.Head class="w-[100px]">Name</Table.Head>
   <Table.Head>Location</Table.Head>
   <Table.Head>Created</Table.Head>
   <Table.Head>Status</Table.Head>
   <Table.Head>Severity</Table.Head>
   <Table.Head>Tool</Table.Head>
  </Table.Row>
 </Table.Header>
 <Table.Body>
  {#each $items as i}
   <Table.Row onclick={() => selectItem(i)}>
    <Table.Cell class="font-medium">{i.title}</Table.Cell>
    <Table.Cell>{i.loc}</Table.Cell>
    <Table.Cell>{isoTimestamp(i.timestamp)}</Table.Cell>
    <Table.Cell>
{#if isStatusIgnored(i)}
<Badge variant="secondary">
      Ignored
</Badge>

{:else if  isStatusConfirmed(i)}
<Badge variant="destructive">
  <TriangleAlert />
      Confirmed
</Badge>

{:else}
<Badge>
      Investigating
</Badge>

{/if}
    </Table.Cell>
    <Table.Cell>{i.severity}</Table.Cell>
    <Table.Cell>{i.tool}</Table.Cell>
   </Table.Row>
  {/each}
 </Table.Body>
</Table.Root>
