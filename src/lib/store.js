import { writable } from 'svelte/store';

export const projects = writable([]);

export const items = writable([]);

export const currentView = writable('home'); // 'home' | 'project' | 'item'
export const selectedProject = writable(null);
export const selectedItem = writable(null);

export function switchTab(view) {
	    if (view === 'project' && !selectedProject) return;
	    if (view === 'item' && !selectedItem) return;
	    currentView.set(view);
	  }

