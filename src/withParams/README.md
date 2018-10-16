# withParams

This HOC is useful when you need to control any state of the page using the query parameters. It's especially useful to page with pagination, dynamic tables, modals and to share URLs.

- HOC
- URL
- Query parameters
- Pagination

### Method

```js
this.props.updateParams(({ [queryName]: value }: Object));
```

### Data

```js
const { ...allQueries } = this.props.params;
```

## Boilerplate

```js
import React, { Component } from "react";
import { withParams } from "@significa/toolbox";

class App extends Component {
  componentDidUpdate(prevProps) {
    const { params } = this.props;

    if (prevProps.params.page !== params.page)) {
      this.actionFetch(params);
    }
  }

  handlePageChange = value => {
    this.props.updateParams({ "page", value, status: "filtered" });
  };

  render() {
    const { params } = this.props;

    return <p>{params.page}</p>;
  }
}

const ParamsWithParams = withParams({
  status: "all",
  page: 1
});

export default ParamsWithParams(App);
```

## Dependencies

- deep-equal
- qs
