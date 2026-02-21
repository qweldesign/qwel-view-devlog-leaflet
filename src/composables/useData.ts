// useData.ts

import { ref } from 'vue';
import type { Data } from '../types/data';

const data = ref<Data | null>(null);
let loadingPromise: Promise<any> | null = null;

export function useData() {
  async function loadData() {
    if (data.value) return data.value;
    if (loadingPromise) return loadingPromise;

    //const url = import.meta.env.VITE_SS_API_URL;
    const url = '/assets/data.json';
    loadingPromise = fetch(url)
      .then(res => res.json())
      .then(json => {
        data.value = json;
        return data.value;
      });

    return loadingPromise;
  }

  return { data, loadData };
}
