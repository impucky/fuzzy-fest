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

export function filterFestivals(festivals, filters, location) {
  return festivals.filter((f) => {
    const query = filters.query.toLowerCase().trim();
    const startDate = new Date(f.dates.start);
    const startFilter = new Date(filters.dateRange.from);
    const endFilter = new Date(filters.dateRange.to);
    // Always show if currently viewing and there's no query
    if (location.includes(f.slug) && !query) return true;
    // Locale
    if (f.isIndoor && !filters.showIn) return false;
    if (!f.isIndoor && !filters.showOut) return false;
    if (!filters.showIn && !filters.showOut) return false;
    // Date range
    if (startDate < startFilter || startDate > endFilter) {
      return false;
    }
    // Search
    if (filters.query) {
      const festivalMatch = f.name.toLowerCase().includes(query);
      const bandMatch = f.lineup.some((name) => {
        return name.split("-").join(" ").toLowerCase().includes(query);
      });
      return festivalMatch || bandMatch;
    }
    return true;
  });
}

export const isDev = import.meta.env.DEV;
