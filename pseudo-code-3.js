
function asyncForEach(arr, fn) {
  return new Promise((resolve) => {
    Promise.all(arr.map(fn)).then(() => resolve());
  });
}

function isDataValid(input) {
  return input % 2 === 1;
}

const persistData = async (input) => {
  if (!isDataValid(input)) {
    throw new Error('Error')
  }

  return new Promise(resolve => {
    setTimeout(resolve, 1000);
  })
}


(async () => {
  const arr = [1, 2, 3, 4, 5, 6];
  try {
    await asyncForEach(arr, persistData);
    console.log('All done');
  } catch (error) {
    console.log('Something failed');
  }
}
)()
