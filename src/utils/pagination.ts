function pagination(current = 1, total = 10, range = 5) {
  // Calculate the range for pagination
  const halfRange = Math.floor(range / 2);
  let start = Math.max(1, current - halfRange);
  let end = Math.min(total, current + halfRange);

  // Adjust the start if we have fewer than 'range' pages available
  if (end - start + 1 < range) {
    if (start === 1) {
      end = Math.min(total, start + range - 1);
    } else {
      start = Math.max(1, end - range + 1);
    }
  }

  // Return an array of page numbers
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

export default pagination