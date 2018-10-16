// @flow

type InitialType = {} | number | null
type ErrorType = boolean
type ActionType = { type: string, error: ErrorType }
type HandlersType = {
  [string]: (state: *, action: ActionType, error: ErrorType) => InitialType
}

export default (initialState: InitialType, handlers: HandlersType) => (
  state: InitialType = initialState,
  action: ActionType
) => {
  const reduceFn = handlers[action.type]
  return reduceFn
    ? reduceFn((state: InitialType), (action: ActionType), action.error)
    : state
}
