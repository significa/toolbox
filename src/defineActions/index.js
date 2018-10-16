// @flow

type ReturnType = {
  start: string,
  complete: string,
  error: string
};

export default (action: string): ReturnType => ({
  start: `${action}_START`,
  complete: `${action}_COMPLETE`,
  error: `${action}_ERROR`
});
