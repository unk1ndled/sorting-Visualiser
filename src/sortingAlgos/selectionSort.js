export function getSelectionSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  let n = array.length;

  for (let i = 0; i < n; i++) {
    // Finding the smallest number in the subarray
    let min = i;
    for (let j = i + 1; j < n; j++) {
      animations.push([min, j]);
      animations.push([min, j]);
      if (array[j] < array[min]) {
        min = j;
      }
    }
    if (min !== i) {
      // Swapping the elements
      let tmp = array[i];
      array[i] = array[min];
      array[min] = tmp;
      animations.push([-1, min]);
    } else {
      animations.push([-1, i]);
    }
  }

  return animations;
}
