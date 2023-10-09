export function getInsertionSortAnimations(array) {
  const animations = [];
  let n = array.length;
  for (let i = 1; i < n; i++) {
    // Choosing the first element in our unsorted subarray
    let current = array[i];
    animations.push([i, -1]);
    // The last element of our sorted subarray
    let j = i - 1;
    while (j > -1 && current < array[j]) {
      let tmp = array[j + 1];
      array[j + 1] = array[j];
      array[j] = tmp;
      animations.push([j + 1, j]);
      j--;
    }
    animations.push([i, -1]);

  }
  return animations;
}
