// @flow

import * as React from "react"

type PropType = {
  children: React.Node,
  callback: (options?: mixed) => void,
  options?: mixed,
  interval?: number
}

type StateType = { intervalId: IntervalID | null }

class CallbackInterval extends React.Component<PropType, StateType> {
  static defaultProps = {
    options: {},
    interval: 10000
  }

  state = {
    intervalId: null
  }

  componentDidMount() {
    const { callback, options } = this.props

    callback(options)
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
    const { callback, options } = this.props

    callback(options)
  }

  render() {
    return this.props.children
  }
}

export default CallbackInterval
