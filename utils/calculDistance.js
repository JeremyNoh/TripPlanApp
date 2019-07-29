// get distance from 2 points Cordinate
export const distance = (lat1, lon1, lat2, lon2) => {
  var R = 6371; // km (change this constant to get miles)
  var dLat = ((lat2 - lat1) * Math.PI) / 180;
  var dLon = ((lon2 - lon1) * Math.PI) / 180;
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;

  return d;
};

// return best value from km or M
export const distanceKmOrM = nbr => {
  let d = nbr;
  if (d > 1) return d.toFixed(1) + " km";
  else if (d <= 1) return Math.round(d * 1000) + "m";
};

// return distance  from Array of cordinate
export const allDistance = arrayCordinate => {
  let result = 0;
  let errorMessage = "0 m";
  if (!Array.isArray(arrayCordinate)) {
    return errorMessage;
  }
  if (arrayCordinate.length < 2) {
    return errorMessage;
  }
  arrayCordinate.reduce((acc, pilot) => {
    if (
      !acc.hasOwnProperty("latitude") ||
      !acc.hasOwnProperty("longitude") ||
      !pilot.hasOwnProperty("latitude") ||
      !pilot.hasOwnProperty("longitude")
    ) {
      return errorMessage;
    }
    result += distance(
      acc.latitude,
      acc.longitude,
      pilot.latitude,
      pilot.longitude
    );
    return pilot;
  });
  result = distanceKmOrM(result);
  return result;
};

// transform array with juste cordinate
export const transformArrayForCordinate = val => {
  if (val.length === 0) {
    return [];
  }
  const res = val.map(el => {
    return {
      latitude: el.coordinate.latitude,
      longitude: el.coordinate.longitude
    };
  });
  return res;
};
