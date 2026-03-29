"use client";
import { useEffect, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

function getColor(jamFactor) {
  if (jamFactor >= 7) return "#ef4444";
  if (jamFactor >= 4) return "#f59e0b";
  return "#22c55e";
}

export default function Home() {
  const mapRef = useRef(null);
  const [updated, setUpdated] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    import("leaflet").then((L) => {
      if (mapRef.current._leaflet_id) return;
      const map = L.map(mapRef.current).setView([31.9077, 131.4202], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      async function loadTraffic() {
        const { data } = await supabase
          .from("traffic_log")
          .select("*")
          .order("recorded_at", { ascending: false })
          .limit(100);

        if (!data) return;
        const latest = {};
        for (const row of data) {
          const key = `${row.lat.toFixed(3)},${row.lng.toFixed(3)}`;
          if (!latest[key]) latest[key] = row;
        }

        for (const row of Object.values(latest)) {
          const color = getColor(row.jam_factor);
          L.circleMarker([row.lat, row.lng], {
            radius: 10,
            color,
            fillColor: color,
            fillOpacity: 0.8,
          })
            .addTo(map)
            .bindPopup(
              `渋滞度: ${row.jam_factor.toFixed(1)}<br>速度: ${row.speed.toFixed(1)} km/h`
            );
        }
        setUpdated(new Date().toLocaleTimeString("ja-JP"));
      }

      loadTraffic();
    });
  }, []);

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <div style={{ background: "#1d4ed8", color: "white", padding: "12px 16px", display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 20 }}>🚦</span>
        <span style={{ fontWeight: "bold", fontSize: 18 }}>宮崎市 渋滞マップ</