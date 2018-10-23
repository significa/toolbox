// @flow

import * as React from "react"

type PropType = {
  children: React.Node,
  callback: (options?: mixed) => void,
  interval?: number
}

type StateType = { intervalId: IntervalID | null }

class CallbackInterval extends React.Component<PropType, StateType> {
  static defaultProps = {
    interval: 10000
  }

  state = {
    intervalId: null
  }

  componentDidMount() {
    const { callback } = this.props

    callback()
    this.setTimer()
  }

  componentWillUnmount() {
    if (this.state.intervalId) {
      clearInterval(this.state.intervalId)
    }
  }

  setTimer = (): void => {
    const intervalId: IntervalID = setInterval(this.timer, this.props.interval)

    return this.setState({ intervalId })
  }

  timer = (): void => {
    const { callback } = this.props

    callback()
  }

  render() {
    return this.props.children
  }
}

export default CallbackInterval
