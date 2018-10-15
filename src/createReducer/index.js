// @flow

type InitialType = {} | number | null
type HandlersType = { [string]: () => InitialType }
type ActionType = { type: string, error: boolean }

export default (initialState: InitialType, handlers: HandlersType) => (
  state: InitialType = initialState,
  action: ActionType
) => {
  const reduceFn = handlers[action.type]
  return reduceFn ? reduceFn((state: InitialType), action, action.error) : state
}
