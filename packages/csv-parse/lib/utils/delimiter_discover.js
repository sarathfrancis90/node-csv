// Discussed in [issue #400](https://github.com/adaltas/node-csv/issues/400)
// See https://github.com/python/cpython/blob/ea1b1c579f600cc85d145c60862b2e6b98701b24/Lib/csv.py#L349
const delimiter_discover = function (records) {
  const char_frequency = Array(127)
    .fill()
    .map(() => ({ lines: [] }));
  const preferred = {
    [",".charCodeAt(0)]: 1.8,
    ["\t".charCodeAt(0)]: 1.8,
    [";".charCodeAt(0)]: 1.6,
    [" ".charCodeAt(0)]: 1.6,
    [":".charCodeAt(0)]: 1.5,
    [".".charCodeAt(0)]: 1.4,
    ["/".charCodeAt(0)]: 1.4,
  };
  // Traverse each records
  records.map(([record], line) => {
    for (let i = 0, l = record.length; i < l; i++) {
      // Count the character frequency
      const code = record.charCodeAt(i);
      char_frequency[code].lines[line] ??= 0;
      char_frequency[code].lines[line]++;
    }
  });
  char_frequency.map((freq, i) => {
    freq.char = i;
    freq.std = std(freq.lines);
    freq.total = freq.lines.reduce((acc, val) => acc + val, 0);
    freq.preferred = !!preferred[i];
    freq.score = (freq.total - freq.std) * (preferred[i] ?? 1);
  });
  // console.log(char_frequency.filter(({ total }) => total));
  // Extract the dominant character
  const result = char_frequency.reduce(
    (acc, info) => (acc.score > info.score ? acc : info),
    {},
  );
  return String.fromCharCode(result.char);
};

const std = function (array) {
  const n = array.length;
  if (n === 0) return 0;
  const mean = array.reduce((a, b) => a + b) / n;
  return Math.sqrt(
    array.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n,
  );
};

export { delimiter_discover };
