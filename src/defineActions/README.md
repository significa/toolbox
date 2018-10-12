# defineActions

This function will return an object with initial string inputed plus three states: START, COMPLETE and ERROR

- Redux
- Action

## Usage

```js
const types = {
  ACTION: defineActions("ACTION")
};
```

## Returning

```js
types.START; // ACTION_START
types.COMPLETE; // ACTION_COMPLETE
types.ERROR; // ACTION_ERROR
```
