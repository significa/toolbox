# withParams

This HOC is useful when you need to control any state of the page using the query parameters. It's especially useful to page with pagination, dynamic tables, modals and to share URLs.

- HOC
- URL
- Query parameters
- Pagination

### Method

```js
this.props.updateParams({ name: string, value: string, resetPage?: boolean }) => void
```

### Data

```js
const { ...allQueries } = this.props.params;
```

## Boilerplate

```js
import React, { Component } from "react";
import { withParams } from "@significa/toolbox";

import objEqual from "deep-equal";

class App extends Component {
  componentDidUpdate(prevProps) {
    const { params } = this.props;

    if (!objEqual(prevProps.params, params)) {
      this.actionFetch(params);
    }
  }

  handlePageChange = value => {
    this.props.updateParams({ name: "page", value });
  };

  render() {
    const { params } = this.props;

    return <p>{params.page}</p>;
  }
}

const ParamsWithParams = withParams({
  page: 1
});

export default ParamsWithParams(App);
```

## Dependencies

- deep-equal
- qs
