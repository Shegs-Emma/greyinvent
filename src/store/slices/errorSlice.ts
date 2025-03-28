import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { setError, stopLoad } from "./appSlice";

interface ErrorResponse {
  response?: {
    data?: {
      customMessage?: string;
      message?: string;
      error?: string;
    };
  };
  data?: {
    message?: string;
  };
}

export const handleError = (
  err: unknown,
  dispatch: ThunkDispatch<unknown, unknown, UnknownAction>
) => {
  if (typeof err !== "object" || err === null) {
    dispatch(setError("An unknown error occurred"));
    return;
  }

  const errorObj = err as ErrorResponse;

  if (!errorObj.response && !errorObj.data) {
    dispatch(
      setError("There seems to be an issue currently, please try again")
    );
  } else if (!errorObj.response) {
    dispatch(setError(errorObj.data?.message || "An error occurred"));
  } else {
    let msg =
      errorObj.response.data?.customMessage ||
      errorObj.response.data?.message ||
      errorObj.response.data;

    if (typeof msg === "object" && msg?.error) {
      msg = msg.error;
    }

    dispatch(setError(msg));
    dispatch(stopLoad());
  }
  throw err;
};
