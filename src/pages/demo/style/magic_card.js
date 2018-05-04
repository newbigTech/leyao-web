
function createMagicCard(num = 4) {
  let tds = []
  for (let i = 0; i < num; i++) {
    for (let ii = 0; ii < num; ii++) {
      tds.push({
        a: [ii * num, i * num],
        b: [(ii + 1) * num, (i + 1) * num]
      })
    }
  }

  return tds
}

