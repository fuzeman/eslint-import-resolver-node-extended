var resolve = require('resolve')
  , path = require('path')

var log = require('debug')('eslint-import-resolver-node-extended')

exports.interfaceVersion = 2

exports.resolve = function (source, file, config) {
  config = config || {}

  // Transform source with aliases
  source = transform(config.alias || {}, source)

  // Ignore core modules
  if (resolve.isCore(source)) {
    log('resolved to core')
    return { found: true, path: null }
  }

  // Resolve module
  log('Resolving:', source, 'from:', file)

  try {
    var resolvedPath = resolve.sync(source, opts(file, config))

    log('Resolved to:', resolvedPath)
    return { found: true, path: resolvedPath }
  } catch (err) {
    log('resolve threw error:', err)
    return { found: false }
  }
}

function transform(alias, source) {
  var pattern, substitute, re, match

  for(pattern in alias) {
    if(!alias.hasOwnProperty(pattern)) {
      continue
    }

    substitute = alias[pattern]

    // Ensure patterns are regular expressions
    if(!isRegExp(pattern)) {
      pattern = '^' + pattern + '(/.*|)$'
      substitute = substitute + '$1'
    }

    // Create expression
    re = new RegExp(pattern)

    // Match
    match = re.exec(source)

    if(match === null) {
        continue
    }

    // Transform name
    return source.replace(re, substitute)
  }

  return source
}

function isRegExp(string) {
    return string.startsWith('^') || string.endsWith('$')
}

function opts(file, config) {
  return Object.assign({
      // more closely matches Node (#333)
      extensions: ['.js', '.json'],
    },
    config,
    {
      // path.resolve will handle paths relative to CWD
      basedir: path.dirname(path.resolve(file)),
      packageFilter: packageFilter,

    })
}

function packageFilter(pkg) {
  if (pkg['jsnext:main']) {
    pkg['main'] = pkg['jsnext:main']
  }
  return pkg
}
