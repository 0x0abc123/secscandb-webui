
<script>
  import { selectedItem } from './store.js';
  import { Badge } from "$lib/components/ui/badge/index.js";
  import TriangleAlert from "@lucide/svelte/icons/triangle-alert";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Textarea } from "$lib/components/ui/textarea/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { toast } from "svelte-sonner";
  import { Separator } from "$lib/components/ui/separator/index.js";
  import { updateItemComment, updateItemStatus } from './backend.js';
 
  let item;
  $: item = $selectedItem;

  let statuschanged = 0;
  
 function humaniseTimestamp(t) {
 	const date = new Date(t * 1000);
 	return date.toString();
 }
 
 function isStatusNew() {
    let s = item.status;
    return !s || ((s != 'POS') && (s != 'IGN')) 
 }

 function isStatusConfirmed() {
    let s = item.status;
    return s && (s == 'POS') 
 }

 function isStatusIgnored() {
    let s = item.status;
    return s && (s == 'IGN') 
 }
 
 async function saveComment() {
     let res = await updateItemComment(item);
     if(!!res) { 
         toast.success("Comment has been saved", {
           description: "Saved comment for scan result "+item.title
         })
     } else {
         toast.error("Comment failed saving", {
           description: "There was an error trying to save comment for scan result "+item.title
         })
     }
 }

 async function saveStatus(confirmed) {
     let sstatus = confirmed ? 'POS' : 'IGN' ;
     let res = await updateItemStatus(item, sstatus);
     if(!!res) {
         toast.success("Status has been updated", {
           description: "Changed status for scan result "+item.title
         })
         item.status = sstatus;
         statuschanged++;
     } else {
         toast.error("Item status failed saving", {
           description: "There was an error trying to save status for scan result "+item.title
         })
     }
 } 
</script>

<style>
.wrapmono {
  white-space: pre-wrap;      /* Preserve whitespace, but allow wrapping */
  word-wrap: break-word;      /* Break long words if needed */
  overflow-wrap: anywhere;    /* (Optional) For aggressive breaking */
}
</style>

{#key statuschanged}
<p><strong>Status:</strong> 
{#if isStatusIgnored()}
<Badge variant="secondary">
      Ignored
</Badge>

{:else if  isStatusConfirmed()}
<Badge variant="destructive">
  <TriangleAlert />
      Confirmed
</Badge>

{:else}
<Badge>
      Investigating
</Badge>

{/if}
</p>
{/key}


<p><strong>Project:</strong> {item.projid}</p>
<p><strong>ID Hash:</strong> {item.id}</p>
<p><strong>Date/Time:</strong> {humaniseTimestamp(item.timestamp)}</p>
<p><strong>Scan Tool:</strong> {item.tool}</p>
<p><strong>Title:</strong> {item.title}</p>
<p><strong>Location:</strong> {item.loc}</p>
<p><strong>Description:</strong></p>
<pre class="wrapmono"><code class="wrapmono">
{item.details}
</code></pre>

<Separator class="my-4" />
{#key statuschanged}
{#if isStatusIgnored() || isStatusNew()}
<Button variant="destructive" onclick={() => saveStatus(true)}>Set Confirmed</Button>
{/if}
{#if isStatusConfirmed() || isStatusNew()}
<Button variant="secondary" onclick={() => saveStatus(false)}>Set Ignored</Button>
{/if}
{/key}
<Separator class="my-4" />

<Label for="message-2">Comment</Label>
  <Textarea bind:value={item.comment} placeholder="Type your comment here." id="message-2" />
<Button onclick={() => saveComment()}>Save Comment</Button>
