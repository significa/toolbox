// @flow

type InitialType = {} | number | null;
type ErrorType = boolean;
type HandlersType = { [string]: (any, ActionType, ErrorType) => InitialType };
type ActionType = { type: string, error: ErrorType };

export default (initialState: InitialType, handlers: HandlersType) => (
  state: InitialType = initialState,
  action: ActionType
) => {
  const reduceFn = handlers[action.type];
  return reduceFn
    ? reduceFn((state: InitialType), (action: ActionType), action.error)
    : state;
};
