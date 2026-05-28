"use client";

import { useEffect, useRef } from "react";
import { siteSettings } from "@/data/siteSettings";

const EKBC_COORDS: [number, number] = [55.7593, -4.1772];

const DISTRICT_PINS: Array<[number, number, string]> = [
  [55.7644, -4.1758, "The Murray"],
  [55.7702, -4.1612, "Calderwood"],
  [55.7547, -4.1869, "Greenhills"],
  [55.7611, -4.1925, "Westwood"],
  [55.7508, -4.1731, "Whitehills"],
  [55.7771, -4.1786, "Stewartfield"],
  [55.7689, -4.1928, "Hairmyres"],
  [55.7728, -4.1535, "College Milton"],
  [55.7558, -4.1989, "Mossneuk"],
  [55.7649, -4.2055, "Jackton"],
  [55.7820, -4.1652, "Nerston"],
  [55.7475, -4.1812, "Newlandsmuir"],
];

export function EkbcMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<unknown>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    let cancelled = false;

    (async () => {
      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");

      if (cancelled || !containerRef.current) return;

      const map = L.map(containerRef.current, {
        center: EKBC_COORDS,
        zoom: 13,
        scrollWheelZoom: false,
        zoomControl: true,
        attributionControl: true,
      });

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 19,
        }
      ).addTo(map);

      const mintPin = L.divIcon({
        className: "ekbc-pin",
        html: `<div style="background:#5BFEB1;width:14px;height:14px;border-radius:50%;border:2px solid #0a0a0a;box-shadow:0 0 12px rgba(91,254,177,0.6);"></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      });

      const districtPin = L.divIcon({
        className: "ekbc-pin-small",
        html: `<div style="background:#5BFEB1;width:8px;height:8px;border-radius:50%;opacity:0.7;"></div>`,
        iconSize: [8, 8],
        iconAnchor: [4, 4],
      });

      L.marker(EKBC_COORDS, { icon: mintPin })
        .addTo(map)
        .bindPopup(
          `<div style="font-family:Inter,system-ui,sans-serif;color:#0a0a0a;min-width:180px;">
            <strong style="color:#0a3d26;display:block;margin-bottom:4px;">EKBC HQ</strong>
            <span style="font-size:12px;color:#3a3a3a;line-height:1.4;display:block;">${siteSettings.address.street}<br>${siteSettings.address.city}, ${siteSettings.address.region}, ${siteSettings.address.postcode}</span>
            <a href="${siteSettings.phoneHref}" style="display:inline-block;margin-top:6px;font-weight:600;color:#1a7a4d;text-decoration:none;font-size:13px;">${siteSettings.phone}</a>
          </div>`
        );

      DISTRICT_PINS.forEach(([lat, lng, name]) => {
        L.marker([lat, lng], { icon: districtPin })
          .addTo(map)
          .bindTooltip(name, { direction: "top", offset: [0, -4] });
      });

      L.circle(EKBC_COORDS, {
        radius: 1800,
        color: "#5BFEB1",
        weight: 1.5,
        opacity: 0.6,
        fillColor: "#5BFEB1",
        fillOpacity: 0.04,
        dashArray: "6 6",
      }).addTo(map);

      L.circle(EKBC_COORDS, {
        radius: 3000,
        color: "#5BFEB1",
        weight: 1,
        opacity: 0.3,
        fillOpacity: 0,
        dashArray: "2 6",
      }).addTo(map);

      mapRef.current = map;
    })();

    return () => {
      cancelled = true;
      if (mapRef.current) {
        const m = mapRef.current as { remove: () => void };
        m.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-full w-full rounded-xl"
      aria-label="Map of East Kilbride showing EKBC coverage"
    />
  );
}
