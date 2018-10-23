import React from "react"
import { mount } from "enzyme"

import CallbackInterval from "."

jest.useFakeTimers()

describe("callbackInterval", () => {
  const options = { key: "value", foo: "value2" }
  const mockCallback = jest.fn()
  const callback = () => mockCallback(options)
  const children = <p>children</p>
  const component = mount(
    <CallbackInterval callback={callback} interval={300}>
      {children}
    </CallbackInterval>
  )

  it("calls once when the component is mounted", () => {
    expect(mockCallback).toHaveBeenCalledTimes(1)
  })

  it("calls after each 300ms", () => {
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 300)

    jest.runOnlyPendingTimers()

    expect(mockCallback).toBeCalled()
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 300)
  })

  it("callback is called with arguments", () => {
    expect(mockCallback.mock.calls[0][0]).toEqual(options)
  })

  it("has children", () => {
    expect(component.contains(children)).toEqual(true)
  })

  it("no longer called after unmounted", () => {
    mockCallback.mockReset()
    component.unmount()
    jest.runAllTimers()

    expect(clearInterval).toBeCalled()
    expect(mockCallback).toHaveBeenCalledTimes(0)
  })
})
