import { TaskGenerators } from "../models/taskGenerators";
import { Tasks } from "../models/tasks";
import suggestWhoisdoinguserid from "./suggestWhoisdoinguserid";

interface CreatingTaskGenerator {
  name: string;
  comment: string;
  interval: Interval;
  firstdeadlinedate: Date;
  groupid: number;
}

const neighborDate = (
  date: Date,
  interval: Interval,
  isPast: boolean
): Date => {
  const diff = isPast === true ? -1 : 1;
  switch (interval) {
    case "oneday": {
      date.setDate(date.getDate() + diff);
      return date;
    }
    case "oneweek": {
      date.setDate(date.getDate() + diff * 7);
      return date;
    }
    case "onemonth": {
      const dateOrg = new Date(date.getTime());
      const monthOrg = date.getMonth();
      const monthNew = monthOrg + diff;
      date.setMonth(monthNew);
      if (date.getMonth() === monthNew) {
        return date;
      }
      // returnする日付に29日,30日,31日を返したがその月に存在しないときは月末の日に設定する。
      return new Date(
        dateOrg.getFullYear(),
        monthNew + 1,
        0,
        dateOrg.getHours(),
        dateOrg.getMinutes(),
        dateOrg.getSeconds()
      );
    }

    default: {
      throw new Error();
    }
  }
};

const calcFirstDeadlinedate = (
  firstdeadlinedate: Date,
  interval: Interval
): Date => {
  // タスクの生成
  // 生成するタスクのdeadlinedateは、date = firstdeadlinedate.getTime + intervalTime * n > now && nが最小
  let deadlinedate = firstdeadlinedate;
  const now = new Date();
  const nowMs = now.getTime();
  // deadlinedateが過去ならば次の回へ
  while (deadlinedate.getTime() < nowMs) {
    deadlinedate = neighborDate(deadlinedate, interval, false);
  }
  // deadlineが未来過ぎるならば戻して
  const nextIntervalDateMs = neighborDate(now, interval, false).getTime();
  while (deadlinedate.getTime() > nextIntervalDateMs) {
    deadlinedate = neighborDate(deadlinedate, interval, true);
  }
  return deadlinedate;
};

const taskGeneratorCreator = (request: CreatingTaskGenerator) => {
  const firstdeadlinedate = calcFirstDeadlinedate(
    request.firstdeadlinedate,
    request.interval
  );
  return suggestWhoisdoinguserid(request.groupid)
    .then(whoisdoinguserid => {
      return Tasks.create({
        name: request.name,
        comment: request.comment,
        groupid: request.groupid,
        whoisdoinguserid,
        deadlinedate: firstdeadlinedate
      });
    })
    .then(() => {
      // nextgeneratingdateの計算
      // nextgeneratingdateは、算出したdeadlinedate+1h
      const nextgeneratingdate = new Date(firstdeadlinedate.getTime());
      nextgeneratingdate.setHours(nextgeneratingdate.getHours() + 1);

      // 定期タスクの生成
      return TaskGenerators.create({
        name: request.name,
        comment: request.comment,
        interval: request.interval,
        groupid: request.groupid,
        firstdeadlinedate,
        nextgeneratingdate
      });
    })
    .then(taskGenerator => {
      return Promise.resolve(taskGenerator);
    })
    .catch(() => {
      return Promise.resolve(null);
    });
};

interface UpdatingTaskGenerator {
  name: string | null | undefined;
  comment: string | null | undefined;
  interval: Interval | null | undefined;
  firstdeadlinedate: Date | null | undefined;
  id: number;
  groupid: number;
}

const taskGeneratorUpdator = (request: UpdatingTaskGenerator): boolean => {
  console.log(request);
  // nextgeneratingdateの計算
  // タスク生成の必要があればタスク生成
  // 定期タスクの更新
  return false; // error
};

export { taskGeneratorCreator, taskGeneratorUpdator };
