import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'

@Event
export class TodoItemCompleted {
  public constructor(
    readonly todoItemId: UUID,
  ) {}

  public entityID(): UUID {
    return this.todoItemId
  }
}
