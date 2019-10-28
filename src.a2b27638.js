// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/styles.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/algorithms.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.heapSort = exports.quickSort = exports.mergeSort = exports.insertionSort = exports.selectionSort = exports.bubbleSort = exports.randomize = void 0;

const randomize = array => {
  for (let i = 0; i < array.length; i++) {
    array[i] = i + 1;
  }

  for (let i = 0; i < array.length; i++) {
    const j = Math.floor(Math.random() * (array.length - i) + i);
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

exports.randomize = randomize;

const bubbleSort = render => async array => {
  for (let i = array.length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      await render(j, j + 1);

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        await render(j, j + 1);
      }
    }
  }

  await render();
};

exports.bubbleSort = bubbleSort;

const selectionSort = render => async array => {
  for (let i = 0; i < array.length; i++) {
    let min = i;

    for (let j = i + 1; j < array.length; j++) {
      await render(j, min);

      if (array[j] < array[min]) {
        min = j;
      }
    }

    [array[i], array[min]] = [array[min], array[i]];
    await render(i, min);
  }

  await render();
};

exports.selectionSort = selectionSort;

const insertionSort = render => async array => {
  for (let i = 0; i < array.length; i++) {
    for (let j = i; j > 0 && array[j - 1] > array[j]; j--) {
      await render(j - 1, j);
      [array[j - 1], array[j]] = [array[j], array[j - 1]];
      await render(j - 1, j);
    }
  }

  await render();
};

exports.insertionSort = insertionSort;

const mergeSort = render => async array => {
  const aux = new Array(array.length);

  const merge = async (low, mid, high) => {
    for (let k = low; k <= high; k += 1) {
      await render(k);
      aux[k] = array[k];
      await render(k);
    }

    for (let i = low, j = mid + 1, k = low; k <= high; k += 1) {
      await render(k);

      if (j > high || i < mid + 1 && aux[i] < aux[j]) {
        array[k] = aux[i];
        i += 1;
      } else {
        array[k] = aux[j];
        j += 1;
      }

      await render(k);
    }
  };

  const sort = async (low, high) => {
    if (low < high) {
      const mid = low + Math.floor((high - low) / 2);
      await render(low, mid, high);
      await sort(low, mid);
      await sort(mid + 1, high);
      await merge(low, mid, high);
    }
  };

  await sort(0, array.length - 1);
  await render();
};

exports.mergeSort = mergeSort;

const heapSort = render => async array => {
  const sink = async (index, length) => {
    let parent = index;
    let child = parent * 2 + 1;

    while (child <= length && (array[parent] < array[child] || array[parent] < array[child + 1])) {
      await render(parent, child);

      if (child < length && array[child] < array[child + 1]) {
        child += 1;
      }

      if (array[parent] < array[child]) {
        [array[parent], array[child]] = [array[child], array[parent]];
        await render(parent, child);
      }

      parent = child;
      child = child * 2 + 1;
    }
  };

  const sort = async () => {
    for (let i = Math.floor(array.length / 2); i >= 0; i -= 1) {
      await render(i);
      await sink(i, array.length - 1);
    }

    for (let i = array.length - 1; i > 0; i -= 1) {
      await render(i);
      [array[0], array[i]] = [array[i], array[0]];
      await render(0, i);
      await sink(0, i - 1);
    }
  };

  await sort();
  await render();
};

exports.heapSort = heapSort;

const quickSort = render => async array => {
  const partition = async (low, high) => {
    let i = low + 1;
    let j = high;

    do {
      await render(i, j);

      while (i < high && array[i] < array[low]) {
        await render(i);
        i += 1;
      }

      while (j > low && array[j] > array[low]) {
        await render(j);
        j -= 1;
      }

      if (i < j) {
        [array[i], array[j]] = [array[j], array[i]];
        await render(i, j);
      }
    } while (i < j);

    [array[low], array[j]] = [array[j], array[low]];
    await render(low, j);
    return j;
  };

  const sort = async (low, high) => {
    if (low < high) {
      const pivot = await partition(low, high);
      await render(low, pivot, high);
      await sort(low, pivot - 1);
      await sort(pivot + 1, high);
    }
  };

  await sort(0, array.length - 1);
  await render();
};

exports.quickSort = quickSort;
},{}],"src/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = void 0;

const run = (action, delay) => new Promise(resolve => setTimeout(() => {
  action();
  resolve();
}, delay));

exports.run = run;
},{}],"src/index.js":[function(require,module,exports) {
"use strict";

require("./styles.css");

var _algorithms = require("./algorithms");

var _utils = require("./utils");

const RED = "red";
const GREEN = "green";
const LENGTH = 100;
const DELAY = 10;

const initialize = (array, items) => {
  const ul = document.createElement("ul");

  for (let i = 0; i < array.length; i++) {
    const li = document.createElement("li");
    li.style.height = `${array[i] * (100 / array.length)}%`;
    li.style.width = `${100 / array.length}%`;
    ul.appendChild(li);
    items[i] = li;
  }

  document.getElementById("app").appendChild(ul);
};

const render = (array, items) => {
  let previous = [];
  return (...indices) => (0, _utils.run)(() => {
    for (const index of previous) {
      items[index].classList.remove(RED);
      items[index].style.height = `${array[index] * (100 / items.length)}%`;
    }

    for (const index of indices) {
      items[index].classList.add(RED);
      items[index].style.height = `${array[index] * (100 / items.length)}%`;
    }

    previous = indices;
  }, DELAY);
};

const finalize = async items => {
  await (0, _utils.run)(() => {
    items[0].classList.add(RED);
  }, DELAY);
  let previous = items[0];

  for (const item of items.slice(1)) {
    await (0, _utils.run)(() => {
      previous.classList.replace(RED, GREEN);
      item.classList.add(RED);
      previous = item;
    }, DELAY);
  }

  await (0, _utils.run)(() => {
    items[items.length - 1].classList.replace(RED, GREEN);
  }, DELAY);
};

const randomized = (0, _algorithms.randomize)(new Array(LENGTH));

const start = async sort => {
  let array = randomized.slice();
  const items = new Array(LENGTH);
  initialize(array, items);
  await sort(render(array, items))(array);
  finalize(items);
};

[_algorithms.bubbleSort, _algorithms.selectionSort, _algorithms.insertionSort, _algorithms.mergeSort, _algorithms.heapSort, _algorithms.quickSort].forEach(start);
},{"./styles.css":"src/styles.css","./algorithms":"src/algorithms.js","./utils":"src/utils.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50882" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map