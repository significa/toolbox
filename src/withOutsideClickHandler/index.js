// @flow
import * as React from "react"

import getDisplayName from "../common/getDisplayName"

type PropsType = { handleClickOutside?: () => void }

type WrappedElementType = React.ComponentType<PropsType>

const withOutsideClickHandler = (WrappedComponent: WrappedElementType) => {
  class WithOutsideClickHandler extends React.Component<PropsType> {
    static defaultProps: PropsType

    componentDidMount() {
      document.addEventListener("mousedown", this.handleClickOutside, true)
      document.addEventListener("touchstart", this.handleClickOutside, true)
    }

    componentWillUnmount() {
      document.removeEventListener("mousedown", this.handleClickOutside, true)
      document.removeEventListener("touchstart", this.handleClickOutside, true)
    }

    handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (
        this.wrapper &&
        e.target instanceof Node &&
        this.wrapper.contains(e.target)
      ) {
        return
      }

      if (typeof this.props.handleClickOutside === "function") {
        this.props.handleClickOutside()
      }
    }

    wrapper: ?HTMLDivElement

    render() {
      return (
        <div
          ref={(node: ?HTMLDivElement) => {
            this.wrapper = node
          }}
        >
          <WrappedComponent {...this.props} />
        </div>
      )
    }
  }

  WithOutsideClickHandler.displayName = `withOusideClickHandler(${getDisplayName(
    WrappedComponent
  )})`

  WithOutsideClickHandler.defaultProps = { handleClickOutside: () => {} }

  return WithOutsideClickHandler
}

export default withOutsideClickHandler
