export default function getRandomId() {
  const dec = Math.floor(Math.random() * 100000);
  const decArr = dec.toString().split("");
  const rand = Math.floor(Math.random() * 10);
  for (let i = 0; i < decArr.length; i++) {
    if (i === rand) {
      decArr[i] = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    }
  }
  return decArr.join("");
}
