export function findCoordsCenter(coords) {
  let sumLat = 0;
  let sumLon = 0;

  coords.forEach(([lat, lon]) => {
    sumLat += lat;
    sumLon += lon;
  });

  return [sumLat / coords.length, sumLon / coords.length];
}

export function formatDate(d) {
  const nth = (d) => {
    if (d > 3 && d < 21) return "th";
    switch (d % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const date = new Date(d).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  return `${date}${nth(d)}`;
}

export async function loadJson(glob) {
  const data = [];
  for (const path in glob) {
    const mod = await glob[path]();
    data.push(mod.default);
  }
  return data;
}

export const baseUrl = import.meta.env.BASE_URL;
