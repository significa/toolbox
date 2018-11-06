import babel from "rollup-plugin-babel"
import resolve from "rollup-plugin-node-resolve"
import mapFiles from "map-files"
import pkg from "./package.json"

const config = {
  output: {
    format: "es",
    file: pkg.main
  },
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ],
  plugins: [
    resolve(),
    babel({
      presets: [
        "@babel/preset-env",
        "@babel/preset-react",
        "@babel/preset-flow"
      ],
      exclude: "node_modules/**",
      plugins: ["@babel/plugin-proposal-class-properties"]
    })
  ]
}

const allModules = {
  ...config,
  input: "./src/index.js"
}

const byPath = () => {
  const files = mapFiles("./src/***/index.js")

  return Object.keys(files).reduce((prev, key) => {
    const fileName = key.split("/")[1]

    return prev.concat({
      ...config,
      input: `./${key}`,
      output: {
        ...config.output,
        file: `./dist/${fileName}/index.js`
      }
    })
  }, [])
}

const allBundles = [...byPath(), allModules]

export default allBundles
