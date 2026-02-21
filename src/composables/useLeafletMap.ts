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

    // ダブルクリックでズームアウト
    map.on('dblclick', () => {
      map?.setZoom(15, { animate: true });
    });
  });

  const addMarkers = (properties: any[]) => {
    // アイコンの定義
    const icons = {
      facility: L.icon({ // 施設
        iconUrl: '/assets/images/pin-red.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34]
      }),
      available: L.icon({ // 内覧可
        iconUrl: '/assets/images/pin-green.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34]
      }),
      survey: L.icon({ // 調査前
        iconUrl: '/assets/images/pin-blue.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34]
      }),
      hold: L.icon({ // 保留中
        iconUrl: '/assets/images/pin-gray.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34]
      })
    };

    properties.forEach(p => {
      const icon = p['カテゴリ'] === '施設' ? icons.facility
        : p['ステータス'] === '内覧可' ? icons.available
        : p['ステータス'] === '調査前' ? icons.survey
        : icons.hold;
      const marker = L.marker([p['緯度'], p['経度']], { icon }).addTo(map!);
      const statusText = p['カテゴリ'] === '施設' ? '施設' : p['ステータス'];
      const linkHtml = p['カテゴリ'] === '施設' ? ''
        : `<br><a href="/properties/${p['ID']}">詳細を見る</a>`;

      // ポップアップ設定
      marker.bindPopup(`
        <strong>${p['名称']} | ${statusText}</strong>
        <br><span>${p['住所']}</span>
        ${linkHtml}
      `);

      // クリックで移動・ズーム
      marker.on('click', () => {
        map?.setView(marker.getLatLng(), 17);
      });
    });
  };

  return { map, addMarkers };
}
