export const genRanHex = () =>
  [...Array(24)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");

// export const createDeck = () => {
//   try {
//     const colors = ["black", "red", "blue", "yellow"];
//     const deck: [] = [];

//     for (let j = 1; j <= 2; j++) {
//       const jocker = ["jocker", 0];

//       colors.forEach((color) => {
//         for (let i = 1; i <= 13; i++) {
//           const tile = [color, i];

//           deck.push(tile);
//         }
//       });

//       deck.push(jocker);
//     }

//   } catch (error) {
//     console.error(error);
//   }
// };
