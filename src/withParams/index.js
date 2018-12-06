// @flow

import * as React from "react"
import qs from "qs"
import objEqual from "deep-equal"
import debounce from "lodash.debounce"

import getDisplayName from "../common/getDisplayName"

type QueryType = { [string]: * }
type ElementType = React.StatelessFunctionalComponent<*>
type PropType = {
  history: {
    location: { search: string },
    replace: (parms: QueryType) => void
  }
}

type State = {
  innerParams: QueryType
}

type QueryStringType = {
  parse: (str: string, { ignoreQueryPrefix: boolean }) => QueryType,
  stringify: (obj: QueryType) => string
}

const queryString: QueryStringType = qs

export default (initialQuery: QueryType) => (WrappedComponent: ElementType) => {
  if (!initialQuery) {
    throw new Error("withParams requires an initial query.")
  }

  return class hocComponent extends React.PureComponent<PropType, State> {
    static displayName = `withParams(${getDisplayName(
      (WrappedComponent: ElementType)
    )})`

    constructor(props: PropType) {
      super(props)

      this.state = {
        innerParams: {}
      }

      this.setGlobalParams = debounce(this.setGlobalParams, 300)
    }

    componentDidMount() {
      if (Object.values(initialQuery).filter(Boolean).length !== 0) {
        this.setInitialParams()
      }
    }

    componentDidUpdate() {
      const { history } = this.props

      if (!history.location.search) {
        this.setInitialParams()
      }
    }

    getCurrentSearch = (): QueryType => {
      const {
        history: {
          location: { search }
        }
      } = this.props

      return queryString.parse((search: string), { ignoreQueryPrefix: true })
    }

    setInitialParams = (): void | null => {
      const { history } = this.props

      const currentParams: QueryType = this.getCurrentSearch()
      const objSearch: QueryType = {
        ...initialQuery,
        ...currentParams
      }

      const strSearch: string = queryString.stringify(objSearch)
      const searchObj: QueryType = queryString.parse(history.location.search, {
        ignoreQueryPrefix: true
      })

      this.setInnerParams(objSearch)

      if (!objEqual((searchObj: QueryType), (objSearch: QueryType))) {
        return history.replace({
          search: strSearch
        })
      }

      return null
    }

    setInnerParams = (innerParams: QueryType) => this.setState({ innerParams })

    setGlobalParams = (params: QueryType) => {
      const { history } = this.props
      const strSearch = queryString.stringify(params)

      return history.replace({
        ...history.location,
        search: strSearch
      })
    }

    updateParams = (newParams: QueryType) => {
      const objSearch = {
        ...this.getCurrentSearch(),
        ...newParams
      }

      this.setInnerParams(objSearch)
      this.setGlobalParams(objSearch)
    }

    render() {
      const { innerParams } = this.state

      return (
        <WrappedComponent
          params={innerParams}
          updateParams={this.updateParams}
          {...this.props}
        />
      )
    }
  }
}
