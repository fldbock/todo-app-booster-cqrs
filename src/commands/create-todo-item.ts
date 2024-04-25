import { Booster, Command } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'
import { TodoItemCreated } from '../events/todo-item-created'
import { Enumerator } from '../enumerator';
import { TodoItem } from '../entities/todo-item';

@Command({
  authorize: 'all'
})
export class CreateTodoItem {
  public constructor(
    readonly todoItemId: UUID,
    readonly title: string,
    readonly label: string,
    readonly description: string,
    readonly dueDate: string,
  ) {}

  public static async handle(command: CreateTodoItem , register: Register): Promise<void> {   
    // Validate that Entity Does Not Exist
    const todoItem = await Booster.entity(TodoItem, command.todoItemId);
    if(todoItem){
      throw new Error(`A todoItem with this id already exists.`);
    }
    // Validate business logic
    const countLabel = await Enumerator.enumerateSameLabel(command.label);
    const countDueDate = await Enumerator.enumerateSameDueDate(command.dueDate);

    if(countLabel >= 3){
      throw new Error(`You are only allowed to create at most 3 todo items with the same label.`);
    }
    if(countDueDate >= 3){
      throw new Error(`You are only allowed to create at most 3 todo items with the same dueDate.`);
    }

    register.events(new TodoItemCreated(command.todoItemId, command.title, command.label, command.description, command.dueDate))
  }
}
