import { Booster, Command } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'
import { TodoItemUpdated } from '../events/todo-item-updated'
import { Enumerator } from '../enumerator';
import { TodoItem } from '../entities/todo-item';

@Command({
  authorize: 'all'
})
export class UpdateTodoItem {
  public constructor(
    readonly todoItemId: UUID,
    readonly title: string,
    readonly label: string,
    readonly description: string,
    readonly dueDate: string,
  ) {}

  public static async handle(command: UpdateTodoItem , register: Register): Promise<void> {
    // Validate that Entity Exists
    const todoItem = await Booster.entity(TodoItem, command.todoItemId);
    if(!todoItem){
      throw new Error(`A todoItem with this id does not exist.`);
    }
    
    // Validate business logic
    const countLabel = await Enumerator.enumerateSameLabel(command.label);
    const countDueDate = await Enumerator.enumerateSameDueDate(command.dueDate);

    if(todoItem.label != command.label && countLabel >= 3){
      throw new Error(`You are only allowed to create at most 3 todo items with the same label.`);
    }
    if(todoItem.dueDate != command.dueDate && countDueDate >= 3){
      throw new Error(`You are only allowed to create at most 3 todo items with the same dueDate.`);
    }
  
    register.events(new TodoItemUpdated(command.todoItemId, command.title, command.label, command.description, command.dueDate))
  }
}
