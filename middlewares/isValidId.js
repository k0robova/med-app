import { isValidObjectId } from "mongoose";
import { HttpError } from "../helpers/HttpError.js";

export const isValidId = (req, _, next) => {
  const { groupId, lessonId } = req.params;

  const id = groupId || lessonId;

  if (!isValidObjectId(id)) {
    next(HttpError(400, `Requested id(${id}) is invalid`));
    return;
  }

  next();
};
