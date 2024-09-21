export function convertToMilliseconds(durationString: string) {
  const [value, unit]: string[] = durationString.split(" ");

  let multiplier: number;

  switch (unit?.toLowerCase()) {
    case "jam": {
      multiplier = 1 / 24; // 1 hour is 1/24 of a day
      break;
    }
    case "hari": {
      multiplier = 1;
      break;
    }
    case "bulan": {
      multiplier = 30; // Assuming an average of 30 days per month
      break;
    }
    case "tahun": {
      multiplier = 365; // Assuming 365 days per year (ignoring leap years for simplicity)
      break;
    }
    default:
      throw new Error("Unsupported unit");
  }

  const milliseconds = Number(value) * 24 * 60 * 60 * 1000 * multiplier;
  return milliseconds;
}
