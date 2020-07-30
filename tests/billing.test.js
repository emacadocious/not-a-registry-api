import { calculateCost } from "../libs/billing-lib";

test("Lowest tier", () => {
  const quanity = 1;
  const price = 10;
  const expectedCost = calculateCost(price, quanity);

  expect(expectedCost).toEqual(1000);
});

test("Middle tier", () => {
  const quanity = 10;
  const price = 50;
  const expectedCost = calculateCost(price, quanity);

  expect(expectedCost).toEqual(50000);
});

test("Highest tier", () => {
  const quanity = 100;
  const price = 8;
  const expectedCost = calculateCost(price, quanity);

  expect(expectedCost).toEqual(80000);
});
