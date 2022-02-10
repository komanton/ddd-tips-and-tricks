import cloneDeep from 'clone-deep';
import { deepFreeze } from '../utils'; // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze

export class AggregateRoot<TEntityProps> {
  // TODO EntityId
  
  protected readonly props: TEntityProps

  constructor(props: TEntityProps) {
    /** Encapsulate aggregate's state from the outside world */
    this.props = cloneDeep<TEntityProps>(props)
  }
  
  /** Extract the state from an aggregate. 
   * 
   * Aggregate becomes unchangeable (read-only) after calling the flush method.
   * */
  public flush(): TEntityProps {
    return deepFreeze(this.props)
  }
}

// Usage
export class User extends AggregateRoot<UserProps> {
  constructor(props: UserProps) {
    super(props)
    
    // props validation here

  }

  get firstName() {
    return this.props.firstName
  }

  get lastName() {
    return this.props.lastName
  }

  get updatedAt() {
    return this.props.updatedAt
  }
}
