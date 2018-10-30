// @flow

import * as React from "react"

type PropType = React.StatelessFunctionalComponent<*> | React.ComponentType<*>

export default (WrappedComponent: PropType): string =>
  WrappedComponent.displayName || WrappedComponent.name || "Component"
