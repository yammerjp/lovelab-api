interface UserResponceObject {
  groupid: number | null;
  picturepath: string;
  id: number;
  email: string;
  name: string;
}

const userResponceObjectFilter = (
  user: UserResponceObject
): UserResponceObject => {
  const { groupid, picturepath, id, email, name } = user;
  return { groupid, picturepath, id, email, name };
};
const validate = (str: string): boolean => {
  if (str === undefined || str === null || str === "") {
    return false;
  }
  return true;
};

export { userResponceObjectFilter, validate };
