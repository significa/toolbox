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
types.start; // ACTION_START
types.complete; // ACTION_COMPLETE
types.error; // ACTION_ERROR
```
