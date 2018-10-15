import babel from "rollup-plugin-babel"
import pkg from "./package.json"

export default {
  entry: "./src/index.js",
  format: "es",
  dest: pkg.main,
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ],
  plugins: [
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
