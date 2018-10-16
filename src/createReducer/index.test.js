import createReducer from "."

describe("createReducer", () => {
  it("returns the right value", () => {
    const initialState = 0
    const addCounter = n => n + 1
    const subCounter = n => n - 1

    const reducer = createReducer(initialState, { addCounter, subCounter })
    let state = reducer(initialState, { type: "addCounter" })
    state = reducer(state, { type: "addCounter" })

    expect(state).toEqual(2)

    state = reducer(state, { type: "subCounter" })
    expect(state).toEqual(1)
  })

  it("returns the initual value", () => {
    const reducer = createReducer(0, {})(0, { type: "addCounter" })
    expect(reducer).toEqual(0)
  })
})
