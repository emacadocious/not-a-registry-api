export function calculateCost(price, quanity) {
  if (!Number(price) || !Number(quanity)) {
    throw new Error('Please pass a valid number.');
  }
  return (price * quanity) * 100;
}
