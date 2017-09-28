# eslint-import-resolver-node-extended

[![npm](https://img.shields.io/npm/v/eslint-import-resolver-node-extended.svg)](https://www.npmjs.com/package/eslint-import-resolver-node-extended)

Node import resolver for [`eslint-plugin-import`](https://www.npmjs.com/package/eslint-plugin-import).

```yaml
settings:
  import/resolver:
    node-extended:
      alias:
        example: ./src

      paths:
        # an array of absolute paths which will also be searched
        # think NODE_PATH
        - /usr/local/share/global_modules

      extensions:
        # if unset, default is just '.js', but it must be re-added explicitly if set
        - .js
        - .jsx
        - .es6
        - .coffee

      # this is technically for identifying `node_modules` alternate names
      moduleDirectory:

        - node_modules # defaults to 'node_modules', but...
        - bower_components

        - project/src  # can add a path segment here that will act like
                       # a source root, for in-project aliasing (i.e.
                       # `import MyStore from 'stores/my-store'`)
```

or to use the default options:

```yaml
settings:
  import/resolver: node-extended
```
