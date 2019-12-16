import { Users } from "../models/users";
import { Tasks } from "../models/tasks";

interface UserBusyness {
  id: number;
  taskLength: number;
}

// グループ内において、doneした回数がもっとも少ないuserの中から一人ランダムで選びuseridを返す
const SuggestWhoisdoinguserid = (groupid: number): Promise<number> => {
  return Users.findAll({ where: { groupid } })
    .then(users => {
      return users.map(user => {
        const userBusyness: UserBusyness = { id: user.id, taskLength: 0 };
        return userBusyness;
      });
    })
    .then(userBusynesses => {
      return Tasks.findAll({ where: { groupid, isfinished: true } }).then(
        tasks => {
          return userBusynesses.map(userBusyness => {
            const tasksOfuser = tasks.filter(task => {
              return task.doneuserid === userBusyness.id;
            });
            const newUserBusyness: UserBusyness = {
              id: userBusyness.id,
              taskLength: tasksOfuser.length
            };
            return newUserBusyness;
          });
        }
      );
    })
    .then((userBusynesses: UserBusyness[]) => {
      if (userBusynesses.length === 0) {
        return Promise.reject();
      }
      let minLength = userBusynesses[0].taskLength;
      let minIds = [userBusynesses[0].id];
      userBusynesses.forEach((userBusyness, idx) => {
        if (idx === 0) return;
        if (userBusyness.taskLength < minLength) {
          minLength = userBusyness.taskLength;
          minIds = [userBusyness.id];
        } else if (userBusyness.taskLength === minLength) {
          minIds.push(userBusyness.id);
        }
      });
      const random = new Date().getTime() % minIds.length;
      const whoisdoinguserBusyness = userBusynesses.find(userBusyness => {
        return userBusyness.id === minIds[random];
      });
      if (whoisdoinguserBusyness === undefined) {
        return Promise.reject();
      }
      return whoisdoinguserBusyness.id;
    });
};

export default SuggestWhoisdoinguserid;
