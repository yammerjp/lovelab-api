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
        const userBusynessIncomplete: UserBusyness = {
          id: user.id,
          taskLength: 0
        };
        return userBusynessIncomplete;
      });
    })

    .then(userBusynessesIncomplete => {
      return Tasks.findAll({ where: { groupid, isfinished: true } }).then(
        tasks => {
          return userBusynessesIncomplete.map(userBusynessIncomplete => {
            const tasksOfuser = tasks.filter(task => {
              return task.doneuserid === userBusynessIncomplete.id;
            });
            const userBusyness: UserBusyness = {
              id: userBusynessIncomplete.id,
              taskLength: tasksOfuser.length
            };
            return userBusyness;
          });
        }
      );
    })

    .then((userBusynesses: UserBusyness[]) => {
      if (userBusynesses.length === 0) {
        return Promise.reject();
      }
      let leastBusynessTaskLength = userBusynesses[0].taskLength;
      let leastBusyUserids = [userBusynesses[0].id];

      userBusynesses.forEach((userBusyness, idx) => {
        if (idx === 0) return;
        if (userBusyness.taskLength < leastBusynessTaskLength) {
          leastBusynessTaskLength = userBusyness.taskLength;
          leastBusyUserids = [userBusyness.id];
          return;
        }
        if (userBusyness.taskLength === leastBusynessTaskLength) {
          leastBusyUserids.push(userBusyness.id);
        }
      });

      const random = new Date().getTime() % leastBusyUserids.length;
      const userBusynessLeast = userBusynesses.find(userBusyness => {
        return userBusyness.id === leastBusyUserids[random];
      });
      if (userBusynessLeast === undefined) {
        return Promise.reject();
      }
      return userBusynessLeast.id;
    });
};

export default SuggestWhoisdoinguserid;
