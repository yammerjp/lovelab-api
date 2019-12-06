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

export default userResponceObjectFilter;
