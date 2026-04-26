const MAX_BUCKETS = 10;
const RANGE_SIZE = 10;

const MIN_ALPHA = 0.41;
const MAX_ALPHA = 1;

const getAgeColor = (ages = 0) => {
  if (ages === null || ages === undefined || ages < 0) {
    return {
      backgroundColor: `rgb(var(--age-danger-rgb) / ${MIN_ALPHA})`,
      color: "var(--age-danger-on)",
    };
  }

  const bucket = Math.min(Math.floor(ages / RANGE_SIZE), MAX_BUCKETS - 1);

  const alpha =
    MIN_ALPHA + (bucket / (MAX_BUCKETS - 1)) * (MAX_ALPHA - MIN_ALPHA);

  return {
    backgroundColor: `rgb(var(--age-danger-rgb) / ${alpha.toFixed(2)})`,
    color: "var(--age-danger-on)",
  };
};

export default getAgeColor;
