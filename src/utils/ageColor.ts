const MAX_BUCKETS = 10;
const RANGE_SIZE = 10;

// danger-500 → #F1595C
const BASE_RED = {
  r: 241,
  g: 89,
  b: 92,
};

const MIN_ALPHA = 0.41;
const MAX_ALPHA = 1;

const getAgeColor = (ages = 0) => {
  if (ages === null || ages === undefined || ages < 0) {
    return {
      backgroundColor: `rgba(${BASE_RED.r}, ${BASE_RED.g}, ${BASE_RED.b}, ${MIN_ALPHA})`,
      color: "#fff",
    };
  }

  const bucket = Math.min(
    Math.floor(ages / RANGE_SIZE),
    MAX_BUCKETS - 1
  );

  const alpha =
    MIN_ALPHA +
    (bucket / (MAX_BUCKETS - 1)) * (MAX_ALPHA - MIN_ALPHA);

  return {
    backgroundColor: `rgba(${BASE_RED.r}, ${BASE_RED.g}, ${BASE_RED.b}, ${alpha.toFixed(2)})`,
    color: "#fff",
  };
};

export default getAgeColor;
