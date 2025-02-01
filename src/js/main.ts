const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const base = 65;
const sequence: string[] = [
  "AZ",
  "BV",
  "CR",
  "DU",
  "EW",
  "FA",
  "GS",
  "HQ",
  "IB",
  "JL",
  "KO",
  "LJ",
  "MX",
  "NT",
  "OP",
  "PG",
  "QC",
  "RF",
  "SI",
  "TM",
  "UK",
  "VN",
  "WD",
  "XY",
  "YE",
  "ZH",
];
const shifts: number[] = [
  25, 20, 15, 17, 18, -5, 12, 9, -7, 2, 4, -2, 11, 6, 1, -9, -14, -12, -10, -7,
  -10, -8, -19, 1, -20, -18,
];

// calculate shifts
// sequence.forEach((char) => {
//   const a = char.charCodeAt(0);
//   const b = char.charCodeAt(1);
//   const diff = b - a;
//   console.log(`${b}[${char.charAt(1)}] - ${a}[${char.charAt(0)}] = ${diff}`);
//   shifts.push(diff);
// });
// console.log(shifts);

// calculate sequence
// for (let i = 65; i < 91; i++) {
//   let char = String.fromCharCode(i);
//   sequence.push(char);
// }
// console.log(sequence);

// test encoding
alphabet.forEach((letter) => {
  const charCode = letter.charCodeAt(0);
  const i = charCode - base;
  const pass = String.fromCharCode(charCode + shifts[i]);
  console.log(`${letter} => ${pass}`);
});
