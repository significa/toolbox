import React, { PureComponent } from "react";
import queryString from "qs";
import objEqual from "deep-equal";

import getDisplayName from "../common/getDisplayName";

export default initialQuery => WrappedComponent => {
  if (!initialQuery) {
    throw new Error("withParams requires an initial query.");
  }

  return class hocComponent extends PureComponent {
    static displayName = `withParams(${getDisplayName(WrappedComponent)})`;

    componentDidMount() {
      this.setInitialParams();
    }

    componentDidUpdate() {
      const { history } = this.props;

      if (!history.location.search) {
        this.setInitialParams();
      }
    }

    setInitialParams = () => {
      const { history } = this.props;

      const currentParams = this.getCurrentSearch();
      const objSearch = {
        ...initialQuery,
        ...currentParams
      };
      const strSearch = queryString.stringify(objSearch);
      const searchObj = queryString.parse(history.location.search, {
        ignoreQueryPrefix: true
      });

      if (!objEqual(searchObj, objSearch)) {
        history.replace({
          search: strSearch
        });
      }
    };

    getCurrentSearch = () => {
      const { history } = this.props;
      const { search } = history.location;

      return queryString.parse(search, { ignoreQueryPrefix: true });
    };

    updateParams = newParams => {
      const { history } = this.props;
      const strSearch = queryString.stringify({
        ...this.getCurrentSearch(),
        ...newParams
      });

      return history.replace({
        ...history.location,
        search: strSearch
      });
    };

    render() {
      const { history } = this.props;
      const searchStr = history.location.search;
      const params = queryString.parse(searchStr, { ignoreQueryPrefix: true });
      return (
        <WrappedComponent
          params={params}
          updateParams={this.updateParams}
          {...this.props}
        />
      );
    }
  };
};
