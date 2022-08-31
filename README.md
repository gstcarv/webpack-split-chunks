# webpack split chunks with react

Trying to manage a react bundle in order to split bundle into small splitted js chunks

## Bundle Analisys

| 🚫 Bare webpack bundle                 | ✅ Splitted webpack bundle                     |
| -------------------------------------- | ---------------------------------------------- |
| ![bare bundle](./docs/full_bundle.png) | ![splitted bundle](./docs/splitted_bundle.png) |
|                                        |

## Runtime behaviour

At the first load, webpack will load each splitted package bundles first.

![splitted bundle](./docs/splitted_bundle_network.png)

Webpack will lazy-load Component B when needed with their dependency chunks (moment and lodash).

![splitted bundle](./docs/component_b.png)

When Component A requested, webpack will load it, but will not load lodash again, because it was loaded before.

![splitted bundle](./docs/component_a.png)
