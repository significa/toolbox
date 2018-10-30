# withOutsideClickHandler

High order component useful to perform actions when clicking outside (e.g.: Popovers).

Just wrap the holder component with the HOC and give it a `handleClickOutside` prop. This prop will be called whenever someone clicks outside of this element.

## Example

```jsx
const PopoverHolder = withOutsideClickHandler(styled.div`
  display: inline-block;
  position: relative;
`)

class Example extends React.Component {
  state = { open: false }

  handleClickOutside = () => this.setState({ open: false })

  togglePopover = () => this.setState({ open: !this.state.open })

  render() {
    return (
      <PopoverHolder handleClickOutside={this.handleClickOutside}>
        <Button onClick={this.togglePopover}>Toggle popover</Button>
        <Popover isOpen={this.state.open}>Popover content</Popover>
      </PopoverHolder>
    )
  }
}
```
