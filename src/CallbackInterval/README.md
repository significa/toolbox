# callbackInterval

It'll call a callback with options every 1000ms (default value).

- HOC
- setInterval
- callback
- Update data

## Props

| Name         | Type           | Required | Default value |
| ------------ | -------------- | -------- | ------------- |
| **callback** | `{Function}`   | `true`   | -             |
| **interval** | `{Number}`     | `false`  | `10000`       |
| **children** | `{React.Node}` | `true`   | -             |

## Usage

```jsx
class App extends PureComponent {
  callback = () => {
    const { callback, params } = this.props

    callback(params)
  }

  render() {
    return (
      <CallbackInterval callback={this.callback} interval={60000}>
        <p>Content</p>
      </CallbackInterval>
    )
  }
}
```
