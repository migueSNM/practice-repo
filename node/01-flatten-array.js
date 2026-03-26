// flatten([1, [2, [3, [4]], 5]]) // → [1, 2, 3, 4, 5]

const flattenArray = (inputArray, curArray) => {
  for (const value of inputArray) {
    console.log('value', value)
    if (Array.isArray(value)) {
      flattenArray(value, curArray);
    } else {
      console.log('pushing', value, 'in', curArray)
      curArray.push(value);
    }
  }

  console.log('outputArray')
  return curArray
};

const flattenWithReduce = (inputArray) => {
  return inputArray.reduce((acc, cur) => {
    if(Array.isArray(cur)){
      return acc.concat(flattenWithReduce(cur))
    } else {
      return acc.concat(cur)
    }
  }, [])
}

const input = [1, [2, [3, [4]], 5]];
// const output = flattenArray(input, []);
const output = flattenWithReduce(input);

console.log('output', output)