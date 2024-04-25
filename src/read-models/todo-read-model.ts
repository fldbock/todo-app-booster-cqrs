import { ReadModel, Projects } from '@boostercloud/framework-core'
import { UUID, ProjectionResult } from '@boostercloud/framework-types'
import { TodoItem } from '../entities/todo-item'

@ReadModel({
  authorize: 'all'
})
export class TodoReadModel {
  public constructor(
    public id: UUID,
    readonly title: string,
    readonly label: string,
    readonly description: string,
    readonly dueDate: string,
    readonly completed: Boolean,
  ) {}

  @Projects(TodoItem, 'id')
  public static projectcompleted(entity: TodoItem, currentTodoReadModel?: TodoReadModel): ProjectionResult<TodoReadModel> {
    return new TodoReadModel(entity.id, entity.title, entity.label, entity.description, entity.dueDate, entity.completed)
  }

}
