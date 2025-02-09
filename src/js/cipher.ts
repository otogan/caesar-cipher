const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const defaultSequence = "ZVRUWASQBLOJXTPGCFIMKNDYEH";

function validateKey(key: string): boolean {
  return key.length === 1 && alphabet.indexOf(key) !== -1;
}

function calculateShift(key: string): number {
  return alphabet.indexOf(key);
}

function getAPos(charM: string, shiftM: number): number {
  return (alphabet.indexOf(charM) + shiftM + alphabet.length) % alphabet.length;
}

function getChar(char: string, shift: number): string {
  return alphabet.charAt(getAPos(char, shift));
}

function getSPos(charP: string, shiftP: number): number {
  return defaultSequence.indexOf(getChar(charP, shiftP));
}

function encodeChar(charM: string, shiftM: number, shiftP: number): string {
  if (!alphabet.includes(charM)) {
    return charM;
  }
  const pos = getAPos(charM, -shiftM);
  return getChar(defaultSequence.charAt(pos), shiftP);
}

function decodeChar(charP: string, shiftM: number, shiftP: number): string {
  if (!alphabet.includes(charP)) {
    return charP;
  }
  const pos = getSPos(charP, -shiftP);
  return getChar(alphabet.charAt(pos), shiftM);
}

function refineShifts(shiftM: number, shiftP: number): [number, number] {
  shiftM = typeof shiftM === "number" ? shiftM : 0;
  shiftP = typeof shiftP === "number" ? shiftP : 0;
  return [
    (shiftM + alphabet.length) % alphabet.length,
    (shiftP + alphabet.length) % alphabet.length,
  ];
}

/**
 * Encodes the given message using the shift values for message and passcode.
 *
 * @export
 * @param {string} message The message to be encoded.
 * @param {number} [shiftM=0] Shifts the message by the given amount before encoding.
 * @param {number} [shiftP=0] Shifts the passcode by the given amount after encoding.
 * @returns {string}
 */
export function encode(
  message: string,
  shiftM: number = 0,
  shiftP: number = 0
): string {
  [shiftM, shiftP] = refineShifts(shiftM, shiftP);
  return message
    .toUpperCase()
    .split("")
    .map((charM) => encodeChar(charM, shiftM, shiftP))
    .join("");
}

export function encodeWithKey(
  message: string,
  keyM: string = "A",
  keyP: string = "A"
): string {
  keyM = keyM.toUpperCase();
  keyP = keyP.toUpperCase();
  if (!validateKey(keyM)) {
    throw "Invalid encode key.";
  }
  if (!validateKey(keyP)) {
    throw "Invalid decode key.";
  }
  const shiftM = calculateShift(keyM);
  const shiftP = calculateShift(keyP);
  return encode(message, shiftM, shiftP);
}

/**
 * Decodes the given passcode using the shift values for message and passcode.
 *
 * @export
 * @param {string} passcode The passcode to be decoded.
 * @param {number} [shiftM=0] Shifts the message by the given amount after decoding.
 * @param {number} [shiftP=0] Shifts the passcode by the given amount before decoding.
 * @returns {string}
 */
export function decode(
  passcode: string,
  shiftM: number = 0,
  shiftP: number = 0
): string {
  [shiftM, shiftP] = refineShifts(shiftM, shiftP);
  return passcode
    .toUpperCase()
    .split("")
    .map((charP) => decodeChar(charP, shiftM, shiftP))
    .join("");
}

export function decodeWithKey(
  passcode: string,
  keyM: string = "A",
  keyP: string = "A"
): string {
  keyM = keyM.toUpperCase();
  keyP = keyP.toUpperCase();
  if (!validateKey(keyM)) {
    throw "Invalid encode key.";
  }
  if (!validateKey(keyP)) {
    throw "Invalid decode key.";
  }
  const shiftM = calculateShift(keyM);
  const shiftP = calculateShift(keyP);
  return decode(passcode, shiftM, shiftP);
}
