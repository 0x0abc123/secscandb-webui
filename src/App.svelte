<script>
import './app.css';
import Home from './lib/Home.svelte';
import Project from './lib/Project.svelte';
import Item from './lib/Item.svelte';
import Topcrumbs from './lib/Topcrumbs.svelte';
import { Separator } from "$lib/components/ui/separator/index.js";
import { currentView, selectedProject, selectedItem } from './lib/store.js';     
import { Toaster } from "$lib/components/ui/sonner/index.js";
  
</script>

<main>

	<div>
	 <Topcrumbs />
	</div>

	<Toaster />
	
	<Separator class="my-4" />
	
	<div>
	  {#if $currentView === 'home'}
	  <Home />
	  {:else if $currentView === 'project'}
	  <Project />
	  {:else if $currentView === 'item'}
	  <Item />
	  {/if}
	</div>

</main>

<style>
main {
  margin: 2rem;
}
</style>
