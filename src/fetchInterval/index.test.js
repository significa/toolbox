import React from "react"
import { shallow } from "enzyme"

import FetchInterval from "."

describe("fetchInterval", () => {
  // test callback
  it("calls function after n time", () => {
    const mockCallback = jest.fn()
    const Component = shallow(
      <FetchInterval fetch={mockCallback}>
        <p>children</p>
      </FetchInterval>
    )

    // expect(mockCallback.mock.calls.length).toBe(1)
  })

  // test options
  // test inverval
  // test children
})
