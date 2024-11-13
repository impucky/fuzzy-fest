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
  const nth = (n) => {
    if (n > 3 && n < 21) return "th";
    switch (n % 10) {
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

  // one day I will understand js dates
  const date = new Date(d).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  // ...just kidding
  return `${date}${nth(date.split(" ")[1])}`;
}

export async function loadJson(glob) {
  const data = [];
  for (const path in glob) {
    const mod = await glob[path]();
    data.push(mod.default);
  }
  return data;
}
