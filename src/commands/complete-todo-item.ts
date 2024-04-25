import { Command } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'
import { TodoItemCompleted } from '../events/todo-item-completed'

@Command({
  authorize: 'all'
})
export class CompleteTodoItem {
  public constructor(
    readonly todoItemId: UUID,
  ) {}

  public static async handle(command: CompleteTodoItem , register: Register): Promise<void> {
    register.events(new TodoItemCompleted(command.todoItemId))
  }
}
