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
| **options**  | `{Any}`        | `false`  | `{}`          |
| **children** | `{React.Node}` | `true`   | -             |

## Usage

```jsx
class App extends PureComponent {
  render() {
    const { callback, params } = this.props;

    return (
      <CallbackInterval callback={callback} options={params} interval={60000}>
        <p>Content</p>
      </CallbackInterval>
    );
  }
}
```
