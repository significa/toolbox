// @flow

type PropType = { displayName?: string, name?: string }

export default (WrappedComponent: PropType): string =>
  WrappedComponent.displayName || WrappedComponent.name || "Component"
