// @flow

import * as React from "react"

type PropType = {
  children: React.Node,
  fetch: (options?: *) => void,
  options?: *,
  interval?: number
}
type StateType = { intervalId: * }

class FetchInterval extends React.Component<PropType, StateType> {
  static defaultProps = {
    options: {},
    interval: 10000
  }

  state = {
    intervalId: null
  }

  componentDidMount() {
    const { fetch, options } = this.props

    fetch(options)
    this.setTimer()
  }

  componentWillUnmount() {
    if (this.state.intervalId) {
      clearInterval(this.state.intervalId)
    }
  }

  setTimer = () => {
    const intervalId: * = setInterval(this.timer, this.props.interval)
    this.setState({ intervalId })
  }

  timer = () => {
    const { fetch, options } = this.props

    fetch(options)
  }

  render() {
    return this.props.children
  }
}

export default FetchInterval
