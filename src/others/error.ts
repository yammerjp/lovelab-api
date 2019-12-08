import * as express from "express";

interface ErrorMessage {
  httpStatus: number;
  message: string;
  messageJp: string;
  status: string;
}

interface ErrorMessages {
  [key: string]: ErrorMessage;
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const errorMessages: ErrorMessages = require("../../errorMessages.json");

const errorHandle = (res: express.Response, errorCode: number): void => {
  const { httpStatus } = errorMessages[errorCode.toString(10)];

  const errorMessage = errorMessages[errorCode.toString(10)].message;

  res.status(httpStatus).json({ errorCode, errorMessage });
};

export default errorHandle;
export { errorMessages };
