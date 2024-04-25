import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'

@Event
export class TodoItemCreated {
  public constructor(
    readonly todoItemId: UUID,
    readonly title: string,
    readonly label: string,
    readonly description: string,
    readonly dueDate: string,
  ) {}

  public entityID(): UUID {
    return this.todoItemId
  }
}
