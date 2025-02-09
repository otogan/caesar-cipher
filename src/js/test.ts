import * as Cipher from "./cipher.js";

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
let keyE = "A";
let keyD = "A";
const sequenceMap: string[] = [
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
// alphabet.forEach((letter) => {
//   const charCode = letter.charCodeAt(0);
//   const i = charCode - base;
//   const pass = String.fromCharCode(charCode + shifts[i]);
//   console.log(`${letter} => ${pass}`);
// });

function permute(arr: string[]): string[][] {
  let result: string[][] = [];

  if (arr.length == 0) {
    return [[]];
  }

  for (let i = 0; i < arr.length; i++) {
    let current = arr[i];
    let remaining = arr.slice(0, i).concat(arr.slice(i + 1));
    let remainingPermutations = permute(remaining);
    for (let permutation of remainingPermutations) {
      result.push([current].concat(permutation));
    }
  }

  return result;
}

function permuteInPlace(text: string): string[] {
  const arrOrg = text.split("");
  const arr = [...arrOrg];
  const result: string[] = [];

  // function swap(i: number, j: number) {
  //   [arr[i], arr[j]] = [arr[j], arr[i]]; //ES6 destructuring swap
  // }

  function isNeighbor(n: number): boolean {
    if (n < 0) return false;
    const prevC = arr[n - 1];
    const i = arrOrg.indexOf(arr[n]);
    const isPrevNeighbor =
      prevC == arrOrg[(i + 1) % arrOrg.length] ||
      prevC == arrOrg[(i - 1 + arrOrg.length) % arrOrg.length];
    return (
      prevC == arrOrg[(i + 1) % arrOrg.length] ||
      prevC == arrOrg[(i - 1 + arrOrg.length) % arrOrg.length]
    );
  }

  function backtrack(n: number) {
    if (n === arr.length) {
      const sequence = arr.join("");
      console.log(sequence);
      result.push(sequence); //Crucial to copy!
      return;
    }

    for (let i = n; i < arr.length; i++) {
      // swap(n, i);
      [arr[n], arr[i]] = [arr[i], arr[n]];
      if (arr[n] != arrOrg[n] && !isNeighbor(n)) {
        backtrack(n + 1);
      }
      [arr[n], arr[i]] = [arr[i], arr[n]];
      //swap(n, i); // Backtrack: swap back to the original order
    }
  }

  backtrack(0);
  return result;
}

// test permute
// let permuteArr = ["1", "2", "3", "4"];
// let permutations = permuteInPlace(permuteArr);
// console.log(permutations);

// const sequenceO = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
// const sequenceX = "ZVRUWASQBLOJXTPGCFIMKNDYEH";
// const sequences: string[] = ["ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
// let newSequence = sequences[0];

// const results = permuteInPlace("ABCDEFGHIJKLMN");
// // console.log(aPermutations);
// console.log(results);

// TEST cipher
const msg =
  "CANIM KIZLARIM LUTFEN BENI CALISIRKEN RAHATSIZ ETMEYIN SIZI COK SEVIYORUM";
const keyM = "B";
const keyP = "Z";
const pss = Cipher.encodeWithKey(msg, keyM, keyP);
console.log(pss);
console.log(Cipher.decodeWithKey(pss, keyM, keyP));
