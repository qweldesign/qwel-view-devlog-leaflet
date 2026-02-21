// useLeafletMap.ts

import { onMounted, type Ref } from 'vue';
import L from 'leaflet';

export function useLeafletMap(mapRef: Ref<HTMLDivElement | null>) {

  let map: L.Map | null = null;

  onMounted(() => {
    // 地図の初期化
    map = L.map(mapRef.value!, {
      zoomControl: true,
      scrollWheelZoom: false,
      doubleClickZoom: false
    }).setView([36.094336, 136.032054], 15); // 国見公民館を中心に設定

    // タイルレイヤーの追加 (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
  });

  return { map };
}
