// @flow

import * as React from "react"

type PropType = React.StatelessFunctionalComponent<*>

export default (WrappedComponent: PropType): string =>
  WrappedComponent.displayName || WrappedComponent.name || "Component"
