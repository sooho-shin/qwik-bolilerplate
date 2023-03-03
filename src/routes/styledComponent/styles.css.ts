import { style } from "styled-vanilla-extract/qwik";

export const parent = style({
  /* 스타일 속성 정의 */
  width: "300px",
  height: "200px",
  backgroundColor: "green",
});

export const child = style({
  selectors: {
    [`${parent} &`]: { backgroundColor: "red" },
  },
  color: "blue",
});

export const test2 = style({
  /* 스타일 속성 정의 */
  width: "100px",
  height: "50px",
  backgroundColor: "green",
});
