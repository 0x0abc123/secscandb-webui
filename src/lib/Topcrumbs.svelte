<script>
  import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
    import { currentView, selectedProject, selectedItem, switchTab } from './store.js';
</script>

<Breadcrumb.Root>
  <Breadcrumb.List>
    <Breadcrumb.Item>
      <Breadcrumb.Link href="#" onclick={() => switchTab('home')}>Projects</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
{#if $selectedProject}
    <Breadcrumb.Item>
      <Breadcrumb.Link href="#" onclick={() => switchTab('project')}>Results</Breadcrumb.Link>
    </Breadcrumb.Item>
  {#if $selectedItem}    
    <Breadcrumb.Separator />
    <Breadcrumb.Item>
    <Breadcrumb.Link href="#" onclick={() => switchTab('item')}>Result Detail</Breadcrumb.Link>
    </Breadcrumb.Item>
  {/if}
{/if}
  </Breadcrumb.List>
</Breadcrumb.Root>
