import { TANG_SO_LUONG, GIAM_SO_LUONG } from "./counter.types";

const TRANG_THAI_BAN_DAU = {
  soLuong: 0,
};

const reducer = (state = TRANG_THAI_BAN_DAU, action) => {
  switch (action.type) {
    case TANG_SO_LUONG:
      return {
        ...state,
        soLuong: state.soLuong + 1,
      };

    case GIAM_SO_LUONG:
      return {
        ...state,
        soLuong: state.soLuong - 1,
      };

    default:
      return state;
  }
};

export default reducer;
