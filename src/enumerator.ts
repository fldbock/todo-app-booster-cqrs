import { Booster } from "@boostercloud/framework-core";
import { TodoReadModel } from "./read-models/todo-read-model";

export class Enumerator{

  static async enumerateSameLabel(label: string){
    const searcher = Booster.readModel(TodoReadModel);

    searcher.filter({
      label: {eq: label}
    });

    const result = await searcher.search();
    return Object.keys(result).length;
}

  static async enumerateSameDueDate(dueDate: string){
    const searcher = Booster.readModel(TodoReadModel);

    searcher.filter({
      dueDate: {eq: dueDate}
    });

    const result = await searcher.search();

    return Object.keys(result).length;
  }
}
