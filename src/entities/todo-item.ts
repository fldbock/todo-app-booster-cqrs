import { Entity, Reduces } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'
import { TodoItemCompleted } from '../events/todo-item-completed'
import { TodoItemCreated } from '../events/todo-item-created'
import { TodoItemUpdated } from '../events/todo-item-updated'

@Entity({
  authorizeReadEvents: 'all',
})
export class TodoItem {
  public constructor(
    public id: UUID,
    readonly title: string,
    readonly label: string,
    readonly description: string,
    readonly dueDate: string,
    readonly completed: Boolean,
  ) {}

  @Reduces(TodoItemCompleted)
  public static reduceTodoItemCompleted(event: TodoItemCompleted, currentTodoItem: TodoItem): TodoItem {
    return new TodoItem(event.todoItemId, currentTodoItem.title, currentTodoItem.label, currentTodoItem.description, currentTodoItem.dueDate, true);
  }

  @Reduces(TodoItemCreated)
  public static reduceTodoItemCreated(event: TodoItemCreated, currentTodoItem?: TodoItem): TodoItem {
    return new TodoItem(event.todoItemId, event.title, event.label, event.description, event.dueDate, false);
  }

  @Reduces(TodoItemUpdated)
  public static reduceTodoItemUpdated(event: TodoItemUpdated, currentTodoItem: TodoItem): TodoItem {
    return new TodoItem(event.todoItemId, event.title, event.label, event.description, event.dueDate, currentTodoItem.completed);
  }

}

