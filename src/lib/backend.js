import { projects, items, currentView, selectedProject, selectedItem } from './store.js';

const API_URL = "/api";
const API_LISTPROJ_URL = API_URL+"/list_projects";
const API_GETPROJ_URL = API_URL+"/get_project/";
const API_UPSERT_URL = API_URL+"/upsert_data";

export async function listProjects() {
    const response = await fetch(API_LISTPROJ_URL);
    const data = await response.json();
    projects.set(data);
}

export async function getProject(id) {
    const response = await fetch(API_GETPROJ_URL+id);
    const data = await response.json();

    let results = [];
    for (const key in data) {
	  if (data.hasOwnProperty(key)) {
	    let o = data[key];
	    o['id'] = key;
            o['projid'] = id;
	    results.push(o);
	  }
	}

    items.set( results );
}


export async function updateItemComment(item) {
    const payloadobj = {
        project: item.projid,
        object: {
            title: item.title,
            loc: item.loc,
            comment: item.comment
        }
    };
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payloadobj)
    };
    const response = await fetch(API_UPSERT_URL, requestOptions);
    const data = await response.json();
    return data.updated;
}

export async function updateItemStatus(item, status) {
    if(status !== 'POS' && status !== 'IGN') {
        console.error('invalid status: ',status);
        return false;
    }

    const payloadobj = {
        project: item.projid,
        object: {
            title: item.title,
            loc: item.loc,
            status: status
        }
    };
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payloadobj)
    };
    const response = await fetch(API_UPSERT_URL, requestOptions);
    const data = await response.json();
    return data.updated;
}
