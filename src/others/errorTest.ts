/* eslint-disable no-console */
import { errorMessages } from "./error";

const errorCodes = Object.keys(errorMessages);

console.log("# Error Reference\n");

errorCodes.forEach(code => {
  console.log(`## errorCode: ${code}\n`);
  console.log(`### HTTP status code\n\n${errorMessages[code].httpStatus}\n`);
  console.log(`### Error Message\n\n${errorMessages[code].message}\n`);
  console.log(`### Error Message Jp\n\n${errorMessages[code].messageJp}\n`);
  console.log(`### Status\n\n${errorMessages[code].status}\n`);
});
