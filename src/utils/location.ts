export interface GeoPosition {
  latitude: number;
  longitude: number;
}

export function getCurrentPosition(): Promise<GeoPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by this browser."));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        resolve({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
      (err) => reject(err),
      { timeout: 10000 }
    );
  });
}

/** Reverse geocode lat/lng → human-readable address via Nominatim */
export async function reverseGeocode(lat: number, lng: number): Promise<string> {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`;
  const res = await fetch(url, {
    headers: { "Accept-Language": "en-IN,en" },
  });
  if (!res.ok) throw new Error("Geocoding failed");
  const data = await res.json();
  return (data.display_name as string) ?? `${lat}, ${lng}`;
}

/**
 * Returns a readable address string from browser geolocation.
 * Appends a Google Maps URL for reference.
 * Raw coordinates are NOT returned in the final string.
 */
export async function getLocationString(): Promise<string> {
  const { latitude, longitude } = await getCurrentPosition();

  const mapsUrl = `https://maps.google.com/?q=${latitude},${longitude}`;

  try {
    const address = await reverseGeocode(latitude, longitude);
    return `${address}\nMap: ${mapsUrl}`;
  } catch {
    // Fallback: if geocoding fails, just return the Maps URL
    return `Map: ${mapsUrl}`;
  }
}
