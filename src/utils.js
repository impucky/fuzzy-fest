export function findCoordsCenter(coords) {
  let sumLat = 0;
  let sumLon = 0;

  coords.forEach(([lat, lon]) => {
    sumLat += lat;
    sumLon += lon;
  });

  return [sumLat / coords.length, sumLon / coords.length];
}

export function dateStr(date) {
  function dayOrdinal(n) {
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
  }
  const string = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
  return `${string}${dayOrdinal(string.split(" ")[1])}`;
}

export function formatDateRange(range, showYear) {
  const year = showYear ? `, ${new Date(range.start).getFullYear()}` : "";
  const startStr = dateStr(range.start);
  const endStr = dateStr(range.end);

  // Single day: July 14th(, 2025)
  if (range.start === range.end) {
    return `${startStr}${year}`;
    // Same month: July 14th - 16th(, 2025)
  } else if (
    new Date(range.start).getMonth() === new Date(range.end).getMonth()
  ) {
    return `${startStr} - ${endStr.split(" ")[1]}${year}`;
    // Different month: July 30th - August 1st(, 2025)
  } else {
    return `${startStr} - ${endStr}${year}`;
  }
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
      const bandMatch =
        f.lineup &&
        f.lineup.some((name) => {
          return name.split("-").join(" ").toLowerCase().includes(query);
        });
      return festivalMatch || bandMatch;
    }
    return true;
  });
}

export const isDev = import.meta.env.DEV;
