import React, { PureComponent } from "react"
import queryString from "qs"
import objEqual from "deep-equal"

const getDisplayName = WrappedComponent =>
  WrappedComponent.displayName || WrappedComponent.name || "Component"

export default initialQuery => WrappedComponent => {
  if (!initialQuery)
    return () =>
      Error("You should pass an initial query into the withParams hoc.")

  return class hocComponent extends PureComponent {
    static displayName = `withParams(${getDisplayName(WrappedComponent)})`

    componentDidMount() {
      this.setInitialParams()
    }

    componentDidUpdate() {
      const { history } = this.props

      if (!history.location.search) {
        this.setInitialParams()
      }
    }

    setInitialParams = () => {
      const { history } = this.props

      const currentParms = this.getCurrentSearch()
      const objSearch = {
        ...initialQuery,
        ...currentParms
      }
      const strSearch = queryString.stringify(objSearch)
      const searchObj = queryString.parse(history.location.search, {
        ignoreQueryPrefix: true
      })

      if (!objEqual(searchObj, objSearch)) {
        history.replace({
          search: strSearch
        })
      }
    }

    getCurrentSearch = () => {
      const { history } = this.props
      const { search } = history.location

      return queryString.parse(search, { ignoreQueryPrefix: true })
    }

    updateParams = ({ name, value, resetPage = false }) => {
      const { history } = this.props

      const newParam = { [name]: value }
      const currentParms = resetPage
        ? { ...this.getCurrentSearch(), page: 1 }
        : this.getCurrentSearch()
      const strSearch = queryString.stringify({ ...currentParms, ...newParam })

      return history.replace({
        ...history.location,
        search: strSearch
      })
    }

    render() {
      const { history } = this.props
      const searchStr = history.location.search
      const params = queryString.parse(searchStr, { ignoreQueryPrefix: true })
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
