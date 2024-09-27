import { TANG_SO_LUONG, GIAM_SO_LUONG } from "./counter.types";

export const tangSoLuong = () => {
  return {
    type: TANG_SO_LUONG,
  };
};

export const giamSoLuong = () => {
  return {
    type: GIAM_SO_LUONG,
  };
};
