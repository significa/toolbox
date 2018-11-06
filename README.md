# Significa Toolbox

## Redux utils

- [createReducer](https://github.com/Significa/toolbox/tree/master/src/createReducer)
- [defineActions](https://github.com/Significa/toolbox/tree/master/src/defineActions)

## HOC's

- [withParams](https://github.com/Significa/toolbox/tree/master/src/withParams)
- [CallbackInterval](https://github.com/Significa/toolbox/tree/master/src/CallbackInterval)

## Scripts

### Dev mode

| Script      | Comamand            | Description                                                              |
| ----------- | ------------------- | ------------------------------------------------------------------------ |
| Commit      | `$ yarn commit`     | See the documentation: [commitizen](http://commitizen.github.io/cz-cli/) |
| All tests   | `$ yarn test`       | Run jest tests                                                           |
| Watch tests | `$ yarn test:watch` | Watch the test script                                                    |
| Flow        | `$ yarn test:flow`  | Test flow type                                                           |

### Releases

**Before deploy**
[(Semver standard)](https://semver.org/)

| Script        | Comamand               | Description                                                         |
| ------------- | ---------------------- | ------------------------------------------------------------------- |
| Major version | `$ yarn release:major` | Version when you make incompatible API changes                      |
| Minor version | `$ yarn release:minor` | Version when you add functionality in a backwards-compatible manner |
| Patch version | `$ yarn release:patch` | Version when you make backwards-compatible bug fixes                |

_After each script the changelog file will be updated with the latest changes._

**Build and deploy**

| Script | Comamand        | Description                                            |
| ------ | --------------- | ------------------------------------------------------ |
| Build  | `$ yarn build`  | -                                                      |
| Deploy | `$ yarn deploy` | Remove dist filder, generate build then publish to npm |

---

<img width="130" alt="Significa Lda" src="https://user-images.githubusercontent.com/4838076/38634265-6545f090-3d98-11e8-8869-c5e477648fdf.png">

[Significa](https://significa.pt/) is an Oporto based digital studio founded in late 2013. Despite being specialised in Interaction Design and Brand Development, we believe that good design thinking can answer almost any question and solve most problems. We aim to provide meaningful design solutions to achieve the best user engagement possible in any situation.
