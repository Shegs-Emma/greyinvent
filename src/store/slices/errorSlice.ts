"use client";

import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { setError, stopLoad } from "./appSlice";

export const handleError = (
  err: any,
  dispatch: ThunkDispatch<unknown, unknown, UnknownAction>
) => {
  if (!err.response && !err.data) {
    dispatch(
      setError("There seems to be an issue currently, please try again")
    );
  } else if (!err.response) dispatch(setError(err.data.message));
  else {
    let msg =
      err.response.data.customMessage ||
      err.response.data.message ||
      err.response.data;
    if (typeof msg === "object") {
      let myError = msg.error;
      msg = myError;
    }

    dispatch(setError(msg));
    dispatch(stopLoad());
  }
  throw err;
};
