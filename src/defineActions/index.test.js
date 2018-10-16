import defineActions from "."

test("defineActions", () => {
  const type = defineActions("MY_TYPE")

  expect(type.start).toEqual("MY_TYPE_START")
  expect(type.complete).toEqual("MY_TYPE_COMPLETE")
  expect(type.error).toEqual("MY_TYPE_ERROR")
})
