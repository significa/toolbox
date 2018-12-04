// @flow

import * as React from "react"
import qs from "qs"
import objEqual from "deep-equal"

import getDisplayName from "../common/getDisplayName"

type QueryType = { [string]: * }
type ElementType = React.StatelessFunctionalComponent<*>
type PropType = {
  history: {
    location: { search: string },
    replace: (parms: QueryType) => void
  }
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

  return class hocComponent extends React.PureComponent<PropType> {
    static displayName = `withParams(${getDisplayName(
      (WrappedComponent: ElementType)
    )})`

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

      if (!objEqual((searchObj: QueryType), (objSearch: QueryType))) {
        return history.replace({
          search: strSearch
        })
      }

      return null
    }

    getCurrentSearch = (): QueryType => {
      const {
        history: {
          location: { search }
        }
      } = this.props

      return queryString.parse((search: string), { ignoreQueryPrefix: true })
    }

    updateParams = (newParams: QueryType): void => {
      const { history } = this.props
      const strSearch = queryString.stringify({
        ...this.getCurrentSearch(),
        ...newParams
      })

      return history.replace({
        ...history.location,
        search: strSearch
      })
    }

    render() {
      const { history } = this.props
      const searchStr: string = history.location.search
      const params: QueryType = queryString.parse((searchStr: string), {
        ignoreQueryPrefix: true
      })

      return (
        <WrappedComponent
          params={params}
          updateParams={this.updateParams}
          {...this.props}
        />
      )
    }
  }
}
