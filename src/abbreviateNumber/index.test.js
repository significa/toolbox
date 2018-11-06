import abbreviateNumber from "."

describe("abbreviateNumber", () => {
  it("should return a string", () => {
    const result = abbreviateNumber(0)

    expect(typeof result).toBe("string")
  })

  it("should return the number abbreviated", () => {
    expect(abbreviateNumber(0)).toBe("0")
    expect(abbreviateNumber(100)).toBe("100")
    expect(abbreviateNumber(999)).toBe("999")

    expect(abbreviateNumber(1400)).toBe("1.4k")
    expect(abbreviateNumber(1450)).toBe("1.4k")
    expect(abbreviateNumber(1451)).toBe("1.5k")
    expect(abbreviateNumber(1500)).toBe("1.5k")
    expect(abbreviateNumber(1555)).toBe("1.6k")

    expect(abbreviateNumber(1000)).toBe("1k")
    expect(abbreviateNumber(100000)).toBe("100k")
    expect(abbreviateNumber(1000000)).toBe("1M")
    expect(abbreviateNumber(1e6)).toBe("1M")
    expect(abbreviateNumber(1e10)).toBe("10G")
    expect(abbreviateNumber(1e13)).toBe("10T")
    expect(abbreviateNumber(1e16)).toBe("10P")
    expect(abbreviateNumber(1e19)).toBe("10E")
  })

  it("should always return a valid value", () => {
    expect(abbreviateNumber(undefined)).toBe("0")
    expect(abbreviateNumber(null)).toBe("0")
    expect(abbreviateNumber({})).toBe("0")
    expect(abbreviateNumber([])).toBe("0")
    expect(abbreviateNumber("100")).toBe("100")
    expect(abbreviateNumber("1000")).toBe("1k")
  })
})
