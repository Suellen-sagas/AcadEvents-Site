var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e2) {
    throw err = [e2], e2;
  }
};
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e2) {
    throw mod = 0, e2;
  }
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/@wallet-standard/app/lib/esm/wallets.js
function addRegisteredWallet(wallet) {
  cachedWalletsArray = void 0;
  registeredWalletsSet.add(wallet);
}
function removeRegisteredWallet(wallet) {
  cachedWalletsArray = void 0;
  registeredWalletsSet.delete(wallet);
}
function getWallets() {
  if (wallets)
    return wallets;
  wallets = Object.freeze({ register, get, on });
  if (typeof window === "undefined")
    return wallets;
  const api = Object.freeze({ register });
  try {
    window.addEventListener("wallet-standard:register-wallet", ({ detail: callback }) => callback(api));
  } catch (error) {
    console.error("wallet-standard:register-wallet event listener could not be added\n", error);
  }
  try {
    window.dispatchEvent(new AppReadyEvent(api));
  } catch (error) {
    console.error("wallet-standard:app-ready event could not be dispatched\n", error);
  }
  return wallets;
}
function register(...wallets2) {
  wallets2 = wallets2.filter((wallet) => !registeredWalletsSet.has(wallet));
  if (!wallets2.length)
    return () => {
    };
  wallets2.forEach((wallet) => addRegisteredWallet(wallet));
  listeners["register"]?.forEach((listener) => guard(() => listener(...wallets2)));
  return function unregister() {
    wallets2.forEach((wallet) => removeRegisteredWallet(wallet));
    listeners["unregister"]?.forEach((listener) => guard(() => listener(...wallets2)));
  };
}
function get() {
  if (!cachedWalletsArray) {
    cachedWalletsArray = [...registeredWalletsSet];
  }
  return cachedWalletsArray;
}
function on(event, listener) {
  listeners[event]?.push(listener) || (listeners[event] = [listener]);
  return function off() {
    listeners[event] = listeners[event]?.filter((existingListener) => listener !== existingListener);
  };
}
function guard(callback) {
  try {
    callback();
  } catch (error) {
    console.error(error);
  }
}
var __classPrivateFieldGet, __classPrivateFieldSet, _AppReadyEvent_detail, wallets, registeredWalletsSet, listeners, cachedWalletsArray, AppReadyEvent;
var init_wallets = __esm({
  "node_modules/@wallet-standard/app/lib/esm/wallets.js"() {
    __classPrivateFieldGet = function(receiver, state, kind, f) {
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    __classPrivateFieldSet = function(receiver, state, value, kind, f) {
      if (kind === "m") throw new TypeError("Private method is not writable");
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
    };
    wallets = void 0;
    registeredWalletsSet = /* @__PURE__ */ new Set();
    listeners = {};
    AppReadyEvent = class extends Event {
      get detail() {
        return __classPrivateFieldGet(this, _AppReadyEvent_detail, "f");
      }
      get type() {
        return "wallet-standard:app-ready";
      }
      constructor(api) {
        super("wallet-standard:app-ready", {
          bubbles: false,
          cancelable: false,
          composed: false
        });
        _AppReadyEvent_detail.set(this, void 0);
        __classPrivateFieldSet(this, _AppReadyEvent_detail, api, "f");
      }
      /** @deprecated */
      preventDefault() {
        throw new Error("preventDefault cannot be called");
      }
      /** @deprecated */
      stopImmediatePropagation() {
        throw new Error("stopImmediatePropagation cannot be called");
      }
      /** @deprecated */
      stopPropagation() {
        throw new Error("stopPropagation cannot be called");
      }
    };
    _AppReadyEvent_detail = /* @__PURE__ */ new WeakMap();
  }
});

// node_modules/@wallet-standard/app/lib/esm/index.js
var init_esm = __esm({
  "node_modules/@wallet-standard/app/lib/esm/index.js"() {
    init_wallets();
  }
});

// node_modules/react/cjs/react.development.js
var require_react_development = __commonJS({
  "node_modules/react/cjs/react.development.js"(exports, module) {
    "use strict";
    (function() {
      function defineDeprecationWarning(methodName, info) {
        Object.defineProperty(Component.prototype, methodName, {
          get: function() {
            console.warn(
              "%s(...) is deprecated in plain JavaScript React classes. %s",
              info[0],
              info[1]
            );
          }
        });
      }
      function getIteratorFn(maybeIterable) {
        if (null === maybeIterable || "object" !== typeof maybeIterable)
          return null;
        maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
        return "function" === typeof maybeIterable ? maybeIterable : null;
      }
      function warnNoop(publicInstance, callerName) {
        publicInstance = (publicInstance = publicInstance.constructor) && (publicInstance.displayName || publicInstance.name) || "ReactClass";
        var warningKey = publicInstance + "." + callerName;
        didWarnStateUpdateForUnmountedComponent[warningKey] || (console.error(
          "Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.",
          callerName,
          publicInstance
        ), didWarnStateUpdateForUnmountedComponent[warningKey] = true);
      }
      function Component(props, context, updater) {
        this.props = props;
        this.context = context;
        this.refs = emptyObject;
        this.updater = updater || ReactNoopUpdateQueue;
      }
      function ComponentDummy() {
      }
      function PureComponent(props, context, updater) {
        this.props = props;
        this.context = context;
        this.refs = emptyObject;
        this.updater = updater || ReactNoopUpdateQueue;
      }
      function noop() {
      }
      function testStringCoercion(value) {
        return "" + value;
      }
      function checkKeyStringCoercion(value) {
        try {
          testStringCoercion(value);
          var JSCompiler_inline_result = false;
        } catch (e2) {
          JSCompiler_inline_result = true;
        }
        if (JSCompiler_inline_result) {
          JSCompiler_inline_result = console;
          var JSCompiler_temp_const = JSCompiler_inline_result.error;
          var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
          JSCompiler_temp_const.call(
            JSCompiler_inline_result,
            "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
            JSCompiler_inline_result$jscomp$0
          );
          return testStringCoercion(value);
        }
      }
      function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type)
          return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch (type) {
          case REACT_FRAGMENT_TYPE:
            return "Fragment";
          case REACT_PROFILER_TYPE:
            return "Profiler";
          case REACT_STRICT_MODE_TYPE:
            return "StrictMode";
          case REACT_SUSPENSE_TYPE:
            return "Suspense";
          case REACT_SUSPENSE_LIST_TYPE:
            return "SuspenseList";
          case REACT_ACTIVITY_TYPE:
            return "Activity";
        }
        if ("object" === typeof type)
          switch ("number" === typeof type.tag && console.error(
            "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
          ), type.$$typeof) {
            case REACT_PORTAL_TYPE:
              return "Portal";
            case REACT_CONTEXT_TYPE:
              return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
              return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
              var innerType = type.render;
              type = type.displayName;
              type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
              return type;
            case REACT_MEMO_TYPE:
              return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
              innerType = type._payload;
              type = type._init;
              try {
                return getComponentNameFromType(type(innerType));
              } catch (x) {
              }
          }
        return null;
      }
      function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE)
          return "<...>";
        try {
          var name = getComponentNameFromType(type);
          return name ? "<" + name + ">" : "<...>";
        } catch (x) {
          return "<...>";
        }
      }
      function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
      }
      function UnknownOwner() {
        return Error("react-stack-top-frame");
      }
      function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
          var getter = Object.getOwnPropertyDescriptor(config, "key").get;
          if (getter && getter.isReactWarning) return false;
        }
        return void 0 !== config.key;
      }
      function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
          specialPropKeyWarningShown || (specialPropKeyWarningShown = true, console.error(
            "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
            displayName
          ));
        }
        warnAboutAccessingKey.isReactWarning = true;
        Object.defineProperty(props, "key", {
          get: warnAboutAccessingKey,
          configurable: true
        });
      }
      function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = true, console.error(
          "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
        ));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
      }
      function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
          $$typeof: REACT_ELEMENT_TYPE,
          type,
          key,
          props,
          _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
          enumerable: false,
          get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", { enumerable: false, value: null });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: null
        });
        Object.defineProperty(type, "_debugStack", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
      }
      function cloneAndReplaceKey(oldElement, newKey) {
        newKey = ReactElement(
          oldElement.type,
          newKey,
          oldElement.props,
          oldElement._owner,
          oldElement._debugStack,
          oldElement._debugTask
        );
        oldElement._store && (newKey._store.validated = oldElement._store.validated);
        return newKey;
      }
      function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
      }
      function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
      }
      function escape(key) {
        var escaperLookup = { "=": "=0", ":": "=2" };
        return "$" + key.replace(/[=:]/g, function(match) {
          return escaperLookup[match];
        });
      }
      function getElementKey(element, index) {
        return "object" === typeof element && null !== element && null != element.key ? (checkKeyStringCoercion(element.key), escape("" + element.key)) : index.toString(36);
      }
      function resolveThenable(thenable) {
        switch (thenable.status) {
          case "fulfilled":
            return thenable.value;
          case "rejected":
            throw thenable.reason;
          default:
            switch ("string" === typeof thenable.status ? thenable.then(noop, noop) : (thenable.status = "pending", thenable.then(
              function(fulfilledValue) {
                "pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
              },
              function(error) {
                "pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
              }
            )), thenable.status) {
              case "fulfilled":
                return thenable.value;
              case "rejected":
                throw thenable.reason;
            }
        }
        throw thenable;
      }
      function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
        var type = typeof children;
        if ("undefined" === type || "boolean" === type) children = null;
        var invokeCallback = false;
        if (null === children) invokeCallback = true;
        else
          switch (type) {
            case "bigint":
            case "string":
            case "number":
              invokeCallback = true;
              break;
            case "object":
              switch (children.$$typeof) {
                case REACT_ELEMENT_TYPE:
                case REACT_PORTAL_TYPE:
                  invokeCallback = true;
                  break;
                case REACT_LAZY_TYPE:
                  return invokeCallback = children._init, mapIntoArray(
                    invokeCallback(children._payload),
                    array,
                    escapedPrefix,
                    nameSoFar,
                    callback
                  );
              }
          }
        if (invokeCallback) {
          invokeCallback = children;
          callback = callback(invokeCallback);
          var childKey = "" === nameSoFar ? "." + getElementKey(invokeCallback, 0) : nameSoFar;
          isArrayImpl(callback) ? (escapedPrefix = "", null != childKey && (escapedPrefix = childKey.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
            return c;
          })) : null != callback && (isValidElement(callback) && (null != callback.key && (invokeCallback && invokeCallback.key === callback.key || checkKeyStringCoercion(callback.key)), escapedPrefix = cloneAndReplaceKey(
            callback,
            escapedPrefix + (null == callback.key || invokeCallback && invokeCallback.key === callback.key ? "" : ("" + callback.key).replace(
              userProvidedKeyEscapeRegex,
              "$&/"
            ) + "/") + childKey
          ), "" !== nameSoFar && null != invokeCallback && isValidElement(invokeCallback) && null == invokeCallback.key && invokeCallback._store && !invokeCallback._store.validated && (escapedPrefix._store.validated = 2), callback = escapedPrefix), array.push(callback));
          return 1;
        }
        invokeCallback = 0;
        childKey = "" === nameSoFar ? "." : nameSoFar + ":";
        if (isArrayImpl(children))
          for (var i = 0; i < children.length; i++)
            nameSoFar = children[i], type = childKey + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(
              nameSoFar,
              array,
              escapedPrefix,
              type,
              callback
            );
        else if (i = getIteratorFn(children), "function" === typeof i)
          for (i === children.entries && (didWarnAboutMaps || console.warn(
            "Using Maps as children is not supported. Use an array of keyed ReactElements instead."
          ), didWarnAboutMaps = true), children = i.call(children), i = 0; !(nameSoFar = children.next()).done; )
            nameSoFar = nameSoFar.value, type = childKey + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(
              nameSoFar,
              array,
              escapedPrefix,
              type,
              callback
            );
        else if ("object" === type) {
          if ("function" === typeof children.then)
            return mapIntoArray(
              resolveThenable(children),
              array,
              escapedPrefix,
              nameSoFar,
              callback
            );
          array = String(children);
          throw Error(
            "Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead."
          );
        }
        return invokeCallback;
      }
      function mapChildren(children, func, context) {
        if (null == children) return children;
        var result = [], count = 0;
        mapIntoArray(children, result, "", "", function(child) {
          return func.call(context, child, count++);
        });
        return result;
      }
      function lazyInitializer(payload) {
        if (-1 === payload._status) {
          var ioInfo = payload._ioInfo;
          null != ioInfo && (ioInfo.start = ioInfo.end = performance.now());
          ioInfo = payload._result;
          var thenable = ioInfo();
          thenable.then(
            function(moduleObject) {
              if (0 === payload._status || -1 === payload._status) {
                payload._status = 1;
                payload._result = moduleObject;
                var _ioInfo = payload._ioInfo;
                null != _ioInfo && (_ioInfo.end = performance.now());
                void 0 === thenable.status && (thenable.status = "fulfilled", thenable.value = moduleObject);
              }
            },
            function(error) {
              if (0 === payload._status || -1 === payload._status) {
                payload._status = 2;
                payload._result = error;
                var _ioInfo2 = payload._ioInfo;
                null != _ioInfo2 && (_ioInfo2.end = performance.now());
                void 0 === thenable.status && (thenable.status = "rejected", thenable.reason = error);
              }
            }
          );
          ioInfo = payload._ioInfo;
          if (null != ioInfo) {
            ioInfo.value = thenable;
            var displayName = thenable.displayName;
            "string" === typeof displayName && (ioInfo.name = displayName);
          }
          -1 === payload._status && (payload._status = 0, payload._result = thenable);
        }
        if (1 === payload._status)
          return ioInfo = payload._result, void 0 === ioInfo && console.error(
            "lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?",
            ioInfo
          ), "default" in ioInfo || console.error(
            "lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))",
            ioInfo
          ), ioInfo.default;
        throw payload._result;
      }
      function resolveDispatcher() {
        var dispatcher = ReactSharedInternals.H;
        null === dispatcher && console.error(
          "Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem."
        );
        return dispatcher;
      }
      function releaseAsyncTransition() {
        ReactSharedInternals.asyncTransitions--;
      }
      function enqueueTask(task) {
        if (null === enqueueTaskImpl)
          try {
            var requireString = ("require" + Math.random()).slice(0, 7);
            enqueueTaskImpl = (module && module[requireString]).call(
              module,
              "timers"
            ).setImmediate;
          } catch (_err) {
            enqueueTaskImpl = function(callback) {
              false === didWarnAboutMessageChannel && (didWarnAboutMessageChannel = true, "undefined" === typeof MessageChannel && console.error(
                "This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."
              ));
              var channel = new MessageChannel();
              channel.port1.onmessage = callback;
              channel.port2.postMessage(void 0);
            };
          }
        return enqueueTaskImpl(task);
      }
      function aggregateErrors(errors) {
        return 1 < errors.length && "function" === typeof AggregateError ? new AggregateError(errors) : errors[0];
      }
      function popActScope(prevActQueue, prevActScopeDepth) {
        prevActScopeDepth !== actScopeDepth - 1 && console.error(
          "You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "
        );
        actScopeDepth = prevActScopeDepth;
      }
      function recursivelyFlushAsyncActWork(returnValue, resolve, reject) {
        var queue = ReactSharedInternals.actQueue;
        if (null !== queue)
          if (0 !== queue.length)
            try {
              flushActQueue(queue);
              enqueueTask(function() {
                return recursivelyFlushAsyncActWork(returnValue, resolve, reject);
              });
              return;
            } catch (error) {
              ReactSharedInternals.thrownErrors.push(error);
            }
          else ReactSharedInternals.actQueue = null;
        0 < ReactSharedInternals.thrownErrors.length ? (queue = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, reject(queue)) : resolve(returnValue);
      }
      function flushActQueue(queue) {
        if (!isFlushing) {
          isFlushing = true;
          var i = 0;
          try {
            for (; i < queue.length; i++) {
              var callback = queue[i];
              do {
                ReactSharedInternals.didUsePromise = false;
                var continuation = callback(false);
                if (null !== continuation) {
                  if (ReactSharedInternals.didUsePromise) {
                    queue[i] = callback;
                    queue.splice(0, i);
                    return;
                  }
                  callback = continuation;
                } else break;
              } while (1);
            }
            queue.length = 0;
          } catch (error) {
            queue.splice(0, i + 1), ReactSharedInternals.thrownErrors.push(error);
          } finally {
            isFlushing = false;
          }
        }
      }
      "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
      var REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = /* @__PURE__ */ Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = /* @__PURE__ */ Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = /* @__PURE__ */ Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = /* @__PURE__ */ Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = /* @__PURE__ */ Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = /* @__PURE__ */ Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = /* @__PURE__ */ Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = /* @__PURE__ */ Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = /* @__PURE__ */ Symbol.for("react.memo"), REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = /* @__PURE__ */ Symbol.for("react.activity"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator, didWarnStateUpdateForUnmountedComponent = {}, ReactNoopUpdateQueue = {
        isMounted: function() {
          return false;
        },
        enqueueForceUpdate: function(publicInstance) {
          warnNoop(publicInstance, "forceUpdate");
        },
        enqueueReplaceState: function(publicInstance) {
          warnNoop(publicInstance, "replaceState");
        },
        enqueueSetState: function(publicInstance) {
          warnNoop(publicInstance, "setState");
        }
      }, assign = Object.assign, emptyObject = {};
      Object.freeze(emptyObject);
      Component.prototype.isReactComponent = {};
      Component.prototype.setState = function(partialState, callback) {
        if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState)
          throw Error(
            "takes an object of state variables to update or a function which returns an object of state variables."
          );
        this.updater.enqueueSetState(this, partialState, callback, "setState");
      };
      Component.prototype.forceUpdate = function(callback) {
        this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
      };
      var deprecatedAPIs = {
        isMounted: [
          "isMounted",
          "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."
        ],
        replaceState: [
          "replaceState",
          "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."
        ]
      };
      for (fnName in deprecatedAPIs)
        deprecatedAPIs.hasOwnProperty(fnName) && defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
      ComponentDummy.prototype = Component.prototype;
      deprecatedAPIs = PureComponent.prototype = new ComponentDummy();
      deprecatedAPIs.constructor = PureComponent;
      assign(deprecatedAPIs, Component.prototype);
      deprecatedAPIs.isPureReactComponent = true;
      var isArrayImpl = Array.isArray, REACT_CLIENT_REFERENCE = /* @__PURE__ */ Symbol.for("react.client.reference"), ReactSharedInternals = {
        H: null,
        A: null,
        T: null,
        S: null,
        actQueue: null,
        asyncTransitions: 0,
        isBatchingLegacy: false,
        didScheduleLegacyUpdate: false,
        didUsePromise: false,
        thrownErrors: [],
        getCurrentStack: null,
        recentlyCreatedOwnerStacks: 0
      }, hasOwnProperty = Object.prototype.hasOwnProperty, createTask = console.createTask ? console.createTask : function() {
        return null;
      };
      deprecatedAPIs = {
        react_stack_bottom_frame: function(callStackForError) {
          return callStackForError();
        }
      };
      var specialPropKeyWarningShown, didWarnAboutOldJSXRuntime;
      var didWarnAboutElementRef = {};
      var unknownOwnerDebugStack = deprecatedAPIs.react_stack_bottom_frame.bind(
        deprecatedAPIs,
        UnknownOwner
      )();
      var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
      var didWarnAboutMaps = false, userProvidedKeyEscapeRegex = /\/+/g, reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
        if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
          var event = new window.ErrorEvent("error", {
            bubbles: true,
            cancelable: true,
            message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
            error
          });
          if (!window.dispatchEvent(event)) return;
        } else if ("object" === typeof process && "function" === typeof process.emit) {
          process.emit("uncaughtException", error);
          return;
        }
        console.error(error);
      }, didWarnAboutMessageChannel = false, enqueueTaskImpl = null, actScopeDepth = 0, didWarnNoAwaitAct = false, isFlushing = false, queueSeveralMicrotasks = "function" === typeof queueMicrotask ? function(callback) {
        queueMicrotask(function() {
          return queueMicrotask(callback);
        });
      } : enqueueTask;
      deprecatedAPIs = Object.freeze({
        __proto__: null,
        c: function(size) {
          return resolveDispatcher().useMemoCache(size);
        }
      });
      var fnName = {
        map: mapChildren,
        forEach: function(children, forEachFunc, forEachContext) {
          mapChildren(
            children,
            function() {
              forEachFunc.apply(this, arguments);
            },
            forEachContext
          );
        },
        count: function(children) {
          var n = 0;
          mapChildren(children, function() {
            n++;
          });
          return n;
        },
        toArray: function(children) {
          return mapChildren(children, function(child) {
            return child;
          }) || [];
        },
        only: function(children) {
          if (!isValidElement(children))
            throw Error(
              "React.Children.only expected to receive a single React element child."
            );
          return children;
        }
      };
      exports.Activity = REACT_ACTIVITY_TYPE;
      exports.Children = fnName;
      exports.Component = Component;
      exports.Fragment = REACT_FRAGMENT_TYPE;
      exports.Profiler = REACT_PROFILER_TYPE;
      exports.PureComponent = PureComponent;
      exports.StrictMode = REACT_STRICT_MODE_TYPE;
      exports.Suspense = REACT_SUSPENSE_TYPE;
      exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
      exports.__COMPILER_RUNTIME = deprecatedAPIs;
      exports.act = function(callback) {
        var prevActQueue = ReactSharedInternals.actQueue, prevActScopeDepth = actScopeDepth;
        actScopeDepth++;
        var queue = ReactSharedInternals.actQueue = null !== prevActQueue ? prevActQueue : [], didAwaitActCall = false;
        try {
          var result = callback();
        } catch (error) {
          ReactSharedInternals.thrownErrors.push(error);
        }
        if (0 < ReactSharedInternals.thrownErrors.length)
          throw popActScope(prevActQueue, prevActScopeDepth), callback = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, callback;
        if (null !== result && "object" === typeof result && "function" === typeof result.then) {
          var thenable = result;
          queueSeveralMicrotasks(function() {
            didAwaitActCall || didWarnNoAwaitAct || (didWarnNoAwaitAct = true, console.error(
              "You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"
            ));
          });
          return {
            then: function(resolve, reject) {
              didAwaitActCall = true;
              thenable.then(
                function(returnValue) {
                  popActScope(prevActQueue, prevActScopeDepth);
                  if (0 === prevActScopeDepth) {
                    try {
                      flushActQueue(queue), enqueueTask(function() {
                        return recursivelyFlushAsyncActWork(
                          returnValue,
                          resolve,
                          reject
                        );
                      });
                    } catch (error$0) {
                      ReactSharedInternals.thrownErrors.push(error$0);
                    }
                    if (0 < ReactSharedInternals.thrownErrors.length) {
                      var _thrownError = aggregateErrors(
                        ReactSharedInternals.thrownErrors
                      );
                      ReactSharedInternals.thrownErrors.length = 0;
                      reject(_thrownError);
                    }
                  } else resolve(returnValue);
                },
                function(error) {
                  popActScope(prevActQueue, prevActScopeDepth);
                  0 < ReactSharedInternals.thrownErrors.length ? (error = aggregateErrors(
                    ReactSharedInternals.thrownErrors
                  ), ReactSharedInternals.thrownErrors.length = 0, reject(error)) : reject(error);
                }
              );
            }
          };
        }
        var returnValue$jscomp$0 = result;
        popActScope(prevActQueue, prevActScopeDepth);
        0 === prevActScopeDepth && (flushActQueue(queue), 0 !== queue.length && queueSeveralMicrotasks(function() {
          didAwaitActCall || didWarnNoAwaitAct || (didWarnNoAwaitAct = true, console.error(
            "A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)"
          ));
        }), ReactSharedInternals.actQueue = null);
        if (0 < ReactSharedInternals.thrownErrors.length)
          throw callback = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, callback;
        return {
          then: function(resolve, reject) {
            didAwaitActCall = true;
            0 === prevActScopeDepth ? (ReactSharedInternals.actQueue = queue, enqueueTask(function() {
              return recursivelyFlushAsyncActWork(
                returnValue$jscomp$0,
                resolve,
                reject
              );
            })) : resolve(returnValue$jscomp$0);
          }
        };
      };
      exports.cache = function(fn) {
        return function() {
          return fn.apply(null, arguments);
        };
      };
      exports.cacheSignal = function() {
        return null;
      };
      exports.captureOwnerStack = function() {
        var getCurrentStack = ReactSharedInternals.getCurrentStack;
        return null === getCurrentStack ? null : getCurrentStack();
      };
      exports.cloneElement = function(element, config, children) {
        if (null === element || void 0 === element)
          throw Error(
            "The argument must be a React element, but you passed " + element + "."
          );
        var props = assign({}, element.props), key = element.key, owner = element._owner;
        if (null != config) {
          var JSCompiler_inline_result;
          a: {
            if (hasOwnProperty.call(config, "ref") && (JSCompiler_inline_result = Object.getOwnPropertyDescriptor(
              config,
              "ref"
            ).get) && JSCompiler_inline_result.isReactWarning) {
              JSCompiler_inline_result = false;
              break a;
            }
            JSCompiler_inline_result = void 0 !== config.ref;
          }
          JSCompiler_inline_result && (owner = getOwner());
          hasValidKey(config) && (checkKeyStringCoercion(config.key), key = "" + config.key);
          for (propName in config)
            !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
        }
        var propName = arguments.length - 2;
        if (1 === propName) props.children = children;
        else if (1 < propName) {
          JSCompiler_inline_result = Array(propName);
          for (var i = 0; i < propName; i++)
            JSCompiler_inline_result[i] = arguments[i + 2];
          props.children = JSCompiler_inline_result;
        }
        props = ReactElement(
          element.type,
          key,
          props,
          owner,
          element._debugStack,
          element._debugTask
        );
        for (key = 2; key < arguments.length; key++)
          validateChildKeys(arguments[key]);
        return props;
      };
      exports.createContext = function(defaultValue) {
        defaultValue = {
          $$typeof: REACT_CONTEXT_TYPE,
          _currentValue: defaultValue,
          _currentValue2: defaultValue,
          _threadCount: 0,
          Provider: null,
          Consumer: null
        };
        defaultValue.Provider = defaultValue;
        defaultValue.Consumer = {
          $$typeof: REACT_CONSUMER_TYPE,
          _context: defaultValue
        };
        defaultValue._currentRenderer = null;
        defaultValue._currentRenderer2 = null;
        return defaultValue;
      };
      exports.createElement = function(type, config, children) {
        for (var i = 2; i < arguments.length; i++)
          validateChildKeys(arguments[i]);
        i = {};
        var key = null;
        if (null != config)
          for (propName in didWarnAboutOldJSXRuntime || !("__self" in config) || "key" in config || (didWarnAboutOldJSXRuntime = true, console.warn(
            "Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform"
          )), hasValidKey(config) && (checkKeyStringCoercion(config.key), key = "" + config.key), config)
            hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (i[propName] = config[propName]);
        var childrenLength = arguments.length - 2;
        if (1 === childrenLength) i.children = children;
        else if (1 < childrenLength) {
          for (var childArray = Array(childrenLength), _i = 0; _i < childrenLength; _i++)
            childArray[_i] = arguments[_i + 2];
          Object.freeze && Object.freeze(childArray);
          i.children = childArray;
        }
        if (type && type.defaultProps)
          for (propName in childrenLength = type.defaultProps, childrenLength)
            void 0 === i[propName] && (i[propName] = childrenLength[propName]);
        key && defineKeyPropWarningGetter(
          i,
          "function" === typeof type ? type.displayName || type.name || "Unknown" : type
        );
        var propName = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return ReactElement(
          type,
          key,
          i,
          getOwner(),
          propName ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
          propName ? createTask(getTaskName(type)) : unknownOwnerDebugTask
        );
      };
      exports.createRef = function() {
        var refObject = { current: null };
        Object.seal(refObject);
        return refObject;
      };
      exports.forwardRef = function(render) {
        null != render && render.$$typeof === REACT_MEMO_TYPE ? console.error(
          "forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...))."
        ) : "function" !== typeof render ? console.error(
          "forwardRef requires a render function but was given %s.",
          null === render ? "null" : typeof render
        ) : 0 !== render.length && 2 !== render.length && console.error(
          "forwardRef render functions accept exactly two parameters: props and ref. %s",
          1 === render.length ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."
        );
        null != render && null != render.defaultProps && console.error(
          "forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?"
        );
        var elementType = { $$typeof: REACT_FORWARD_REF_TYPE, render }, ownName;
        Object.defineProperty(elementType, "displayName", {
          enumerable: false,
          configurable: true,
          get: function() {
            return ownName;
          },
          set: function(name) {
            ownName = name;
            render.name || render.displayName || (Object.defineProperty(render, "name", { value: name }), render.displayName = name);
          }
        });
        return elementType;
      };
      exports.isValidElement = isValidElement;
      exports.lazy = function(ctor) {
        ctor = { _status: -1, _result: ctor };
        var lazyType = {
          $$typeof: REACT_LAZY_TYPE,
          _payload: ctor,
          _init: lazyInitializer
        }, ioInfo = {
          name: "lazy",
          start: -1,
          end: -1,
          value: null,
          owner: null,
          debugStack: Error("react-stack-top-frame"),
          debugTask: console.createTask ? console.createTask("lazy()") : null
        };
        ctor._ioInfo = ioInfo;
        lazyType._debugInfo = [{ awaited: ioInfo }];
        return lazyType;
      };
      exports.memo = function(type, compare) {
        null == type && console.error(
          "memo: The first argument must be a component. Instead received: %s",
          null === type ? "null" : typeof type
        );
        compare = {
          $$typeof: REACT_MEMO_TYPE,
          type,
          compare: void 0 === compare ? null : compare
        };
        var ownName;
        Object.defineProperty(compare, "displayName", {
          enumerable: false,
          configurable: true,
          get: function() {
            return ownName;
          },
          set: function(name) {
            ownName = name;
            type.name || type.displayName || (Object.defineProperty(type, "name", { value: name }), type.displayName = name);
          }
        });
        return compare;
      };
      exports.startTransition = function(scope) {
        var prevTransition = ReactSharedInternals.T, currentTransition = {};
        currentTransition._updatedFibers = /* @__PURE__ */ new Set();
        ReactSharedInternals.T = currentTransition;
        try {
          var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
          null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
          "object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && (ReactSharedInternals.asyncTransitions++, returnValue.then(releaseAsyncTransition, releaseAsyncTransition), returnValue.then(noop, reportGlobalError));
        } catch (error) {
          reportGlobalError(error);
        } finally {
          null === prevTransition && currentTransition._updatedFibers && (scope = currentTransition._updatedFibers.size, currentTransition._updatedFibers.clear(), 10 < scope && console.warn(
            "Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."
          )), null !== prevTransition && null !== currentTransition.types && (null !== prevTransition.types && prevTransition.types !== currentTransition.types && console.error(
            "We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."
          ), prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
        }
      };
      exports.unstable_useCacheRefresh = function() {
        return resolveDispatcher().useCacheRefresh();
      };
      exports.use = function(usable) {
        return resolveDispatcher().use(usable);
      };
      exports.useActionState = function(action, initialState, permalink) {
        return resolveDispatcher().useActionState(
          action,
          initialState,
          permalink
        );
      };
      exports.useCallback = function(callback, deps) {
        return resolveDispatcher().useCallback(callback, deps);
      };
      exports.useContext = function(Context) {
        var dispatcher = resolveDispatcher();
        Context.$$typeof === REACT_CONSUMER_TYPE && console.error(
          "Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?"
        );
        return dispatcher.useContext(Context);
      };
      exports.useDebugValue = function(value, formatterFn) {
        return resolveDispatcher().useDebugValue(value, formatterFn);
      };
      exports.useDeferredValue = function(value, initialValue) {
        return resolveDispatcher().useDeferredValue(value, initialValue);
      };
      exports.useEffect = function(create, deps) {
        null == create && console.warn(
          "React Hook useEffect requires an effect callback. Did you forget to pass a callback to the hook?"
        );
        return resolveDispatcher().useEffect(create, deps);
      };
      exports.useEffectEvent = function(callback) {
        return resolveDispatcher().useEffectEvent(callback);
      };
      exports.useId = function() {
        return resolveDispatcher().useId();
      };
      exports.useImperativeHandle = function(ref, create, deps) {
        return resolveDispatcher().useImperativeHandle(ref, create, deps);
      };
      exports.useInsertionEffect = function(create, deps) {
        null == create && console.warn(
          "React Hook useInsertionEffect requires an effect callback. Did you forget to pass a callback to the hook?"
        );
        return resolveDispatcher().useInsertionEffect(create, deps);
      };
      exports.useLayoutEffect = function(create, deps) {
        null == create && console.warn(
          "React Hook useLayoutEffect requires an effect callback. Did you forget to pass a callback to the hook?"
        );
        return resolveDispatcher().useLayoutEffect(create, deps);
      };
      exports.useMemo = function(create, deps) {
        return resolveDispatcher().useMemo(create, deps);
      };
      exports.useOptimistic = function(passthrough, reducer) {
        return resolveDispatcher().useOptimistic(passthrough, reducer);
      };
      exports.useReducer = function(reducer, initialArg, init) {
        return resolveDispatcher().useReducer(reducer, initialArg, init);
      };
      exports.useRef = function(initialValue) {
        return resolveDispatcher().useRef(initialValue);
      };
      exports.useState = function(initialState) {
        return resolveDispatcher().useState(initialState);
      };
      exports.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
        return resolveDispatcher().useSyncExternalStore(
          subscribe,
          getSnapshot,
          getServerSnapshot
        );
      };
      exports.useTransition = function() {
        return resolveDispatcher().useTransition();
      };
      exports.version = "19.2.8";
      "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
    })();
  }
});

// node_modules/react/index.js
var require_react = __commonJS({
  "node_modules/react/index.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_react_development();
    }
  }
});

// node_modules/react/cjs/react-jsx-runtime.development.js
var require_react_jsx_runtime_development = __commonJS({
  "node_modules/react/cjs/react-jsx-runtime.development.js"(exports) {
    "use strict";
    (function() {
      function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type)
          return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch (type) {
          case REACT_FRAGMENT_TYPE:
            return "Fragment";
          case REACT_PROFILER_TYPE:
            return "Profiler";
          case REACT_STRICT_MODE_TYPE:
            return "StrictMode";
          case REACT_SUSPENSE_TYPE:
            return "Suspense";
          case REACT_SUSPENSE_LIST_TYPE:
            return "SuspenseList";
          case REACT_ACTIVITY_TYPE:
            return "Activity";
        }
        if ("object" === typeof type)
          switch ("number" === typeof type.tag && console.error(
            "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
          ), type.$$typeof) {
            case REACT_PORTAL_TYPE:
              return "Portal";
            case REACT_CONTEXT_TYPE:
              return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
              return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
              var innerType = type.render;
              type = type.displayName;
              type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
              return type;
            case REACT_MEMO_TYPE:
              return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
              innerType = type._payload;
              type = type._init;
              try {
                return getComponentNameFromType(type(innerType));
              } catch (x) {
              }
          }
        return null;
      }
      function testStringCoercion(value) {
        return "" + value;
      }
      function checkKeyStringCoercion(value) {
        try {
          testStringCoercion(value);
          var JSCompiler_inline_result = false;
        } catch (e2) {
          JSCompiler_inline_result = true;
        }
        if (JSCompiler_inline_result) {
          JSCompiler_inline_result = console;
          var JSCompiler_temp_const = JSCompiler_inline_result.error;
          var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
          JSCompiler_temp_const.call(
            JSCompiler_inline_result,
            "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
            JSCompiler_inline_result$jscomp$0
          );
          return testStringCoercion(value);
        }
      }
      function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE)
          return "<...>";
        try {
          var name = getComponentNameFromType(type);
          return name ? "<" + name + ">" : "<...>";
        } catch (x) {
          return "<...>";
        }
      }
      function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
      }
      function UnknownOwner() {
        return Error("react-stack-top-frame");
      }
      function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
          var getter = Object.getOwnPropertyDescriptor(config, "key").get;
          if (getter && getter.isReactWarning) return false;
        }
        return void 0 !== config.key;
      }
      function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
          specialPropKeyWarningShown || (specialPropKeyWarningShown = true, console.error(
            "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
            displayName
          ));
        }
        warnAboutAccessingKey.isReactWarning = true;
        Object.defineProperty(props, "key", {
          get: warnAboutAccessingKey,
          configurable: true
        });
      }
      function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = true, console.error(
          "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
        ));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
      }
      function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
          $$typeof: REACT_ELEMENT_TYPE,
          type,
          key,
          props,
          _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
          enumerable: false,
          get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", { enumerable: false, value: null });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: null
        });
        Object.defineProperty(type, "_debugStack", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
      }
      function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children)
          if (isStaticChildren)
            if (isArrayImpl(children)) {
              for (isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)
                validateChildKeys(children[isStaticChildren]);
              Object.freeze && Object.freeze(children);
            } else
              console.error(
                "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
              );
          else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
          children = getComponentNameFromType(type);
          var keys = Object.keys(config).filter(function(k) {
            return "key" !== k;
          });
          isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
          didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error(
            'A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />',
            isStaticChildren,
            children,
            keys,
            children
          ), didWarnAboutKeySpread[children + isStaticChildren] = true);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
          maybeKey = {};
          for (var propName in config)
            "key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(
          maybeKey,
          "function" === typeof type ? type.displayName || type.name || "Unknown" : type
        );
        return ReactElement(
          type,
          children,
          maybeKey,
          getOwner(),
          debugStack,
          debugTask
        );
      }
      function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
      }
      function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
      }
      var React = require_react(), REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = /* @__PURE__ */ Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = /* @__PURE__ */ Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = /* @__PURE__ */ Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = /* @__PURE__ */ Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = /* @__PURE__ */ Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = /* @__PURE__ */ Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = /* @__PURE__ */ Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = /* @__PURE__ */ Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = /* @__PURE__ */ Symbol.for("react.memo"), REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = /* @__PURE__ */ Symbol.for("react.activity"), REACT_CLIENT_REFERENCE = /* @__PURE__ */ Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
      };
      React = {
        react_stack_bottom_frame: function(callStackForError) {
          return callStackForError();
        }
      };
      var specialPropKeyWarningShown;
      var didWarnAboutElementRef = {};
      var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(
        React,
        UnknownOwner
      )();
      var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
      var didWarnAboutKeySpread = {};
      exports.Fragment = REACT_FRAGMENT_TYPE;
      exports.jsx = function(type, config, maybeKey) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return jsxDEVImpl(
          type,
          config,
          maybeKey,
          false,
          trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
          trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
        );
      };
      exports.jsxs = function(type, config, maybeKey) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return jsxDEVImpl(
          type,
          config,
          maybeKey,
          true,
          trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
          trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
        );
      };
    })();
  }
});

// node_modules/react/jsx-runtime.js
var require_jsx_runtime = __commonJS({
  "node_modules/react/jsx-runtime.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_react_jsx_runtime_development();
    }
  }
});

// node_modules/@solana-commerce/connector/dist/index.mjs
function injectArcConnectorGlobalStyles() {
  if (hasInjectedArcConnectorStyles) return;
  if (typeof document === "undefined") return;
  const style = document.createElement("style");
  style.setAttribute("data-arc-connector-styles", "true");
  style.textContent = `
@keyframes arc-spinner-enter { from { opacity: 0; transform: scale(0.5) } to { opacity: 1; transform: scale(1) } }
@keyframes arc-spinner-rotate { to { transform: rotate(360deg) } }
`;
  document.head.appendChild(style);
  hasInjectedArcConnectorStyles = true;
}
var import_react, import_jsx_runtime, hasInjectedArcConnectorStyles, STORAGE_KEY, DEFAULT_ACCOUNT_POLLING_INTERVAL_MS, INITIAL_STATE, ConnectorClient, ConnectorContext, WalletList, AccountDropdown;
var init_dist = __esm({
  "node_modules/@solana-commerce/connector/dist/index.mjs"() {
    init_esm();
    import_react = __toESM(require_react(), 1);
    import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
    hasInjectedArcConnectorStyles = false;
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      injectArcConnectorGlobalStyles();
    }
    STORAGE_KEY = "arc-connector:lastWallet";
    DEFAULT_ACCOUNT_POLLING_INTERVAL_MS = 1500;
    INITIAL_STATE = {
      wallets: [],
      selectedWallet: null,
      connected: false,
      connecting: false,
      accounts: [],
      selectedAccount: null
    };
    ConnectorClient = class {
      constructor(config = {}) {
        this.config = config;
        this.state = { ...INITIAL_STATE };
        this.initialize();
      }
      state;
      listeners = /* @__PURE__ */ new Set();
      unsubscribers = [];
      walletChangeUnsub = null;
      pollTimer = null;
      getStorage() {
        if (this.config.storage) return this.config.storage;
        if (typeof window !== "undefined") {
          try {
            if (window.localStorage) {
              return {
                getItem: (k) => window.localStorage.getItem(k),
                setItem: (k, v) => window.localStorage.setItem(k, v),
                removeItem: (k) => window.localStorage.removeItem(k)
              };
            }
          } catch {
            return void 0;
          }
        }
        return void 0;
      }
      updateWallets(wallets2) {
        const unique = Array.from(new Set(wallets2.map((w) => w.name))).map((n) => wallets2.find((w) => w.name === n)).filter((w) => w !== void 0);
        this.state = {
          ...this.state,
          wallets: unique.map((walletEntry) => {
            const features = walletEntry.features;
            const hasConnect = Boolean(features["standard:connect"]);
            const hasDisconnect = Boolean(features["standard:disconnect"]);
            const chains = walletEntry.chains;
            const isSolana = Array.isArray(chains) && chains.some((chain) => typeof chain === "string" && chain.includes("solana"));
            const connectable = Boolean(hasConnect && hasDisconnect && isSolana);
            return {
              wallet: walletEntry,
              name: walletEntry.name,
              icon: walletEntry.icon,
              installed: true,
              connectable
            };
          })
        };
        this.notify();
      }
      initialize() {
        if (typeof window === "undefined") return;
        try {
          const walletsApi = getWallets();
          const update = () => this.updateWallets(walletsApi.get());
          update();
          this.unsubscribers.push(walletsApi.on("register", update));
          this.unsubscribers.push(walletsApi.on("unregister", update));
          if (this.config.autoConnect) setTimeout(() => this.attemptAutoConnect(), 100);
        } catch (e2) {
          if (this.config.debug) console.warn("[Connector] init failed", e2);
        }
      }
      async attemptAutoConnect() {
        try {
          const storage = this.getStorage();
          let last = null;
          try {
            last = storage?.getItem(STORAGE_KEY) ?? null;
          } catch (error) {
            if (this.config.debug) {
              console.warn("[Connector] Failed to read wallet preference:", error);
            }
            return;
          }
          if (!last) return;
          if (this.state.wallets.some((w) => w.name === last)) await this.select(last);
        } catch (e2) {
          try {
            this.getStorage()?.removeItem(STORAGE_KEY);
          } catch (error) {
            if (this.config.debug) {
              console.warn("[Connector] Failed to remove invalid wallet preference:", error);
            }
          }
        }
      }
      subscribe(listener) {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
      }
      getConnectorState() {
        return this.state;
      }
      notify() {
        for (const listener of this.listeners) {
          listener(this.state);
        }
      }
      startPollingWalletAccounts() {
        if (this.pollTimer) return;
        const wallet = this.state.selectedWallet;
        if (!wallet) return;
        this.pollTimer = setInterval(() => {
          try {
            const walletAccounts = wallet.accounts ?? [];
            const accountMap = /* @__PURE__ */ new Map();
            for (const account of walletAccounts) {
              accountMap.set(account.address, account);
            }
            const nextAccounts = Array.from(accountMap.values()).map(
              (account) => ({
                address: account.address,
                icon: account.icon,
                raw: account
              })
            );
            const selectedStillExists = this.state.selectedAccount && nextAccounts.some((acc) => acc.address === this.state.selectedAccount);
            const newSelected = selectedStillExists ? this.state.selectedAccount : nextAccounts[0]?.address ?? null;
            const changed = nextAccounts.length !== this.state.accounts.length || nextAccounts.some((acc, i) => acc.address !== this.state.accounts[i]?.address);
            if (changed) {
              this.state = { ...this.state, accounts: nextAccounts, selectedAccount: newSelected };
              this.notify();
              if (this.config.debug) console.log("[Connector] Poll updated accounts:", nextAccounts.length);
            }
          } catch (error) {
            if (this.config.debug) {
              console.warn("[Connector] Error during account polling:", error);
            }
          }
        }, this.config.accountPollingIntervalMs ?? DEFAULT_ACCOUNT_POLLING_INTERVAL_MS);
      }
      stopPollingWalletAccounts() {
        if (this.pollTimer) {
          clearInterval(this.pollTimer);
          this.pollTimer = null;
        }
      }
      unsubscribeWalletEvents() {
        if (this.walletChangeUnsub) {
          try {
            this.walletChangeUnsub();
          } catch (error) {
            if (this.config.debug) {
              console.warn("[Connector] Error unsubscribing wallet events:", error);
            }
          }
          this.walletChangeUnsub = null;
        }
      }
      subscribeToWalletEvents() {
        this.unsubscribeWalletEvents();
        this.stopPollingWalletAccounts();
        const wallet = this.state.selectedWallet;
        if (!wallet) return;
        const eventsFeature = wallet.features["standard:events"];
        if (!eventsFeature) {
          this.startPollingWalletAccounts();
          return;
        }
        try {
          const onEvents = eventsFeature.on;
          this.walletChangeUnsub = onEvents("change", (properties) => {
            const changeAccounts = properties.accounts ?? [];
            const walletAccounts = wallet.accounts ?? [];
            const accountMap = /* @__PURE__ */ new Map();
            for (const account of [...walletAccounts, ...changeAccounts]) {
              accountMap.set(account.address, account);
            }
            const nextAccounts = Array.from(accountMap.values()).map(
              (account) => ({
                address: account.address,
                icon: account.icon,
                raw: account
              })
            );
            const selectedStillExists = this.state.selectedAccount && nextAccounts.some((acc) => acc.address === this.state.selectedAccount);
            const newSelected = selectedStillExists ? this.state.selectedAccount : nextAccounts[0]?.address ?? null;
            this.state = { ...this.state, accounts: nextAccounts, selectedAccount: newSelected };
            this.notify();
          });
        } catch (error) {
          if (this.config.debug) {
            console.warn("[Connector] Failed to subscribe to wallet events:", error);
          }
          this.startPollingWalletAccounts();
        }
      }
      async select(walletName) {
        if (typeof window === "undefined") return;
        const w = this.state.wallets.find((x) => x.name === walletName);
        if (!w) throw new Error(`Wallet ${walletName} not found`);
        this.state = { ...this.state, connecting: true };
        this.notify();
        try {
          const connectFeature = w.wallet.features["standard:connect"];
          if (!connectFeature) throw new Error(`Wallet ${walletName} does not support standard connect`);
          const connect = connectFeature.connect;
          const result = await connect({ silent: false });
          const walletAccounts = w.wallet.accounts ?? [];
          const accountMap = /* @__PURE__ */ new Map();
          for (const account of [...walletAccounts, ...result.accounts]) {
            accountMap.set(account.address, account);
          }
          const accounts = Array.from(accountMap.values()).map(
            (account) => ({
              address: account.address,
              icon: account.icon,
              raw: account
            })
          );
          const previouslySelected = this.state.selectedAccount;
          const previousAddresses = new Set(this.state.accounts.map((a) => a.address));
          const firstNew = accounts.find((a) => !previousAddresses.has(a.address));
          const selected = firstNew?.address ?? previouslySelected ?? accounts[0]?.address ?? null;
          this.state = {
            ...this.state,
            selectedWallet: w.wallet,
            connected: true,
            connecting: false,
            accounts,
            selectedAccount: selected
          };
          try {
            this.getStorage()?.setItem(STORAGE_KEY, walletName);
          } catch (error) {
            if (this.config.debug) {
              console.warn("[Connector] Failed to store wallet preference:", error);
            }
          }
          this.subscribeToWalletEvents();
          this.notify();
        } catch (e2) {
          this.state = {
            ...this.state,
            ...INITIAL_STATE,
            wallets: this.state.wallets
            // Preserve discovered wallets
          };
          this.notify();
          throw e2;
        }
      }
      async disconnect() {
        this.unsubscribeWalletEvents();
        this.stopPollingWalletAccounts();
        const wallet = this.state.selectedWallet;
        if (wallet) {
          const disconnectFeature = wallet.features["standard:disconnect"];
          if (disconnectFeature) {
            try {
              await disconnectFeature.disconnect();
            } catch (error) {
              if (this.config.debug) {
                console.warn("[Connector] Wallet disconnect failed:", error);
              }
            }
          }
        }
        this.state = {
          ...this.state,
          selectedWallet: null,
          connected: false,
          accounts: [],
          selectedAccount: null
        };
        try {
          this.getStorage()?.removeItem(STORAGE_KEY);
        } catch (error) {
          if (this.config.debug) {
            console.warn("[Connector] Failed to remove wallet preference:", error);
          }
        }
        this.notify();
      }
      async selectAccount(address2) {
        const current = this.state.selectedWallet;
        if (!current) throw new Error("No wallet connected");
        let target = this.state.accounts.find((acc) => acc.address === address2)?.raw ?? null;
        if (!target) {
          try {
            const feature = current.features["standard:connect"];
            if (feature) {
              const connect = feature.connect;
              const res = await connect();
              const accounts = res.accounts.map((a) => ({
                address: a.address,
                icon: a.icon,
                raw: a
              }));
              target = accounts.find((acc) => acc.address === address2)?.raw ?? res.accounts[0] ?? null;
              this.state = { ...this.state, accounts };
            }
          } catch (error) {
            if (this.config.debug) {
              console.warn("[Connector] Failed to reconnect for account selection:", error);
            }
            throw new Error("Failed to reconnect wallet for account selection");
          }
        }
        if (!target) throw new Error("Requested account not available");
        this.state = { ...this.state, selectedAccount: target.address };
        this.notify();
      }
      // Cleanup any resources (event listeners, timers) created by this client
      destroy() {
        this.unsubscribeWalletEvents();
        this.stopPollingWalletAccounts();
        for (const unsubscribe of this.unsubscribers) {
          try {
            unsubscribe();
          } catch {
          }
        }
        this.unsubscribers = [];
        this.listeners.clear();
      }
    };
    ConnectorContext = (0, import_react.createContext)(null);
    ConnectorContext.displayName = "ConnectorContext";
    WalletList = (0, import_react.memo)(({ wallets: wallets2, onSelect }) => {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: wallets2?.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        "button",
        {
          type: "button",
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px 12px",
            border: "1px solid #e5e7eb",
            borderRadius: 8,
            backgroundColor: "#ffffff",
            cursor: "pointer",
            transition: "background-color 0.2s ease, transform 0.1s ease"
          },
          onClick: () => onSelect(w.name),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
              w.icon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "img",
                {
                  src: w.icon,
                  alt: `${w.name} wallet icon`,
                  width: 20,
                  height: 20,
                  style: { borderRadius: "50%" }
                }
              ) : null,
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontSize: 14, color: "#111827" }, children: w.name })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontSize: 12, color: "#6b7280" }, children: w.installed ? "Installed" : "Not installed" })
          ]
        },
        w.name
      )) });
    });
    WalletList.displayName = "WalletList";
    AccountDropdown = (0, import_react.memo)(({ children, content }) => {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "inline-block", position: "relative" }, children: [
        children,
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { position: "absolute", right: 0 }, children: content })
      ] });
    });
    AccountDropdown.displayName = "AccountDropdown";
    injectArcConnectorGlobalStyles();
  }
});

// node_modules/@solana/errors/dist/index.browser.mjs
function getHumanReadableErrorMessage(code, context = {}) {
  const messageFormatString = SolanaErrorMessages[code];
  if (messageFormatString.length === 0) {
    return "";
  }
  let state;
  function commitStateUpTo(endIndex) {
    if (state[TYPE] === 2) {
      const variableName = messageFormatString.slice(state[START_INDEX] + 1, endIndex);
      fragments.push(
        variableName in context ? (
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          `${context[variableName]}`
        ) : `$${variableName}`
      );
    } else if (state[TYPE] === 1) {
      fragments.push(messageFormatString.slice(state[START_INDEX], endIndex));
    }
  }
  const fragments = [];
  messageFormatString.split("").forEach((char, ii) => {
    if (ii === 0) {
      state = {
        [START_INDEX]: 0,
        [TYPE]: messageFormatString[0] === "\\" ? 0 : messageFormatString[0] === "$" ? 2 : 1
        /* Text */
      };
      return;
    }
    let nextState;
    switch (state[TYPE]) {
      case 0:
        nextState = {
          [START_INDEX]: ii,
          [TYPE]: 1
          /* Text */
        };
        break;
      case 1:
        if (char === "\\") {
          nextState = {
            [START_INDEX]: ii,
            [TYPE]: 0
            /* EscapeSequence */
          };
        } else if (char === "$") {
          nextState = {
            [START_INDEX]: ii,
            [TYPE]: 2
            /* Variable */
          };
        }
        break;
      case 2:
        if (char === "\\") {
          nextState = {
            [START_INDEX]: ii,
            [TYPE]: 0
            /* EscapeSequence */
          };
        } else if (char === "$") {
          nextState = {
            [START_INDEX]: ii,
            [TYPE]: 2
            /* Variable */
          };
        } else if (!char.match(/\w/)) {
          nextState = {
            [START_INDEX]: ii,
            [TYPE]: 1
            /* Text */
          };
        }
        break;
    }
    if (nextState) {
      if (state !== nextState) {
        commitStateUpTo(ii);
      }
      state = nextState;
    }
  });
  commitStateUpTo();
  let message = fragments.join("");
  if (code >= SOLANA_ERROR__INSTRUCTION_ERROR__UNKNOWN && code < SOLANA_ERROR__INSTRUCTION_ERROR__UNKNOWN + INSTRUCTION_ERROR_RANGE_SIZE && "index" in context) {
    message += ` (instruction #${context.index + 1})`;
  }
  return message;
}
function getErrorMessage(code, context = {}) {
  if (true) {
    return getHumanReadableErrorMessage(code, context);
  } else {
    let decodingAdviceMessage = `Solana error #${code}; Decode this error by running \`npx @solana/errors decode -- ${code}`;
    if (Object.keys(context).length) {
      decodingAdviceMessage += ` '${encodeContextObject(context)}'`;
    }
    return `${decodingAdviceMessage}\``;
  }
}
function safeCaptureStackTrace(...args) {
  if ("captureStackTrace" in Error && typeof Error.captureStackTrace === "function") {
    Error.captureStackTrace(...args);
  }
}
function getSolanaErrorFromRpcError({ errorCodeBaseOffset, getErrorContext, orderedErrorNames, rpcEnumError }, constructorOpt) {
  let rpcErrorName;
  let rpcErrorContext;
  if (typeof rpcEnumError === "string") {
    rpcErrorName = rpcEnumError;
  } else {
    rpcErrorName = Object.keys(rpcEnumError)[0];
    rpcErrorContext = rpcEnumError[rpcErrorName];
  }
  const codeOffset = orderedErrorNames.indexOf(rpcErrorName);
  const errorCode = errorCodeBaseOffset + codeOffset;
  const errorContext = getErrorContext(errorCode, rpcErrorName, rpcErrorContext);
  const err = new SolanaError(errorCode, errorContext);
  safeCaptureStackTrace(err, constructorOpt);
  return err;
}
function getSolanaErrorFromInstructionError(index, instructionError) {
  const numberIndex = Number(index);
  return getSolanaErrorFromRpcError(
    {
      errorCodeBaseOffset: 4615001,
      getErrorContext(errorCode, rpcErrorName, rpcErrorContext) {
        if (errorCode === SOLANA_ERROR__INSTRUCTION_ERROR__UNKNOWN) {
          return {
            errorName: rpcErrorName,
            index: numberIndex,
            ...rpcErrorContext !== void 0 ? { instructionErrorContext: rpcErrorContext } : null
          };
        } else if (errorCode === SOLANA_ERROR__INSTRUCTION_ERROR__CUSTOM) {
          return {
            code: Number(rpcErrorContext),
            index: numberIndex
          };
        }
        return { index: numberIndex };
      },
      orderedErrorNames: ORDERED_ERROR_NAMES,
      rpcEnumError: instructionError
    },
    getSolanaErrorFromInstructionError
  );
}
function getSolanaErrorFromTransactionError(transactionError) {
  if (typeof transactionError === "object" && "InstructionError" in transactionError) {
    return getSolanaErrorFromInstructionError(
      ...transactionError.InstructionError
    );
  }
  return getSolanaErrorFromRpcError(
    {
      errorCodeBaseOffset: 7050001,
      getErrorContext(errorCode, rpcErrorName, rpcErrorContext) {
        if (errorCode === SOLANA_ERROR__TRANSACTION_ERROR__UNKNOWN) {
          return {
            errorName: rpcErrorName,
            ...rpcErrorContext !== void 0 ? { transactionErrorContext: rpcErrorContext } : null
          };
        } else if (errorCode === SOLANA_ERROR__TRANSACTION_ERROR__DUPLICATE_INSTRUCTION) {
          return {
            index: Number(rpcErrorContext)
          };
        } else if (errorCode === SOLANA_ERROR__TRANSACTION_ERROR__INSUFFICIENT_FUNDS_FOR_RENT || errorCode === SOLANA_ERROR__TRANSACTION_ERROR__PROGRAM_EXECUTION_TEMPORARILY_RESTRICTED) {
          return {
            accountIndex: Number(rpcErrorContext.account_index)
          };
        }
      },
      orderedErrorNames: ORDERED_ERROR_NAMES2,
      rpcEnumError: transactionError
    },
    getSolanaErrorFromTransactionError
  );
}
function getSolanaErrorFromJsonRpcError(putativeErrorResponse) {
  let out;
  if (isRpcErrorResponse(putativeErrorResponse)) {
    const { code: rawCode, data, message } = putativeErrorResponse;
    const code = Number(rawCode);
    if (code === SOLANA_ERROR__JSON_RPC__SERVER_ERROR_SEND_TRANSACTION_PREFLIGHT_FAILURE) {
      const { err, ...preflightErrorContext } = data;
      const causeObject = err ? { cause: getSolanaErrorFromTransactionError(err) } : null;
      out = new SolanaError(SOLANA_ERROR__JSON_RPC__SERVER_ERROR_SEND_TRANSACTION_PREFLIGHT_FAILURE, {
        ...preflightErrorContext,
        ...causeObject
      });
    } else {
      let errorContext;
      switch (code) {
        case SOLANA_ERROR__JSON_RPC__INTERNAL_ERROR:
        case SOLANA_ERROR__JSON_RPC__INVALID_PARAMS:
        case SOLANA_ERROR__JSON_RPC__INVALID_REQUEST:
        case SOLANA_ERROR__JSON_RPC__METHOD_NOT_FOUND:
        case SOLANA_ERROR__JSON_RPC__PARSE_ERROR:
        case SOLANA_ERROR__JSON_RPC__SCAN_ERROR:
        case SOLANA_ERROR__JSON_RPC__SERVER_ERROR_BLOCK_CLEANED_UP:
        case SOLANA_ERROR__JSON_RPC__SERVER_ERROR_BLOCK_NOT_AVAILABLE:
        case SOLANA_ERROR__JSON_RPC__SERVER_ERROR_BLOCK_STATUS_NOT_AVAILABLE_YET:
        case SOLANA_ERROR__JSON_RPC__SERVER_ERROR_FILTER_TRANSACTION_NOT_FOUND:
        case SOLANA_ERROR__JSON_RPC__SERVER_ERROR_KEY_EXCLUDED_FROM_SECONDARY_INDEX:
        case SOLANA_ERROR__JSON_RPC__SERVER_ERROR_LONG_TERM_STORAGE_SLOT_SKIPPED:
        case SOLANA_ERROR__JSON_RPC__SERVER_ERROR_SLOT_SKIPPED:
        case SOLANA_ERROR__JSON_RPC__SERVER_ERROR_TRANSACTION_PRECOMPILE_VERIFICATION_FAILURE:
        case SOLANA_ERROR__JSON_RPC__SERVER_ERROR_UNSUPPORTED_TRANSACTION_VERSION:
          errorContext = { __serverMessage: message };
          break;
        default:
          if (typeof data === "object" && !Array.isArray(data)) {
            errorContext = data;
          }
      }
      out = new SolanaError(code, errorContext);
    }
  } else {
    const message = typeof putativeErrorResponse === "object" && putativeErrorResponse !== null && "message" in putativeErrorResponse && typeof putativeErrorResponse.message === "string" ? putativeErrorResponse.message : "Malformed JSON-RPC error with no message attribute";
    out = new SolanaError(SOLANA_ERROR__MALFORMED_JSON_RPC_ERROR, { error: putativeErrorResponse, message });
  }
  safeCaptureStackTrace(out, getSolanaErrorFromJsonRpcError);
  return out;
}
function isRpcErrorResponse(value) {
  return typeof value === "object" && value !== null && "code" in value && "message" in value && (typeof value.code === "number" || typeof value.code === "bigint") && typeof value.message === "string";
}
var SOLANA_ERROR__BLOCK_HEIGHT_EXCEEDED, SOLANA_ERROR__INVALID_NONCE, SOLANA_ERROR__NONCE_ACCOUNT_NOT_FOUND, SOLANA_ERROR__BLOCKHASH_STRING_LENGTH_OUT_OF_RANGE, SOLANA_ERROR__INVALID_BLOCKHASH_BYTE_LENGTH, SOLANA_ERROR__LAMPORTS_OUT_OF_RANGE, SOLANA_ERROR__MALFORMED_BIGINT_STRING, SOLANA_ERROR__MALFORMED_NUMBER_STRING, SOLANA_ERROR__TIMESTAMP_OUT_OF_RANGE, SOLANA_ERROR__MALFORMED_JSON_RPC_ERROR, SOLANA_ERROR__FAILED_TO_SEND_TRANSACTION, SOLANA_ERROR__FAILED_TO_SEND_TRANSACTIONS, SOLANA_ERROR__FAILED_TO_SIGN_TRANSACTION, SOLANA_ERROR__FAILED_TO_SIGN_TRANSACTIONS, SOLANA_ERROR__JSON_RPC__PARSE_ERROR, SOLANA_ERROR__JSON_RPC__INTERNAL_ERROR, SOLANA_ERROR__JSON_RPC__INVALID_PARAMS, SOLANA_ERROR__JSON_RPC__METHOD_NOT_FOUND, SOLANA_ERROR__JSON_RPC__INVALID_REQUEST, SOLANA_ERROR__JSON_RPC__SERVER_ERROR_NO_SLOT_HISTORY, SOLANA_ERROR__JSON_RPC__SERVER_ERROR_FILTER_TRANSACTION_NOT_FOUND, SOLANA_ERROR__JSON_RPC__SERVER_ERROR_LONG_TERM_STORAGE_UNREACHABLE, SOLANA_ERROR__JSON_RPC__SERVER_ERROR_SLOT_NOT_EPOCH_BOUNDARY, SOLANA_ERROR__JSON_RPC__SERVER_ERROR_EPOCH_REWARDS_PERIOD_ACTIVE, SOLANA_ERROR__JSON_RPC__SERVER_ERROR_MIN_CONTEXT_SLOT_NOT_REACHED, SOLANA_ERROR__JSON_RPC__SERVER_ERROR_UNSUPPORTED_TRANSACTION_VERSION, SOLANA_ERROR__JSON_RPC__SERVER_ERROR_BLOCK_STATUS_NOT_AVAILABLE_YET, SOLANA_ERROR__JSON_RPC__SERVER_ERROR_TRANSACTION_SIGNATURE_LEN_MISMATCH, SOLANA_ERROR__JSON_RPC__SCAN_ERROR, SOLANA_ERROR__JSON_RPC__SERVER_ERROR_TRANSACTION_HISTORY_NOT_AVAILABLE, SOLANA_ERROR__JSON_RPC__SERVER_ERROR_KEY_EXCLUDED_FROM_SECONDARY_INDEX, SOLANA_ERROR__JSON_RPC__SERVER_ERROR_LONG_TERM_STORAGE_SLOT_SKIPPED, SOLANA_ERROR__JSON_RPC__SERVER_ERROR_NO_SNAPSHOT, SOLANA_ERROR__JSON_RPC__SERVER_ERROR_SLOT_SKIPPED, SOLANA_ERROR__JSON_RPC__SERVER_ERROR_TRANSACTION_PRECOMPILE_VERIFICATION_FAILURE, SOLANA_ERROR__JSON_RPC__SERVER_ERROR_NODE_UNHEALTHY, SOLANA_ERROR__JSON_RPC__SERVER_ERROR_BLOCK_NOT_AVAILABLE, SOLANA_ERROR__JSON_RPC__SERVER_ERROR_TRANSACTION_SIGNATURE_VERIFICATION_FAILURE, SOLANA_ERROR__JSON_RPC__SERVER_ERROR_SEND_TRANSACTION_PREFLIGHT_FAILURE, SOLANA_ERROR__JSON_RPC__SERVER_ERROR_BLOCK_CLEANED_UP, SOLANA_ERROR__ADDRESSES__INVALID_BYTE_LENGTH, SOLANA_ERROR__ADDRESSES__STRING_LENGTH_OUT_OF_RANGE, SOLANA_ERROR__ADDRESSES__INVALID_BASE58_ENCODED_ADDRESS, SOLANA_ERROR__ADDRESSES__INVALID_ED25519_PUBLIC_KEY, SOLANA_ERROR__ADDRESSES__MALFORMED_PDA, SOLANA_ERROR__ADDRESSES__PDA_BUMP_SEED_OUT_OF_RANGE, SOLANA_ERROR__ADDRESSES__MAX_NUMBER_OF_PDA_SEEDS_EXCEEDED, SOLANA_ERROR__ADDRESSES__MAX_PDA_SEED_LENGTH_EXCEEDED, SOLANA_ERROR__ADDRESSES__INVALID_SEEDS_POINT_ON_CURVE, SOLANA_ERROR__ADDRESSES__FAILED_TO_FIND_VIABLE_PDA_BUMP_SEED, SOLANA_ERROR__ADDRESSES__PDA_ENDS_WITH_PDA_MARKER, SOLANA_ERROR__ADDRESSES__INVALID_OFF_CURVE_ADDRESS, SOLANA_ERROR__ACCOUNTS__ACCOUNT_NOT_FOUND, SOLANA_ERROR__ACCOUNTS__ONE_OR_MORE_ACCOUNTS_NOT_FOUND, SOLANA_ERROR__ACCOUNTS__FAILED_TO_DECODE_ACCOUNT, SOLANA_ERROR__ACCOUNTS__EXPECTED_DECODED_ACCOUNT, SOLANA_ERROR__ACCOUNTS__EXPECTED_ALL_ACCOUNTS_TO_BE_DECODED, SOLANA_ERROR__SUBTLE_CRYPTO__DISALLOWED_IN_INSECURE_CONTEXT, SOLANA_ERROR__SUBTLE_CRYPTO__DIGEST_UNIMPLEMENTED, SOLANA_ERROR__SUBTLE_CRYPTO__ED25519_ALGORITHM_UNIMPLEMENTED, SOLANA_ERROR__SUBTLE_CRYPTO__EXPORT_FUNCTION_UNIMPLEMENTED, SOLANA_ERROR__SUBTLE_CRYPTO__GENERATE_FUNCTION_UNIMPLEMENTED, SOLANA_ERROR__SUBTLE_CRYPTO__SIGN_FUNCTION_UNIMPLEMENTED, SOLANA_ERROR__SUBTLE_CRYPTO__VERIFY_FUNCTION_UNIMPLEMENTED, SOLANA_ERROR__SUBTLE_CRYPTO__CANNOT_EXPORT_NON_EXTRACTABLE_KEY, SOLANA_ERROR__CRYPTO__RANDOM_VALUES_FUNCTION_UNIMPLEMENTED, SOLANA_ERROR__KEYS__INVALID_KEY_PAIR_BYTE_LENGTH, SOLANA_ERROR__KEYS__INVALID_PRIVATE_KEY_BYTE_LENGTH, SOLANA_ERROR__KEYS__INVALID_SIGNATURE_BYTE_LENGTH, SOLANA_ERROR__KEYS__SIGNATURE_STRING_LENGTH_OUT_OF_RANGE, SOLANA_ERROR__KEYS__PUBLIC_KEY_MUST_MATCH_PRIVATE_KEY, SOLANA_ERROR__KEYS__INVALID_BASE58_IN_GRIND_REGEX, SOLANA_ERROR__KEYS__WRITE_KEY_PAIR_UNSUPPORTED_ENVIRONMENT, SOLANA_ERROR__FS__UNSUPPORTED_ENVIRONMENT, SOLANA_ERROR__INSTRUCTION__EXPECTED_TO_HAVE_ACCOUNTS, SOLANA_ERROR__INSTRUCTION__EXPECTED_TO_HAVE_DATA, SOLANA_ERROR__INSTRUCTION__PROGRAM_ID_MISMATCH, SOLANA_ERROR__INSTRUCTION_ERROR__UNKNOWN, SOLANA_ERROR__INSTRUCTION_ERROR__GENERIC_ERROR, SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_ARGUMENT, SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_INSTRUCTION_DATA, SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_ACCOUNT_DATA, SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_DATA_TOO_SMALL, SOLANA_ERROR__INSTRUCTION_ERROR__INSUFFICIENT_FUNDS, SOLANA_ERROR__INSTRUCTION_ERROR__INCORRECT_PROGRAM_ID, SOLANA_ERROR__INSTRUCTION_ERROR__MISSING_REQUIRED_SIGNATURE, SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_ALREADY_INITIALIZED, SOLANA_ERROR__INSTRUCTION_ERROR__UNINITIALIZED_ACCOUNT, SOLANA_ERROR__INSTRUCTION_ERROR__UNBALANCED_INSTRUCTION, SOLANA_ERROR__INSTRUCTION_ERROR__MODIFIED_PROGRAM_ID, SOLANA_ERROR__INSTRUCTION_ERROR__EXTERNAL_ACCOUNT_LAMPORT_SPEND, SOLANA_ERROR__INSTRUCTION_ERROR__EXTERNAL_ACCOUNT_DATA_MODIFIED, SOLANA_ERROR__INSTRUCTION_ERROR__READONLY_LAMPORT_CHANGE, SOLANA_ERROR__INSTRUCTION_ERROR__READONLY_DATA_MODIFIED, SOLANA_ERROR__INSTRUCTION_ERROR__DUPLICATE_ACCOUNT_INDEX, SOLANA_ERROR__INSTRUCTION_ERROR__EXECUTABLE_MODIFIED, SOLANA_ERROR__INSTRUCTION_ERROR__RENT_EPOCH_MODIFIED, SOLANA_ERROR__INSTRUCTION_ERROR__NOT_ENOUGH_ACCOUNT_KEYS, SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_DATA_SIZE_CHANGED, SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_NOT_EXECUTABLE, SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_BORROW_FAILED, SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_BORROW_OUTSTANDING, SOLANA_ERROR__INSTRUCTION_ERROR__DUPLICATE_ACCOUNT_OUT_OF_SYNC, SOLANA_ERROR__INSTRUCTION_ERROR__CUSTOM, SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_ERROR, SOLANA_ERROR__INSTRUCTION_ERROR__EXECUTABLE_DATA_MODIFIED, SOLANA_ERROR__INSTRUCTION_ERROR__EXECUTABLE_LAMPORT_CHANGE, SOLANA_ERROR__INSTRUCTION_ERROR__EXECUTABLE_ACCOUNT_NOT_RENT_EXEMPT, SOLANA_ERROR__INSTRUCTION_ERROR__UNSUPPORTED_PROGRAM_ID, SOLANA_ERROR__INSTRUCTION_ERROR__CALL_DEPTH, SOLANA_ERROR__INSTRUCTION_ERROR__MISSING_ACCOUNT, SOLANA_ERROR__INSTRUCTION_ERROR__REENTRANCY_NOT_ALLOWED, SOLANA_ERROR__INSTRUCTION_ERROR__MAX_SEED_LENGTH_EXCEEDED, SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_SEEDS, SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_REALLOC, SOLANA_ERROR__INSTRUCTION_ERROR__COMPUTATIONAL_BUDGET_EXCEEDED, SOLANA_ERROR__INSTRUCTION_ERROR__PRIVILEGE_ESCALATION, SOLANA_ERROR__INSTRUCTION_ERROR__PROGRAM_ENVIRONMENT_SETUP_FAILURE, SOLANA_ERROR__INSTRUCTION_ERROR__PROGRAM_FAILED_TO_COMPLETE, SOLANA_ERROR__INSTRUCTION_ERROR__PROGRAM_FAILED_TO_COMPILE, SOLANA_ERROR__INSTRUCTION_ERROR__IMMUTABLE, SOLANA_ERROR__INSTRUCTION_ERROR__INCORRECT_AUTHORITY, SOLANA_ERROR__INSTRUCTION_ERROR__BORSH_IO_ERROR, SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_NOT_RENT_EXEMPT, SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_ACCOUNT_OWNER, SOLANA_ERROR__INSTRUCTION_ERROR__ARITHMETIC_OVERFLOW, SOLANA_ERROR__INSTRUCTION_ERROR__UNSUPPORTED_SYSVAR, SOLANA_ERROR__INSTRUCTION_ERROR__ILLEGAL_OWNER, SOLANA_ERROR__INSTRUCTION_ERROR__MAX_ACCOUNTS_DATA_ALLOCATIONS_EXCEEDED, SOLANA_ERROR__INSTRUCTION_ERROR__MAX_ACCOUNTS_EXCEEDED, SOLANA_ERROR__INSTRUCTION_ERROR__MAX_INSTRUCTION_TRACE_LENGTH_EXCEEDED, SOLANA_ERROR__INSTRUCTION_ERROR__BUILTIN_PROGRAMS_MUST_CONSUME_COMPUTE_UNITS, SOLANA_ERROR__SIGNER__ADDRESS_CANNOT_HAVE_MULTIPLE_SIGNERS, SOLANA_ERROR__SIGNER__EXPECTED_KEY_PAIR_SIGNER, SOLANA_ERROR__SIGNER__EXPECTED_MESSAGE_SIGNER, SOLANA_ERROR__SIGNER__EXPECTED_MESSAGE_MODIFYING_SIGNER, SOLANA_ERROR__SIGNER__EXPECTED_MESSAGE_PARTIAL_SIGNER, SOLANA_ERROR__SIGNER__EXPECTED_TRANSACTION_SIGNER, SOLANA_ERROR__SIGNER__EXPECTED_TRANSACTION_MODIFYING_SIGNER, SOLANA_ERROR__SIGNER__EXPECTED_TRANSACTION_PARTIAL_SIGNER, SOLANA_ERROR__SIGNER__EXPECTED_TRANSACTION_SENDING_SIGNER, SOLANA_ERROR__SIGNER__TRANSACTION_CANNOT_HAVE_MULTIPLE_SENDING_SIGNERS, SOLANA_ERROR__SIGNER__TRANSACTION_SENDING_SIGNER_MISSING, SOLANA_ERROR__SIGNER__WALLET_MULTISIGN_UNIMPLEMENTED, SOLANA_ERROR__SIGNER__WALLET_ACCOUNT_CANNOT_SIGN_TRANSACTION, SOLANA_ERROR__OFFCHAIN_MESSAGE__MAXIMUM_LENGTH_EXCEEDED, SOLANA_ERROR__OFFCHAIN_MESSAGE__RESTRICTED_ASCII_BODY_CHARACTER_OUT_OF_RANGE, SOLANA_ERROR__OFFCHAIN_MESSAGE__APPLICATION_DOMAIN_STRING_LENGTH_OUT_OF_RANGE, SOLANA_ERROR__OFFCHAIN_MESSAGE__INVALID_APPLICATION_DOMAIN_BYTE_LENGTH, SOLANA_ERROR__OFFCHAIN_MESSAGE__NUM_SIGNATURES_MISMATCH, SOLANA_ERROR__OFFCHAIN_MESSAGE__NUM_REQUIRED_SIGNERS_CANNOT_BE_ZERO, SOLANA_ERROR__OFFCHAIN_MESSAGE__VERSION_NUMBER_NOT_SUPPORTED, SOLANA_ERROR__OFFCHAIN_MESSAGE__MESSAGE_FORMAT_MISMATCH, SOLANA_ERROR__OFFCHAIN_MESSAGE__MESSAGE_LENGTH_MISMATCH, SOLANA_ERROR__OFFCHAIN_MESSAGE__MESSAGE_MUST_BE_NON_EMPTY, SOLANA_ERROR__OFFCHAIN_MESSAGE__NUM_ENVELOPE_SIGNATURES_CANNOT_BE_ZERO, SOLANA_ERROR__OFFCHAIN_MESSAGE__SIGNATURES_MISSING, SOLANA_ERROR__OFFCHAIN_MESSAGE__ENVELOPE_SIGNERS_MISMATCH, SOLANA_ERROR__OFFCHAIN_MESSAGE__ADDRESSES_CANNOT_SIGN_OFFCHAIN_MESSAGE, SOLANA_ERROR__OFFCHAIN_MESSAGE__UNEXPECTED_VERSION, SOLANA_ERROR__OFFCHAIN_MESSAGE__SIGNATORIES_MUST_BE_SORTED, SOLANA_ERROR__OFFCHAIN_MESSAGE__SIGNATORIES_MUST_BE_UNIQUE, SOLANA_ERROR__OFFCHAIN_MESSAGE__SIGNATURE_VERIFICATION_FAILURE, SOLANA_ERROR__OFFCHAIN_MESSAGE__CONTENT_DOES_NOT_MATCH_EXPECTED, SOLANA_ERROR__OFFCHAIN_MESSAGE__REQUIRED_SIGNATORIES_DO_NOT_MATCH_EXPECTED, SOLANA_ERROR__TRANSACTION__INVOKED_PROGRAMS_CANNOT_PAY_FEES, SOLANA_ERROR__TRANSACTION__INVOKED_PROGRAMS_MUST_NOT_BE_WRITABLE, SOLANA_ERROR__TRANSACTION__EXPECTED_BLOCKHASH_LIFETIME, SOLANA_ERROR__TRANSACTION__EXPECTED_NONCE_LIFETIME, SOLANA_ERROR__TRANSACTION__VERSION_NUMBER_OUT_OF_RANGE, SOLANA_ERROR__TRANSACTION__FAILED_TO_DECOMPILE_ADDRESS_LOOKUP_TABLE_CONTENTS_MISSING, SOLANA_ERROR__TRANSACTION__FAILED_TO_DECOMPILE_ADDRESS_LOOKUP_TABLE_INDEX_OUT_OF_RANGE, SOLANA_ERROR__TRANSACTION__FAILED_TO_DECOMPILE_INSTRUCTION_PROGRAM_ADDRESS_NOT_FOUND, SOLANA_ERROR__TRANSACTION__FAILED_TO_DECOMPILE_FEE_PAYER_MISSING, SOLANA_ERROR__TRANSACTION__SIGNATURES_MISSING, SOLANA_ERROR__TRANSACTION__ADDRESS_MISSING, SOLANA_ERROR__TRANSACTION__FEE_PAYER_MISSING, SOLANA_ERROR__TRANSACTION__FEE_PAYER_SIGNATURE_MISSING, SOLANA_ERROR__TRANSACTION__INVALID_NONCE_TRANSACTION_INSTRUCTIONS_MISSING, SOLANA_ERROR__TRANSACTION__INVALID_NONCE_TRANSACTION_FIRST_INSTRUCTION_MUST_BE_ADVANCE_NONCE, SOLANA_ERROR__TRANSACTION__ADDRESSES_CANNOT_SIGN_TRANSACTION, SOLANA_ERROR__TRANSACTION__CANNOT_ENCODE_WITH_EMPTY_SIGNATURES, SOLANA_ERROR__TRANSACTION__MESSAGE_SIGNATURES_MISMATCH, SOLANA_ERROR__TRANSACTION__FAILED_TO_ESTIMATE_COMPUTE_LIMIT, SOLANA_ERROR__TRANSACTION__FAILED_WHEN_SIMULATING_TO_ESTIMATE_COMPUTE_LIMIT, SOLANA_ERROR__TRANSACTION__EXCEEDS_SIZE_LIMIT, SOLANA_ERROR__TRANSACTION__VERSION_NUMBER_NOT_SUPPORTED, SOLANA_ERROR__TRANSACTION__NONCE_ACCOUNT_CANNOT_BE_IN_LOOKUP_TABLE, SOLANA_ERROR__TRANSACTION__MALFORMED_MESSAGE_BYTES, SOLANA_ERROR__TRANSACTION__CANNOT_ENCODE_WITH_EMPTY_MESSAGE_BYTES, SOLANA_ERROR__TRANSACTION__CANNOT_DECODE_EMPTY_TRANSACTION_BYTES, SOLANA_ERROR__TRANSACTION__VERSION_ZERO_MUST_BE_ENCODED_WITH_SIGNATURES_FIRST, SOLANA_ERROR__TRANSACTION__SIGNATURE_COUNT_TOO_HIGH_FOR_TRANSACTION_BYTES, SOLANA_ERROR__TRANSACTION__INVALID_CONFIG_MASK_PRIORITY_FEE_BITS, SOLANA_ERROR__TRANSACTION__INVALID_NONCE_ACCOUNT_INDEX, SOLANA_ERROR__TRANSACTION__INVALID_CONFIG_VALUE_KIND, SOLANA_ERROR__TRANSACTION__INSTRUCTION_HEADERS_PAYLOADS_MISMATCH, SOLANA_ERROR__TRANSACTION__TOO_MANY_SIGNER_ADDRESSES, SOLANA_ERROR__TRANSACTION__TOO_MANY_ACCOUNT_ADDRESSES, SOLANA_ERROR__TRANSACTION__TOO_MANY_INSTRUCTIONS, SOLANA_ERROR__TRANSACTION__TOO_MANY_ACCOUNTS_IN_INSTRUCTION, SOLANA_ERROR__TRANSACTION__FAILED_TO_ESTIMATE_LOADED_ACCOUNTS_DATA_SIZE_LIMIT, SOLANA_ERROR__TRANSACTION__FAILED_WHEN_SIMULATING_TO_ESTIMATE_RESOURCE_LIMITS, SOLANA_ERROR__TRANSACTION__FAILED_TO_DECOMPILE_INSTRUCTION_ACCOUNT_INDEX_OUT_OF_RANGE, SOLANA_ERROR__TRANSACTION__COMPUTE_UNIT_LIMIT_OUT_OF_RANGE, SOLANA_ERROR__TRANSACTION__INVALID_HEAP_SIZE, SOLANA_ERROR__TRANSACTION_INTROSPECTION__CANNOT_DECODE_JSON_PARSED_TRANSACTION, SOLANA_ERROR__TRANSACTION_INTROSPECTION__UNRECOGNIZED_GET_TRANSACTION_RESPONSE, SOLANA_ERROR__TRANSACTION_ERROR__UNKNOWN, SOLANA_ERROR__TRANSACTION_ERROR__ACCOUNT_IN_USE, SOLANA_ERROR__TRANSACTION_ERROR__ACCOUNT_LOADED_TWICE, SOLANA_ERROR__TRANSACTION_ERROR__ACCOUNT_NOT_FOUND, SOLANA_ERROR__TRANSACTION_ERROR__PROGRAM_ACCOUNT_NOT_FOUND, SOLANA_ERROR__TRANSACTION_ERROR__INSUFFICIENT_FUNDS_FOR_FEE, SOLANA_ERROR__TRANSACTION_ERROR__INVALID_ACCOUNT_FOR_FEE, SOLANA_ERROR__TRANSACTION_ERROR__ALREADY_PROCESSED, SOLANA_ERROR__TRANSACTION_ERROR__BLOCKHASH_NOT_FOUND, SOLANA_ERROR__TRANSACTION_ERROR__CALL_CHAIN_TOO_DEEP, SOLANA_ERROR__TRANSACTION_ERROR__MISSING_SIGNATURE_FOR_FEE, SOLANA_ERROR__TRANSACTION_ERROR__INVALID_ACCOUNT_INDEX, SOLANA_ERROR__TRANSACTION_ERROR__SIGNATURE_FAILURE, SOLANA_ERROR__TRANSACTION_ERROR__INVALID_PROGRAM_FOR_EXECUTION, SOLANA_ERROR__TRANSACTION_ERROR__SANITIZE_FAILURE, SOLANA_ERROR__TRANSACTION_ERROR__CLUSTER_MAINTENANCE, SOLANA_ERROR__TRANSACTION_ERROR__ACCOUNT_BORROW_OUTSTANDING, SOLANA_ERROR__TRANSACTION_ERROR__WOULD_EXCEED_MAX_BLOCK_COST_LIMIT, SOLANA_ERROR__TRANSACTION_ERROR__UNSUPPORTED_VERSION, SOLANA_ERROR__TRANSACTION_ERROR__INVALID_WRITABLE_ACCOUNT, SOLANA_ERROR__TRANSACTION_ERROR__WOULD_EXCEED_MAX_ACCOUNT_COST_LIMIT, SOLANA_ERROR__TRANSACTION_ERROR__WOULD_EXCEED_ACCOUNT_DATA_BLOCK_LIMIT, SOLANA_ERROR__TRANSACTION_ERROR__TOO_MANY_ACCOUNT_LOCKS, SOLANA_ERROR__TRANSACTION_ERROR__ADDRESS_LOOKUP_TABLE_NOT_FOUND, SOLANA_ERROR__TRANSACTION_ERROR__INVALID_ADDRESS_LOOKUP_TABLE_OWNER, SOLANA_ERROR__TRANSACTION_ERROR__INVALID_ADDRESS_LOOKUP_TABLE_DATA, SOLANA_ERROR__TRANSACTION_ERROR__INVALID_ADDRESS_LOOKUP_TABLE_INDEX, SOLANA_ERROR__TRANSACTION_ERROR__INVALID_RENT_PAYING_ACCOUNT, SOLANA_ERROR__TRANSACTION_ERROR__WOULD_EXCEED_MAX_VOTE_COST_LIMIT, SOLANA_ERROR__TRANSACTION_ERROR__WOULD_EXCEED_ACCOUNT_DATA_TOTAL_LIMIT, SOLANA_ERROR__TRANSACTION_ERROR__DUPLICATE_INSTRUCTION, SOLANA_ERROR__TRANSACTION_ERROR__INSUFFICIENT_FUNDS_FOR_RENT, SOLANA_ERROR__TRANSACTION_ERROR__MAX_LOADED_ACCOUNTS_DATA_SIZE_EXCEEDED, SOLANA_ERROR__TRANSACTION_ERROR__INVALID_LOADED_ACCOUNTS_DATA_SIZE_LIMIT, SOLANA_ERROR__TRANSACTION_ERROR__RESANITIZATION_NEEDED, SOLANA_ERROR__TRANSACTION_ERROR__PROGRAM_EXECUTION_TEMPORARILY_RESTRICTED, SOLANA_ERROR__TRANSACTION_ERROR__UNBALANCED_TRANSACTION, SOLANA_ERROR__INSTRUCTION_PLANS__MESSAGE_CANNOT_ACCOMMODATE_PLAN, SOLANA_ERROR__INSTRUCTION_PLANS__MESSAGE_PACKER_ALREADY_COMPLETE, SOLANA_ERROR__INSTRUCTION_PLANS__EMPTY_INSTRUCTION_PLAN, SOLANA_ERROR__INSTRUCTION_PLANS__FAILED_TO_EXECUTE_TRANSACTION_PLAN, SOLANA_ERROR__INSTRUCTION_PLANS__NON_DIVISIBLE_TRANSACTION_PLANS_NOT_SUPPORTED, SOLANA_ERROR__INSTRUCTION_PLANS__FAILED_SINGLE_TRANSACTION_PLAN_RESULT_NOT_FOUND, SOLANA_ERROR__INSTRUCTION_PLANS__UNEXPECTED_INSTRUCTION_PLAN, SOLANA_ERROR__INSTRUCTION_PLANS__UNEXPECTED_TRANSACTION_PLAN, SOLANA_ERROR__INSTRUCTION_PLANS__UNEXPECTED_TRANSACTION_PLAN_RESULT, SOLANA_ERROR__INSTRUCTION_PLANS__EXPECTED_SUCCESSFUL_TRANSACTION_PLAN_RESULT, SOLANA_ERROR__INSTRUCTION_PLANS__MAX_INSTRUCTIONS_PER_TRANSACTION_EXCEEDED, SOLANA_ERROR__INSTRUCTION_PLANS__INVALID_MAX_INSTRUCTIONS_PER_TRANSACTION, SOLANA_ERROR__CODECS__CANNOT_DECODE_EMPTY_BYTE_ARRAY, SOLANA_ERROR__CODECS__INVALID_BYTE_LENGTH, SOLANA_ERROR__CODECS__EXPECTED_FIXED_LENGTH, SOLANA_ERROR__CODECS__EXPECTED_VARIABLE_LENGTH, SOLANA_ERROR__CODECS__ENCODER_DECODER_SIZE_COMPATIBILITY_MISMATCH, SOLANA_ERROR__CODECS__ENCODER_DECODER_FIXED_SIZE_MISMATCH, SOLANA_ERROR__CODECS__ENCODER_DECODER_MAX_SIZE_MISMATCH, SOLANA_ERROR__CODECS__INVALID_NUMBER_OF_ITEMS, SOLANA_ERROR__CODECS__ENUM_DISCRIMINATOR_OUT_OF_RANGE, SOLANA_ERROR__CODECS__INVALID_DISCRIMINATED_UNION_VARIANT, SOLANA_ERROR__CODECS__INVALID_ENUM_VARIANT, SOLANA_ERROR__CODECS__NUMBER_OUT_OF_RANGE, SOLANA_ERROR__CODECS__INVALID_STRING_FOR_BASE, SOLANA_ERROR__CODECS__EXPECTED_POSITIVE_BYTE_LENGTH, SOLANA_ERROR__CODECS__OFFSET_OUT_OF_RANGE, SOLANA_ERROR__CODECS__INVALID_LITERAL_UNION_VARIANT, SOLANA_ERROR__CODECS__LITERAL_UNION_DISCRIMINATOR_OUT_OF_RANGE, SOLANA_ERROR__CODECS__UNION_VARIANT_OUT_OF_RANGE, SOLANA_ERROR__CODECS__INVALID_CONSTANT, SOLANA_ERROR__CODECS__EXPECTED_ZERO_VALUE_TO_MATCH_ITEM_FIXED_SIZE, SOLANA_ERROR__CODECS__ENCODED_BYTES_MUST_NOT_INCLUDE_SENTINEL, SOLANA_ERROR__CODECS__SENTINEL_MISSING_IN_DECODED_BYTES, SOLANA_ERROR__CODECS__CANNOT_USE_LEXICAL_VALUES_AS_ENUM_DISCRIMINATORS, SOLANA_ERROR__CODECS__EXPECTED_DECODER_TO_CONSUME_ENTIRE_BYTE_ARRAY, SOLANA_ERROR__CODECS__INVALID_PATTERN_MATCH_VALUE, SOLANA_ERROR__CODECS__INVALID_PATTERN_MATCH_BYTES, SOLANA_ERROR__FIXED_POINTS__INVALID_TOTAL_BITS, SOLANA_ERROR__FIXED_POINTS__INVALID_FRACTIONAL_BITS, SOLANA_ERROR__FIXED_POINTS__INVALID_DECIMALS, SOLANA_ERROR__FIXED_POINTS__FRACTIONAL_BITS_EXCEED_TOTAL_BITS, SOLANA_ERROR__FIXED_POINTS__VALUE_OUT_OF_RANGE, SOLANA_ERROR__FIXED_POINTS__INVALID_STRING, SOLANA_ERROR__FIXED_POINTS__INVALID_ZERO_DENOMINATOR_RATIO, SOLANA_ERROR__FIXED_POINTS__ARITHMETIC_OVERFLOW, SOLANA_ERROR__FIXED_POINTS__SHAPE_MISMATCH, SOLANA_ERROR__FIXED_POINTS__DIVISION_BY_ZERO, SOLANA_ERROR__FIXED_POINTS__STRICT_MODE_PRECISION_LOSS, SOLANA_ERROR__FIXED_POINTS__MALFORMED_RAW_VALUE, SOLANA_ERROR__FIXED_POINTS__TOTAL_BITS_NOT_BYTE_ALIGNED, SOLANA_ERROR__RPC__INTEGER_OVERFLOW, SOLANA_ERROR__RPC__TRANSPORT_HTTP_HEADER_FORBIDDEN, SOLANA_ERROR__RPC__TRANSPORT_HTTP_ERROR, SOLANA_ERROR__RPC__API_PLAN_MISSING_FOR_RPC_METHOD, SOLANA_ERROR__RPC_SUBSCRIPTIONS__CANNOT_CREATE_SUBSCRIPTION_PLAN, SOLANA_ERROR__RPC_SUBSCRIPTIONS__EXPECTED_SERVER_SUBSCRIPTION_ID, SOLANA_ERROR__RPC_SUBSCRIPTIONS__CHANNEL_CLOSED_BEFORE_MESSAGE_BUFFERED, SOLANA_ERROR__RPC_SUBSCRIPTIONS__CHANNEL_CONNECTION_CLOSED, SOLANA_ERROR__RPC_SUBSCRIPTIONS__CHANNEL_FAILED_TO_CONNECT, SOLANA_ERROR__SUBSCRIBABLE__RETRY_NOT_SUPPORTED, SOLANA_ERROR__SUBSCRIBABLE__STREAM_CLOSED_WITHOUT_ERROR, SOLANA_ERROR__PROGRAM_CLIENTS__INSUFFICIENT_ACCOUNT_METAS, SOLANA_ERROR__PROGRAM_CLIENTS__UNRECOGNIZED_INSTRUCTION_TYPE, SOLANA_ERROR__PROGRAM_CLIENTS__FAILED_TO_IDENTIFY_INSTRUCTION, SOLANA_ERROR__PROGRAM_CLIENTS__UNEXPECTED_RESOLVED_INSTRUCTION_INPUT_TYPE, SOLANA_ERROR__PROGRAM_CLIENTS__RESOLVED_INSTRUCTION_INPUT_MUST_BE_NON_NULL, SOLANA_ERROR__PROGRAM_CLIENTS__UNRECOGNIZED_ACCOUNT_TYPE, SOLANA_ERROR__PROGRAM_CLIENTS__FAILED_TO_IDENTIFY_ACCOUNT, SOLANA_ERROR__WALLET__NOT_CONNECTED, SOLANA_ERROR__WALLET__NO_SIGNER_CONNECTED, SOLANA_ERROR__WALLET__SIGNER_NOT_AVAILABLE, SOLANA_ERROR__WALLET__ACCOUNT_NOT_AVAILABLE, SOLANA_ERROR__REACT__MISSING_PROVIDER, SOLANA_ERROR__REACT__MISSING_CAPABILITY, SOLANA_ERROR__REACT__SUBSCRIPTION_CLOSED_WITHOUT_ERROR, SOLANA_ERROR__INVARIANT_VIOLATION__SUBSCRIPTION_ITERATOR_STATE_MISSING, SOLANA_ERROR__INVARIANT_VIOLATION__SUBSCRIPTION_ITERATOR_MUST_NOT_POLL_BEFORE_RESOLVING_EXISTING_MESSAGE_PROMISE, SOLANA_ERROR__INVARIANT_VIOLATION__CACHED_ABORTABLE_ITERABLE_CACHE_ENTRY_MISSING, SOLANA_ERROR__INVARIANT_VIOLATION__SWITCH_MUST_BE_EXHAUSTIVE, SOLANA_ERROR__INVARIANT_VIOLATION__DATA_PUBLISHER_CHANNEL_UNIMPLEMENTED, SOLANA_ERROR__INVARIANT_VIOLATION__INVALID_INSTRUCTION_PLAN_KIND, SOLANA_ERROR__INVARIANT_VIOLATION__INVALID_TRANSACTION_PLAN_KIND, SolanaErrorMessages, INSTRUCTION_ERROR_RANGE_SIZE, START_INDEX, TYPE, SolanaError, ORDERED_ERROR_NAMES, ORDERED_ERROR_NAMES2;
var init_index_browser = __esm({
  "node_modules/@solana/errors/dist/index.browser.mjs"() {
    SOLANA_ERROR__BLOCK_HEIGHT_EXCEEDED = 1;
    SOLANA_ERROR__INVALID_NONCE = 2;
    SOLANA_ERROR__NONCE_ACCOUNT_NOT_FOUND = 3;
    SOLANA_ERROR__BLOCKHASH_STRING_LENGTH_OUT_OF_RANGE = 4;
    SOLANA_ERROR__INVALID_BLOCKHASH_BYTE_LENGTH = 5;
    SOLANA_ERROR__LAMPORTS_OUT_OF_RANGE = 6;
    SOLANA_ERROR__MALFORMED_BIGINT_STRING = 7;
    SOLANA_ERROR__MALFORMED_NUMBER_STRING = 8;
    SOLANA_ERROR__TIMESTAMP_OUT_OF_RANGE = 9;
    SOLANA_ERROR__MALFORMED_JSON_RPC_ERROR = 10;
    SOLANA_ERROR__FAILED_TO_SEND_TRANSACTION = 11;
    SOLANA_ERROR__FAILED_TO_SEND_TRANSACTIONS = 12;
    SOLANA_ERROR__FAILED_TO_SIGN_TRANSACTION = 13;
    SOLANA_ERROR__FAILED_TO_SIGN_TRANSACTIONS = 14;
    SOLANA_ERROR__JSON_RPC__PARSE_ERROR = -32700;
    SOLANA_ERROR__JSON_RPC__INTERNAL_ERROR = -32603;
    SOLANA_ERROR__JSON_RPC__INVALID_PARAMS = -32602;
    SOLANA_ERROR__JSON_RPC__METHOD_NOT_FOUND = -32601;
    SOLANA_ERROR__JSON_RPC__INVALID_REQUEST = -32600;
    SOLANA_ERROR__JSON_RPC__SERVER_ERROR_NO_SLOT_HISTORY = -32021;
    SOLANA_ERROR__JSON_RPC__SERVER_ERROR_FILTER_TRANSACTION_NOT_FOUND = -32020;
    SOLANA_ERROR__JSON_RPC__SERVER_ERROR_LONG_TERM_STORAGE_UNREACHABLE = -32019;
    SOLANA_ERROR__JSON_RPC__SERVER_ERROR_SLOT_NOT_EPOCH_BOUNDARY = -32018;
    SOLANA_ERROR__JSON_RPC__SERVER_ERROR_EPOCH_REWARDS_PERIOD_ACTIVE = -32017;
    SOLANA_ERROR__JSON_RPC__SERVER_ERROR_MIN_CONTEXT_SLOT_NOT_REACHED = -32016;
    SOLANA_ERROR__JSON_RPC__SERVER_ERROR_UNSUPPORTED_TRANSACTION_VERSION = -32015;
    SOLANA_ERROR__JSON_RPC__SERVER_ERROR_BLOCK_STATUS_NOT_AVAILABLE_YET = -32014;
    SOLANA_ERROR__JSON_RPC__SERVER_ERROR_TRANSACTION_SIGNATURE_LEN_MISMATCH = -32013;
    SOLANA_ERROR__JSON_RPC__SCAN_ERROR = -32012;
    SOLANA_ERROR__JSON_RPC__SERVER_ERROR_TRANSACTION_HISTORY_NOT_AVAILABLE = -32011;
    SOLANA_ERROR__JSON_RPC__SERVER_ERROR_KEY_EXCLUDED_FROM_SECONDARY_INDEX = -32010;
    SOLANA_ERROR__JSON_RPC__SERVER_ERROR_LONG_TERM_STORAGE_SLOT_SKIPPED = -32009;
    SOLANA_ERROR__JSON_RPC__SERVER_ERROR_NO_SNAPSHOT = -32008;
    SOLANA_ERROR__JSON_RPC__SERVER_ERROR_SLOT_SKIPPED = -32007;
    SOLANA_ERROR__JSON_RPC__SERVER_ERROR_TRANSACTION_PRECOMPILE_VERIFICATION_FAILURE = -32006;
    SOLANA_ERROR__JSON_RPC__SERVER_ERROR_NODE_UNHEALTHY = -32005;
    SOLANA_ERROR__JSON_RPC__SERVER_ERROR_BLOCK_NOT_AVAILABLE = -32004;
    SOLANA_ERROR__JSON_RPC__SERVER_ERROR_TRANSACTION_SIGNATURE_VERIFICATION_FAILURE = -32003;
    SOLANA_ERROR__JSON_RPC__SERVER_ERROR_SEND_TRANSACTION_PREFLIGHT_FAILURE = -32002;
    SOLANA_ERROR__JSON_RPC__SERVER_ERROR_BLOCK_CLEANED_UP = -32001;
    SOLANA_ERROR__ADDRESSES__INVALID_BYTE_LENGTH = 28e5;
    SOLANA_ERROR__ADDRESSES__STRING_LENGTH_OUT_OF_RANGE = 2800001;
    SOLANA_ERROR__ADDRESSES__INVALID_BASE58_ENCODED_ADDRESS = 2800002;
    SOLANA_ERROR__ADDRESSES__INVALID_ED25519_PUBLIC_KEY = 2800003;
    SOLANA_ERROR__ADDRESSES__MALFORMED_PDA = 2800004;
    SOLANA_ERROR__ADDRESSES__PDA_BUMP_SEED_OUT_OF_RANGE = 2800005;
    SOLANA_ERROR__ADDRESSES__MAX_NUMBER_OF_PDA_SEEDS_EXCEEDED = 2800006;
    SOLANA_ERROR__ADDRESSES__MAX_PDA_SEED_LENGTH_EXCEEDED = 2800007;
    SOLANA_ERROR__ADDRESSES__INVALID_SEEDS_POINT_ON_CURVE = 2800008;
    SOLANA_ERROR__ADDRESSES__FAILED_TO_FIND_VIABLE_PDA_BUMP_SEED = 2800009;
    SOLANA_ERROR__ADDRESSES__PDA_ENDS_WITH_PDA_MARKER = 2800010;
    SOLANA_ERROR__ADDRESSES__INVALID_OFF_CURVE_ADDRESS = 2800011;
    SOLANA_ERROR__ACCOUNTS__ACCOUNT_NOT_FOUND = 323e4;
    SOLANA_ERROR__ACCOUNTS__ONE_OR_MORE_ACCOUNTS_NOT_FOUND = 32300001;
    SOLANA_ERROR__ACCOUNTS__FAILED_TO_DECODE_ACCOUNT = 3230002;
    SOLANA_ERROR__ACCOUNTS__EXPECTED_DECODED_ACCOUNT = 3230003;
    SOLANA_ERROR__ACCOUNTS__EXPECTED_ALL_ACCOUNTS_TO_BE_DECODED = 3230004;
    SOLANA_ERROR__SUBTLE_CRYPTO__DISALLOWED_IN_INSECURE_CONTEXT = 361e4;
    SOLANA_ERROR__SUBTLE_CRYPTO__DIGEST_UNIMPLEMENTED = 3610001;
    SOLANA_ERROR__SUBTLE_CRYPTO__ED25519_ALGORITHM_UNIMPLEMENTED = 3610002;
    SOLANA_ERROR__SUBTLE_CRYPTO__EXPORT_FUNCTION_UNIMPLEMENTED = 3610003;
    SOLANA_ERROR__SUBTLE_CRYPTO__GENERATE_FUNCTION_UNIMPLEMENTED = 3610004;
    SOLANA_ERROR__SUBTLE_CRYPTO__SIGN_FUNCTION_UNIMPLEMENTED = 3610005;
    SOLANA_ERROR__SUBTLE_CRYPTO__VERIFY_FUNCTION_UNIMPLEMENTED = 3610006;
    SOLANA_ERROR__SUBTLE_CRYPTO__CANNOT_EXPORT_NON_EXTRACTABLE_KEY = 3610007;
    SOLANA_ERROR__CRYPTO__RANDOM_VALUES_FUNCTION_UNIMPLEMENTED = 3611e3;
    SOLANA_ERROR__KEYS__INVALID_KEY_PAIR_BYTE_LENGTH = 3704e3;
    SOLANA_ERROR__KEYS__INVALID_PRIVATE_KEY_BYTE_LENGTH = 3704001;
    SOLANA_ERROR__KEYS__INVALID_SIGNATURE_BYTE_LENGTH = 3704002;
    SOLANA_ERROR__KEYS__SIGNATURE_STRING_LENGTH_OUT_OF_RANGE = 3704003;
    SOLANA_ERROR__KEYS__PUBLIC_KEY_MUST_MATCH_PRIVATE_KEY = 3704004;
    SOLANA_ERROR__KEYS__INVALID_BASE58_IN_GRIND_REGEX = 3704005;
    SOLANA_ERROR__KEYS__WRITE_KEY_PAIR_UNSUPPORTED_ENVIRONMENT = 3704006;
    SOLANA_ERROR__FS__UNSUPPORTED_ENVIRONMENT = 3712e3;
    SOLANA_ERROR__INSTRUCTION__EXPECTED_TO_HAVE_ACCOUNTS = 4128e3;
    SOLANA_ERROR__INSTRUCTION__EXPECTED_TO_HAVE_DATA = 4128001;
    SOLANA_ERROR__INSTRUCTION__PROGRAM_ID_MISMATCH = 4128002;
    SOLANA_ERROR__INSTRUCTION_ERROR__UNKNOWN = 4615e3;
    SOLANA_ERROR__INSTRUCTION_ERROR__GENERIC_ERROR = 4615001;
    SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_ARGUMENT = 4615002;
    SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_INSTRUCTION_DATA = 4615003;
    SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_ACCOUNT_DATA = 4615004;
    SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_DATA_TOO_SMALL = 4615005;
    SOLANA_ERROR__INSTRUCTION_ERROR__INSUFFICIENT_FUNDS = 4615006;
    SOLANA_ERROR__INSTRUCTION_ERROR__INCORRECT_PROGRAM_ID = 4615007;
    SOLANA_ERROR__INSTRUCTION_ERROR__MISSING_REQUIRED_SIGNATURE = 4615008;
    SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_ALREADY_INITIALIZED = 4615009;
    SOLANA_ERROR__INSTRUCTION_ERROR__UNINITIALIZED_ACCOUNT = 4615010;
    SOLANA_ERROR__INSTRUCTION_ERROR__UNBALANCED_INSTRUCTION = 4615011;
    SOLANA_ERROR__INSTRUCTION_ERROR__MODIFIED_PROGRAM_ID = 4615012;
    SOLANA_ERROR__INSTRUCTION_ERROR__EXTERNAL_ACCOUNT_LAMPORT_SPEND = 4615013;
    SOLANA_ERROR__INSTRUCTION_ERROR__EXTERNAL_ACCOUNT_DATA_MODIFIED = 4615014;
    SOLANA_ERROR__INSTRUCTION_ERROR__READONLY_LAMPORT_CHANGE = 4615015;
    SOLANA_ERROR__INSTRUCTION_ERROR__READONLY_DATA_MODIFIED = 4615016;
    SOLANA_ERROR__INSTRUCTION_ERROR__DUPLICATE_ACCOUNT_INDEX = 4615017;
    SOLANA_ERROR__INSTRUCTION_ERROR__EXECUTABLE_MODIFIED = 4615018;
    SOLANA_ERROR__INSTRUCTION_ERROR__RENT_EPOCH_MODIFIED = 4615019;
    SOLANA_ERROR__INSTRUCTION_ERROR__NOT_ENOUGH_ACCOUNT_KEYS = 4615020;
    SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_DATA_SIZE_CHANGED = 4615021;
    SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_NOT_EXECUTABLE = 4615022;
    SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_BORROW_FAILED = 4615023;
    SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_BORROW_OUTSTANDING = 4615024;
    SOLANA_ERROR__INSTRUCTION_ERROR__DUPLICATE_ACCOUNT_OUT_OF_SYNC = 4615025;
    SOLANA_ERROR__INSTRUCTION_ERROR__CUSTOM = 4615026;
    SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_ERROR = 4615027;
    SOLANA_ERROR__INSTRUCTION_ERROR__EXECUTABLE_DATA_MODIFIED = 4615028;
    SOLANA_ERROR__INSTRUCTION_ERROR__EXECUTABLE_LAMPORT_CHANGE = 4615029;
    SOLANA_ERROR__INSTRUCTION_ERROR__EXECUTABLE_ACCOUNT_NOT_RENT_EXEMPT = 4615030;
    SOLANA_ERROR__INSTRUCTION_ERROR__UNSUPPORTED_PROGRAM_ID = 4615031;
    SOLANA_ERROR__INSTRUCTION_ERROR__CALL_DEPTH = 4615032;
    SOLANA_ERROR__INSTRUCTION_ERROR__MISSING_ACCOUNT = 4615033;
    SOLANA_ERROR__INSTRUCTION_ERROR__REENTRANCY_NOT_ALLOWED = 4615034;
    SOLANA_ERROR__INSTRUCTION_ERROR__MAX_SEED_LENGTH_EXCEEDED = 4615035;
    SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_SEEDS = 4615036;
    SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_REALLOC = 4615037;
    SOLANA_ERROR__INSTRUCTION_ERROR__COMPUTATIONAL_BUDGET_EXCEEDED = 4615038;
    SOLANA_ERROR__INSTRUCTION_ERROR__PRIVILEGE_ESCALATION = 4615039;
    SOLANA_ERROR__INSTRUCTION_ERROR__PROGRAM_ENVIRONMENT_SETUP_FAILURE = 4615040;
    SOLANA_ERROR__INSTRUCTION_ERROR__PROGRAM_FAILED_TO_COMPLETE = 4615041;
    SOLANA_ERROR__INSTRUCTION_ERROR__PROGRAM_FAILED_TO_COMPILE = 4615042;
    SOLANA_ERROR__INSTRUCTION_ERROR__IMMUTABLE = 4615043;
    SOLANA_ERROR__INSTRUCTION_ERROR__INCORRECT_AUTHORITY = 4615044;
    SOLANA_ERROR__INSTRUCTION_ERROR__BORSH_IO_ERROR = 4615045;
    SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_NOT_RENT_EXEMPT = 4615046;
    SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_ACCOUNT_OWNER = 4615047;
    SOLANA_ERROR__INSTRUCTION_ERROR__ARITHMETIC_OVERFLOW = 4615048;
    SOLANA_ERROR__INSTRUCTION_ERROR__UNSUPPORTED_SYSVAR = 4615049;
    SOLANA_ERROR__INSTRUCTION_ERROR__ILLEGAL_OWNER = 4615050;
    SOLANA_ERROR__INSTRUCTION_ERROR__MAX_ACCOUNTS_DATA_ALLOCATIONS_EXCEEDED = 4615051;
    SOLANA_ERROR__INSTRUCTION_ERROR__MAX_ACCOUNTS_EXCEEDED = 4615052;
    SOLANA_ERROR__INSTRUCTION_ERROR__MAX_INSTRUCTION_TRACE_LENGTH_EXCEEDED = 4615053;
    SOLANA_ERROR__INSTRUCTION_ERROR__BUILTIN_PROGRAMS_MUST_CONSUME_COMPUTE_UNITS = 4615054;
    SOLANA_ERROR__SIGNER__ADDRESS_CANNOT_HAVE_MULTIPLE_SIGNERS = 5508e3;
    SOLANA_ERROR__SIGNER__EXPECTED_KEY_PAIR_SIGNER = 5508001;
    SOLANA_ERROR__SIGNER__EXPECTED_MESSAGE_SIGNER = 5508002;
    SOLANA_ERROR__SIGNER__EXPECTED_MESSAGE_MODIFYING_SIGNER = 5508003;
    SOLANA_ERROR__SIGNER__EXPECTED_MESSAGE_PARTIAL_SIGNER = 5508004;
    SOLANA_ERROR__SIGNER__EXPECTED_TRANSACTION_SIGNER = 5508005;
    SOLANA_ERROR__SIGNER__EXPECTED_TRANSACTION_MODIFYING_SIGNER = 5508006;
    SOLANA_ERROR__SIGNER__EXPECTED_TRANSACTION_PARTIAL_SIGNER = 5508007;
    SOLANA_ERROR__SIGNER__EXPECTED_TRANSACTION_SENDING_SIGNER = 5508008;
    SOLANA_ERROR__SIGNER__TRANSACTION_CANNOT_HAVE_MULTIPLE_SENDING_SIGNERS = 5508009;
    SOLANA_ERROR__SIGNER__TRANSACTION_SENDING_SIGNER_MISSING = 5508010;
    SOLANA_ERROR__SIGNER__WALLET_MULTISIGN_UNIMPLEMENTED = 5508011;
    SOLANA_ERROR__SIGNER__WALLET_ACCOUNT_CANNOT_SIGN_TRANSACTION = 5508012;
    SOLANA_ERROR__OFFCHAIN_MESSAGE__MAXIMUM_LENGTH_EXCEEDED = 5607e3;
    SOLANA_ERROR__OFFCHAIN_MESSAGE__RESTRICTED_ASCII_BODY_CHARACTER_OUT_OF_RANGE = 5607001;
    SOLANA_ERROR__OFFCHAIN_MESSAGE__APPLICATION_DOMAIN_STRING_LENGTH_OUT_OF_RANGE = 5607002;
    SOLANA_ERROR__OFFCHAIN_MESSAGE__INVALID_APPLICATION_DOMAIN_BYTE_LENGTH = 5607003;
    SOLANA_ERROR__OFFCHAIN_MESSAGE__NUM_SIGNATURES_MISMATCH = 5607004;
    SOLANA_ERROR__OFFCHAIN_MESSAGE__NUM_REQUIRED_SIGNERS_CANNOT_BE_ZERO = 5607005;
    SOLANA_ERROR__OFFCHAIN_MESSAGE__VERSION_NUMBER_NOT_SUPPORTED = 5607006;
    SOLANA_ERROR__OFFCHAIN_MESSAGE__MESSAGE_FORMAT_MISMATCH = 5607007;
    SOLANA_ERROR__OFFCHAIN_MESSAGE__MESSAGE_LENGTH_MISMATCH = 5607008;
    SOLANA_ERROR__OFFCHAIN_MESSAGE__MESSAGE_MUST_BE_NON_EMPTY = 5607009;
    SOLANA_ERROR__OFFCHAIN_MESSAGE__NUM_ENVELOPE_SIGNATURES_CANNOT_BE_ZERO = 5607010;
    SOLANA_ERROR__OFFCHAIN_MESSAGE__SIGNATURES_MISSING = 5607011;
    SOLANA_ERROR__OFFCHAIN_MESSAGE__ENVELOPE_SIGNERS_MISMATCH = 5607012;
    SOLANA_ERROR__OFFCHAIN_MESSAGE__ADDRESSES_CANNOT_SIGN_OFFCHAIN_MESSAGE = 5607013;
    SOLANA_ERROR__OFFCHAIN_MESSAGE__UNEXPECTED_VERSION = 5607014;
    SOLANA_ERROR__OFFCHAIN_MESSAGE__SIGNATORIES_MUST_BE_SORTED = 5607015;
    SOLANA_ERROR__OFFCHAIN_MESSAGE__SIGNATORIES_MUST_BE_UNIQUE = 5607016;
    SOLANA_ERROR__OFFCHAIN_MESSAGE__SIGNATURE_VERIFICATION_FAILURE = 5607017;
    SOLANA_ERROR__OFFCHAIN_MESSAGE__CONTENT_DOES_NOT_MATCH_EXPECTED = 5607018;
    SOLANA_ERROR__OFFCHAIN_MESSAGE__REQUIRED_SIGNATORIES_DO_NOT_MATCH_EXPECTED = 5607019;
    SOLANA_ERROR__TRANSACTION__INVOKED_PROGRAMS_CANNOT_PAY_FEES = 5663e3;
    SOLANA_ERROR__TRANSACTION__INVOKED_PROGRAMS_MUST_NOT_BE_WRITABLE = 5663001;
    SOLANA_ERROR__TRANSACTION__EXPECTED_BLOCKHASH_LIFETIME = 5663002;
    SOLANA_ERROR__TRANSACTION__EXPECTED_NONCE_LIFETIME = 5663003;
    SOLANA_ERROR__TRANSACTION__VERSION_NUMBER_OUT_OF_RANGE = 5663004;
    SOLANA_ERROR__TRANSACTION__FAILED_TO_DECOMPILE_ADDRESS_LOOKUP_TABLE_CONTENTS_MISSING = 5663005;
    SOLANA_ERROR__TRANSACTION__FAILED_TO_DECOMPILE_ADDRESS_LOOKUP_TABLE_INDEX_OUT_OF_RANGE = 5663006;
    SOLANA_ERROR__TRANSACTION__FAILED_TO_DECOMPILE_INSTRUCTION_PROGRAM_ADDRESS_NOT_FOUND = 5663007;
    SOLANA_ERROR__TRANSACTION__FAILED_TO_DECOMPILE_FEE_PAYER_MISSING = 5663008;
    SOLANA_ERROR__TRANSACTION__SIGNATURES_MISSING = 5663009;
    SOLANA_ERROR__TRANSACTION__ADDRESS_MISSING = 5663010;
    SOLANA_ERROR__TRANSACTION__FEE_PAYER_MISSING = 5663011;
    SOLANA_ERROR__TRANSACTION__FEE_PAYER_SIGNATURE_MISSING = 5663012;
    SOLANA_ERROR__TRANSACTION__INVALID_NONCE_TRANSACTION_INSTRUCTIONS_MISSING = 5663013;
    SOLANA_ERROR__TRANSACTION__INVALID_NONCE_TRANSACTION_FIRST_INSTRUCTION_MUST_BE_ADVANCE_NONCE = 5663014;
    SOLANA_ERROR__TRANSACTION__ADDRESSES_CANNOT_SIGN_TRANSACTION = 5663015;
    SOLANA_ERROR__TRANSACTION__CANNOT_ENCODE_WITH_EMPTY_SIGNATURES = 5663016;
    SOLANA_ERROR__TRANSACTION__MESSAGE_SIGNATURES_MISMATCH = 5663017;
    SOLANA_ERROR__TRANSACTION__FAILED_TO_ESTIMATE_COMPUTE_LIMIT = 5663018;
    SOLANA_ERROR__TRANSACTION__FAILED_WHEN_SIMULATING_TO_ESTIMATE_COMPUTE_LIMIT = 5663019;
    SOLANA_ERROR__TRANSACTION__EXCEEDS_SIZE_LIMIT = 5663020;
    SOLANA_ERROR__TRANSACTION__VERSION_NUMBER_NOT_SUPPORTED = 5663021;
    SOLANA_ERROR__TRANSACTION__NONCE_ACCOUNT_CANNOT_BE_IN_LOOKUP_TABLE = 5663022;
    SOLANA_ERROR__TRANSACTION__MALFORMED_MESSAGE_BYTES = 5663023;
    SOLANA_ERROR__TRANSACTION__CANNOT_ENCODE_WITH_EMPTY_MESSAGE_BYTES = 5663024;
    SOLANA_ERROR__TRANSACTION__CANNOT_DECODE_EMPTY_TRANSACTION_BYTES = 5663025;
    SOLANA_ERROR__TRANSACTION__VERSION_ZERO_MUST_BE_ENCODED_WITH_SIGNATURES_FIRST = 5663026;
    SOLANA_ERROR__TRANSACTION__SIGNATURE_COUNT_TOO_HIGH_FOR_TRANSACTION_BYTES = 5663027;
    SOLANA_ERROR__TRANSACTION__INVALID_CONFIG_MASK_PRIORITY_FEE_BITS = 5663028;
    SOLANA_ERROR__TRANSACTION__INVALID_NONCE_ACCOUNT_INDEX = 5663029;
    SOLANA_ERROR__TRANSACTION__INVALID_CONFIG_VALUE_KIND = 5663030;
    SOLANA_ERROR__TRANSACTION__INSTRUCTION_HEADERS_PAYLOADS_MISMATCH = 5663031;
    SOLANA_ERROR__TRANSACTION__TOO_MANY_SIGNER_ADDRESSES = 5663032;
    SOLANA_ERROR__TRANSACTION__TOO_MANY_ACCOUNT_ADDRESSES = 5663033;
    SOLANA_ERROR__TRANSACTION__TOO_MANY_INSTRUCTIONS = 5663034;
    SOLANA_ERROR__TRANSACTION__TOO_MANY_ACCOUNTS_IN_INSTRUCTION = 5663035;
    SOLANA_ERROR__TRANSACTION__FAILED_TO_ESTIMATE_LOADED_ACCOUNTS_DATA_SIZE_LIMIT = 5663036;
    SOLANA_ERROR__TRANSACTION__FAILED_WHEN_SIMULATING_TO_ESTIMATE_RESOURCE_LIMITS = 5663037;
    SOLANA_ERROR__TRANSACTION__FAILED_TO_DECOMPILE_INSTRUCTION_ACCOUNT_INDEX_OUT_OF_RANGE = 5663038;
    SOLANA_ERROR__TRANSACTION__COMPUTE_UNIT_LIMIT_OUT_OF_RANGE = 5663039;
    SOLANA_ERROR__TRANSACTION__INVALID_HEAP_SIZE = 5663040;
    SOLANA_ERROR__TRANSACTION_INTROSPECTION__CANNOT_DECODE_JSON_PARSED_TRANSACTION = 5664e3;
    SOLANA_ERROR__TRANSACTION_INTROSPECTION__UNRECOGNIZED_GET_TRANSACTION_RESPONSE = 5664001;
    SOLANA_ERROR__TRANSACTION_ERROR__UNKNOWN = 705e4;
    SOLANA_ERROR__TRANSACTION_ERROR__ACCOUNT_IN_USE = 7050001;
    SOLANA_ERROR__TRANSACTION_ERROR__ACCOUNT_LOADED_TWICE = 7050002;
    SOLANA_ERROR__TRANSACTION_ERROR__ACCOUNT_NOT_FOUND = 7050003;
    SOLANA_ERROR__TRANSACTION_ERROR__PROGRAM_ACCOUNT_NOT_FOUND = 7050004;
    SOLANA_ERROR__TRANSACTION_ERROR__INSUFFICIENT_FUNDS_FOR_FEE = 7050005;
    SOLANA_ERROR__TRANSACTION_ERROR__INVALID_ACCOUNT_FOR_FEE = 7050006;
    SOLANA_ERROR__TRANSACTION_ERROR__ALREADY_PROCESSED = 7050007;
    SOLANA_ERROR__TRANSACTION_ERROR__BLOCKHASH_NOT_FOUND = 7050008;
    SOLANA_ERROR__TRANSACTION_ERROR__CALL_CHAIN_TOO_DEEP = 7050009;
    SOLANA_ERROR__TRANSACTION_ERROR__MISSING_SIGNATURE_FOR_FEE = 7050010;
    SOLANA_ERROR__TRANSACTION_ERROR__INVALID_ACCOUNT_INDEX = 7050011;
    SOLANA_ERROR__TRANSACTION_ERROR__SIGNATURE_FAILURE = 7050012;
    SOLANA_ERROR__TRANSACTION_ERROR__INVALID_PROGRAM_FOR_EXECUTION = 7050013;
    SOLANA_ERROR__TRANSACTION_ERROR__SANITIZE_FAILURE = 7050014;
    SOLANA_ERROR__TRANSACTION_ERROR__CLUSTER_MAINTENANCE = 7050015;
    SOLANA_ERROR__TRANSACTION_ERROR__ACCOUNT_BORROW_OUTSTANDING = 7050016;
    SOLANA_ERROR__TRANSACTION_ERROR__WOULD_EXCEED_MAX_BLOCK_COST_LIMIT = 7050017;
    SOLANA_ERROR__TRANSACTION_ERROR__UNSUPPORTED_VERSION = 7050018;
    SOLANA_ERROR__TRANSACTION_ERROR__INVALID_WRITABLE_ACCOUNT = 7050019;
    SOLANA_ERROR__TRANSACTION_ERROR__WOULD_EXCEED_MAX_ACCOUNT_COST_LIMIT = 7050020;
    SOLANA_ERROR__TRANSACTION_ERROR__WOULD_EXCEED_ACCOUNT_DATA_BLOCK_LIMIT = 7050021;
    SOLANA_ERROR__TRANSACTION_ERROR__TOO_MANY_ACCOUNT_LOCKS = 7050022;
    SOLANA_ERROR__TRANSACTION_ERROR__ADDRESS_LOOKUP_TABLE_NOT_FOUND = 7050023;
    SOLANA_ERROR__TRANSACTION_ERROR__INVALID_ADDRESS_LOOKUP_TABLE_OWNER = 7050024;
    SOLANA_ERROR__TRANSACTION_ERROR__INVALID_ADDRESS_LOOKUP_TABLE_DATA = 7050025;
    SOLANA_ERROR__TRANSACTION_ERROR__INVALID_ADDRESS_LOOKUP_TABLE_INDEX = 7050026;
    SOLANA_ERROR__TRANSACTION_ERROR__INVALID_RENT_PAYING_ACCOUNT = 7050027;
    SOLANA_ERROR__TRANSACTION_ERROR__WOULD_EXCEED_MAX_VOTE_COST_LIMIT = 7050028;
    SOLANA_ERROR__TRANSACTION_ERROR__WOULD_EXCEED_ACCOUNT_DATA_TOTAL_LIMIT = 7050029;
    SOLANA_ERROR__TRANSACTION_ERROR__DUPLICATE_INSTRUCTION = 7050030;
    SOLANA_ERROR__TRANSACTION_ERROR__INSUFFICIENT_FUNDS_FOR_RENT = 7050031;
    SOLANA_ERROR__TRANSACTION_ERROR__MAX_LOADED_ACCOUNTS_DATA_SIZE_EXCEEDED = 7050032;
    SOLANA_ERROR__TRANSACTION_ERROR__INVALID_LOADED_ACCOUNTS_DATA_SIZE_LIMIT = 7050033;
    SOLANA_ERROR__TRANSACTION_ERROR__RESANITIZATION_NEEDED = 7050034;
    SOLANA_ERROR__TRANSACTION_ERROR__PROGRAM_EXECUTION_TEMPORARILY_RESTRICTED = 7050035;
    SOLANA_ERROR__TRANSACTION_ERROR__UNBALANCED_TRANSACTION = 7050036;
    SOLANA_ERROR__INSTRUCTION_PLANS__MESSAGE_CANNOT_ACCOMMODATE_PLAN = 7618e3;
    SOLANA_ERROR__INSTRUCTION_PLANS__MESSAGE_PACKER_ALREADY_COMPLETE = 7618001;
    SOLANA_ERROR__INSTRUCTION_PLANS__EMPTY_INSTRUCTION_PLAN = 7618002;
    SOLANA_ERROR__INSTRUCTION_PLANS__FAILED_TO_EXECUTE_TRANSACTION_PLAN = 7618003;
    SOLANA_ERROR__INSTRUCTION_PLANS__NON_DIVISIBLE_TRANSACTION_PLANS_NOT_SUPPORTED = 7618004;
    SOLANA_ERROR__INSTRUCTION_PLANS__FAILED_SINGLE_TRANSACTION_PLAN_RESULT_NOT_FOUND = 7618005;
    SOLANA_ERROR__INSTRUCTION_PLANS__UNEXPECTED_INSTRUCTION_PLAN = 7618006;
    SOLANA_ERROR__INSTRUCTION_PLANS__UNEXPECTED_TRANSACTION_PLAN = 7618007;
    SOLANA_ERROR__INSTRUCTION_PLANS__UNEXPECTED_TRANSACTION_PLAN_RESULT = 7618008;
    SOLANA_ERROR__INSTRUCTION_PLANS__EXPECTED_SUCCESSFUL_TRANSACTION_PLAN_RESULT = 7618009;
    SOLANA_ERROR__INSTRUCTION_PLANS__MAX_INSTRUCTIONS_PER_TRANSACTION_EXCEEDED = 7618010;
    SOLANA_ERROR__INSTRUCTION_PLANS__INVALID_MAX_INSTRUCTIONS_PER_TRANSACTION = 7618011;
    SOLANA_ERROR__CODECS__CANNOT_DECODE_EMPTY_BYTE_ARRAY = 8078e3;
    SOLANA_ERROR__CODECS__INVALID_BYTE_LENGTH = 8078001;
    SOLANA_ERROR__CODECS__EXPECTED_FIXED_LENGTH = 8078002;
    SOLANA_ERROR__CODECS__EXPECTED_VARIABLE_LENGTH = 8078003;
    SOLANA_ERROR__CODECS__ENCODER_DECODER_SIZE_COMPATIBILITY_MISMATCH = 8078004;
    SOLANA_ERROR__CODECS__ENCODER_DECODER_FIXED_SIZE_MISMATCH = 8078005;
    SOLANA_ERROR__CODECS__ENCODER_DECODER_MAX_SIZE_MISMATCH = 8078006;
    SOLANA_ERROR__CODECS__INVALID_NUMBER_OF_ITEMS = 8078007;
    SOLANA_ERROR__CODECS__ENUM_DISCRIMINATOR_OUT_OF_RANGE = 8078008;
    SOLANA_ERROR__CODECS__INVALID_DISCRIMINATED_UNION_VARIANT = 8078009;
    SOLANA_ERROR__CODECS__INVALID_ENUM_VARIANT = 8078010;
    SOLANA_ERROR__CODECS__NUMBER_OUT_OF_RANGE = 8078011;
    SOLANA_ERROR__CODECS__INVALID_STRING_FOR_BASE = 8078012;
    SOLANA_ERROR__CODECS__EXPECTED_POSITIVE_BYTE_LENGTH = 8078013;
    SOLANA_ERROR__CODECS__OFFSET_OUT_OF_RANGE = 8078014;
    SOLANA_ERROR__CODECS__INVALID_LITERAL_UNION_VARIANT = 8078015;
    SOLANA_ERROR__CODECS__LITERAL_UNION_DISCRIMINATOR_OUT_OF_RANGE = 8078016;
    SOLANA_ERROR__CODECS__UNION_VARIANT_OUT_OF_RANGE = 8078017;
    SOLANA_ERROR__CODECS__INVALID_CONSTANT = 8078018;
    SOLANA_ERROR__CODECS__EXPECTED_ZERO_VALUE_TO_MATCH_ITEM_FIXED_SIZE = 8078019;
    SOLANA_ERROR__CODECS__ENCODED_BYTES_MUST_NOT_INCLUDE_SENTINEL = 8078020;
    SOLANA_ERROR__CODECS__SENTINEL_MISSING_IN_DECODED_BYTES = 8078021;
    SOLANA_ERROR__CODECS__CANNOT_USE_LEXICAL_VALUES_AS_ENUM_DISCRIMINATORS = 8078022;
    SOLANA_ERROR__CODECS__EXPECTED_DECODER_TO_CONSUME_ENTIRE_BYTE_ARRAY = 8078023;
    SOLANA_ERROR__CODECS__INVALID_PATTERN_MATCH_VALUE = 8078024;
    SOLANA_ERROR__CODECS__INVALID_PATTERN_MATCH_BYTES = 8078025;
    SOLANA_ERROR__FIXED_POINTS__INVALID_TOTAL_BITS = 809e4;
    SOLANA_ERROR__FIXED_POINTS__INVALID_FRACTIONAL_BITS = 8090001;
    SOLANA_ERROR__FIXED_POINTS__INVALID_DECIMALS = 8090002;
    SOLANA_ERROR__FIXED_POINTS__FRACTIONAL_BITS_EXCEED_TOTAL_BITS = 8090003;
    SOLANA_ERROR__FIXED_POINTS__VALUE_OUT_OF_RANGE = 8090004;
    SOLANA_ERROR__FIXED_POINTS__INVALID_STRING = 8090005;
    SOLANA_ERROR__FIXED_POINTS__INVALID_ZERO_DENOMINATOR_RATIO = 8090006;
    SOLANA_ERROR__FIXED_POINTS__ARITHMETIC_OVERFLOW = 8090007;
    SOLANA_ERROR__FIXED_POINTS__SHAPE_MISMATCH = 8090008;
    SOLANA_ERROR__FIXED_POINTS__DIVISION_BY_ZERO = 8090009;
    SOLANA_ERROR__FIXED_POINTS__STRICT_MODE_PRECISION_LOSS = 8090010;
    SOLANA_ERROR__FIXED_POINTS__MALFORMED_RAW_VALUE = 8090011;
    SOLANA_ERROR__FIXED_POINTS__TOTAL_BITS_NOT_BYTE_ALIGNED = 8090012;
    SOLANA_ERROR__RPC__INTEGER_OVERFLOW = 81e5;
    SOLANA_ERROR__RPC__TRANSPORT_HTTP_HEADER_FORBIDDEN = 8100001;
    SOLANA_ERROR__RPC__TRANSPORT_HTTP_ERROR = 8100002;
    SOLANA_ERROR__RPC__API_PLAN_MISSING_FOR_RPC_METHOD = 8100003;
    SOLANA_ERROR__RPC_SUBSCRIPTIONS__CANNOT_CREATE_SUBSCRIPTION_PLAN = 819e4;
    SOLANA_ERROR__RPC_SUBSCRIPTIONS__EXPECTED_SERVER_SUBSCRIPTION_ID = 8190001;
    SOLANA_ERROR__RPC_SUBSCRIPTIONS__CHANNEL_CLOSED_BEFORE_MESSAGE_BUFFERED = 8190002;
    SOLANA_ERROR__RPC_SUBSCRIPTIONS__CHANNEL_CONNECTION_CLOSED = 8190003;
    SOLANA_ERROR__RPC_SUBSCRIPTIONS__CHANNEL_FAILED_TO_CONNECT = 8190004;
    SOLANA_ERROR__SUBSCRIBABLE__RETRY_NOT_SUPPORTED = 8195e3;
    SOLANA_ERROR__SUBSCRIBABLE__STREAM_CLOSED_WITHOUT_ERROR = 8195001;
    SOLANA_ERROR__PROGRAM_CLIENTS__INSUFFICIENT_ACCOUNT_METAS = 85e5;
    SOLANA_ERROR__PROGRAM_CLIENTS__UNRECOGNIZED_INSTRUCTION_TYPE = 8500001;
    SOLANA_ERROR__PROGRAM_CLIENTS__FAILED_TO_IDENTIFY_INSTRUCTION = 8500002;
    SOLANA_ERROR__PROGRAM_CLIENTS__UNEXPECTED_RESOLVED_INSTRUCTION_INPUT_TYPE = 8500003;
    SOLANA_ERROR__PROGRAM_CLIENTS__RESOLVED_INSTRUCTION_INPUT_MUST_BE_NON_NULL = 8500004;
    SOLANA_ERROR__PROGRAM_CLIENTS__UNRECOGNIZED_ACCOUNT_TYPE = 8500005;
    SOLANA_ERROR__PROGRAM_CLIENTS__FAILED_TO_IDENTIFY_ACCOUNT = 8500006;
    SOLANA_ERROR__WALLET__NOT_CONNECTED = 89e5;
    SOLANA_ERROR__WALLET__NO_SIGNER_CONNECTED = 8900001;
    SOLANA_ERROR__WALLET__SIGNER_NOT_AVAILABLE = 8900002;
    SOLANA_ERROR__WALLET__ACCOUNT_NOT_AVAILABLE = 8900003;
    SOLANA_ERROR__REACT__MISSING_PROVIDER = 9e6;
    SOLANA_ERROR__REACT__MISSING_CAPABILITY = 9000001;
    SOLANA_ERROR__REACT__SUBSCRIPTION_CLOSED_WITHOUT_ERROR = 9000002;
    SOLANA_ERROR__INVARIANT_VIOLATION__SUBSCRIPTION_ITERATOR_STATE_MISSING = 99e5;
    SOLANA_ERROR__INVARIANT_VIOLATION__SUBSCRIPTION_ITERATOR_MUST_NOT_POLL_BEFORE_RESOLVING_EXISTING_MESSAGE_PROMISE = 9900001;
    SOLANA_ERROR__INVARIANT_VIOLATION__CACHED_ABORTABLE_ITERABLE_CACHE_ENTRY_MISSING = 9900002;
    SOLANA_ERROR__INVARIANT_VIOLATION__SWITCH_MUST_BE_EXHAUSTIVE = 9900003;
    SOLANA_ERROR__INVARIANT_VIOLATION__DATA_PUBLISHER_CHANNEL_UNIMPLEMENTED = 9900004;
    SOLANA_ERROR__INVARIANT_VIOLATION__INVALID_INSTRUCTION_PLAN_KIND = 9900005;
    SOLANA_ERROR__INVARIANT_VIOLATION__INVALID_TRANSACTION_PLAN_KIND = 9900006;
    SolanaErrorMessages = {
      [SOLANA_ERROR__ACCOUNTS__ACCOUNT_NOT_FOUND]: "Account not found at address: $address",
      [SOLANA_ERROR__ACCOUNTS__EXPECTED_ALL_ACCOUNTS_TO_BE_DECODED]: "Not all accounts were decoded. Encoded accounts found at addresses: $addresses.",
      [SOLANA_ERROR__ACCOUNTS__EXPECTED_DECODED_ACCOUNT]: "Expected decoded account at address: $address",
      [SOLANA_ERROR__ACCOUNTS__FAILED_TO_DECODE_ACCOUNT]: "Failed to decode account data at address: $address",
      [SOLANA_ERROR__ACCOUNTS__ONE_OR_MORE_ACCOUNTS_NOT_FOUND]: "Accounts not found at addresses: $addresses",
      [SOLANA_ERROR__ADDRESSES__FAILED_TO_FIND_VIABLE_PDA_BUMP_SEED]: "Unable to find a viable program address bump seed.",
      [SOLANA_ERROR__ADDRESSES__INVALID_BASE58_ENCODED_ADDRESS]: "$putativeAddress is not a base58-encoded address.",
      [SOLANA_ERROR__ADDRESSES__INVALID_BYTE_LENGTH]: "Expected base58 encoded address to decode to a byte array of length 32. Actual length: $actualLength.",
      [SOLANA_ERROR__ADDRESSES__INVALID_ED25519_PUBLIC_KEY]: "The `CryptoKey` must be an `Ed25519` public key.",
      [SOLANA_ERROR__ADDRESSES__INVALID_OFF_CURVE_ADDRESS]: "$putativeOffCurveAddress is not a base58-encoded off-curve address.",
      [SOLANA_ERROR__ADDRESSES__INVALID_SEEDS_POINT_ON_CURVE]: "Invalid seeds; point must fall off the Ed25519 curve.",
      [SOLANA_ERROR__ADDRESSES__MALFORMED_PDA]: "Expected given program derived address to have the following format: [Address, ProgramDerivedAddressBump].",
      [SOLANA_ERROR__ADDRESSES__MAX_NUMBER_OF_PDA_SEEDS_EXCEEDED]: "A maximum of $maxSeeds seeds, including the bump seed, may be supplied when creating an address. Received: $actual.",
      [SOLANA_ERROR__ADDRESSES__MAX_PDA_SEED_LENGTH_EXCEEDED]: "The seed at index $index with length $actual exceeds the maximum length of $maxSeedLength bytes.",
      [SOLANA_ERROR__ADDRESSES__PDA_BUMP_SEED_OUT_OF_RANGE]: "Expected program derived address bump to be in the range [0, 255], got: $bump.",
      [SOLANA_ERROR__ADDRESSES__PDA_ENDS_WITH_PDA_MARKER]: "Program address cannot end with PDA marker.",
      [SOLANA_ERROR__ADDRESSES__STRING_LENGTH_OUT_OF_RANGE]: "Expected base58-encoded address string of length in the range [32, 44]. Actual length: $actualLength.",
      [SOLANA_ERROR__BLOCKHASH_STRING_LENGTH_OUT_OF_RANGE]: "Expected base58-encoded blockhash string of length in the range [32, 44]. Actual length: $actualLength.",
      [SOLANA_ERROR__BLOCK_HEIGHT_EXCEEDED]: "The network has progressed past the last block for which this transaction could have been committed.",
      [SOLANA_ERROR__CODECS__CANNOT_DECODE_EMPTY_BYTE_ARRAY]: "Codec [$codecDescription] cannot decode empty byte arrays.",
      [SOLANA_ERROR__CODECS__CANNOT_USE_LEXICAL_VALUES_AS_ENUM_DISCRIMINATORS]: "Enum codec cannot use lexical values [$stringValues] as discriminators. Either remove all lexical values or set `useValuesAsDiscriminators` to `false`.",
      [SOLANA_ERROR__CODECS__ENCODED_BYTES_MUST_NOT_INCLUDE_SENTINEL]: "Sentinel [$hexSentinel] must not be present in encoded bytes [$hexEncodedBytes].",
      [SOLANA_ERROR__CODECS__ENCODER_DECODER_FIXED_SIZE_MISMATCH]: "Encoder and decoder must have the same fixed size, got [$encoderFixedSize] and [$decoderFixedSize].",
      [SOLANA_ERROR__CODECS__ENCODER_DECODER_MAX_SIZE_MISMATCH]: "Encoder and decoder must have the same max size, got [$encoderMaxSize] and [$decoderMaxSize].",
      [SOLANA_ERROR__CODECS__ENCODER_DECODER_SIZE_COMPATIBILITY_MISMATCH]: "Encoder and decoder must either both be fixed-size or variable-size.",
      [SOLANA_ERROR__CODECS__ENUM_DISCRIMINATOR_OUT_OF_RANGE]: "Enum discriminator out of range. Expected a number in [$formattedValidDiscriminators], got $discriminator.",
      [SOLANA_ERROR__CODECS__EXPECTED_FIXED_LENGTH]: "Expected a fixed-size codec, got a variable-size one.",
      [SOLANA_ERROR__CODECS__EXPECTED_POSITIVE_BYTE_LENGTH]: "Codec [$codecDescription] expected a positive byte length, got $bytesLength.",
      [SOLANA_ERROR__CODECS__EXPECTED_VARIABLE_LENGTH]: "Expected a variable-size codec, got a fixed-size one.",
      [SOLANA_ERROR__CODECS__EXPECTED_ZERO_VALUE_TO_MATCH_ITEM_FIXED_SIZE]: "Codec [$codecDescription] expected zero-value [$hexZeroValue] to have the same size as the provided fixed-size item [$expectedSize bytes].",
      [SOLANA_ERROR__CODECS__INVALID_BYTE_LENGTH]: "Codec [$codecDescription] expected $expected bytes, got $bytesLength.",
      [SOLANA_ERROR__CODECS__INVALID_CONSTANT]: "Expected byte array constant [$hexConstant] to be present in data [$hexData] at offset [$offset].",
      [SOLANA_ERROR__CODECS__INVALID_DISCRIMINATED_UNION_VARIANT]: "Invalid discriminated union variant. Expected one of [$variants], got $value.",
      [SOLANA_ERROR__CODECS__INVALID_ENUM_VARIANT]: "Invalid enum variant. Expected one of [$stringValues] or a number in [$formattedNumericalValues], got $variant.",
      [SOLANA_ERROR__CODECS__INVALID_LITERAL_UNION_VARIANT]: "Invalid literal union variant. Expected one of [$variants], got $value.",
      [SOLANA_ERROR__CODECS__INVALID_NUMBER_OF_ITEMS]: "Expected [$codecDescription] to have $expected items, got $actual.",
      [SOLANA_ERROR__CODECS__INVALID_STRING_FOR_BASE]: "Invalid value $value for base $base with alphabet $alphabet.",
      [SOLANA_ERROR__CODECS__LITERAL_UNION_DISCRIMINATOR_OUT_OF_RANGE]: "Literal union discriminator out of range. Expected a number between $minRange and $maxRange, got $discriminator.",
      [SOLANA_ERROR__CODECS__NUMBER_OUT_OF_RANGE]: "Codec [$codecDescription] expected number to be in the range [$min, $max], got $value.",
      [SOLANA_ERROR__CODECS__OFFSET_OUT_OF_RANGE]: "Codec [$codecDescription] expected offset to be in the range [0, $bytesLength], got $offset.",
      [SOLANA_ERROR__CODECS__SENTINEL_MISSING_IN_DECODED_BYTES]: "Expected sentinel [$hexSentinel] to be present in decoded bytes [$hexDecodedBytes].",
      [SOLANA_ERROR__CODECS__UNION_VARIANT_OUT_OF_RANGE]: "Union variant out of range. Expected an index between $minRange and $maxRange, got $variant.",
      [SOLANA_ERROR__CODECS__EXPECTED_DECODER_TO_CONSUME_ENTIRE_BYTE_ARRAY]: "This decoder expected a byte array of exactly $expectedLength bytes, but $numExcessBytes unexpected excess bytes remained after decoding. Are you sure that you have chosen the correct decoder for this data?",
      [SOLANA_ERROR__CODECS__INVALID_PATTERN_MATCH_VALUE]: "Invalid pattern match value. The provided value does not match any of the specified patterns.",
      [SOLANA_ERROR__CODECS__INVALID_PATTERN_MATCH_BYTES]: "Invalid pattern match bytes. The provided byte array does not match any of the specified patterns.",
      [SOLANA_ERROR__CRYPTO__RANDOM_VALUES_FUNCTION_UNIMPLEMENTED]: "No random values implementation could be found.",
      [SOLANA_ERROR__FAILED_TO_SEND_TRANSACTION]: "Failed to send transaction$causeMessage",
      [SOLANA_ERROR__FAILED_TO_SEND_TRANSACTIONS]: "Failed to send transactions$causeMessages",
      [SOLANA_ERROR__FAILED_TO_SIGN_TRANSACTION]: "Failed to sign transaction$causeMessage",
      [SOLANA_ERROR__FAILED_TO_SIGN_TRANSACTIONS]: "Failed to sign transactions$causeMessages",
      [SOLANA_ERROR__FIXED_POINTS__ARITHMETIC_OVERFLOW]: "Fixed-point operation `$operation` of kind `$kind` overflowed. Expected a raw bigint in [$min, $max], got $result.",
      [SOLANA_ERROR__FIXED_POINTS__DIVISION_BY_ZERO]: "Fixed-point division by zero for value of kind `$kind` ($signedness, $totalBits bits).",
      [SOLANA_ERROR__FIXED_POINTS__FRACTIONAL_BITS_EXCEED_TOTAL_BITS]: "`fractionalBits` ($fractionalBits) must not exceed `totalBits` ($totalBits).",
      [SOLANA_ERROR__FIXED_POINTS__INVALID_DECIMALS]: "Invalid `decimals`. Expected a non-negative integer, got $decimals.",
      [SOLANA_ERROR__FIXED_POINTS__INVALID_FRACTIONAL_BITS]: "Invalid `fractionalBits`. Expected a non-negative integer, got $fractionalBits.",
      [SOLANA_ERROR__FIXED_POINTS__INVALID_STRING]: "Invalid string `$input` for fixed-point value of kind `$kind`.",
      [SOLANA_ERROR__FIXED_POINTS__INVALID_TOTAL_BITS]: "Invalid `totalBits`. Expected a positive integer, got $totalBits.",
      [SOLANA_ERROR__FIXED_POINTS__INVALID_ZERO_DENOMINATOR_RATIO]: "Invalid ratio $numerator/$denominator for fixed-point value of kind `$kind`. Denominator must be non-zero.",
      [SOLANA_ERROR__FIXED_POINTS__MALFORMED_RAW_VALUE]: "Fixed-point value of kind `$kind` has a malformed `raw` field. Expected a bigint, got `$raw`.",
      [SOLANA_ERROR__FIXED_POINTS__SHAPE_MISMATCH]: "Fixed-point `$operation` operation expected $expectedKind ($expectedSignedness, $expectedTotalBits bits, $expectedScale $expectedScaleLabel); got $actualKind ($actualSignedness, $actualTotalBits bits, $actualScale $actualScaleLabel).",
      [SOLANA_ERROR__FIXED_POINTS__STRICT_MODE_PRECISION_LOSS]: "Fixed-point operation `$operation` of kind `$kind` cannot be performed exactly; pass a rounding mode other than `strict` to allow a rounded result.",
      [SOLANA_ERROR__FIXED_POINTS__TOTAL_BITS_NOT_BYTE_ALIGNED]: "Fixed-point codec of kind `$kind` requires `totalBits` to be a multiple of 8; got $totalBits.",
      [SOLANA_ERROR__FIXED_POINTS__VALUE_OUT_OF_RANGE]: "Fixed-point value of kind `$kind` is out of range for $signedness $totalBits-bit storage. Expected a raw bigint in [$min, $max], got $raw.",
      [SOLANA_ERROR__FS__UNSUPPORTED_ENVIRONMENT]: "Filesystem operation `$operation` is not supported in this environment.",
      [SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_ALREADY_INITIALIZED]: "Instruction requires an uninitialized account",
      [SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_BORROW_FAILED]: "Instruction tries to borrow reference for an account which is already borrowed",
      [SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_BORROW_OUTSTANDING]: "Instruction left account with an outstanding borrowed reference",
      [SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_DATA_SIZE_CHANGED]: "Program other than the account's owner changed the size of the account data",
      [SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_DATA_TOO_SMALL]: "Account data too small for instruction",
      [SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_NOT_EXECUTABLE]: "Instruction expected an executable account",
      [SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_NOT_RENT_EXEMPT]: "An account does not have enough lamports to be rent-exempt",
      [SOLANA_ERROR__INSTRUCTION_ERROR__ARITHMETIC_OVERFLOW]: "Program arithmetic overflowed",
      [SOLANA_ERROR__INSTRUCTION_ERROR__BORSH_IO_ERROR]: "Failed to serialize or deserialize account data",
      [SOLANA_ERROR__INSTRUCTION_ERROR__BUILTIN_PROGRAMS_MUST_CONSUME_COMPUTE_UNITS]: "Builtin programs must consume compute units",
      [SOLANA_ERROR__INSTRUCTION_ERROR__CALL_DEPTH]: "Cross-program invocation call depth too deep",
      [SOLANA_ERROR__INSTRUCTION_ERROR__COMPUTATIONAL_BUDGET_EXCEEDED]: "Computational budget exceeded",
      [SOLANA_ERROR__INSTRUCTION_ERROR__CUSTOM]: "Custom program error: #$code",
      [SOLANA_ERROR__INSTRUCTION_ERROR__DUPLICATE_ACCOUNT_INDEX]: "Instruction contains duplicate accounts",
      [SOLANA_ERROR__INSTRUCTION_ERROR__DUPLICATE_ACCOUNT_OUT_OF_SYNC]: "Instruction modifications of multiply-passed account differ",
      [SOLANA_ERROR__INSTRUCTION_ERROR__EXECUTABLE_ACCOUNT_NOT_RENT_EXEMPT]: "Executable accounts must be rent exempt",
      [SOLANA_ERROR__INSTRUCTION_ERROR__EXECUTABLE_DATA_MODIFIED]: "Instruction changed executable accounts data",
      [SOLANA_ERROR__INSTRUCTION_ERROR__EXECUTABLE_LAMPORT_CHANGE]: "Instruction changed the balance of an executable account",
      [SOLANA_ERROR__INSTRUCTION_ERROR__EXECUTABLE_MODIFIED]: "Instruction changed executable bit of an account",
      [SOLANA_ERROR__INSTRUCTION_ERROR__EXTERNAL_ACCOUNT_DATA_MODIFIED]: "Instruction modified data of an account it does not own",
      [SOLANA_ERROR__INSTRUCTION_ERROR__EXTERNAL_ACCOUNT_LAMPORT_SPEND]: "Instruction spent from the balance of an account it does not own",
      [SOLANA_ERROR__INSTRUCTION_ERROR__GENERIC_ERROR]: "Generic instruction error",
      [SOLANA_ERROR__INSTRUCTION_ERROR__ILLEGAL_OWNER]: "Provided owner is not allowed",
      [SOLANA_ERROR__INSTRUCTION_ERROR__IMMUTABLE]: "Account is immutable",
      [SOLANA_ERROR__INSTRUCTION_ERROR__INCORRECT_AUTHORITY]: "Incorrect authority provided",
      [SOLANA_ERROR__INSTRUCTION_ERROR__INCORRECT_PROGRAM_ID]: "Incorrect program id for instruction",
      [SOLANA_ERROR__INSTRUCTION_ERROR__INSUFFICIENT_FUNDS]: "Insufficient funds for instruction",
      [SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_ACCOUNT_DATA]: "Invalid account data for instruction",
      [SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_ACCOUNT_OWNER]: "Invalid account owner",
      [SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_ARGUMENT]: "Invalid program argument",
      [SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_ERROR]: "Program returned invalid error code",
      [SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_INSTRUCTION_DATA]: "Invalid instruction data",
      [SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_REALLOC]: "Failed to reallocate account data",
      [SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_SEEDS]: "Provided seeds do not result in a valid address",
      [SOLANA_ERROR__INSTRUCTION_ERROR__MAX_ACCOUNTS_DATA_ALLOCATIONS_EXCEEDED]: "Accounts data allocations exceeded the maximum allowed per transaction",
      [SOLANA_ERROR__INSTRUCTION_ERROR__MAX_ACCOUNTS_EXCEEDED]: "Max accounts exceeded",
      [SOLANA_ERROR__INSTRUCTION_ERROR__MAX_INSTRUCTION_TRACE_LENGTH_EXCEEDED]: "Max instruction trace length exceeded",
      [SOLANA_ERROR__INSTRUCTION_ERROR__MAX_SEED_LENGTH_EXCEEDED]: "Length of the seed is too long for address generation",
      [SOLANA_ERROR__INSTRUCTION_ERROR__MISSING_ACCOUNT]: "An account required by the instruction is missing",
      [SOLANA_ERROR__INSTRUCTION_ERROR__MISSING_REQUIRED_SIGNATURE]: "Missing required signature for instruction",
      [SOLANA_ERROR__INSTRUCTION_ERROR__MODIFIED_PROGRAM_ID]: "Instruction illegally modified the program id of an account",
      [SOLANA_ERROR__INSTRUCTION_ERROR__NOT_ENOUGH_ACCOUNT_KEYS]: "Insufficient account keys for instruction",
      [SOLANA_ERROR__INSTRUCTION_ERROR__PRIVILEGE_ESCALATION]: "Cross-program invocation with unauthorized signer or writable account",
      [SOLANA_ERROR__INSTRUCTION_ERROR__PROGRAM_ENVIRONMENT_SETUP_FAILURE]: "Failed to create program execution environment",
      [SOLANA_ERROR__INSTRUCTION_ERROR__PROGRAM_FAILED_TO_COMPILE]: "Program failed to compile",
      [SOLANA_ERROR__INSTRUCTION_ERROR__PROGRAM_FAILED_TO_COMPLETE]: "Program failed to complete",
      [SOLANA_ERROR__INSTRUCTION_ERROR__READONLY_DATA_MODIFIED]: "Instruction modified data of a read-only account",
      [SOLANA_ERROR__INSTRUCTION_ERROR__READONLY_LAMPORT_CHANGE]: "Instruction changed the balance of a read-only account",
      [SOLANA_ERROR__INSTRUCTION_ERROR__REENTRANCY_NOT_ALLOWED]: "Cross-program invocation reentrancy not allowed for this instruction",
      [SOLANA_ERROR__INSTRUCTION_ERROR__RENT_EPOCH_MODIFIED]: "Instruction modified rent epoch of an account",
      [SOLANA_ERROR__INSTRUCTION_ERROR__UNBALANCED_INSTRUCTION]: "Sum of account balances before and after instruction do not match",
      [SOLANA_ERROR__INSTRUCTION_ERROR__UNINITIALIZED_ACCOUNT]: "Instruction requires an initialized account",
      [SOLANA_ERROR__INSTRUCTION_ERROR__UNKNOWN]: "The instruction failed with the error: $errorName",
      [SOLANA_ERROR__INSTRUCTION_ERROR__UNSUPPORTED_PROGRAM_ID]: "Unsupported program id",
      [SOLANA_ERROR__INSTRUCTION_ERROR__UNSUPPORTED_SYSVAR]: "Unsupported sysvar",
      [SOLANA_ERROR__INVARIANT_VIOLATION__INVALID_INSTRUCTION_PLAN_KIND]: "Invalid instruction plan kind: $kind.",
      [SOLANA_ERROR__INSTRUCTION_PLANS__EMPTY_INSTRUCTION_PLAN]: "The provided instruction plan is empty.",
      [SOLANA_ERROR__INSTRUCTION_PLANS__FAILED_SINGLE_TRANSACTION_PLAN_RESULT_NOT_FOUND]: "No failed transaction plan result was found in the provided transaction plan result.",
      [SOLANA_ERROR__INSTRUCTION_PLANS__NON_DIVISIBLE_TRANSACTION_PLANS_NOT_SUPPORTED]: "This transaction plan executor does not support non-divisible sequential plans. To support them, you may create your own executor such that multi-transaction atomicity is preserved \u2014 e.g. by targetting RPCs that support transaction bundles.",
      [SOLANA_ERROR__INSTRUCTION_PLANS__FAILED_TO_EXECUTE_TRANSACTION_PLAN]: "The provided transaction plan failed to execute. See the `transactionPlanResult` attribute for more details. Note that the `cause` property is deprecated, and a future version will not set it.",
      [SOLANA_ERROR__INSTRUCTION_PLANS__INVALID_MAX_INSTRUCTIONS_PER_TRANSACTION]: "The configured maximum of $maxInstructions instructions per transaction is invalid. It must be a positive integer no greater than the transaction format limit of $transactionInstructionLimit instructions per transaction. Provide a `maxInstructionsPerTransaction` (on the transaction planner) or `maxInstructions` (on the message packer) value between 1 and $transactionInstructionLimit.",
      [SOLANA_ERROR__INSTRUCTION_PLANS__MAX_INSTRUCTIONS_PER_TRANSACTION_EXCEEDED]: "Planning this transaction message would require $numInstructions instructions, which exceeds the configured maximum of $maxInstructions instructions per transaction. This limit is configurable, and intended to leave headroom for inner instructions which are included in the maximum instruction limit for transactions. Increase `maxInstructionsPerTransaction` on the transaction planner (or `maxInstructions` on the message packer) to allow more instructions per transaction.",
      [SOLANA_ERROR__INSTRUCTION_PLANS__MESSAGE_CANNOT_ACCOMMODATE_PLAN]: "The provided message has insufficient capacity to accommodate the next instruction(s) in this plan. Expected at least $numBytesRequired free byte(s), got $numFreeBytes byte(s).",
      [SOLANA_ERROR__INVARIANT_VIOLATION__INVALID_TRANSACTION_PLAN_KIND]: "Invalid transaction plan kind: $kind.",
      [SOLANA_ERROR__INSTRUCTION_PLANS__MESSAGE_PACKER_ALREADY_COMPLETE]: "No more instructions to pack; the message packer has completed the instruction plan.",
      [SOLANA_ERROR__INSTRUCTION_PLANS__UNEXPECTED_INSTRUCTION_PLAN]: "Unexpected instruction plan. Expected $expectedKind plan, got $actualKind plan.",
      [SOLANA_ERROR__INSTRUCTION_PLANS__UNEXPECTED_TRANSACTION_PLAN]: "Unexpected transaction plan. Expected $expectedKind plan, got $actualKind plan.",
      [SOLANA_ERROR__INSTRUCTION_PLANS__UNEXPECTED_TRANSACTION_PLAN_RESULT]: "Unexpected transaction plan result. Expected $expectedKind plan, got $actualKind plan.",
      [SOLANA_ERROR__INSTRUCTION_PLANS__EXPECTED_SUCCESSFUL_TRANSACTION_PLAN_RESULT]: "Expected a successful transaction plan result. I.e. there is at least one failed or cancelled transaction in the plan.",
      [SOLANA_ERROR__INSTRUCTION__EXPECTED_TO_HAVE_ACCOUNTS]: "The instruction does not have any accounts.",
      [SOLANA_ERROR__INSTRUCTION__EXPECTED_TO_HAVE_DATA]: "The instruction does not have any data.",
      [SOLANA_ERROR__INSTRUCTION__PROGRAM_ID_MISMATCH]: "Expected instruction to have progress address $expectedProgramAddress, got $actualProgramAddress.",
      [SOLANA_ERROR__INVALID_BLOCKHASH_BYTE_LENGTH]: "Expected base58 encoded blockhash to decode to a byte array of length 32. Actual length: $actualLength.",
      [SOLANA_ERROR__INVALID_NONCE]: "The nonce `$expectedNonceValue` is no longer valid. It has advanced to `$actualNonceValue`",
      [SOLANA_ERROR__INVARIANT_VIOLATION__CACHED_ABORTABLE_ITERABLE_CACHE_ENTRY_MISSING]: "Invariant violation: Found no abortable iterable cache entry for key `$cacheKey`. It should be impossible to hit this error; please file an issue at https://sola.na/web3invariant",
      [SOLANA_ERROR__INVARIANT_VIOLATION__DATA_PUBLISHER_CHANNEL_UNIMPLEMENTED]: "Invariant violation: This data publisher does not publish to the channel named `$channelName`. Supported channels include $supportedChannelNames.",
      [SOLANA_ERROR__INVARIANT_VIOLATION__SUBSCRIPTION_ITERATOR_MUST_NOT_POLL_BEFORE_RESOLVING_EXISTING_MESSAGE_PROMISE]: "Invariant violation: WebSocket message iterator state is corrupt; iterated without first resolving existing message promise. It should be impossible to hit this error; please file an issue at https://sola.na/web3invariant",
      [SOLANA_ERROR__INVARIANT_VIOLATION__SUBSCRIPTION_ITERATOR_STATE_MISSING]: "Invariant violation: WebSocket message iterator is missing state storage. It should be impossible to hit this error; please file an issue at https://sola.na/web3invariant",
      [SOLANA_ERROR__INVARIANT_VIOLATION__SWITCH_MUST_BE_EXHAUSTIVE]: "Invariant violation: Switch statement non-exhaustive. Received unexpected value `$unexpectedValue`. It should be impossible to hit this error; please file an issue at https://sola.na/web3invariant",
      [SOLANA_ERROR__JSON_RPC__INTERNAL_ERROR]: "JSON-RPC error: Internal JSON-RPC error ($__serverMessage)",
      [SOLANA_ERROR__JSON_RPC__INVALID_PARAMS]: "JSON-RPC error: Invalid method parameter(s) ($__serverMessage)",
      [SOLANA_ERROR__JSON_RPC__INVALID_REQUEST]: "JSON-RPC error: The JSON sent is not a valid `Request` object ($__serverMessage)",
      [SOLANA_ERROR__JSON_RPC__METHOD_NOT_FOUND]: "JSON-RPC error: The method does not exist / is not available ($__serverMessage)",
      [SOLANA_ERROR__JSON_RPC__PARSE_ERROR]: "JSON-RPC error: An error occurred on the server while parsing the JSON text ($__serverMessage)",
      [SOLANA_ERROR__JSON_RPC__SCAN_ERROR]: "$__serverMessage",
      [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_BLOCK_CLEANED_UP]: "$__serverMessage",
      [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_BLOCK_NOT_AVAILABLE]: "$__serverMessage",
      [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_BLOCK_STATUS_NOT_AVAILABLE_YET]: "$__serverMessage",
      [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_EPOCH_REWARDS_PERIOD_ACTIVE]: "Epoch rewards period still active at slot $slot",
      [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_FILTER_TRANSACTION_NOT_FOUND]: "$__serverMessage",
      [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_KEY_EXCLUDED_FROM_SECONDARY_INDEX]: "$__serverMessage",
      [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_LONG_TERM_STORAGE_SLOT_SKIPPED]: "$__serverMessage",
      [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_LONG_TERM_STORAGE_UNREACHABLE]: "Failed to query long-term storage; please try again",
      [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_MIN_CONTEXT_SLOT_NOT_REACHED]: "Minimum context slot has not been reached",
      [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_NODE_UNHEALTHY]: "Node is unhealthy; behind by $numSlotsBehind slots",
      [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_NO_SLOT_HISTORY]: "No slot history",
      [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_NO_SNAPSHOT]: "No snapshot",
      [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_SEND_TRANSACTION_PREFLIGHT_FAILURE]: "Transaction simulation failed",
      [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_SLOT_NOT_EPOCH_BOUNDARY]: "Rewards cannot be found because slot $slot is not the epoch boundary. This may be due to gap in the queried node's local ledger or long-term storage",
      [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_SLOT_SKIPPED]: "$__serverMessage",
      [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_TRANSACTION_HISTORY_NOT_AVAILABLE]: "Transaction history is not available from this node",
      [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_TRANSACTION_PRECOMPILE_VERIFICATION_FAILURE]: "$__serverMessage",
      [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_TRANSACTION_SIGNATURE_LEN_MISMATCH]: "Transaction signature length mismatch",
      [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_TRANSACTION_SIGNATURE_VERIFICATION_FAILURE]: "Transaction signature verification failure",
      [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_UNSUPPORTED_TRANSACTION_VERSION]: "$__serverMessage",
      [SOLANA_ERROR__KEYS__INVALID_BASE58_IN_GRIND_REGEX]: "The grind regex `/$source/` contains the character `$character`, which is not in the base58 alphabet and can never match a Solana address.",
      [SOLANA_ERROR__KEYS__INVALID_KEY_PAIR_BYTE_LENGTH]: "Key pair bytes must be of length 64, got $byteLength.",
      [SOLANA_ERROR__KEYS__INVALID_PRIVATE_KEY_BYTE_LENGTH]: "Expected private key bytes with length 32. Actual length: $actualLength.",
      [SOLANA_ERROR__KEYS__INVALID_SIGNATURE_BYTE_LENGTH]: "Expected base58-encoded signature to decode to a byte array of length 64. Actual length: $actualLength.",
      [SOLANA_ERROR__KEYS__PUBLIC_KEY_MUST_MATCH_PRIVATE_KEY]: "The provided private key does not match the provided public key.",
      [SOLANA_ERROR__KEYS__SIGNATURE_STRING_LENGTH_OUT_OF_RANGE]: "Expected base58-encoded signature string of length in the range [64, 88]. Actual length: $actualLength.",
      [SOLANA_ERROR__KEYS__WRITE_KEY_PAIR_UNSUPPORTED_ENVIRONMENT]: "Writing a key pair to disk is not supported in this environment.",
      [SOLANA_ERROR__LAMPORTS_OUT_OF_RANGE]: "Lamports value must be in the range [0, 2e64-1]",
      [SOLANA_ERROR__MALFORMED_BIGINT_STRING]: "`$value` cannot be parsed as a `BigInt`",
      [SOLANA_ERROR__MALFORMED_JSON_RPC_ERROR]: "$message",
      [SOLANA_ERROR__MALFORMED_NUMBER_STRING]: "`$value` cannot be parsed as a `Number`",
      [SOLANA_ERROR__NONCE_ACCOUNT_NOT_FOUND]: "No nonce account could be found at address `$nonceAccountAddress`",
      [SOLANA_ERROR__OFFCHAIN_MESSAGE__INVALID_APPLICATION_DOMAIN_BYTE_LENGTH]: "Expected base58 encoded application domain to decode to a byte array of length 32. Actual length: $actualLength.",
      [SOLANA_ERROR__OFFCHAIN_MESSAGE__ADDRESSES_CANNOT_SIGN_OFFCHAIN_MESSAGE]: "Attempted to sign an offchain message with an address that is not a signer for it",
      [SOLANA_ERROR__OFFCHAIN_MESSAGE__APPLICATION_DOMAIN_STRING_LENGTH_OUT_OF_RANGE]: "Expected base58-encoded application domain string of length in the range [32, 44]. Actual length: $actualLength.",
      [SOLANA_ERROR__OFFCHAIN_MESSAGE__CONTENT_DOES_NOT_MATCH_EXPECTED]: "The content of the offchain message does not match the content that was expected. Expected content with a byte-length of $expectedBytes; got content with a byte-length of $actualBytes. The signer may have signed different data than was requested; do not trust its signature.",
      [SOLANA_ERROR__OFFCHAIN_MESSAGE__ENVELOPE_SIGNERS_MISMATCH]: "The signer addresses in this offchain message envelope do not match the list of required signers in the message preamble. These unexpected signers were present in the envelope: `[$unexpectedSigners]`. These required signers were missing from the envelope `[$missingSigners]`.",
      [SOLANA_ERROR__OFFCHAIN_MESSAGE__MAXIMUM_LENGTH_EXCEEDED]: "The message body provided has a byte-length of $actualBytes. The maximum allowable byte-length is $maxBytes",
      [SOLANA_ERROR__OFFCHAIN_MESSAGE__MESSAGE_FORMAT_MISMATCH]: "Expected message format $expectedMessageFormat, got $actualMessageFormat",
      [SOLANA_ERROR__OFFCHAIN_MESSAGE__MESSAGE_LENGTH_MISMATCH]: "The message length specified in the message preamble is $specifiedLength bytes. The actual length of the message is $actualLength bytes.",
      [SOLANA_ERROR__OFFCHAIN_MESSAGE__MESSAGE_MUST_BE_NON_EMPTY]: "Offchain message content must be non-empty",
      [SOLANA_ERROR__OFFCHAIN_MESSAGE__NUM_REQUIRED_SIGNERS_CANNOT_BE_ZERO]: "Offchain message must specify the address of at least one required signer",
      [SOLANA_ERROR__OFFCHAIN_MESSAGE__NUM_ENVELOPE_SIGNATURES_CANNOT_BE_ZERO]: "Offchain message envelope must reserve space for at least one signature",
      [SOLANA_ERROR__OFFCHAIN_MESSAGE__NUM_SIGNATURES_MISMATCH]: "The offchain message preamble specifies $numRequiredSignatures required signature(s), got $signaturesLength.",
      [SOLANA_ERROR__OFFCHAIN_MESSAGE__REQUIRED_SIGNATORIES_DO_NOT_MATCH_EXPECTED]: "The offchain message lists different required signatories than was expected. Expected [$expectedAddresses]. Got [$actualAddresses]. The signer may have signed different data than was requested; do not trust its signature.",
      [SOLANA_ERROR__OFFCHAIN_MESSAGE__SIGNATORIES_MUST_BE_SORTED]: "The signatories of this offchain message must be listed in lexicographical order",
      [SOLANA_ERROR__OFFCHAIN_MESSAGE__SIGNATORIES_MUST_BE_UNIQUE]: "An address must be listed no more than once among the signatories of an offchain message",
      [SOLANA_ERROR__OFFCHAIN_MESSAGE__SIGNATURES_MISSING]: "Offchain message is missing signatures for addresses: $addresses.",
      [SOLANA_ERROR__OFFCHAIN_MESSAGE__SIGNATURE_VERIFICATION_FAILURE]: "Offchain message signature verification failed. Signature mismatch for required signatories [$signatoriesWithInvalidSignatures]. Missing signatures for signatories [$signatoriesWithMissingSignatures]",
      [SOLANA_ERROR__OFFCHAIN_MESSAGE__RESTRICTED_ASCII_BODY_CHARACTER_OUT_OF_RANGE]: "The message body provided contains characters whose codes fall outside the allowed range. In order to ensure clear-signing compatiblity with hardware wallets, the message may only contain line feeds and characters in the range [\\x20-\\x7e].",
      [SOLANA_ERROR__OFFCHAIN_MESSAGE__UNEXPECTED_VERSION]: "Expected offchain message version $expectedVersion. Got $actualVersion.",
      [SOLANA_ERROR__OFFCHAIN_MESSAGE__VERSION_NUMBER_NOT_SUPPORTED]: "This version of Kit does not support decoding offchain messages with version $unsupportedVersion. The current max supported version is 0.",
      [SOLANA_ERROR__PROGRAM_CLIENTS__FAILED_TO_IDENTIFY_ACCOUNT]: "The provided account could not be identified as an account from the $programName program.",
      [SOLANA_ERROR__PROGRAM_CLIENTS__FAILED_TO_IDENTIFY_INSTRUCTION]: "The provided instruction could not be identified as an instruction from the $programName program.",
      [SOLANA_ERROR__PROGRAM_CLIENTS__INSUFFICIENT_ACCOUNT_METAS]: "The provided instruction is missing some accounts. Expected at least $expectedAccountMetas account(s), got $actualAccountMetas.",
      [SOLANA_ERROR__PROGRAM_CLIENTS__RESOLVED_INSTRUCTION_INPUT_MUST_BE_NON_NULL]: "Expected resolved instruction input '$inputName' to be non-null.",
      [SOLANA_ERROR__PROGRAM_CLIENTS__UNEXPECTED_RESOLVED_INSTRUCTION_INPUT_TYPE]: "Expected resolved instruction input '$inputName' to be of type `$expectedType`.",
      [SOLANA_ERROR__PROGRAM_CLIENTS__UNRECOGNIZED_ACCOUNT_TYPE]: "Unrecognized account type '$accountType' for the $programName program.",
      [SOLANA_ERROR__PROGRAM_CLIENTS__UNRECOGNIZED_INSTRUCTION_TYPE]: "Unrecognized instruction type '$instructionType' for the $programName program.",
      [SOLANA_ERROR__RPC_SUBSCRIPTIONS__CANNOT_CREATE_SUBSCRIPTION_PLAN]: "The notification name must end in 'Notifications' and the API must supply a subscription plan creator function for the notification '$notificationName'.",
      [SOLANA_ERROR__RPC_SUBSCRIPTIONS__CHANNEL_CLOSED_BEFORE_MESSAGE_BUFFERED]: "WebSocket was closed before payload could be added to the send buffer",
      [SOLANA_ERROR__RPC_SUBSCRIPTIONS__CHANNEL_CONNECTION_CLOSED]: "WebSocket connection closed",
      [SOLANA_ERROR__RPC_SUBSCRIPTIONS__CHANNEL_FAILED_TO_CONNECT]: "WebSocket failed to connect",
      [SOLANA_ERROR__RPC_SUBSCRIPTIONS__EXPECTED_SERVER_SUBSCRIPTION_ID]: "Failed to obtain a subscription id from the server",
      [SOLANA_ERROR__RPC__API_PLAN_MISSING_FOR_RPC_METHOD]: "Could not find an API plan for RPC method: `$method`",
      [SOLANA_ERROR__RPC__INTEGER_OVERFLOW]: "The $argumentLabel argument to the `$methodName` RPC method$optionalPathLabel was `$value`. This number is unsafe for use with the Solana JSON-RPC because it exceeds `Number.MAX_SAFE_INTEGER`.",
      [SOLANA_ERROR__RPC__TRANSPORT_HTTP_ERROR]: "HTTP error ($statusCode): $message",
      [SOLANA_ERROR__RPC__TRANSPORT_HTTP_HEADER_FORBIDDEN]: "HTTP header(s) forbidden: $headers. Learn more at https://developer.mozilla.org/en-US/docs/Glossary/Forbidden_header_name.",
      [SOLANA_ERROR__SIGNER__ADDRESS_CANNOT_HAVE_MULTIPLE_SIGNERS]: "Multiple distinct signers were identified for address `$address`. Please ensure that you are using the same signer instance for each address.",
      [SOLANA_ERROR__SIGNER__EXPECTED_KEY_PAIR_SIGNER]: "The provided value does not implement the `KeyPairSigner` interface",
      [SOLANA_ERROR__SIGNER__EXPECTED_MESSAGE_MODIFYING_SIGNER]: "The provided value does not implement the `MessageModifyingSigner` interface",
      [SOLANA_ERROR__SIGNER__EXPECTED_MESSAGE_PARTIAL_SIGNER]: "The provided value does not implement the `MessagePartialSigner` interface",
      [SOLANA_ERROR__SIGNER__EXPECTED_MESSAGE_SIGNER]: "The provided value does not implement any of the `MessageSigner` interfaces",
      [SOLANA_ERROR__SIGNER__EXPECTED_TRANSACTION_MODIFYING_SIGNER]: "The provided value does not implement the `TransactionModifyingSigner` interface",
      [SOLANA_ERROR__SIGNER__EXPECTED_TRANSACTION_PARTIAL_SIGNER]: "The provided value does not implement the `TransactionPartialSigner` interface",
      [SOLANA_ERROR__SIGNER__EXPECTED_TRANSACTION_SENDING_SIGNER]: "The provided value does not implement the `TransactionSendingSigner` interface",
      [SOLANA_ERROR__SIGNER__EXPECTED_TRANSACTION_SIGNER]: "The provided value does not implement any of the `TransactionSigner` interfaces",
      [SOLANA_ERROR__SIGNER__TRANSACTION_CANNOT_HAVE_MULTIPLE_SENDING_SIGNERS]: "More than one `TransactionSendingSigner` was identified.",
      [SOLANA_ERROR__SIGNER__TRANSACTION_SENDING_SIGNER_MISSING]: "No `TransactionSendingSigner` was identified. Please provide a valid `TransactionWithSingleSendingSigner` transaction.",
      [SOLANA_ERROR__SIGNER__WALLET_ACCOUNT_CANNOT_SIGN_TRANSACTION]: "The wallet account $address cannot be used to create a transaction signer because it does not implement either the `solana:signTransaction` or `solana:signAndSendTransaction` feature. At least one of these features is required. The account supports the following features: $supportedFeatures.",
      [SOLANA_ERROR__SIGNER__WALLET_MULTISIGN_UNIMPLEMENTED]: "Wallet account signers do not support signing multiple messages/transactions in a single operation",
      [SOLANA_ERROR__SUBSCRIBABLE__RETRY_NOT_SUPPORTED]: "This `ReactiveStreamStore` does not support retry. Use `createReactiveStoreFromDataPublisherFactory` to construct a retryable store.",
      [SOLANA_ERROR__SUBSCRIBABLE__STREAM_CLOSED_WITHOUT_ERROR]: "The stream store closed in an error state but did not report an error.",
      [SOLANA_ERROR__SUBTLE_CRYPTO__CANNOT_EXPORT_NON_EXTRACTABLE_KEY]: "Cannot export a non-extractable key.",
      [SOLANA_ERROR__SUBTLE_CRYPTO__DIGEST_UNIMPLEMENTED]: "No digest implementation could be found.",
      [SOLANA_ERROR__SUBTLE_CRYPTO__DISALLOWED_IN_INSECURE_CONTEXT]: "Cryptographic operations are only allowed in secure browser contexts. Read more here: https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts.",
      [SOLANA_ERROR__SUBTLE_CRYPTO__ED25519_ALGORITHM_UNIMPLEMENTED]: "This runtime does not support the generation of Ed25519 key pairs.\n\nInstall @solana/webcrypto-ed25519-polyfill and call its `install` function before generating keys in environments that do not support Ed25519.\n\nFor a list of runtimes that currently support Ed25519 operations, visit https://github.com/WICG/webcrypto-secure-curves/issues/20.",
      [SOLANA_ERROR__SUBTLE_CRYPTO__EXPORT_FUNCTION_UNIMPLEMENTED]: "No key export implementation could be found.",
      [SOLANA_ERROR__SUBTLE_CRYPTO__GENERATE_FUNCTION_UNIMPLEMENTED]: "No key generation implementation could be found.",
      [SOLANA_ERROR__SUBTLE_CRYPTO__SIGN_FUNCTION_UNIMPLEMENTED]: "No signing implementation could be found.",
      [SOLANA_ERROR__SUBTLE_CRYPTO__VERIFY_FUNCTION_UNIMPLEMENTED]: "No signature verification implementation could be found.",
      [SOLANA_ERROR__TIMESTAMP_OUT_OF_RANGE]: "Timestamp value must be in the range [-(2n ** 63n), (2n ** 63n) - 1]. `$value` given",
      [SOLANA_ERROR__TRANSACTION_ERROR__ACCOUNT_BORROW_OUTSTANDING]: "Transaction processing left an account with an outstanding borrowed reference",
      [SOLANA_ERROR__TRANSACTION_ERROR__ACCOUNT_IN_USE]: "Account in use",
      [SOLANA_ERROR__TRANSACTION_ERROR__ACCOUNT_LOADED_TWICE]: "Account loaded twice",
      [SOLANA_ERROR__TRANSACTION_ERROR__ACCOUNT_NOT_FOUND]: "Attempt to debit an account but found no record of a prior credit.",
      [SOLANA_ERROR__TRANSACTION_ERROR__ADDRESS_LOOKUP_TABLE_NOT_FOUND]: "Transaction loads an address table account that doesn't exist",
      [SOLANA_ERROR__TRANSACTION_ERROR__ALREADY_PROCESSED]: "This transaction has already been processed",
      [SOLANA_ERROR__TRANSACTION_ERROR__BLOCKHASH_NOT_FOUND]: "Blockhash not found",
      [SOLANA_ERROR__TRANSACTION_ERROR__CALL_CHAIN_TOO_DEEP]: "Loader call chain is too deep",
      [SOLANA_ERROR__TRANSACTION_ERROR__CLUSTER_MAINTENANCE]: "Transactions are currently disabled due to cluster maintenance",
      [SOLANA_ERROR__TRANSACTION_ERROR__DUPLICATE_INSTRUCTION]: "Transaction contains a duplicate instruction ($index) that is not allowed",
      [SOLANA_ERROR__TRANSACTION_ERROR__INSUFFICIENT_FUNDS_FOR_FEE]: "Insufficient funds for fee",
      [SOLANA_ERROR__TRANSACTION_ERROR__INSUFFICIENT_FUNDS_FOR_RENT]: "Transaction results in an account ($accountIndex) with insufficient funds for rent",
      [SOLANA_ERROR__TRANSACTION_ERROR__INVALID_ACCOUNT_FOR_FEE]: "This account may not be used to pay transaction fees",
      [SOLANA_ERROR__TRANSACTION_ERROR__INVALID_ACCOUNT_INDEX]: "Transaction contains an invalid account reference",
      [SOLANA_ERROR__TRANSACTION_ERROR__INVALID_ADDRESS_LOOKUP_TABLE_DATA]: "Transaction loads an address table account with invalid data",
      [SOLANA_ERROR__TRANSACTION_ERROR__INVALID_ADDRESS_LOOKUP_TABLE_INDEX]: "Transaction address table lookup uses an invalid index",
      [SOLANA_ERROR__TRANSACTION_ERROR__INVALID_ADDRESS_LOOKUP_TABLE_OWNER]: "Transaction loads an address table account with an invalid owner",
      [SOLANA_ERROR__TRANSACTION_ERROR__INVALID_LOADED_ACCOUNTS_DATA_SIZE_LIMIT]: "LoadedAccountsDataSizeLimit set for transaction must be greater than 0.",
      [SOLANA_ERROR__TRANSACTION_ERROR__INVALID_PROGRAM_FOR_EXECUTION]: "This program may not be used for executing instructions",
      [SOLANA_ERROR__TRANSACTION_ERROR__INVALID_RENT_PAYING_ACCOUNT]: "Transaction leaves an account with a lower balance than rent-exempt minimum",
      [SOLANA_ERROR__TRANSACTION_ERROR__INVALID_WRITABLE_ACCOUNT]: "Transaction loads a writable account that cannot be written",
      [SOLANA_ERROR__TRANSACTION_ERROR__MAX_LOADED_ACCOUNTS_DATA_SIZE_EXCEEDED]: "Transaction exceeded max loaded accounts data size cap",
      [SOLANA_ERROR__TRANSACTION_ERROR__MISSING_SIGNATURE_FOR_FEE]: "Transaction requires a fee but has no signature present",
      [SOLANA_ERROR__TRANSACTION_ERROR__PROGRAM_ACCOUNT_NOT_FOUND]: "Attempt to load a program that does not exist",
      [SOLANA_ERROR__TRANSACTION_ERROR__PROGRAM_EXECUTION_TEMPORARILY_RESTRICTED]: "Execution of the program referenced by account at index $accountIndex is temporarily restricted.",
      [SOLANA_ERROR__TRANSACTION_ERROR__RESANITIZATION_NEEDED]: "ResanitizationNeeded",
      [SOLANA_ERROR__TRANSACTION_ERROR__SANITIZE_FAILURE]: "Transaction failed to sanitize accounts offsets correctly",
      [SOLANA_ERROR__TRANSACTION_ERROR__SIGNATURE_FAILURE]: "Transaction did not pass signature verification",
      [SOLANA_ERROR__TRANSACTION_ERROR__TOO_MANY_ACCOUNT_LOCKS]: "Transaction locked too many accounts",
      [SOLANA_ERROR__TRANSACTION_ERROR__UNBALANCED_TRANSACTION]: "Sum of account balances before and after transaction do not match",
      [SOLANA_ERROR__TRANSACTION_ERROR__UNKNOWN]: "The transaction failed with the error `$errorName`",
      [SOLANA_ERROR__TRANSACTION_ERROR__UNSUPPORTED_VERSION]: "Transaction version is unsupported",
      [SOLANA_ERROR__TRANSACTION_ERROR__WOULD_EXCEED_ACCOUNT_DATA_BLOCK_LIMIT]: "Transaction would exceed account data limit within the block",
      [SOLANA_ERROR__TRANSACTION_ERROR__WOULD_EXCEED_ACCOUNT_DATA_TOTAL_LIMIT]: "Transaction would exceed total account data limit",
      [SOLANA_ERROR__TRANSACTION_ERROR__WOULD_EXCEED_MAX_ACCOUNT_COST_LIMIT]: "Transaction would exceed max account limit within the block",
      [SOLANA_ERROR__TRANSACTION_ERROR__WOULD_EXCEED_MAX_BLOCK_COST_LIMIT]: "Transaction would exceed max Block Cost Limit",
      [SOLANA_ERROR__TRANSACTION_ERROR__WOULD_EXCEED_MAX_VOTE_COST_LIMIT]: "Transaction would exceed max Vote Cost Limit",
      [SOLANA_ERROR__TRANSACTION__ADDRESSES_CANNOT_SIGN_TRANSACTION]: "Attempted to sign a transaction with an address that is not a signer for it",
      [SOLANA_ERROR__TRANSACTION__ADDRESS_MISSING]: "Transaction is missing an address at index: $index.",
      [SOLANA_ERROR__TRANSACTION__CANNOT_ENCODE_WITH_EMPTY_SIGNATURES]: "Transaction has no expected signers therefore it cannot be encoded",
      [SOLANA_ERROR__TRANSACTION__COMPUTE_UNIT_LIMIT_OUT_OF_RANGE]: "Transaction compute unit limit must be an integer in the range [0, $maxComputeUnitLimit]. `$computeUnitLimit` given",
      [SOLANA_ERROR__TRANSACTION__EXCEEDS_SIZE_LIMIT]: "Transaction size $transactionSize exceeds limit of $transactionSizeLimit bytes",
      [SOLANA_ERROR__TRANSACTION__EXPECTED_BLOCKHASH_LIFETIME]: "Transaction does not have a blockhash lifetime",
      [SOLANA_ERROR__TRANSACTION__EXPECTED_NONCE_LIFETIME]: "Transaction is not a durable nonce transaction",
      [SOLANA_ERROR__TRANSACTION__FAILED_TO_DECOMPILE_ADDRESS_LOOKUP_TABLE_CONTENTS_MISSING]: "Contents of these address lookup tables unknown: $lookupTableAddresses",
      [SOLANA_ERROR__TRANSACTION__FAILED_TO_DECOMPILE_ADDRESS_LOOKUP_TABLE_INDEX_OUT_OF_RANGE]: "Lookup of address at index $highestRequestedIndex failed for lookup table `$lookupTableAddress`. Highest known index is $highestKnownIndex. The lookup table may have been extended since its contents were retrieved",
      [SOLANA_ERROR__TRANSACTION__FAILED_TO_DECOMPILE_FEE_PAYER_MISSING]: "No fee payer set in CompiledTransaction",
      [SOLANA_ERROR__TRANSACTION__FAILED_TO_DECOMPILE_INSTRUCTION_PROGRAM_ADDRESS_NOT_FOUND]: "Could not find program address at index $index",
      [SOLANA_ERROR__TRANSACTION__FAILED_TO_ESTIMATE_COMPUTE_LIMIT]: "Failed to estimate the compute unit consumption for this transaction message. This is likely because simulating the transaction failed. Inspect the `cause` property of this error to learn more",
      [SOLANA_ERROR__TRANSACTION__FAILED_TO_ESTIMATE_LOADED_ACCOUNTS_DATA_SIZE_LIMIT]: "Failed to estimate the loaded accounts data size for this transaction message. The RPC did not return a `loadedAccountsDataSize` value from simulation. This value is required for version 1 transactions",
      [SOLANA_ERROR__TRANSACTION__FAILED_WHEN_SIMULATING_TO_ESTIMATE_COMPUTE_LIMIT]: "Transaction failed when it was simulated in order to estimate the compute unit consumption. The compute unit estimate provided is for a transaction that failed when simulated and may not be representative of the compute units this transaction would consume if successful. Inspect the `cause` property of this error to learn more",
      [SOLANA_ERROR__TRANSACTION__FAILED_WHEN_SIMULATING_TO_ESTIMATE_RESOURCE_LIMITS]: "Transaction failed when it was simulated in order to estimate its resource limits. The resource limit estimates provided are for a transaction that failed when simulated and may not be representative of the resources this transaction would consume if successful. Inspect the `cause` property of this error to learn more",
      [SOLANA_ERROR__TRANSACTION__FEE_PAYER_MISSING]: "Transaction is missing a fee payer.",
      [SOLANA_ERROR__TRANSACTION__FEE_PAYER_SIGNATURE_MISSING]: "Could not determine this transaction's signature. Make sure that the transaction has been signed by its fee payer.",
      [SOLANA_ERROR__TRANSACTION__INVALID_NONCE_TRANSACTION_FIRST_INSTRUCTION_MUST_BE_ADVANCE_NONCE]: "Transaction first instruction is not advance nonce account instruction.",
      [SOLANA_ERROR__TRANSACTION__INVALID_NONCE_TRANSACTION_INSTRUCTIONS_MISSING]: "Transaction with no instructions cannot be durable nonce transaction.",
      [SOLANA_ERROR__TRANSACTION__INVOKED_PROGRAMS_CANNOT_PAY_FEES]: "This transaction includes an address (`$programAddress`) which is both invoked and set as the fee payer. Program addresses may not pay fees",
      [SOLANA_ERROR__TRANSACTION__INVOKED_PROGRAMS_MUST_NOT_BE_WRITABLE]: "This transaction includes an address (`$programAddress`) which is both invoked and marked writable. Program addresses may not be writable",
      [SOLANA_ERROR__TRANSACTION__MESSAGE_SIGNATURES_MISMATCH]: "The transaction message expected the transaction to have $numRequiredSignatures signatures, got $signaturesLength.",
      [SOLANA_ERROR__TRANSACTION__SIGNATURES_MISSING]: "Transaction is missing signatures for addresses: $addresses.",
      [SOLANA_ERROR__TRANSACTION__VERSION_NUMBER_OUT_OF_RANGE]: "Transaction version must be in the range [0, 127]. `$actualVersion` given",
      [SOLANA_ERROR__TRANSACTION__VERSION_NUMBER_NOT_SUPPORTED]: "This version of Kit does not support decoding transactions with version $unsupportedVersion. The current max supported version is 1.",
      [SOLANA_ERROR__TRANSACTION__NONCE_ACCOUNT_CANNOT_BE_IN_LOOKUP_TABLE]: "The transaction has a durable nonce lifetime (with nonce `$nonce`), but the nonce account address is in a lookup table. The lifetime constraint cannot be constructed without fetching the lookup tables for the transaction.",
      [SOLANA_ERROR__TRANSACTION__INVALID_CONFIG_MASK_PRIORITY_FEE_BITS]: "Invalid transaction config mask: $mask. Bits 0 and 1 must match (both set or both unset)",
      [SOLANA_ERROR__TRANSACTION__MALFORMED_MESSAGE_BYTES]: "Transaction message bytes are malformed: $messageBytes",
      [SOLANA_ERROR__TRANSACTION__CANNOT_ENCODE_WITH_EMPTY_MESSAGE_BYTES]: "Transaction message bytes are empty, so the transaction cannot be encoded",
      [SOLANA_ERROR__TRANSACTION__CANNOT_DECODE_EMPTY_TRANSACTION_BYTES]: "Transaction bytes are empty, so no transaction can be decoded",
      [SOLANA_ERROR__TRANSACTION__VERSION_ZERO_MUST_BE_ENCODED_WITH_SIGNATURES_FIRST]: "Transaction version 0 must be encoded with signatures first. This transaction was encoded with first byte $firstByte, which is expected to be a signature count for v0 transactions.",
      [SOLANA_ERROR__TRANSACTION__SIGNATURE_COUNT_TOO_HIGH_FOR_TRANSACTION_BYTES]: "The provided transaction bytes expect that there should be $numExpectedSignatures signatures, but the bytes are not long enough to contain a transaction message with this many signatures. The provided bytes are $transactionBytesLength bytes long.",
      [SOLANA_ERROR__TRANSACTION__INVALID_HEAP_SIZE]: "Transaction heap size must be an integer multiple of $multipleOf bytes in the range [$minHeapSize, $maxHeapSize]. `$heapSize` given",
      [SOLANA_ERROR__TRANSACTION__INVALID_NONCE_ACCOUNT_INDEX]: "The transaction has a durable nonce lifetime, but the nonce account index is invalid. Expected a nonce account index less than $numberOfStaticAccounts, got $nonceAccountIndex.",
      [SOLANA_ERROR__TRANSACTION__INVALID_CONFIG_VALUE_KIND]: "The transaction config value for $configName has the incorrect kind. Expected $expectedKind, got $actualKind.",
      [SOLANA_ERROR__TRANSACTION__INSTRUCTION_HEADERS_PAYLOADS_MISMATCH]: "The transaction does not have the same number of instruction headers and instruction payloads. Got $numInstructionHeaders instruction headers, and $numInstructionPayloads instruction payloads.",
      [SOLANA_ERROR__TRANSACTION__TOO_MANY_SIGNER_ADDRESSES]: "Transaction has $actualCount unique signer addresses but the maximum allowed is $maxAllowed",
      [SOLANA_ERROR__TRANSACTION__TOO_MANY_ACCOUNT_ADDRESSES]: "Transaction has $actualCount unique account addresses but the maximum allowed is $maxAllowed",
      [SOLANA_ERROR__TRANSACTION__TOO_MANY_INSTRUCTIONS]: "Transaction has $actualCount instructions but the maximum allowed is $maxAllowed",
      [SOLANA_ERROR__TRANSACTION__TOO_MANY_ACCOUNTS_IN_INSTRUCTION]: "The instruction at index $instructionIndex has $actualCount account references but the maximum allowed is $maxAllowed",
      [SOLANA_ERROR__TRANSACTION__FAILED_TO_DECOMPILE_INSTRUCTION_ACCOUNT_INDEX_OUT_OF_RANGE]: "Could not find an account address at index $index while decompiling an instruction",
      [SOLANA_ERROR__TRANSACTION_INTROSPECTION__CANNOT_DECODE_JSON_PARSED_TRANSACTION]: "`getTransaction` responses fetched with `encoding: 'jsonParsed'` cannot be decoded. Re-fetch the transaction with `encoding: 'base64'`, `'base58'`, or `'json'`",
      [SOLANA_ERROR__TRANSACTION_INTROSPECTION__UNRECOGNIZED_GET_TRANSACTION_RESPONSE]: "Could not recognize the shape of this `getTransaction` response. Expected a response fetched with `encoding: 'base64'`, `'base58'`, or `'json'`",
      [SOLANA_ERROR__REACT__MISSING_CAPABILITY]: "`$hookName` requires the following capabilities to be installed on the client: [$capabilities]. $providerHint",
      [SOLANA_ERROR__REACT__MISSING_PROVIDER]: "`$hookName` was called outside of a `ClientProvider`. Mount a `<ClientProvider client={client}>` in the ancestor tree.",
      [SOLANA_ERROR__REACT__SUBSCRIPTION_CLOSED_WITHOUT_ERROR]: "The subscription closed in an error state but did not report an error.",
      [SOLANA_ERROR__WALLET__NOT_CONNECTED]: "Cannot $operation: no wallet connected",
      [SOLANA_ERROR__WALLET__NO_SIGNER_CONNECTED]: "No signing wallet connected (status: $status)",
      [SOLANA_ERROR__WALLET__SIGNER_NOT_AVAILABLE]: "Connected wallet does not support signing",
      [SOLANA_ERROR__WALLET__ACCOUNT_NOT_AVAILABLE]: 'Account $address is not available in wallet "$walletName"'
    };
    INSTRUCTION_ERROR_RANGE_SIZE = 1e3;
    START_INDEX = "i";
    TYPE = "t";
    SolanaError = class extends Error {
      /**
       * Indicates the root cause of this {@link SolanaError}, if any.
       *
       * For example, a transaction error might have an instruction error as its root cause. In this
       * case, you will be able to access the instruction error on the transaction error as `cause`.
       */
      cause = this.cause;
      /**
       * Contains context that can assist in understanding or recovering from a {@link SolanaError}.
       */
      context;
      constructor(...[code, contextAndErrorOptions]) {
        let context;
        let errorOptions;
        if (contextAndErrorOptions) {
          Object.entries(Object.getOwnPropertyDescriptors(contextAndErrorOptions)).forEach(([name, descriptor]) => {
            if (name === "cause") {
              errorOptions = { cause: descriptor.value };
            } else {
              if (context === void 0) {
                context = {
                  __code: code
                };
              }
              Object.defineProperty(context, name, descriptor);
            }
          });
        }
        const message = getErrorMessage(code, context);
        super(message, errorOptions);
        this.context = Object.freeze(
          context === void 0 ? {
            __code: code
          } : context
        );
        this.name = "SolanaError";
      }
    };
    ORDERED_ERROR_NAMES = [
      // Keep synced with RPC source: https://github.com/anza-xyz/solana-sdk/blob/master/instruction-error/src/lib.rs
      // If this list ever gets too large, consider implementing a compression strategy like this:
      // https://gist.github.com/steveluscher/aaa7cbbb5433b1197983908a40860c47
      "GenericError",
      "InvalidArgument",
      "InvalidInstructionData",
      "InvalidAccountData",
      "AccountDataTooSmall",
      "InsufficientFunds",
      "IncorrectProgramId",
      "MissingRequiredSignature",
      "AccountAlreadyInitialized",
      "UninitializedAccount",
      "UnbalancedInstruction",
      "ModifiedProgramId",
      "ExternalAccountLamportSpend",
      "ExternalAccountDataModified",
      "ReadonlyLamportChange",
      "ReadonlyDataModified",
      "DuplicateAccountIndex",
      "ExecutableModified",
      "RentEpochModified",
      "NotEnoughAccountKeys",
      "AccountDataSizeChanged",
      "AccountNotExecutable",
      "AccountBorrowFailed",
      "AccountBorrowOutstanding",
      "DuplicateAccountOutOfSync",
      "Custom",
      "InvalidError",
      "ExecutableDataModified",
      "ExecutableLamportChange",
      "ExecutableAccountNotRentExempt",
      "UnsupportedProgramId",
      "CallDepth",
      "MissingAccount",
      "ReentrancyNotAllowed",
      "MaxSeedLengthExceeded",
      "InvalidSeeds",
      "InvalidRealloc",
      "ComputationalBudgetExceeded",
      "PrivilegeEscalation",
      "ProgramEnvironmentSetupFailure",
      "ProgramFailedToComplete",
      "ProgramFailedToCompile",
      "Immutable",
      "IncorrectAuthority",
      "BorshIoError",
      "AccountNotRentExempt",
      "InvalidAccountOwner",
      "ArithmeticOverflow",
      "UnsupportedSysvar",
      "IllegalOwner",
      "MaxAccountsDataAllocationsExceeded",
      "MaxAccountsExceeded",
      "MaxInstructionTraceLengthExceeded",
      "BuiltinProgramsMustConsumeComputeUnits"
    ];
    ORDERED_ERROR_NAMES2 = [
      // Keep synced with RPC source: https://github.com/anza-xyz/agave/blob/master/sdk/src/transaction/error.rs
      // If this list ever gets too large, consider implementing a compression strategy like this:
      // https://gist.github.com/steveluscher/aaa7cbbb5433b1197983908a40860c47
      "AccountInUse",
      "AccountLoadedTwice",
      "AccountNotFound",
      "ProgramAccountNotFound",
      "InsufficientFundsForFee",
      "InvalidAccountForFee",
      "AlreadyProcessed",
      "BlockhashNotFound",
      // `InstructionError` intentionally omitted; delegated to `getSolanaErrorFromInstructionError`
      "CallChainTooDeep",
      "MissingSignatureForFee",
      "InvalidAccountIndex",
      "SignatureFailure",
      "InvalidProgramForExecution",
      "SanitizeFailure",
      "ClusterMaintenance",
      "AccountBorrowOutstanding",
      "WouldExceedMaxBlockCostLimit",
      "UnsupportedVersion",
      "InvalidWritableAccount",
      "WouldExceedMaxAccountCostLimit",
      "WouldExceedAccountDataBlockLimit",
      "TooManyAccountLocks",
      "AddressLookupTableNotFound",
      "InvalidAddressLookupTableOwner",
      "InvalidAddressLookupTableData",
      "InvalidAddressLookupTableIndex",
      "InvalidRentPayingAccount",
      "WouldExceedMaxVoteCostLimit",
      "WouldExceedAccountDataTotalLimit",
      "DuplicateInstruction",
      "InsufficientFundsForRent",
      "MaxLoadedAccountsDataSizeExceeded",
      "InvalidLoadedAccountsDataSizeLimit",
      "ResanitizationNeeded",
      "ProgramExecutionTemporarilyRestricted",
      "UnbalancedTransaction"
    ];
  }
});

// node_modules/@solana/codecs-core/dist/index.browser.mjs
function getEncodedSize(value, encoder) {
  return "fixedSize" in encoder ? encoder.fixedSize : encoder.getSizeFromValue(value);
}
function createEncoder(encoder) {
  return Object.freeze({
    ...encoder,
    encode: (value) => {
      const bytes = new Uint8Array(getEncodedSize(value, encoder));
      encoder.write(value, bytes, 0);
      return bytes;
    }
  });
}
function createDecoder(decoder) {
  return Object.freeze({
    ...decoder,
    decode: (bytes, offset = 0) => decoder.read(bytes, offset)[0]
  });
}
function isFixedSize(codec) {
  return "fixedSize" in codec && typeof codec.fixedSize === "number";
}
function assertIsFixedSize(codec) {
  if (!isFixedSize(codec)) {
    throw new SolanaError(SOLANA_ERROR__CODECS__EXPECTED_FIXED_LENGTH);
  }
}
function isVariableSize(codec) {
  return !isFixedSize(codec);
}
function addEncoderSizePrefix(encoder, prefix) {
  const write = ((value, bytes, offset) => {
    const encoderBytes = encoder.encode(value);
    offset = prefix.write(encoderBytes.length, bytes, offset);
    bytes.set(encoderBytes, offset);
    return offset + encoderBytes.length;
  });
  if (isFixedSize(prefix) && isFixedSize(encoder)) {
    return createEncoder({ ...encoder, fixedSize: prefix.fixedSize + encoder.fixedSize, write });
  }
  const prefixMaxSize = isFixedSize(prefix) ? prefix.fixedSize : prefix.maxSize ?? null;
  const encoderMaxSize = isFixedSize(encoder) ? encoder.fixedSize : encoder.maxSize ?? null;
  const maxSize = prefixMaxSize !== null && encoderMaxSize !== null ? prefixMaxSize + encoderMaxSize : null;
  return createEncoder({
    ...encoder,
    ...maxSize !== null ? { maxSize } : {},
    getSizeFromValue: (value) => {
      const encoderSize = getEncodedSize(value, encoder);
      return getEncodedSize(encoderSize, prefix) + encoderSize;
    },
    write
  });
}
function fixEncoderSize(encoder, fixedBytes) {
  return createEncoder({
    fixedSize: fixedBytes,
    write: (value, bytes, offset) => {
      const variableByteArray = encoder.encode(value);
      const fixedByteArray = variableByteArray.length > fixedBytes ? variableByteArray.slice(0, fixedBytes) : variableByteArray;
      bytes.set(fixedByteArray, offset);
      return offset + fixedBytes;
    }
  });
}
function transformEncoder(encoder, unmap) {
  return createEncoder({
    ...isVariableSize(encoder) ? { ...encoder, getSizeFromValue: (value) => encoder.getSizeFromValue(unmap(value)) } : encoder,
    write: (value, bytes, offset) => encoder.write(unmap(value), bytes, offset)
  });
}
var init_index_browser2 = __esm({
  "node_modules/@solana/codecs-core/dist/index.browser.mjs"() {
    init_index_browser();
  }
});

// node_modules/@solana/codecs-strings/dist/index.browser.mjs
function assertValidBaseString(alphabet4, testValue, givenValue = testValue) {
  if (!testValue.match(new RegExp(`^[${alphabet4}]*$`))) {
    throw new SolanaError(SOLANA_ERROR__CODECS__INVALID_STRING_FOR_BASE, {
      alphabet: alphabet4,
      base: alphabet4.length,
      value: givenValue
    });
  }
}
function partitionLeadingZeroes(value, zeroCharacter) {
  const [leadingZeros, tailChars] = value.split(new RegExp(`((?!${zeroCharacter}).*)`));
  return [leadingZeros, tailChars];
}
function getBigIntFromBaseX(value, alphabet4) {
  const base2 = BigInt(alphabet4.length);
  let sum = 0n;
  for (const char of value) {
    sum *= base2;
    sum += BigInt(alphabet4.indexOf(char));
  }
  return sum;
}
var getBaseXEncoder, alphabet2, getBase58Encoder, e, o, getUtf8Encoder;
var init_index_browser3 = __esm({
  "node_modules/@solana/codecs-strings/dist/index.browser.mjs"() {
    init_index_browser();
    init_index_browser2();
    getBaseXEncoder = (alphabet4) => {
      return createEncoder({
        getSizeFromValue: (value) => {
          const [leadingZeroes, tailChars] = partitionLeadingZeroes(value, alphabet4[0]);
          if (!tailChars) return value.length;
          const base10Number = getBigIntFromBaseX(tailChars, alphabet4);
          return leadingZeroes.length + Math.ceil(base10Number.toString(16).length / 2);
        },
        write(value, bytes, offset) {
          assertValidBaseString(alphabet4, value);
          if (value === "") return offset;
          const [leadingZeroes, tailChars] = partitionLeadingZeroes(value, alphabet4[0]);
          if (!tailChars) {
            bytes.set(new Uint8Array(leadingZeroes.length).fill(0), offset);
            return offset + leadingZeroes.length;
          }
          let base10Number = getBigIntFromBaseX(tailChars, alphabet4);
          const tailBytes = [];
          while (base10Number > 0n) {
            tailBytes.unshift(Number(base10Number % 256n));
            base10Number /= 256n;
          }
          const bytesToAdd = [...Array(leadingZeroes.length).fill(0), ...tailBytes];
          bytes.set(bytesToAdd, offset);
          return offset + bytesToAdd.length;
        }
      });
    };
    alphabet2 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
    getBase58Encoder = () => getBaseXEncoder(alphabet2);
    e = globalThis.TextDecoder;
    o = globalThis.TextEncoder;
    getUtf8Encoder = () => {
      let textEncoder;
      return createEncoder({
        getSizeFromValue: (value) => (textEncoder ||= new o()).encode(value).length,
        write: (value, bytes, offset) => {
          const bytesToAdd = (textEncoder ||= new o()).encode(value);
          bytes.set(bytesToAdd, offset);
          return offset + bytesToAdd.length;
        }
      });
    };
  }
});

// node_modules/@solana/accounts/dist/index.browser.mjs
var init_index_browser4 = __esm({
  "node_modules/@solana/accounts/dist/index.browser.mjs"() {
  }
});

// node_modules/@solana/addresses/dist/index.browser.mjs
function getMemoizedBase58Encoder() {
  if (!memoizedBase58Encoder) memoizedBase58Encoder = getBase58Encoder();
  return memoizedBase58Encoder;
}
function isAddress(putativeAddress) {
  if (
    // Lowest address (32 bytes of zeroes)
    putativeAddress.length < 32 || // Highest address (32 bytes of 255)
    putativeAddress.length > 44
  ) {
    return false;
  }
  const base58Encoder = getMemoizedBase58Encoder();
  try {
    return base58Encoder.encode(putativeAddress).byteLength === 32;
  } catch {
    return false;
  }
}
function assertIsAddress(putativeAddress) {
  if (
    // Lowest address (32 bytes of zeroes)
    putativeAddress.length < 32 || // Highest address (32 bytes of 255)
    putativeAddress.length > 44
  ) {
    throw new SolanaError(SOLANA_ERROR__ADDRESSES__STRING_LENGTH_OUT_OF_RANGE, {
      actualLength: putativeAddress.length
    });
  }
  const base58Encoder = getMemoizedBase58Encoder();
  const bytes = base58Encoder.encode(putativeAddress);
  const numBytes = bytes.byteLength;
  if (numBytes !== 32) {
    throw new SolanaError(SOLANA_ERROR__ADDRESSES__INVALID_BYTE_LENGTH, {
      actualLength: numBytes
    });
  }
}
function address(putativeAddress) {
  assertIsAddress(putativeAddress);
  return putativeAddress;
}
function getAddressEncoder() {
  return transformEncoder(
    fixEncoderSize(getMemoizedBase58Encoder(), 32),
    (putativeAddress) => address(putativeAddress)
  );
}
function getAddressComparator() {
  return new Intl.Collator("en", {
    caseFirst: "lower",
    ignorePunctuation: false,
    localeMatcher: "best fit",
    numeric: false,
    sensitivity: "variant",
    usage: "sort"
  }).compare;
}
var memoizedBase58Encoder;
var init_index_browser5 = __esm({
  "node_modules/@solana/addresses/dist/index.browser.mjs"() {
    init_index_browser2();
    init_index_browser3();
    init_index_browser();
  }
});

// node_modules/@solana/codecs-numbers/dist/index.browser.mjs
function assertNumberIsBetweenForCodec(codecDescription, min, max, value) {
  if (value < min || value > max) {
    throw new SolanaError(SOLANA_ERROR__CODECS__NUMBER_OUT_OF_RANGE, {
      codecDescription,
      max,
      min,
      value
    });
  }
}
function isLittleEndian(config) {
  return config?.endian === 1 ? false : true;
}
function numberEncoderFactory(input) {
  return createEncoder({
    fixedSize: input.size,
    write(value, bytes, offset) {
      if (input.range) {
        assertNumberIsBetweenForCodec(input.name, input.range[0], input.range[1], value);
      }
      const arrayBuffer = new ArrayBuffer(input.size);
      input.set(new DataView(arrayBuffer), value, isLittleEndian(input.config));
      bytes.set(new Uint8Array(arrayBuffer), offset);
      return offset + input.size;
    }
  });
}
var getShortU16Encoder, getU16Encoder, getU32Encoder, getU64Encoder, getU8Encoder;
var init_index_browser6 = __esm({
  "node_modules/@solana/codecs-numbers/dist/index.browser.mjs"() {
    init_index_browser();
    init_index_browser2();
    getShortU16Encoder = () => createEncoder({
      getSizeFromValue: (value) => {
        if (value <= 127) return 1;
        if (value <= 16383) return 2;
        return 3;
      },
      maxSize: 3,
      write: (value, bytes, offset) => {
        assertNumberIsBetweenForCodec("shortU16", 0, 65535, value);
        const shortU16Bytes = [0];
        for (let ii = 0; ; ii += 1) {
          const alignedValue = Number(value) >> ii * 7;
          if (alignedValue === 0) {
            break;
          }
          const nextSevenBits = 127 & alignedValue;
          shortU16Bytes[ii] = nextSevenBits;
          if (ii > 0) {
            shortU16Bytes[ii - 1] |= 128;
          }
        }
        bytes.set(shortU16Bytes, offset);
        return offset + shortU16Bytes.length;
      }
    });
    getU16Encoder = (config = {}) => numberEncoderFactory({
      config,
      name: "u16",
      range: [0, Number("0xffff")],
      set: (view, value, le) => view.setUint16(0, Number(value), le),
      size: 2
    });
    getU32Encoder = (config = {}) => numberEncoderFactory({
      config,
      name: "u32",
      range: [0, Number("0xffffffff")],
      set: (view, value, le) => view.setUint32(0, Number(value), le),
      size: 4
    });
    getU64Encoder = (config = {}) => numberEncoderFactory({
      config,
      name: "u64",
      range: [0n, BigInt("0xffffffffffffffff")],
      set: (view, value, le) => view.setBigUint64(0, BigInt(value), le),
      size: 8
    });
    getU8Encoder = () => numberEncoderFactory({
      name: "u8",
      range: [0, Number("0xff")],
      set: (view, value) => view.setUint8(0, Number(value)),
      size: 1
    });
  }
});

// node_modules/@solana/codecs-data-structures/dist/index.browser.mjs
function assertValidNumberOfItemsForCodec(codecDescription, expected, actual) {
  if (expected !== actual) {
    throw new SolanaError(SOLANA_ERROR__CODECS__INVALID_NUMBER_OF_ITEMS, {
      actual,
      codecDescription,
      expected
    });
  }
}
function maxCodecSizes(sizes) {
  return sizes.reduce(
    (all, size) => all === null || size === null ? null : Math.max(all, size),
    0
  );
}
function sumCodecSizes(sizes) {
  return sizes.reduce((all, size) => all === null || size === null ? null : all + size, 0);
}
function getFixedSize(codec) {
  return isFixedSize(codec) ? codec.fixedSize : null;
}
function getMaxSize(codec) {
  return isFixedSize(codec) ? codec.fixedSize : codec.maxSize ?? null;
}
function getArrayEncoder(item, config = {}) {
  const size = config.size ?? getU32Encoder();
  const fixedSize = computeArrayLikeCodecSize(size, getFixedSize(item));
  const maxSize = computeArrayLikeCodecSize(size, getMaxSize(item)) ?? void 0;
  return createEncoder({
    ...fixedSize !== null ? { fixedSize } : {
      getSizeFromValue: (array) => {
        const prefixSize = typeof size === "object" ? getEncodedSize(array.length, size) : 0;
        return prefixSize + [...array].reduce((all, value) => all + getEncodedSize(value, item), 0);
      },
      maxSize
    },
    write: (array, bytes, offset) => {
      if (typeof size === "number") {
        assertValidNumberOfItemsForCodec(config.description ?? "array", size, array.length);
      }
      if (typeof size === "object") {
        offset = size.write(array.length, bytes, offset);
      }
      array.forEach((value) => {
        offset = item.write(value, bytes, offset);
      });
      return offset;
    }
  });
}
function computeArrayLikeCodecSize(size, itemSize) {
  if (typeof size !== "number") return null;
  if (size === 0) return 0;
  return itemSize === null ? null : itemSize * size;
}
function getBooleanEncoder(config = {}) {
  return transformEncoder(config.size ?? getU8Encoder(), (value) => value ? 1 : 0);
}
function getBytesEncoder() {
  return createEncoder({
    getSizeFromValue: (value) => value.length,
    write: (value, bytes, offset) => {
      bytes.set(value, offset);
      return offset + value.length;
    }
  });
}
function getConstantEncoder(constant) {
  return createEncoder({
    fixedSize: constant.length,
    write: (_, bytes, offset) => {
      bytes.set(constant, offset);
      return offset + constant.length;
    }
  });
}
function getTupleEncoder(items, config) {
  const fixedSize = sumCodecSizes(items.map(getFixedSize));
  const maxSize = sumCodecSizes(items.map(getMaxSize)) ?? void 0;
  return createEncoder({
    ...fixedSize === null ? {
      getSizeFromValue: (value) => items.map((item, index) => getEncodedSize(value[index], item)).reduce((all, one) => all + one, 0),
      maxSize
    } : { fixedSize },
    write: (value, bytes, offset) => {
      assertValidNumberOfItemsForCodec(config?.description ?? "tuple", items.length, value.length);
      items.forEach((item, index) => {
        offset = item.write(value[index], bytes, offset);
      });
      return offset;
    }
  });
}
function getUnionEncoder(variants, getIndexFromValue) {
  const fixedSize = getUnionFixedSize(variants);
  const write = (variant, bytes, offset) => {
    const index = getIndexFromValue(variant);
    assertValidVariantIndex(variants, index);
    return variants[index].write(variant, bytes, offset);
  };
  if (fixedSize !== null) {
    return createEncoder({ fixedSize, write });
  }
  const maxSize = getUnionMaxSize(variants);
  return createEncoder({
    ...maxSize !== null ? { maxSize } : {},
    getSizeFromValue: (variant) => {
      const index = getIndexFromValue(variant);
      assertValidVariantIndex(variants, index);
      return getEncodedSize(variant, variants[index]);
    },
    write
  });
}
function assertValidVariantIndex(variants, index) {
  if (typeof variants[index] === "undefined") {
    throw new SolanaError(SOLANA_ERROR__CODECS__UNION_VARIANT_OUT_OF_RANGE, {
      maxRange: variants.length - 1,
      minRange: 0,
      variant: index
    });
  }
}
function getUnionFixedSize(variants) {
  if (variants.length === 0) return 0;
  if (!isFixedSize(variants[0])) return null;
  const variantSize = variants[0].fixedSize;
  const sameSizedVariants = variants.every((variant) => isFixedSize(variant) && variant.fixedSize === variantSize);
  return sameSizedVariants ? variantSize : null;
}
function getUnionMaxSize(variants) {
  return maxCodecSizes(variants.map((variant) => getMaxSize(variant)));
}
function getUnitEncoder() {
  return createEncoder({
    fixedSize: 0,
    write: (_value, _bytes, offset) => offset
  });
}
function getNullableEncoder(item, config = {}) {
  const prefix = (() => {
    if (config.prefix === null) {
      return transformEncoder(getUnitEncoder(), (_boolean) => void 0);
    }
    return getBooleanEncoder({ size: config.prefix ?? getU8Encoder() });
  })();
  const noneValue = (() => {
    if (config.noneValue === "zeroes") {
      assertIsFixedSize(item);
      return fixEncoderSize(getUnitEncoder(), item.fixedSize);
    }
    if (!config.noneValue) {
      return getUnitEncoder();
    }
    return getConstantEncoder(config.noneValue);
  })();
  return getUnionEncoder(
    [
      transformEncoder(getTupleEncoder([prefix, noneValue]), (_value) => [
        false,
        void 0
      ]),
      transformEncoder(getTupleEncoder([prefix, item]), (value) => [true, value])
    ],
    (variant) => Number(variant !== null)
  );
}
function getPatternMatchEncoder(patterns) {
  return getUnionEncoder(
    patterns.map(([, encoder]) => encoder),
    (value) => {
      const index = patterns.findIndex(([predicate]) => predicate(value));
      if (index === -1) {
        throw new SolanaError(SOLANA_ERROR__CODECS__INVALID_PATTERN_MATCH_VALUE);
      }
      return index;
    }
  );
}
function getPredicateEncoder(predicate, ifTrue, ifFalse) {
  return getUnionEncoder(
    [ifTrue, ifFalse],
    (value) => predicate(value) ? 0 : 1
  );
}
function getStructEncoder(fields) {
  const fieldCodecs = fields.map(([, codec]) => codec);
  const fixedSize = sumCodecSizes(fieldCodecs.map(getFixedSize));
  const maxSize = sumCodecSizes(fieldCodecs.map(getMaxSize)) ?? void 0;
  return createEncoder({
    ...fixedSize === null ? {
      getSizeFromValue: (value) => fields.map(([key, codec]) => getEncodedSize(value[key], codec)).reduce((all, one) => all + one, 0),
      maxSize
    } : { fixedSize },
    write: (struct, bytes, offset) => {
      fields.forEach(([key, codec]) => {
        offset = codec.write(struct[key], bytes, offset);
      });
      return offset;
    }
  });
}
var init_index_browser7 = __esm({
  "node_modules/@solana/codecs-data-structures/dist/index.browser.mjs"() {
    init_index_browser2();
    init_index_browser6();
    init_index_browser();
  }
});

// node_modules/@solana/fixed-points/dist/index.browser.mjs
var init_index_browser8 = __esm({
  "node_modules/@solana/fixed-points/dist/index.browser.mjs"() {
  }
});

// node_modules/@solana/options/dist/index.browser.mjs
var init_index_browser9 = __esm({
  "node_modules/@solana/options/dist/index.browser.mjs"() {
  }
});

// node_modules/@solana/codecs/dist/index.browser.mjs
var init_index_browser10 = __esm({
  "node_modules/@solana/codecs/dist/index.browser.mjs"() {
    init_index_browser2();
    init_index_browser7();
    init_index_browser6();
    init_index_browser3();
    init_index_browser8();
    init_index_browser9();
  }
});

// node_modules/@solana/functional/dist/index.browser.mjs
function pipe(init, ...fns) {
  return fns.reduce((acc, fn) => fn(acc), init);
}
var init_index_browser11 = __esm({
  "node_modules/@solana/functional/dist/index.browser.mjs"() {
  }
});

// node_modules/@solana/instructions/dist/index.browser.mjs
function isSignerRole(role) {
  return role >= 2;
}
function isWritableRole(role) {
  return (role & IS_WRITABLE_BITMASK) !== 0;
}
function mergeRoles(roleA, roleB) {
  return roleA | roleB;
}
var AccountRole, IS_WRITABLE_BITMASK;
var init_index_browser12 = __esm({
  "node_modules/@solana/instructions/dist/index.browser.mjs"() {
    AccountRole = /* @__PURE__ */ ((AccountRole2) => {
      AccountRole2[AccountRole2["WRITABLE_SIGNER"] = /* 3 */
      3] = "WRITABLE_SIGNER";
      AccountRole2[AccountRole2["READONLY_SIGNER"] = /* 2 */
      2] = "READONLY_SIGNER";
      AccountRole2[AccountRole2["WRITABLE"] = /* 1 */
      1] = "WRITABLE";
      AccountRole2[AccountRole2["READONLY"] = /* 0 */
      0] = "READONLY";
      return AccountRole2;
    })(AccountRole || {});
    IS_WRITABLE_BITMASK = 1;
  }
});

// node_modules/@solana/rpc-types/dist/index.browser.mjs
function isBlockhash(putativeBlockhash) {
  return isAddress(putativeBlockhash);
}
var init_index_browser13 = __esm({
  "node_modules/@solana/rpc-types/dist/index.browser.mjs"() {
    init_index_browser5();
  }
});

// node_modules/@solana/transaction-messages/dist/index.browser.mjs
function isTransactionMessageWithBlockhashLifetime(transactionMessage) {
  return "lifetimeConstraint" in transactionMessage && typeof transactionMessage.lifetimeConstraint.blockhash === "string" && typeof transactionMessage.lifetimeConstraint.lastValidBlockHeight === "bigint" && isBlockhash(transactionMessage.lifetimeConstraint.blockhash);
}
function setTransactionMessageLifetimeUsingBlockhash(blockhashLifetimeConstraint, transactionMessage) {
  if ("lifetimeConstraint" in transactionMessage && transactionMessage.lifetimeConstraint && "blockhash" in transactionMessage.lifetimeConstraint && transactionMessage.lifetimeConstraint.blockhash === blockhashLifetimeConstraint.blockhash && transactionMessage.lifetimeConstraint.lastValidBlockHeight === blockhashLifetimeConstraint.lastValidBlockHeight) {
    return transactionMessage;
  }
  return Object.freeze({
    ...transactionMessage,
    lifetimeConstraint: Object.freeze(blockhashLifetimeConstraint)
  });
}
function getMemoizedU8Encoder() {
  if (!memoizedU8Encoder) memoizedU8Encoder = getU8Encoder();
  return memoizedU8Encoder;
}
function getMessageHeaderEncoder() {
  return getStructEncoder([
    ["numSignerAccounts", getMemoizedU8Encoder()],
    ["numReadonlySignerAccounts", getMemoizedU8Encoder()],
    ["numReadonlyNonSignerAccounts", getMemoizedU8Encoder()]
  ]);
}
function getInstructionEncoder() {
  if (!memoizedGetInstructionEncoder) {
    memoizedGetInstructionEncoder = transformEncoder(
      getStructEncoder([
        ["programAddressIndex", getU8Encoder()],
        ["accountIndices", getArrayEncoder(getU8Encoder(), { size: getShortU16Encoder() })],
        ["data", addEncoderSizePrefix(getBytesEncoder(), getShortU16Encoder())]
      ]),
      // Convert an instruction to have all fields defined
      (instruction) => {
        if (instruction.accountIndices !== void 0 && instruction.data !== void 0) {
          return instruction;
        }
        return {
          ...instruction,
          accountIndices: instruction.accountIndices ?? [],
          data: instruction.data ?? new Uint8Array(0)
        };
      }
    );
  }
  return memoizedGetInstructionEncoder;
}
function assertValidBaseString2(alphabet4, testValue, givenValue = testValue) {
  if (!testValue.match(new RegExp(`^[${alphabet4}]*$`))) {
    throw new SolanaError(SOLANA_ERROR__CODECS__INVALID_STRING_FOR_BASE, {
      alphabet: alphabet4,
      base: alphabet4.length,
      value: givenValue
    });
  }
}
function partitionLeadingZeroes2(value, zeroCharacter) {
  const [leadingZeros, tailChars] = value.split(new RegExp(`((?!${zeroCharacter}).*)`));
  return [leadingZeros, tailChars];
}
function getBigIntFromBaseX2(value, alphabet4) {
  const base2 = BigInt(alphabet4.length);
  let sum = 0n;
  for (const char of value) {
    sum *= base2;
    sum += BigInt(alphabet4.indexOf(char));
  }
  return sum;
}
function getLifetimeTokenEncoder() {
  return transformEncoder(
    getNullableEncoder(fixEncoderSize(getBase58Encoder2(), 32), {
      noneValue: "zeroes",
      prefix: null
    }),
    (token) => token ?? null
  );
}
function getMessageEncoder() {
  return transformEncoder(
    getStructEncoder([
      ["header", getMessageHeaderEncoder()],
      ["staticAccounts", getArrayEncoder(getAddressEncoder(), { size: getShortU16Encoder() })],
      ["lifetimeToken", getLifetimeTokenEncoder()],
      ["instructions", getArrayEncoder(getInstructionEncoder(), { size: getShortU16Encoder() })]
    ]),
    (value) => ({
      ...value,
      lifetimeToken: "lifetimeToken" in value ? value.lifetimeToken : void 0
    })
  );
}
function getTransactionVersionEncoder() {
  return createEncoder({
    getSizeFromValue: (value) => value === "legacy" ? 0 : 1,
    maxSize: 1,
    write: (value, bytes, offset) => {
      if (value === "legacy") {
        return offset;
      }
      if (value < 0 || value > 127) {
        throw new SolanaError(SOLANA_ERROR__TRANSACTION__VERSION_NUMBER_OUT_OF_RANGE, {
          actualVersion: value
        });
      }
      if (value > MAX_SUPPORTED_TRANSACTION_VERSION) {
        throw new SolanaError(SOLANA_ERROR__TRANSACTION__VERSION_NUMBER_NOT_SUPPORTED, {
          unsupportedVersion: value
        });
      }
      bytes.set([value | VERSION_FLAG_MASK], offset);
      return offset + 1;
    }
  });
}
function getTransactionVersionDecoder() {
  return createDecoder({
    maxSize: 1,
    read: (bytes, offset) => {
      const firstByte = bytes[offset];
      if ((firstByte & VERSION_FLAG_MASK) === 0) {
        return ["legacy", offset];
      } else {
        const version = firstByte ^ VERSION_FLAG_MASK;
        if (version > MAX_SUPPORTED_TRANSACTION_VERSION) {
          throw new SolanaError(SOLANA_ERROR__TRANSACTION__VERSION_NUMBER_NOT_SUPPORTED, {
            unsupportedVersion: version
          });
        }
        return [version, offset + 1];
      }
    }
  });
}
function getAddressTableLookupEncoder() {
  if (!memoizedAddressTableLookupEncoder) {
    const indexEncoder = getArrayEncoder(getU8Encoder(), { size: getShortU16Encoder() });
    memoizedAddressTableLookupEncoder = getStructEncoder([
      ["lookupTableAddress", getAddressEncoder()],
      ["writableIndexes", indexEncoder],
      ["readonlyIndexes", indexEncoder]
    ]);
  }
  return memoizedAddressTableLookupEncoder;
}
function getMessageEncoder2() {
  return transformEncoder(
    getStructEncoder([
      ["version", getTransactionVersionEncoder()],
      ["header", getMessageHeaderEncoder()],
      ["staticAccounts", getArrayEncoder(getAddressEncoder(), { size: getShortU16Encoder() })],
      ["lifetimeToken", getLifetimeTokenEncoder()],
      ["instructions", getArrayEncoder(getInstructionEncoder(), { size: getShortU16Encoder() })],
      ["addressTableLookups", getArrayEncoder(getAddressTableLookupEncoder(), { size: getShortU16Encoder() })]
    ]),
    (value) => ({
      ...value,
      addressTableLookups: value.addressTableLookups ?? [],
      lifetimeToken: "lifetimeToken" in value ? value.lifetimeToken : void 0
    })
  );
}
function getCompiledTransactionConfigValueEncoder() {
  return getPatternMatchEncoder([
    [
      (value) => value.kind === "u32",
      transformEncoder(getStructEncoder([["value", getU32Encoder()]]), (value) => value)
    ],
    [
      (value) => value.kind === "u64",
      transformEncoder(getStructEncoder([["value", getU64Encoder()]]), (value) => value)
    ]
  ]);
}
function getCompiledTransactionConfigValuesEncoder() {
  return getArrayEncoder(getCompiledTransactionConfigValueEncoder(), { size: "remainder" });
}
function getInstructionHeaderEncoder() {
  return getStructEncoder([
    ["programAccountIndex", getU8Encoder()],
    ["numInstructionAccounts", getU8Encoder()],
    ["numInstructionDataBytes", getU16Encoder()]
  ]);
}
function getInstructionPayloadEncoder() {
  return getStructEncoder([
    ["instructionAccountIndices", getArrayEncoder(getU8Encoder(), { size: "remainder" })],
    ["instructionData", getBytesEncoder()]
  ]);
}
function getMessageEncoder3() {
  return transformEncoder(
    getStructEncoder([
      ["version", getTransactionVersionEncoder()],
      ["header", getMessageHeaderEncoder()],
      ["configMask", getU32Encoder()],
      ["lifetimeToken", getLifetimeTokenEncoder()],
      ["numInstructions", getU8Encoder()],
      ["numStaticAccounts", getU8Encoder()],
      ["staticAccounts", getArrayEncoder(getAddressEncoder(), { size: "remainder" })],
      ["configValues", getCompiledTransactionConfigValuesEncoder()],
      ["instructionHeaders", getArrayEncoder(getInstructionHeaderEncoder(), { size: "remainder" })],
      ["instructionPayloads", getArrayEncoder(getInstructionPayloadEncoder(), { size: "remainder" })]
    ]),
    (value) => ({
      ...value,
      lifetimeToken: "lifetimeToken" in value ? value.lifetimeToken : void 0
    })
  );
}
function getCompiledTransactionMessageEncoder() {
  return transformEncoder(
    getPatternMatchEncoder([
      [(m) => m.version === "legacy", getMessageEncoder()],
      [(m) => m.version === 0, getMessageEncoder2()],
      [(m) => m.version === 1, getMessageEncoder3()]
    ]),
    (value) => {
      if (value.version !== "legacy" && value.version > MAX_SUPPORTED_TRANSACTION_VERSION) {
        throw new SolanaError(SOLANA_ERROR__TRANSACTION__VERSION_NUMBER_NOT_SUPPORTED, {
          unsupportedVersion: value.version
        });
      }
      return value;
    }
  );
}
function upsert(addressMap, address2, update) {
  addressMap[address2] = update(addressMap[address2] ?? { role: AccountRole.READONLY });
}
function getAddressMapFromInstructions(feePayer, instructions) {
  const addressMap = {
    [feePayer]: { [TYPE2]: 0, role: AccountRole.WRITABLE_SIGNER }
  };
  const addressesOfInvokedPrograms = /* @__PURE__ */ new Set();
  for (const instruction of instructions) {
    upsert(addressMap, instruction.programAddress, (entry) => {
      addressesOfInvokedPrograms.add(instruction.programAddress);
      if (TYPE2 in entry) {
        if (isWritableRole(entry.role)) {
          switch (entry[TYPE2]) {
            case 0:
              throw new SolanaError(SOLANA_ERROR__TRANSACTION__INVOKED_PROGRAMS_CANNOT_PAY_FEES, {
                programAddress: instruction.programAddress
              });
            default:
              throw new SolanaError(SOLANA_ERROR__TRANSACTION__INVOKED_PROGRAMS_MUST_NOT_BE_WRITABLE, {
                programAddress: instruction.programAddress
              });
          }
        }
        if (entry[TYPE2] === 1) {
          return entry;
        }
      }
      return { [TYPE2]: 1, role: AccountRole.READONLY };
    });
    if (!instruction.accounts) {
      continue;
    }
    for (const account of instruction.accounts) {
      upsert(addressMap, account.address, (entry) => {
        const {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          address: _,
          ...accountMeta
        } = account;
        if (TYPE2 in entry) {
          switch (entry[TYPE2]) {
            case 0:
              return entry;
            case 1: {
              const nextRole = mergeRoles(entry.role, accountMeta.role);
              if (
                // Check to see if this address represents a program that is invoked
                // in this transaction.
                addressesOfInvokedPrograms.has(account.address)
              ) {
                if (isWritableRole(accountMeta.role)) {
                  throw new SolanaError(
                    SOLANA_ERROR__TRANSACTION__INVOKED_PROGRAMS_MUST_NOT_BE_WRITABLE,
                    {
                      programAddress: account.address
                    }
                  );
                }
                if (entry.role !== nextRole) {
                  return {
                    ...entry,
                    role: nextRole
                  };
                } else {
                  return entry;
                }
              } else {
                if (entry.role !== nextRole) {
                  return {
                    ...entry,
                    role: nextRole
                  };
                } else {
                  return entry;
                }
              }
            }
          }
        }
        return {
          ...accountMeta,
          [TYPE2]: 1
          /* STATIC */
        };
      });
    }
  }
  return addressMap;
}
function getOrderedAccountsFromAddressMap(addressMap) {
  let addressComparator;
  const orderedAccounts = Object.entries(addressMap).sort(([leftAddress, leftEntry], [rightAddress, rightEntry]) => {
    if (leftEntry[TYPE2] !== rightEntry[TYPE2]) {
      if (leftEntry[TYPE2] === 0) {
        return -1;
      } else if (rightEntry[TYPE2] === 0) {
        return 1;
      } else if (leftEntry[TYPE2] === 1) {
        return -1;
      } else if (rightEntry[TYPE2] === 1) {
        return 1;
      }
    }
    const leftIsSigner = isSignerRole(leftEntry.role);
    if (leftIsSigner !== isSignerRole(rightEntry.role)) {
      return leftIsSigner ? -1 : 1;
    }
    const leftIsWritable = isWritableRole(leftEntry.role);
    if (leftIsWritable !== isWritableRole(rightEntry.role)) {
      return leftIsWritable ? -1 : 1;
    }
    addressComparator ||= getAddressComparator();
    return addressComparator(leftAddress, rightAddress);
  }).map(([address2, addressMeta]) => ({
    address: address2,
    ...addressMeta
  }));
  return orderedAccounts;
}
function getCompiledMessageHeader(orderedAccounts) {
  let numReadonlyNonSignerAccounts = 0;
  let numReadonlySignerAccounts = 0;
  let numSignerAccounts = 0;
  for (const account of orderedAccounts) {
    if ("lookupTableAddress" in account) {
      break;
    }
    const accountIsWritable = isWritableRole(account.role);
    if (isSignerRole(account.role)) {
      numSignerAccounts++;
      if (!accountIsWritable) {
        numReadonlySignerAccounts++;
      }
    } else if (!accountIsWritable) {
      numReadonlyNonSignerAccounts++;
    }
  }
  return {
    numReadonlyNonSignerAccounts,
    numReadonlySignerAccounts,
    numSignerAccounts
  };
}
function getAccountIndex(orderedAccounts) {
  const out = {};
  for (const [index, account] of orderedAccounts.entries()) {
    out[account.address] = index;
  }
  return out;
}
function getCompiledInstructions(instructions, orderedAccounts) {
  const accountIndex = getAccountIndex(orderedAccounts);
  return instructions.map(({ accounts, data, programAddress }) => {
    return {
      programAddressIndex: accountIndex[programAddress],
      ...accounts ? { accountIndices: accounts.map(({ address: address2 }) => accountIndex[address2]) } : null,
      ...data ? { data } : null
    };
  });
}
function getCompiledLifetimeToken(lifetimeConstraint) {
  if ("nonce" in lifetimeConstraint) {
    return lifetimeConstraint.nonce;
  }
  return lifetimeConstraint.blockhash;
}
function compileTransactionMessage(transactionMessage) {
  const addressMap = getAddressMapFromInstructions(
    transactionMessage.feePayer.address,
    transactionMessage.instructions
  );
  const orderedAccounts = getOrderedAccountsFromAddressMap(addressMap);
  const numAccounts = orderedAccounts.length;
  if (numAccounts > 64) {
    throw new SolanaError(SOLANA_ERROR__TRANSACTION__TOO_MANY_ACCOUNT_ADDRESSES, {
      actualCount: numAccounts,
      maxAllowed: 64
    });
  }
  const numSigners = orderedAccounts.filter((account) => isSignerRole(account.role)).length;
  if (numSigners > 12) {
    throw new SolanaError(SOLANA_ERROR__TRANSACTION__TOO_MANY_SIGNER_ADDRESSES, {
      actualCount: numSigners,
      maxAllowed: 12
    });
  }
  const numInstructions = transactionMessage.instructions.length;
  if (numInstructions > 64) {
    throw new SolanaError(SOLANA_ERROR__TRANSACTION__TOO_MANY_INSTRUCTIONS, {
      actualCount: numInstructions,
      maxAllowed: 64
    });
  }
  for (let i = 0; i < transactionMessage.instructions.length; i++) {
    const numAccountsInInstruction = transactionMessage.instructions[i].accounts?.length ?? 0;
    if (numAccountsInInstruction > 255) {
      throw new SolanaError(SOLANA_ERROR__TRANSACTION__TOO_MANY_ACCOUNTS_IN_INSTRUCTION, {
        actualCount: numAccountsInInstruction,
        instructionIndex: i,
        maxAllowed: 255
      });
    }
  }
  const lifetimeConstraint = transactionMessage.lifetimeConstraint;
  return {
    ...lifetimeConstraint ? { lifetimeToken: getCompiledLifetimeToken(lifetimeConstraint) } : null,
    header: getCompiledMessageHeader(orderedAccounts),
    instructions: getCompiledInstructions(transactionMessage.instructions, orderedAccounts),
    staticAccounts: orderedAccounts.map((account) => account.address),
    version: transactionMessage.version
  };
}
function upsert2(addressMap, address2, update) {
  addressMap[address2] = update(addressMap[address2] ?? { role: AccountRole.READONLY });
}
function getAddressMapFromInstructions2(feePayer, instructions) {
  const addressMap = {
    [feePayer]: { [TYPE22]: 0, role: AccountRole.WRITABLE_SIGNER }
  };
  const addressesOfInvokedPrograms = /* @__PURE__ */ new Set();
  for (const instruction of instructions) {
    upsert2(addressMap, instruction.programAddress, (entry) => {
      addressesOfInvokedPrograms.add(instruction.programAddress);
      if (TYPE22 in entry) {
        if (isWritableRole(entry.role)) {
          switch (entry[TYPE22]) {
            case 0:
              throw new SolanaError(SOLANA_ERROR__TRANSACTION__INVOKED_PROGRAMS_CANNOT_PAY_FEES, {
                programAddress: instruction.programAddress
              });
            default:
              throw new SolanaError(SOLANA_ERROR__TRANSACTION__INVOKED_PROGRAMS_MUST_NOT_BE_WRITABLE, {
                programAddress: instruction.programAddress
              });
          }
        }
        if (entry[TYPE22] === 2) {
          return entry;
        }
      }
      return { [TYPE22]: 2, role: AccountRole.READONLY };
    });
    let addressComparator;
    if (!instruction.accounts) {
      continue;
    }
    for (const account of instruction.accounts) {
      upsert2(addressMap, account.address, (entry) => {
        const {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          address: _,
          ...accountMeta
        } = account;
        if (TYPE22 in entry) {
          switch (entry[TYPE22]) {
            case 0:
              return entry;
            case 1: {
              const nextRole = mergeRoles(entry.role, accountMeta.role);
              if ("lookupTableAddress" in accountMeta) {
                const shouldReplaceEntry = (
                  // Consider using the new LOOKUP_TABLE if its address is different...
                  entry.lookupTableAddress !== accountMeta.lookupTableAddress && // ...and sorts before the existing one.
                  (addressComparator ||= getAddressComparator())(
                    accountMeta.lookupTableAddress,
                    entry.lookupTableAddress
                  ) < 0
                );
                if (shouldReplaceEntry) {
                  return {
                    [TYPE22]: 1,
                    ...accountMeta,
                    role: nextRole
                  };
                }
              } else if (isSignerRole(accountMeta.role)) {
                return {
                  [TYPE22]: 2,
                  role: nextRole
                };
              }
              if (entry.role !== nextRole) {
                return {
                  ...entry,
                  role: nextRole
                };
              } else {
                return entry;
              }
            }
            case 2: {
              const nextRole = mergeRoles(entry.role, accountMeta.role);
              if (
                // Check to see if this address represents a program that is invoked
                // in this transaction.
                addressesOfInvokedPrograms.has(account.address)
              ) {
                if (isWritableRole(accountMeta.role)) {
                  throw new SolanaError(
                    SOLANA_ERROR__TRANSACTION__INVOKED_PROGRAMS_MUST_NOT_BE_WRITABLE,
                    {
                      programAddress: account.address
                    }
                  );
                }
                if (entry.role !== nextRole) {
                  return {
                    ...entry,
                    role: nextRole
                  };
                } else {
                  return entry;
                }
              } else if ("lookupTableAddress" in accountMeta && // Static accounts can be 'upgraded' to lookup table accounts as
              // long as they are not require to sign the transaction.
              !isSignerRole(entry.role)) {
                return {
                  ...accountMeta,
                  [TYPE22]: 1,
                  role: nextRole
                };
              } else {
                if (entry.role !== nextRole) {
                  return {
                    ...entry,
                    role: nextRole
                  };
                } else {
                  return entry;
                }
              }
            }
          }
        }
        if ("lookupTableAddress" in accountMeta) {
          return {
            ...accountMeta,
            [TYPE22]: 1
            /* LOOKUP_TABLE */
          };
        } else {
          return {
            ...accountMeta,
            [TYPE22]: 2
            /* STATIC */
          };
        }
      });
    }
  }
  return addressMap;
}
function getOrderedAccountsFromAddressMap2(addressMap) {
  let addressComparator;
  const orderedAccounts = Object.entries(addressMap).sort(([leftAddress, leftEntry], [rightAddress, rightEntry]) => {
    if (leftEntry[TYPE22] !== rightEntry[TYPE22]) {
      if (leftEntry[TYPE22] === 0) {
        return -1;
      } else if (rightEntry[TYPE22] === 0) {
        return 1;
      } else if (leftEntry[TYPE22] === 2) {
        return -1;
      } else if (rightEntry[TYPE22] === 2) {
        return 1;
      }
    }
    const leftIsSigner = isSignerRole(leftEntry.role);
    if (leftIsSigner !== isSignerRole(rightEntry.role)) {
      return leftIsSigner ? -1 : 1;
    }
    const leftIsWritable = isWritableRole(leftEntry.role);
    if (leftIsWritable !== isWritableRole(rightEntry.role)) {
      return leftIsWritable ? -1 : 1;
    }
    addressComparator ||= getAddressComparator();
    if (leftEntry[TYPE22] === 1 && rightEntry[TYPE22] === 1 && leftEntry.lookupTableAddress !== rightEntry.lookupTableAddress) {
      return addressComparator(leftEntry.lookupTableAddress, rightEntry.lookupTableAddress);
    } else {
      return addressComparator(leftAddress, rightAddress);
    }
  }).map(([address2, addressMeta]) => ({
    address: address2,
    ...addressMeta
  }));
  return orderedAccounts;
}
function getCompiledAddressTableLookups(orderedAccounts) {
  const index = {};
  for (const account of orderedAccounts) {
    if (!("lookupTableAddress" in account)) {
      continue;
    }
    const entry = index[account.lookupTableAddress] ||= {
      readonlyIndexes: [],
      writableIndexes: []
    };
    if (account.role === AccountRole.WRITABLE) {
      entry.writableIndexes.push(account.addressIndex);
    } else {
      entry.readonlyIndexes.push(account.addressIndex);
    }
  }
  return Object.keys(index).sort(getAddressComparator()).map((lookupTableAddress) => ({
    lookupTableAddress,
    ...index[lookupTableAddress]
  }));
}
function getAccountIndex2(orderedAccounts) {
  const out = {};
  for (const [index, account] of orderedAccounts.entries()) {
    out[account.address] = index;
  }
  return out;
}
function getCompiledInstructions2(instructions, orderedAccounts) {
  const accountIndex = getAccountIndex2(orderedAccounts);
  return instructions.map(({ accounts, data, programAddress }) => {
    return {
      programAddressIndex: accountIndex[programAddress],
      ...accounts ? { accountIndices: accounts.map(({ address: address2 }) => accountIndex[address2]) } : null,
      ...data ? { data } : null
    };
  });
}
function getCompiledStaticAccounts(orderedAccounts) {
  const firstLookupTableAccountIndex = orderedAccounts.findIndex((account) => "lookupTableAddress" in account);
  const orderedStaticAccounts = firstLookupTableAccountIndex === -1 ? orderedAccounts : orderedAccounts.slice(0, firstLookupTableAccountIndex);
  return orderedStaticAccounts.map(({ address: address2 }) => address2);
}
function compileTransactionMessage2(transactionMessage) {
  const addressMap = getAddressMapFromInstructions2(
    transactionMessage.feePayer.address,
    transactionMessage.instructions
  );
  const orderedAccounts = getOrderedAccountsFromAddressMap2(addressMap);
  const numAccounts = orderedAccounts.length;
  if (numAccounts > 64) {
    throw new SolanaError(SOLANA_ERROR__TRANSACTION__TOO_MANY_ACCOUNT_ADDRESSES, {
      actualCount: numAccounts,
      maxAllowed: 64
    });
  }
  const numSigners = orderedAccounts.filter((account) => isSignerRole(account.role)).length;
  if (numSigners > 12) {
    throw new SolanaError(SOLANA_ERROR__TRANSACTION__TOO_MANY_SIGNER_ADDRESSES, {
      actualCount: numSigners,
      maxAllowed: 12
    });
  }
  const numInstructions = transactionMessage.instructions.length;
  if (numInstructions > 64) {
    throw new SolanaError(SOLANA_ERROR__TRANSACTION__TOO_MANY_INSTRUCTIONS, {
      actualCount: numInstructions,
      maxAllowed: 64
    });
  }
  for (let i = 0; i < transactionMessage.instructions.length; i++) {
    const numAccountsInInstruction = transactionMessage.instructions[i].accounts?.length ?? 0;
    if (numAccountsInInstruction > 255) {
      throw new SolanaError(SOLANA_ERROR__TRANSACTION__TOO_MANY_ACCOUNTS_IN_INSTRUCTION, {
        actualCount: numAccountsInInstruction,
        instructionIndex: i,
        maxAllowed: 255
      });
    }
  }
  const lifetimeConstraint = transactionMessage.lifetimeConstraint;
  return {
    addressTableLookups: getCompiledAddressTableLookups(orderedAccounts),
    ...lifetimeConstraint ? { lifetimeToken: getCompiledLifetimeToken(lifetimeConstraint) } : null,
    header: getCompiledMessageHeader(orderedAccounts),
    instructions: getCompiledInstructions2(transactionMessage.instructions, orderedAccounts),
    staticAccounts: getCompiledStaticAccounts(orderedAccounts),
    version: transactionMessage.version
  };
}
function getTransactionConfigMask(config) {
  let mask = 0;
  if (config.priorityFeeLamports !== void 0) mask |= TRANSACTION_CONFIG_PRIORITY_FEE_LAMPORTS_BIT_MASK;
  if (config.computeUnitLimit !== void 0) mask |= TRANSACTION_CONFIG_COMPUTE_UNIT_LIMIT_BIT_MASK;
  if (config.loadedAccountsDataSizeLimit !== void 0)
    mask |= TRANSACTION_CONFIG_LOADED_ACCOUNTS_DATA_SIZE_LIMIT_BIT_MASK;
  if (config.heapSize !== void 0) mask |= TRANSACTION_CONFIG_HEAP_SIZE_BIT_MASK;
  return mask;
}
function getTransactionConfigValues(config) {
  const values = [];
  if (config.priorityFeeLamports !== void 0) {
    values.push({ kind: "u64", value: config.priorityFeeLamports });
  }
  if (config.computeUnitLimit !== void 0) {
    values.push({ kind: "u32", value: config.computeUnitLimit });
  }
  if (config.loadedAccountsDataSizeLimit !== void 0) {
    values.push({ kind: "u32", value: config.loadedAccountsDataSizeLimit });
  }
  if (config.heapSize !== void 0) {
    values.push({ kind: "u32", value: config.heapSize });
  }
  return values;
}
function getInstructionHeader(instruction, accountIndex) {
  return {
    numInstructionAccounts: instruction.accounts?.length ?? 0,
    numInstructionDataBytes: instruction.data?.byteLength ?? 0,
    programAccountIndex: accountIndex[instruction.programAddress]
  };
}
function getInstructionPayload(instruction, accountIndex) {
  return {
    instructionAccountIndices: instruction.accounts?.map(({ address: address2 }) => accountIndex[address2]) ?? [],
    instructionData: instruction.data ?? new Uint8Array()
  };
}
function compileTransactionMessage3(transactionMessage) {
  const addressMap = getAddressMapFromInstructions(
    transactionMessage.feePayer.address,
    transactionMessage.instructions
  );
  const orderedAccounts = getOrderedAccountsFromAddressMap(addressMap);
  const numAccounts = orderedAccounts.length;
  if (numAccounts > 64) {
    throw new SolanaError(SOLANA_ERROR__TRANSACTION__TOO_MANY_ACCOUNT_ADDRESSES, {
      actualCount: numAccounts,
      maxAllowed: 64
    });
  }
  const numSigners = orderedAccounts.filter((account) => isSignerRole(account.role)).length;
  if (numSigners > 12) {
    throw new SolanaError(SOLANA_ERROR__TRANSACTION__TOO_MANY_SIGNER_ADDRESSES, {
      actualCount: numSigners,
      maxAllowed: 12
    });
  }
  const numInstructions = transactionMessage.instructions.length;
  if (numInstructions > 64) {
    throw new SolanaError(SOLANA_ERROR__TRANSACTION__TOO_MANY_INSTRUCTIONS, {
      actualCount: numInstructions,
      maxAllowed: 64
    });
  }
  for (let i = 0; i < transactionMessage.instructions.length; i++) {
    const numAccountsInInstruction = transactionMessage.instructions[i].accounts?.length ?? 0;
    if (numAccountsInInstruction > 255) {
      throw new SolanaError(SOLANA_ERROR__TRANSACTION__TOO_MANY_ACCOUNTS_IN_INSTRUCTION, {
        actualCount: numAccountsInInstruction,
        instructionIndex: i,
        maxAllowed: 255
      });
    }
  }
  const accountIndex = getAccountIndex(orderedAccounts);
  const lifetimeConstraint = transactionMessage.lifetimeConstraint;
  return {
    version: 1,
    ...lifetimeConstraint ? { lifetimeToken: getCompiledLifetimeToken(lifetimeConstraint) } : null,
    configMask: getTransactionConfigMask(transactionMessage.config ?? {}),
    configValues: getTransactionConfigValues(transactionMessage.config ?? {}),
    header: getCompiledMessageHeader(orderedAccounts),
    instructionHeaders: transactionMessage.instructions.map(
      (instruction) => getInstructionHeader(instruction, accountIndex)
    ),
    instructionPayloads: transactionMessage.instructions.map(
      (instruction) => getInstructionPayload(instruction, accountIndex)
    ),
    numInstructions: transactionMessage.instructions.length,
    numStaticAccounts: orderedAccounts.length,
    staticAccounts: orderedAccounts.map((account) => account.address)
  };
}
function compileTransactionMessage4(transactionMessage) {
  const version = transactionMessage.version;
  if (version === "legacy") {
    return compileTransactionMessage(transactionMessage);
  } else if (version === 0) {
    return compileTransactionMessage2(transactionMessage);
  } else if (version === 1) {
    return compileTransactionMessage3(transactionMessage);
  } else {
    throw new SolanaError(SOLANA_ERROR__TRANSACTION__VERSION_NUMBER_NOT_SUPPORTED, {
      version
    });
  }
}
function appendTransactionMessageInstruction(instruction, transactionMessage) {
  return appendTransactionMessageInstructions([instruction], transactionMessage);
}
function appendTransactionMessageInstructions(instructions, transactionMessage) {
  return Object.freeze({
    ...transactionMessage,
    instructions: Object.freeze([
      ...transactionMessage.instructions,
      ...instructions
    ])
  });
}
function createTransactionMessage(config) {
  return Object.freeze({
    instructions: Object.freeze([]),
    version: config.version
  });
}
function setTransactionMessageFeePayer(feePayer, transactionMessage) {
  if ("feePayer" in transactionMessage && feePayer === transactionMessage.feePayer?.address && isAddressOnlyFeePayer(transactionMessage.feePayer)) {
    return transactionMessage;
  }
  const out = {
    ...transactionMessage,
    feePayer: Object.freeze({ address: feePayer })
  };
  Object.freeze(out);
  return out;
}
function isAddressOnlyFeePayer(feePayer) {
  return !!feePayer && "address" in feePayer && typeof feePayer.address === "string" && Object.keys(feePayer).length === 1;
}
function isAdvanceNonceAccountInstruction(instruction) {
  return instruction.programAddress === SYSTEM_PROGRAM_ADDRESS && // Test for `AdvanceNonceAccount` instruction data
  instruction.data != null && isAdvanceNonceAccountInstructionData(instruction.data) && // Test for exactly 3 accounts
  instruction.accounts?.length === 3 && // First account is nonce account address
  instruction.accounts[0].address != null && instruction.accounts[0].role === AccountRole.WRITABLE && // Second account is recent blockhashes sysvar
  instruction.accounts[1].address === RECENT_BLOCKHASHES_SYSVAR_ADDRESS && instruction.accounts[1].role === AccountRole.READONLY && // Third account is nonce authority account
  instruction.accounts[2].address != null && isSignerRole(instruction.accounts[2].role);
}
function isAdvanceNonceAccountInstructionData(data) {
  return data.byteLength === 4 && data[0] === 4 && data[1] === 0 && data[2] === 0 && data[3] === 0;
}
function isTransactionMessageWithDurableNonceLifetime(transactionMessage) {
  return "lifetimeConstraint" in transactionMessage && typeof transactionMessage.lifetimeConstraint.nonce === "string" && transactionMessage.instructions[0] != null && isAdvanceNonceAccountInstruction(transactionMessage.instructions[0]);
}
var MAX_SUPPORTED_TRANSACTION_VERSION, memoizedU8Encoder, memoizedGetInstructionEncoder, getBaseXEncoder2, alphabet22, getBase58Encoder2, VERSION_FLAG_MASK, memoizedAddressTableLookupEncoder, MIN_HEAP_SIZE, MAX_HEAP_SIZE, TRANSACTION_CONFIG_PRIORITY_FEE_LAMPORTS_BIT_MASK, TRANSACTION_CONFIG_COMPUTE_UNIT_LIMIT_BIT_MASK, TRANSACTION_CONFIG_LOADED_ACCOUNTS_DATA_SIZE_LIMIT_BIT_MASK, TRANSACTION_CONFIG_HEAP_SIZE_BIT_MASK, TYPE2, TYPE22, RECENT_BLOCKHASHES_SYSVAR_ADDRESS, SYSTEM_PROGRAM_ADDRESS;
var init_index_browser14 = __esm({
  "node_modules/@solana/transaction-messages/dist/index.browser.mjs"() {
    init_index_browser();
    init_index_browser13();
    init_index_browser2();
    init_index_browser7();
    init_index_browser5();
    init_index_browser6();
    init_index_browser12();
    MAX_SUPPORTED_TRANSACTION_VERSION = 1;
    getBaseXEncoder2 = (alphabet4) => {
      return createEncoder({
        getSizeFromValue: (value) => {
          const [leadingZeroes, tailChars] = partitionLeadingZeroes2(value, alphabet4[0]);
          if (!tailChars) return value.length;
          const base10Number = getBigIntFromBaseX2(tailChars, alphabet4);
          return leadingZeroes.length + Math.ceil(base10Number.toString(16).length / 2);
        },
        write(value, bytes, offset) {
          assertValidBaseString2(alphabet4, value);
          if (value === "") return offset;
          const [leadingZeroes, tailChars] = partitionLeadingZeroes2(value, alphabet4[0]);
          if (!tailChars) {
            bytes.set(new Uint8Array(leadingZeroes.length).fill(0), offset);
            return offset + leadingZeroes.length;
          }
          let base10Number = getBigIntFromBaseX2(tailChars, alphabet4);
          const tailBytes = [];
          while (base10Number > 0n) {
            tailBytes.unshift(Number(base10Number % 256n));
            base10Number /= 256n;
          }
          const bytesToAdd = [...Array(leadingZeroes.length).fill(0), ...tailBytes];
          bytes.set(bytesToAdd, offset);
          return offset + bytesToAdd.length;
        }
      });
    };
    alphabet22 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
    getBase58Encoder2 = () => getBaseXEncoder2(alphabet22);
    VERSION_FLAG_MASK = 128;
    MIN_HEAP_SIZE = 32 * 1024;
    MAX_HEAP_SIZE = 256 * 1024;
    TRANSACTION_CONFIG_PRIORITY_FEE_LAMPORTS_BIT_MASK = 3;
    TRANSACTION_CONFIG_COMPUTE_UNIT_LIMIT_BIT_MASK = 4;
    TRANSACTION_CONFIG_LOADED_ACCOUNTS_DATA_SIZE_LIMIT_BIT_MASK = 8;
    TRANSACTION_CONFIG_HEAP_SIZE_BIT_MASK = 16;
    TYPE2 = /* @__PURE__ */ Symbol("AddressMapTypeProperty");
    TYPE22 = /* @__PURE__ */ Symbol("AddressMapTypeProperty");
    RECENT_BLOCKHASHES_SYSVAR_ADDRESS = "SysvarRecentB1ockHashes11111111111111111111";
    SYSTEM_PROGRAM_ADDRESS = "11111111111111111111111111111111";
  }
});

// node_modules/@solana/promises/dist/index.browser.mjs
function isObject(value) {
  return value !== null && (typeof value === "object" || typeof value === "function");
}
function addRaceContender(contender) {
  const deferreds = /* @__PURE__ */ new Set();
  const record = { deferreds, settled: false };
  Promise.resolve(contender).then(
    (value) => {
      for (const { resolve } of deferreds) {
        resolve(value);
      }
      deferreds.clear();
      record.settled = true;
    },
    (err) => {
      for (const { reject } of deferreds) {
        reject(err);
      }
      deferreds.clear();
      record.settled = true;
    }
  );
  return record;
}
async function safeRace(contenders) {
  let deferred;
  const result = new Promise((resolve, reject) => {
    deferred = { reject, resolve };
    for (const contender of contenders) {
      if (!isObject(contender)) {
        Promise.resolve(contender).then(resolve, reject);
        continue;
      }
      let record = wm.get(contender);
      if (record === void 0) {
        record = addRaceContender(contender);
        record.deferreds.add(deferred);
        wm.set(contender, record);
      } else if (record.settled) {
        Promise.resolve(contender).then(resolve, reject);
      } else {
        record.deferreds.add(deferred);
      }
    }
  });
  return await result.finally(() => {
    for (const contender of contenders) {
      if (isObject(contender)) {
        const record = wm.get(contender);
        record.deferreds.delete(deferred);
      }
    }
  });
}
function getAbortablePromise(promise, abortSignal) {
  if (!abortSignal) {
    return promise;
  } else {
    return safeRace([
      // This promise only ever rejects if the signal is aborted. Otherwise it idles forever.
      // It's important that this come before the input promise; in the event of an abort, we
      // want to throw even if the input promise's result is ready
      new Promise((_, reject) => {
        if (abortSignal.aborted) {
          reject(abortSignal.reason);
        } else {
          abortSignal.addEventListener("abort", function() {
            reject(this.reason);
          });
        }
      }),
      promise
    ]);
  }
}
var wm;
var init_index_browser15 = __esm({
  "node_modules/@solana/promises/dist/index.browser.mjs"() {
    wm = /* @__PURE__ */ new WeakMap();
  }
});

// node_modules/@solana/keys/dist/index.browser.mjs
var ED25519_ALGORITHM_IDENTIFIER;
var init_index_browser16 = __esm({
  "node_modules/@solana/keys/dist/index.browser.mjs"() {
    ED25519_ALGORITHM_IDENTIFIER = // Resist the temptation to convert this to a simple string; As of version 133.0.3, Firefox
    // requires the object form of `AlgorithmIdentifier` and will throw a `DOMException` otherwise.
    Object.freeze({ name: "Ed25519" });
  }
});

// node_modules/@solana/transactions/dist/index.browser.mjs
function getSignaturesToEncode(signaturesMap) {
  const signatures = Object.values(signaturesMap);
  if (signatures.length === 0) {
    throw new SolanaError(SOLANA_ERROR__TRANSACTION__CANNOT_ENCODE_WITH_EMPTY_SIGNATURES);
  }
  return signatures.map((signature) => {
    if (!signature) {
      return new Uint8Array(64).fill(0);
    }
    return signature;
  });
}
function getSignaturesEncoderWithSizePrefix() {
  return transformEncoder(
    getArrayEncoder(fixEncoderSize(getBytesEncoder(), 64), { size: getShortU16Encoder() }),
    getSignaturesToEncode
  );
}
function getSignaturesEncoderWithLength(size) {
  return transformEncoder(
    getArrayEncoder(fixEncoderSize(getBytesEncoder(), 64), { description: "signatures", size }),
    getSignaturesToEncode
  );
}
function getEnvelopeShapeFromMessageBytes(messageBytes) {
  if (messageBytes.length === 0) {
    throw new SolanaError(SOLANA_ERROR__TRANSACTION__CANNOT_ENCODE_WITH_EMPTY_MESSAGE_BYTES);
  }
  const version = getTransactionVersionDecoder().decode(messageBytes);
  return version === 1 ? "messageFirst" : "signaturesFirst";
}
function getTransactionEncoder() {
  return getPredicateEncoder(
    (transaction) => getEnvelopeShapeFromMessageBytes(transaction.messageBytes) === "signaturesFirst",
    getTransactionEncoderWithSignaturesFirst(),
    getTransactionEncoderWithMessageFirst()
  );
}
function getTransactionEncoderWithSignaturesFirst() {
  return getStructEncoder([
    ["signatures", getSignaturesEncoderWithSizePrefix()],
    ["messageBytes", getBytesEncoder()]
  ]);
}
function getSignatureCountForVersionedOrThrow(messageBytes, offset) {
  if (messageBytes.length < offset + 2) {
    throw new SolanaError(SOLANA_ERROR__TRANSACTION__MALFORMED_MESSAGE_BYTES, {
      messageBytes
    });
  }
  return messageBytes[offset + 1];
}
function getTransactionEncoderWithMessageFirst() {
  const bytesEncoder = getBytesEncoder();
  return createEncoder({
    getSizeFromValue: (transaction) => {
      const signatureCount = getSignatureCountForVersionedOrThrow(transaction.messageBytes, 0);
      return transaction.messageBytes.length + signatureCount * 64;
    },
    write: (transaction, bytes, offset) => {
      offset = bytesEncoder.write(transaction.messageBytes, bytes, offset);
      const signatureCount = getSignatureCountForVersionedOrThrow(transaction.messageBytes, 0);
      const signaturesEncoder = getSignaturesEncoderWithLength(signatureCount);
      offset = signaturesEncoder.write(transaction.signatures, bytes, offset);
      return offset;
    }
  });
}
function compileTransaction(transactionMessage) {
  const compiledMessage = compileTransactionMessage4(transactionMessage);
  const messageBytes = getCompiledTransactionMessageEncoder().encode(compiledMessage);
  const transactionSigners = compiledMessage.staticAccounts.slice(0, compiledMessage.header.numSignerAccounts);
  const signatures = {};
  for (const signerAddress of transactionSigners) {
    signatures[signerAddress] = null;
  }
  let lifetimeConstraint;
  if (isTransactionMessageWithBlockhashLifetime(transactionMessage)) {
    lifetimeConstraint = {
      blockhash: transactionMessage.lifetimeConstraint.blockhash,
      lastValidBlockHeight: transactionMessage.lifetimeConstraint.lastValidBlockHeight
    };
  } else if (isTransactionMessageWithDurableNonceLifetime(transactionMessage)) {
    lifetimeConstraint = {
      nonce: transactionMessage.lifetimeConstraint.nonce,
      nonceAccountAddress: transactionMessage.instructions[0].accounts[0].address
    };
  }
  return Object.freeze({
    ...lifetimeConstraint ? { lifetimeConstraint } : void 0,
    messageBytes,
    signatures: Object.freeze(signatures)
  });
}
var init_index_browser17 = __esm({
  "node_modules/@solana/transactions/dist/index.browser.mjs"() {
    init_index_browser2();
    init_index_browser7();
    init_index_browser6();
    init_index_browser();
    init_index_browser14();
  }
});

// node_modules/@solana/instruction-plans/dist/index.browser.mjs
var init_index_browser18 = __esm({
  "node_modules/@solana/instruction-plans/dist/index.browser.mjs"() {
  }
});

// node_modules/@solana/offchain-messages/dist/index.browser.mjs
var OFFCHAIN_MESSAGE_SIGNING_DOMAIN_BYTES;
var init_index_browser19 = __esm({
  "node_modules/@solana/offchain-messages/dist/index.browser.mjs"() {
    OFFCHAIN_MESSAGE_SIGNING_DOMAIN_BYTES = new Uint8Array([
      255,
      115,
      111,
      108,
      97,
      110,
      97,
      32,
      111,
      102,
      102,
      99,
      104,
      97,
      105,
      110
    ]);
  }
});

// node_modules/@solana/plugin-core/dist/index.browser.mjs
var init_index_browser20 = __esm({
  "node_modules/@solana/plugin-core/dist/index.browser.mjs"() {
  }
});

// node_modules/@solana/programs/dist/index.browser.mjs
var init_index_browser21 = __esm({
  "node_modules/@solana/programs/dist/index.browser.mjs"() {
  }
});

// node_modules/@solana/rpc-spec-types/dist/index.browser.mjs
function getNonRpcPropertyValue(propertyName, receiver) {
  if (JAVASCRIPT_PROTOCOL_PROPERTY_NAMES.has(propertyName)) {
    return void 0;
  }
  return Reflect.get(Object.prototype, propertyName, receiver);
}
function isNonRpcPropertyName(propertyName) {
  return JAVASCRIPT_PROTOCOL_PROPERTY_NAMES.has(propertyName) || OBJECT_PROTOTYPE_PROPERTY_NAMES.has(propertyName);
}
function parseJsonWithBigInts(json) {
  return JSON.parse(wrapIntegersInBigIntValueObject(json), (_, value) => {
    return isBigIntValueObject(value) ? unwrapBigIntValueObject(value) : value;
  });
}
function wrapIntegersInBigIntValueObject(json) {
  const out = [];
  let inQuote = false;
  for (let ii = 0; ii < json.length; ii++) {
    let isEscaped = false;
    if (json[ii] === "\\") {
      out.push(json[ii++]);
      isEscaped = !isEscaped;
    }
    if (json[ii] === '"') {
      out.push(json[ii]);
      if (!isEscaped) {
        inQuote = !inQuote;
      }
      continue;
    }
    if (!inQuote) {
      const consumedNumber = consumeNumber(json, ii);
      if (consumedNumber?.length) {
        ii += consumedNumber.length - 1;
        if (consumedNumber.match(/\.|[eE]-/)) {
          out.push(consumedNumber);
        } else {
          out.push(wrapBigIntValueObject(consumedNumber));
        }
        continue;
      }
    }
    out.push(json[ii]);
  }
  return out.join("");
}
function consumeNumber(json, ii) {
  const JSON_NUMBER_REGEX = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/;
  if (!json[ii]?.match(/[-\d]/)) {
    return null;
  }
  const numberMatch = json.slice(ii).match(JSON_NUMBER_REGEX);
  return numberMatch ? numberMatch[0] : null;
}
function wrapBigIntValueObject(value) {
  return `{"$n":"${value}"}`;
}
function unwrapBigIntValueObject({ $n }) {
  const match = $n.match(BIGINT_VALUE_OBJECT_PATTERN);
  if (match) {
    const [, sign, mantissa, exponent] = match;
    const digitCount = mantissa.length + (exponent ? Number(exponent) : 0);
    if (digitCount <= MAX_BIGINT_DIGITS) {
      return exponent ? BigInt(`${sign}${mantissa}`) * 10n ** BigInt(exponent) : BigInt($n);
    }
  }
  throw new SolanaError(SOLANA_ERROR__MALFORMED_BIGINT_STRING, { value: $n });
}
function isBigIntValueObject(value) {
  return !!value && typeof value === "object" && "$n" in value && typeof value.$n === "string";
}
function getNextMessageId() {
  const id = _nextMessageId;
  _nextMessageId++;
  return id.toString();
}
function createRpcMessage(request) {
  return {
    id: getNextMessageId(),
    jsonrpc: "2.0",
    method: request.methodName,
    params: request.params
  };
}
function stringifyJsonWithBigInts(value, space) {
  return unwrapBigIntValueObject2(
    JSON.stringify(value, (_, v) => typeof v === "bigint" ? wrapBigIntValueObject2(v) : v, space)
  );
}
function wrapBigIntValueObject2(value) {
  return { $n: `${value}` };
}
function unwrapBigIntValueObject2(value) {
  return value.replace(/\{\s*"\$n"\s*:\s*"(-?\d+)"\s*\}/g, "$1");
}
var NODEJS_CUSTOM_INSPECT_SYMBOL, JAVASCRIPT_PROTOCOL_PROPERTY_NAMES, OBJECT_PROTOTYPE_PROPERTY_NAMES, BIGINT_VALUE_OBJECT_PATTERN, MAX_BIGINT_DIGITS, _nextMessageId;
var init_index_browser22 = __esm({
  "node_modules/@solana/rpc-spec-types/dist/index.browser.mjs"() {
    init_index_browser();
    NODEJS_CUSTOM_INSPECT_SYMBOL = /* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom");
    JAVASCRIPT_PROTOCOL_PROPERTY_NAMES = /* @__PURE__ */ new Set(
      [
        "then",
        "toJSON",
        NODEJS_CUSTOM_INSPECT_SYMBOL,
        Symbol.asyncIterator,
        Symbol.iterator,
        Symbol.toPrimitive,
        Symbol.toStringTag,
        Symbol.asyncDispose,
        Symbol.dispose
      ].filter((propertyName) => propertyName != null)
    );
    OBJECT_PROTOTYPE_PROPERTY_NAMES = /* @__PURE__ */ new Set([
      "__defineGetter__",
      "__defineSetter__",
      "__lookupGetter__",
      "__lookupSetter__",
      "__proto__",
      "constructor",
      "hasOwnProperty",
      "isPrototypeOf",
      "propertyIsEnumerable",
      "toLocaleString",
      "toString",
      "valueOf"
    ]);
    BIGINT_VALUE_OBJECT_PATTERN = /^(-?)(\d+)(?:[eE]\+?(\d+))?$/;
    MAX_BIGINT_DIGITS = 1e3;
    _nextMessageId = 0n;
  }
});

// node_modules/@solana/subscribable/dist/index.browser.mjs
function createReactiveActionStore(fn) {
  let state = IDLE_STATE;
  let currentController;
  const listeners2 = /* @__PURE__ */ new Set();
  function setState(next) {
    if (state.status === next.status && state.data === next.data && state.error === next.error) {
      return;
    }
    state = next;
    listeners2.forEach((listener) => listener());
  }
  const dispatchAsyncWithSignal = async (userSignal, ...args) => {
    currentController?.abort();
    if (userSignal?.aborted) {
      setState({ data: state.data, error: userSignal.reason, status: "error" });
      throw userSignal.reason;
    }
    const controller = new o2();
    currentController = controller;
    const signal = userSignal ? AbortSignal.any([controller.signal, userSignal]) : controller.signal;
    const previousData = state.data;
    const previousError = state.error;
    setState({ data: previousData, error: previousError, status: "running" });
    try {
      const result = await getAbortablePromise(fn(signal, ...args), signal);
      if (signal.aborted) {
        throw signal.reason;
      }
      setState({ data: result, error: void 0, status: "success" });
      return result;
    } catch (error) {
      if (controller.signal.aborted) {
        throw controller.signal.reason;
      }
      setState({ data: previousData, error, status: "error" });
      throw error;
    }
  };
  const dispatchAsync = (...args) => dispatchAsyncWithSignal(void 0, ...args);
  const dispatch = (...args) => {
    dispatchAsync(...args).catch(() => {
    });
  };
  return {
    dispatch,
    dispatchAsync,
    getState: () => state,
    reset: () => {
      currentController?.abort();
      currentController = void 0;
      setState(IDLE_STATE);
    },
    subscribe: (listener) => {
      listeners2.add(listener);
      return () => {
        listeners2.delete(listener);
      };
    },
    withSignal: (signal) => ({
      dispatch: (...args) => {
        dispatchAsyncWithSignal(signal, ...args).catch(() => {
        });
      },
      dispatchAsync: (...args) => dispatchAsyncWithSignal(signal, ...args)
    })
  };
}
var o2, t, IDLE_STATE, IDLE_STATE2;
var init_index_browser23 = __esm({
  "node_modules/@solana/subscribable/dist/index.browser.mjs"() {
    init_index_browser15();
    o2 = globalThis.AbortController;
    t = globalThis.EventTarget;
    IDLE_STATE = Object.freeze({
      data: void 0,
      error: void 0,
      status: "idle"
    });
    IDLE_STATE2 = Object.freeze({
      data: void 0,
      error: void 0,
      status: "idle"
    });
  }
});

// node_modules/@solana/rpc-spec/dist/index.browser.mjs
function createRpc(rpcConfig) {
  return makeProxy(rpcConfig);
}
function makeProxy(rpcConfig) {
  return new Proxy(rpcConfig.api, {
    defineProperty() {
      return false;
    },
    deleteProperty() {
      return false;
    },
    get(target, p, receiver) {
      if (isNonRpcPropertyName(p)) {
        return getNonRpcPropertyValue(p, receiver);
      }
      return function(...rawParams) {
        const methodName = p.toString();
        const getApiPlan = Reflect.get(target, methodName, receiver);
        if (!getApiPlan) {
          throw new SolanaError(SOLANA_ERROR__RPC__API_PLAN_MISSING_FOR_RPC_METHOD, {
            method: methodName,
            params: rawParams
          });
        }
        const apiPlan = getApiPlan(...rawParams);
        return createPendingRpcRequest(rpcConfig, apiPlan);
      };
    }
  });
}
function createPendingRpcRequest({ transport }, plan) {
  return {
    reactiveStore() {
      return createReactiveActionStore((signal) => plan.execute({ signal, transport }));
    },
    async send(options) {
      return await plan.execute({ signal: options?.abortSignal, transport });
    }
  };
}
function createJsonRpcApi(config) {
  return new Proxy({}, {
    defineProperty() {
      return false;
    },
    deleteProperty() {
      return false;
    },
    get(...args) {
      const [_, p] = args;
      if (isNonRpcPropertyName(p)) {
        return getNonRpcPropertyValue(p, args[2]);
      }
      const methodName = p.toString();
      return function(...rawParams) {
        const rawRequest = Object.freeze({ methodName, params: rawParams });
        const request = config?.requestTransformer ? config?.requestTransformer(rawRequest) : rawRequest;
        return Object.freeze({
          execute: async ({ signal, transport }) => {
            const payload = createRpcMessage(request);
            const response = await transport({ payload, signal });
            if (!config?.responseTransformer) {
              return response;
            }
            return config.responseTransformer(response, request);
          }
        });
      };
    }
  });
}
function isJsonRpcPayload(payload) {
  if (payload == null || typeof payload !== "object" || Array.isArray(payload)) {
    return false;
  }
  return "jsonrpc" in payload && payload.jsonrpc === "2.0" && "method" in payload && typeof payload.method === "string" && "params" in payload;
}
var init_index_browser24 = __esm({
  "node_modules/@solana/rpc-spec/dist/index.browser.mjs"() {
    init_index_browser();
    init_index_browser22();
    init_index_browser23();
  }
});

// node_modules/@solana/rpc-transformers/dist/index.browser.mjs
function applyDefaultCommitment({
  commitmentPropertyName,
  params,
  optionsObjectPositionInParams,
  overrideCommitment
}) {
  const paramInTargetPosition = params[optionsObjectPositionInParams];
  if (
    // There's no config.
    paramInTargetPosition === void 0 || // There is a config object.
    paramInTargetPosition && typeof paramInTargetPosition === "object" && !Array.isArray(paramInTargetPosition)
  ) {
    if (
      // The config object already has a commitment set.
      paramInTargetPosition && commitmentPropertyName in paramInTargetPosition
    ) {
      if (!paramInTargetPosition[commitmentPropertyName] || paramInTargetPosition[commitmentPropertyName] === "finalized") {
        const nextParams = [...params];
        const {
          [commitmentPropertyName]: _,
          // eslint-disable-line @typescript-eslint/no-unused-vars
          ...rest
        } = paramInTargetPosition;
        if (Object.keys(rest).length > 0) {
          nextParams[optionsObjectPositionInParams] = rest;
        } else {
          if (optionsObjectPositionInParams === nextParams.length - 1) {
            nextParams.length--;
          } else {
            nextParams[optionsObjectPositionInParams] = void 0;
          }
        }
        return nextParams;
      }
    } else if (overrideCommitment !== "finalized") {
      const nextParams = [...params];
      nextParams[optionsObjectPositionInParams] = {
        ...paramInTargetPosition,
        [commitmentPropertyName]: overrideCommitment
      };
      return nextParams;
    }
  }
  return params;
}
function getDefaultCommitmentRequestTransformer({
  defaultCommitment,
  optionsObjectPositionByMethod
}) {
  return (request) => {
    const { params, methodName } = request;
    if (!Array.isArray(params)) {
      return request;
    }
    const optionsObjectPositionInParams = optionsObjectPositionByMethod[methodName];
    if (optionsObjectPositionInParams == null) {
      return request;
    }
    return Object.freeze({
      methodName,
      params: applyDefaultCommitment({
        commitmentPropertyName: methodName === "sendTransaction" ? "preflightCommitment" : "commitment",
        optionsObjectPositionInParams,
        overrideCommitment: defaultCommitment,
        params
      })
    });
  };
}
function getIntegerOverflowNodeVisitor(onIntegerOverflow) {
  return (value, { keyPath }) => {
    if (typeof value === "bigint") {
      if (onIntegerOverflow && (value > Number.MAX_SAFE_INTEGER || value < -Number.MAX_SAFE_INTEGER)) {
        onIntegerOverflow(keyPath, value);
      }
    }
    return value;
  };
}
function getTreeWalker(visitors) {
  return function traverse(node, state) {
    if (Array.isArray(node)) {
      return node.map((element, ii) => {
        const nextState = {
          ...state,
          keyPath: [...state.keyPath, ii]
        };
        return traverse(element, nextState);
      });
    } else if (typeof node === "object" && node !== null) {
      const out = {};
      for (const propName in node) {
        if (!Object.prototype.hasOwnProperty.call(node, propName)) {
          continue;
        }
        const nextState = {
          ...state,
          keyPath: [...state.keyPath, propName]
        };
        out[propName] = traverse(node[propName], nextState);
      }
      return out;
    } else {
      return visitors.reduce((acc, visitNode) => visitNode(acc, state), node);
    }
  };
}
function getTreeWalkerRequestTransformer(visitors, initialState) {
  return (request) => {
    const traverse = getTreeWalker(visitors);
    return Object.freeze({
      ...request,
      params: traverse(request.params, initialState)
    });
  };
}
function getTreeWalkerResponseTransformer(visitors, initialState) {
  return (json) => getTreeWalker(visitors)(json, initialState);
}
function getIntegerOverflowRequestTransformer(onIntegerOverflow) {
  return (request) => {
    const transformer = getTreeWalkerRequestTransformer(
      [getIntegerOverflowNodeVisitor((...args) => onIntegerOverflow(request, ...args))],
      { keyPath: [] }
    );
    return transformer(request);
  };
}
function getDefaultRequestTransformerForSolanaRpc(config) {
  const handleIntegerOverflow = config?.onIntegerOverflow;
  return (request) => {
    return pipe(
      request,
      handleIntegerOverflow ? getIntegerOverflowRequestTransformer(handleIntegerOverflow) : (r) => r,
      getDefaultCommitmentRequestTransformer({
        defaultCommitment: config?.defaultCommitment,
        optionsObjectPositionByMethod: OPTIONS_OBJECT_POSITION_BY_METHOD
      })
    );
  };
}
function getBigIntUpcastVisitor(allowedNumericKeyPaths) {
  return function upcastNodeToBigIntIfNumber(value, { keyPath }) {
    const isInteger = typeof value === "number" && Number.isInteger(value) || typeof value === "bigint";
    if (!isInteger) return value;
    if (keyPathIsAllowedToBeNumeric(keyPath, allowedNumericKeyPaths)) {
      return Number(value);
    } else {
      return BigInt(value);
    }
  };
}
function keyPathIsAllowedToBeNumeric(keyPath, allowedNumericKeyPaths) {
  return allowedNumericKeyPaths.some((prohibitedKeyPath) => {
    if (prohibitedKeyPath.length !== keyPath.length) {
      return false;
    }
    for (let ii = keyPath.length - 1; ii >= 0; ii--) {
      const keyPathPart = keyPath[ii];
      const prohibitedKeyPathPart = prohibitedKeyPath[ii];
      if (prohibitedKeyPathPart !== keyPathPart && (prohibitedKeyPathPart !== KEYPATH_WILDCARD || typeof keyPathPart !== "number")) {
        return false;
      }
    }
    return true;
  });
}
function getBigIntUpcastResponseTransformer(allowedNumericKeyPaths) {
  return getTreeWalkerResponseTransformer([getBigIntUpcastVisitor(allowedNumericKeyPaths)], { keyPath: [] });
}
function getResultResponseTransformer() {
  return (json) => json.result;
}
function getSimulateTransactionAllowedNumericKeypaths() {
  return [
    ["loadedAccountsDataSize"],
    ...jsonParsedAccountsConfigs.map((c) => ["accounts", KEYPATH_WILDCARD, ...c]),
    ...innerInstructionsConfigs.map((c) => ["innerInstructions", KEYPATH_WILDCARD, ...c])
  ];
}
function getThrowSolanaErrorResponseTransformer() {
  return (json, request) => {
    const jsonRpcResponse = json;
    if ("error" in jsonRpcResponse) {
      const { error } = jsonRpcResponse;
      const isSendTransactionPreflightFailure = error && typeof error === "object" && "code" in error && (error.code === -32002 || error.code === -32002n);
      if (isSendTransactionPreflightFailure && "data" in error && error.data) {
        const treeWalker = getTreeWalkerResponseTransformer(
          [getBigIntUpcastVisitor(getSimulateTransactionAllowedNumericKeypaths())],
          { keyPath: [] }
        );
        const transformedData = treeWalker(error.data, request);
        const transformedError = { ...error, data: transformedData };
        throw getSolanaErrorFromJsonRpcError(transformedError);
      }
      throw getSolanaErrorFromJsonRpcError(jsonRpcResponse.error);
    }
    return jsonRpcResponse;
  };
}
function getDefaultResponseTransformerForSolanaRpc(config) {
  return (response, request) => {
    const methodName = request.methodName;
    const keyPaths = config?.allowedNumericKeyPaths && methodName ? config.allowedNumericKeyPaths[methodName] : void 0;
    return pipe(
      response,
      (r) => getThrowSolanaErrorResponseTransformer()(r, request),
      (r) => getResultResponseTransformer()(r, request),
      (r) => getBigIntUpcastResponseTransformer(keyPaths ?? [])(r, request)
    );
  };
}
var KEYPATH_WILDCARD, OPTIONS_OBJECT_POSITION_BY_METHOD, jsonParsedTokenAccountsConfigs, jsonParsedAccountsConfigs, innerInstructionsConfigs, tokenBalancesConfigs, messageConfig;
var init_index_browser25 = __esm({
  "node_modules/@solana/rpc-transformers/dist/index.browser.mjs"() {
    init_index_browser11();
    init_index_browser();
    KEYPATH_WILDCARD = {};
    OPTIONS_OBJECT_POSITION_BY_METHOD = {
      accountNotifications: 1,
      blockNotifications: 1,
      getAccountInfo: 1,
      getBalance: 1,
      getBlock: 1,
      getBlockHeight: 0,
      getBlockProduction: 0,
      getBlocks: 2,
      getBlocksWithLimit: 2,
      getEpochInfo: 0,
      getFeeForMessage: 1,
      getInflationGovernor: 0,
      getInflationReward: 1,
      getLargestAccounts: 0,
      getLatestBlockhash: 0,
      getLeaderSchedule: 1,
      getMinimumBalanceForRentExemption: 1,
      getMultipleAccounts: 1,
      getProgramAccounts: 1,
      getSignaturesForAddress: 1,
      getSlot: 0,
      getSlotLeader: 0,
      getStakeMinimumDelegation: 0,
      getSupply: 0,
      getTokenAccountBalance: 1,
      getTokenAccountsByDelegate: 2,
      getTokenAccountsByOwner: 2,
      getTokenLargestAccounts: 1,
      getTokenSupply: 1,
      getTransaction: 1,
      getTransactionCount: 0,
      getVoteAccounts: 0,
      isBlockhashValid: 1,
      logsNotifications: 1,
      programNotifications: 1,
      requestAirdrop: 2,
      sendTransaction: 1,
      signatureNotifications: 1,
      simulateTransaction: 1
    };
    jsonParsedTokenAccountsConfigs = [
      // parsed Token/Token22 token account
      ["data", "parsed", "info", "tokenAmount", "decimals"],
      ["data", "parsed", "info", "tokenAmount", "uiAmount"],
      ["data", "parsed", "info", "rentExemptReserve", "decimals"],
      ["data", "parsed", "info", "rentExemptReserve", "uiAmount"],
      ["data", "parsed", "info", "delegatedAmount", "decimals"],
      ["data", "parsed", "info", "delegatedAmount", "uiAmount"],
      ["data", "parsed", "info", "extensions", KEYPATH_WILDCARD, "state", "olderTransferFee", "transferFeeBasisPoints"],
      ["data", "parsed", "info", "extensions", KEYPATH_WILDCARD, "state", "newerTransferFee", "transferFeeBasisPoints"],
      ["data", "parsed", "info", "extensions", KEYPATH_WILDCARD, "state", "preUpdateAverageRate"],
      ["data", "parsed", "info", "extensions", KEYPATH_WILDCARD, "state", "currentRate"]
    ];
    jsonParsedAccountsConfigs = [
      ...jsonParsedTokenAccountsConfigs,
      // parsed AddressTableLookup account
      ["data", "parsed", "info", "lastExtendedSlotStartIndex"],
      // parsed Config account
      ["data", "parsed", "info", "slashPenalty"],
      ["data", "parsed", "info", "warmupCooldownRate"],
      // parsed Token/Token22 mint account
      ["data", "parsed", "info", "decimals"],
      // parsed Token/Token22 multisig account
      ["data", "parsed", "info", "numRequiredSigners"],
      ["data", "parsed", "info", "numValidSigners"],
      // parsed Stake account
      ["data", "parsed", "info", "stake", "delegation", "warmupCooldownRate"],
      // parsed Sysvar rent account
      ["data", "parsed", "info", "exemptionThreshold"],
      ["data", "parsed", "info", "burnPercent"],
      // parsed Vote account
      ["data", "parsed", "info", "blockRevenueCommissionBps"],
      ["data", "parsed", "info", "commission"],
      ["data", "parsed", "info", "inflationRewardsCommissionBps"],
      ["data", "parsed", "info", "votes", KEYPATH_WILDCARD, "confirmationCount"],
      ["data", "parsed", "info", "votes", KEYPATH_WILDCARD, "latency"]
    ];
    innerInstructionsConfigs = [
      ["index"],
      ["instructions", KEYPATH_WILDCARD, "accounts", KEYPATH_WILDCARD],
      ["instructions", KEYPATH_WILDCARD, "programIdIndex"],
      ["instructions", KEYPATH_WILDCARD, "stackHeight"]
    ];
    tokenBalancesConfigs = [
      ["accountIndex"],
      ["uiTokenAmount", "decimals"],
      ["uiTokenAmount", "uiAmount"]
    ];
    messageConfig = [
      ["addressTableLookups", KEYPATH_WILDCARD, "writableIndexes", KEYPATH_WILDCARD],
      ["addressTableLookups", KEYPATH_WILDCARD, "readonlyIndexes", KEYPATH_WILDCARD],
      ["header", "numReadonlySignedAccounts"],
      ["header", "numReadonlyUnsignedAccounts"],
      ["header", "numRequiredSignatures"],
      ["instructions", KEYPATH_WILDCARD, "accounts", KEYPATH_WILDCARD],
      ["instructions", KEYPATH_WILDCARD, "programIdIndex"],
      ["instructions", KEYPATH_WILDCARD, "stackHeight"],
      ["transactionConfig", "computeUnitLimit"],
      ["transactionConfig", "heapSize"],
      ["transactionConfig", "loadedAccountsDataSizeLimit"]
    ];
  }
});

// node_modules/@solana/rpc-api/dist/index.browser.mjs
function createSolanaRpcApi(config) {
  return createJsonRpcApi({
    requestTransformer: getDefaultRequestTransformerForSolanaRpc(config),
    responseTransformer: getDefaultResponseTransformerForSolanaRpc({
      allowedNumericKeyPaths: getAllowedNumericKeypaths()
    })
  });
}
function getAllowedNumericKeypaths() {
  if (!memoizedKeypaths) {
    memoizedKeypaths = {
      getAccountInfo: jsonParsedAccountsConfigs.map((c) => ["value", ...c]),
      getBlock: [
        ...tokenBalancesConfigs.flatMap((c) => [
          ["transactions", KEYPATH_WILDCARD, "meta", "preTokenBalances", KEYPATH_WILDCARD, ...c],
          ["transactions", KEYPATH_WILDCARD, "meta", "postTokenBalances", KEYPATH_WILDCARD, ...c]
        ]),
        ["transactions", KEYPATH_WILDCARD, "meta", "rewards", KEYPATH_WILDCARD, "commission"],
        ...innerInstructionsConfigs.map((c) => [
          "transactions",
          KEYPATH_WILDCARD,
          "meta",
          "innerInstructions",
          KEYPATH_WILDCARD,
          ...c
        ]),
        ...messageConfig.map((c) => ["transactions", KEYPATH_WILDCARD, "transaction", "message", ...c]),
        ["transactions", KEYPATH_WILDCARD, "version"],
        ["rewards", KEYPATH_WILDCARD, "commission"]
      ],
      getClusterNodes: [
        [KEYPATH_WILDCARD, "featureSet"],
        [KEYPATH_WILDCARD, "shredVersion"]
      ],
      getInflationGovernor: [["initial"], ["foundation"], ["foundationTerm"], ["taper"], ["terminal"]],
      getInflationRate: [["foundation"], ["total"], ["validator"]],
      getInflationReward: [[KEYPATH_WILDCARD, "commission"]],
      getMultipleAccounts: jsonParsedAccountsConfigs.map((c) => ["value", KEYPATH_WILDCARD, ...c]),
      getProgramAccounts: jsonParsedAccountsConfigs.flatMap((c) => [
        ["value", KEYPATH_WILDCARD, "account", ...c],
        [KEYPATH_WILDCARD, "account", ...c]
      ]),
      getRecentPerformanceSamples: [[KEYPATH_WILDCARD, "samplePeriodSecs"]],
      getSignaturesForAddress: [[KEYPATH_WILDCARD, "transactionIndex"]],
      getTokenAccountBalance: [
        ["value", "decimals"],
        ["value", "uiAmount"]
      ],
      getTokenAccountsByDelegate: jsonParsedTokenAccountsConfigs.map((c) => [
        "value",
        KEYPATH_WILDCARD,
        "account",
        ...c
      ]),
      getTokenAccountsByOwner: jsonParsedTokenAccountsConfigs.map((c) => [
        "value",
        KEYPATH_WILDCARD,
        "account",
        ...c
      ]),
      getTokenLargestAccounts: [
        ["value", KEYPATH_WILDCARD, "decimals"],
        ["value", KEYPATH_WILDCARD, "uiAmount"]
      ],
      getTokenSupply: [
        ["value", "decimals"],
        ["value", "uiAmount"]
      ],
      getTransaction: [
        ...tokenBalancesConfigs.flatMap((c) => [
          ["meta", "preTokenBalances", KEYPATH_WILDCARD, ...c],
          ["meta", "postTokenBalances", KEYPATH_WILDCARD, ...c]
        ]),
        ["meta", "rewards", KEYPATH_WILDCARD, "commission"],
        ...innerInstructionsConfigs.map((c) => ["meta", "innerInstructions", KEYPATH_WILDCARD, ...c]),
        ...messageConfig.map((c) => ["transaction", "message", ...c]),
        ["version"]
      ],
      getTransactionsForAddress: [
        ["data", KEYPATH_WILDCARD, "transactionIndex"],
        ...tokenBalancesConfigs.flatMap((c) => [
          ["data", KEYPATH_WILDCARD, "meta", "preTokenBalances", KEYPATH_WILDCARD, ...c],
          ["data", KEYPATH_WILDCARD, "meta", "postTokenBalances", KEYPATH_WILDCARD, ...c]
        ]),
        ["data", KEYPATH_WILDCARD, "meta", "rewards", KEYPATH_WILDCARD, "commission"],
        ...innerInstructionsConfigs.map((c) => [
          "data",
          KEYPATH_WILDCARD,
          "meta",
          "innerInstructions",
          KEYPATH_WILDCARD,
          ...c
        ]),
        ...messageConfig.map((c) => ["data", KEYPATH_WILDCARD, "transaction", "message", ...c]),
        ["data", KEYPATH_WILDCARD, "version"]
      ],
      getVersion: [["feature-set"]],
      getVoteAccounts: [
        ["current", KEYPATH_WILDCARD, "commission"],
        ["current", KEYPATH_WILDCARD, "inflationRewardsCommissionBps"],
        ["delinquent", KEYPATH_WILDCARD, "commission"],
        ["delinquent", KEYPATH_WILDCARD, "inflationRewardsCommissionBps"]
      ],
      simulateTransaction: [
        ["value", "loadedAccountsDataSize"],
        ...jsonParsedAccountsConfigs.map((c) => ["value", "accounts", KEYPATH_WILDCARD, ...c]),
        ...innerInstructionsConfigs.map((c) => ["value", "innerInstructions", KEYPATH_WILDCARD, ...c]),
        ...tokenBalancesConfigs.flatMap((c) => [
          ["value", "preTokenBalances", KEYPATH_WILDCARD, ...c],
          ["value", "postTokenBalances", KEYPATH_WILDCARD, ...c]
        ])
      ]
    };
  }
  return memoizedKeypaths;
}
var memoizedKeypaths;
var init_index_browser26 = __esm({
  "node_modules/@solana/rpc-api/dist/index.browser.mjs"() {
    init_index_browser24();
    init_index_browser25();
  }
});

// node_modules/@solana/rpc-transport-http/dist/index.browser.mjs
function assertIsAllowedHttpRequestHeaders(headers) {
  const badHeaders = Object.keys(headers).filter((headerName) => {
    const lowercaseHeaderName = headerName.toLowerCase();
    return DISALLOWED_HEADERS[headerName.toLowerCase()] === true || FORBIDDEN_HEADERS[headerName.toLowerCase()] === true || lowercaseHeaderName.startsWith("proxy-") || lowercaseHeaderName.startsWith("sec-");
  });
  if (badHeaders.length > 0) {
    throw new SolanaError(SOLANA_ERROR__RPC__TRANSPORT_HTTP_HEADER_FORBIDDEN, {
      headers: badHeaders
    });
  }
}
function normalizeHeaders(headers) {
  const out = {};
  for (const headerName in headers) {
    out[headerName.toLowerCase()] = headers[headerName];
  }
  return out;
}
function warnDispatcherWasSuppliedInNonNodeEnvironment() {
  if (didWarnDispatcherWasSuppliedInNonNodeEnvironment) {
    return;
  }
  didWarnDispatcherWasSuppliedInNonNodeEnvironment = true;
  console.warn(
    "You have supplied a `Dispatcher` to `createHttpTransport()`. It has been ignored because Undici dispatchers only work in Node environments. To eliminate this warning, omit the `dispatcher_NODE_ONLY` property from your config when running in a non-Node environment."
  );
}
function createHttpTransport(config) {
  if ("dispatcher_NODE_ONLY" in config) {
    warnDispatcherWasSuppliedInNonNodeEnvironment();
  }
  const { fromJson, headers, toJson, url } = config;
  if (headers) {
    assertIsAllowedHttpRequestHeaders(headers);
  }
  let dispatcherConfig;
  const customHeaders = headers && normalizeHeaders(headers);
  return async function makeHttpRequest({
    payload,
    signal
  }) {
    const body = toJson ? toJson(payload) : JSON.stringify(payload);
    const requestInfo = {
      ...dispatcherConfig,
      body,
      headers: {
        ...customHeaders,
        // Keep these headers lowercase so they will override any user-supplied headers above.
        accept: "application/json",
        "content-type": "application/json; charset=utf-8"
      },
      method: "POST",
      signal
    };
    const response = await fetch(url, requestInfo);
    if (!response.ok) {
      throw new SolanaError(SOLANA_ERROR__RPC__TRANSPORT_HTTP_ERROR, {
        headers: response.headers,
        message: response.statusText,
        statusCode: response.status
      });
    }
    if (fromJson) {
      return fromJson(await response.text(), payload);
    }
    return await response.json();
  };
}
function isSolanaRequest(payload) {
  return isJsonRpcPayload(payload) && SOLANA_RPC_METHODS.includes(payload.method);
}
function createHttpTransportForSolanaRpc(config) {
  return createHttpTransport({
    ...config,
    fromJson: (rawResponse, payload) => isSolanaRequest(payload) ? parseJsonWithBigInts(rawResponse) : JSON.parse(rawResponse),
    toJson: (payload) => isSolanaRequest(payload) ? stringifyJsonWithBigInts(payload) : JSON.stringify(payload)
  });
}
var DISALLOWED_HEADERS, FORBIDDEN_HEADERS, didWarnDispatcherWasSuppliedInNonNodeEnvironment, SOLANA_RPC_METHODS;
var init_index_browser27 = __esm({
  "node_modules/@solana/rpc-transport-http/dist/index.browser.mjs"() {
    init_index_browser();
    init_index_browser22();
    init_index_browser24();
    DISALLOWED_HEADERS = {
      accept: true,
      "content-length": true,
      "content-type": true
    };
    FORBIDDEN_HEADERS = /* @__PURE__ */ Object.assign(
      {
        "accept-charset": true,
        "access-control-request-headers": true,
        "access-control-request-method": true,
        connection: true,
        "content-length": true,
        cookie: true,
        date: true,
        dnt: true,
        expect: true,
        host: true,
        "keep-alive": true,
        "permissions-policy": true,
        // Prefix matching is implemented in code, below.
        // 'proxy-': true,
        // 'sec-': true,
        referer: true,
        te: true,
        trailer: true,
        "transfer-encoding": true,
        upgrade: true,
        via: true
      },
      { "accept-encoding": true },
      { origin: true }
    );
    didWarnDispatcherWasSuppliedInNonNodeEnvironment = false;
    SOLANA_RPC_METHODS = [
      "getAccountInfo",
      "getBalance",
      "getBlock",
      "getBlockCommitment",
      "getBlockHeight",
      "getBlockProduction",
      "getBlocks",
      "getBlocksWithLimit",
      "getBlockTime",
      "getClusterNodes",
      "getEpochInfo",
      "getEpochSchedule",
      "getFeeForMessage",
      "getFirstAvailableBlock",
      "getGenesisHash",
      "getHealth",
      "getHighestSnapshotSlot",
      "getIdentity",
      "getInflationGovernor",
      "getInflationRate",
      "getInflationReward",
      "getLargestAccounts",
      "getLatestBlockhash",
      "getLeaderSchedule",
      "getMaxRetransmitSlot",
      "getMaxShredInsertSlot",
      "getMinimumBalanceForRentExemption",
      "getMultipleAccounts",
      "getProgramAccounts",
      "getRecentPerformanceSamples",
      "getRecentPrioritizationFees",
      "getSignaturesForAddress",
      "getSignatureStatuses",
      "getSlot",
      "getSlotLeader",
      "getSlotLeaders",
      "getStakeMinimumDelegation",
      "getSupply",
      "getTokenAccountBalance",
      "getTokenAccountsByDelegate",
      "getTokenAccountsByOwner",
      "getTokenLargestAccounts",
      "getTokenSupply",
      "getTransaction",
      "getTransactionCount",
      "getVersion",
      "getVoteAccounts",
      "index",
      "isBlockhashValid",
      "minimumLedgerSlot",
      "requestAirdrop",
      "sendTransaction",
      "simulateTransaction"
    ];
  }
});

// node_modules/@solana/fast-stable-stringify/dist/index.browser.mjs
function stringify(val, isArrayProp) {
  let i, max, str, keys, key, propVal, toStr;
  if (val === true) {
    return "true";
  }
  if (val === false) {
    return "false";
  }
  switch (typeof val) {
    case "object":
      if (val === null) {
        return null;
      } else if ("toJSON" in val && typeof val.toJSON === "function") {
        return stringify(val.toJSON(), isArrayProp);
      } else {
        toStr = objToString.call(val);
        if (toStr === "[object Array]") {
          str = "[";
          max = val.length - 1;
          for (i = 0; i < max; i++) {
            str += stringify(val[i], true) + ",";
          }
          if (max > -1) {
            str += stringify(val[i], true);
          }
          return str + "]";
        } else if (toStr === "[object Object]") {
          keys = objKeys(val).sort();
          max = keys.length;
          str = "";
          i = 0;
          while (i < max) {
            key = keys[i];
            propVal = stringify(val[key], false);
            if (propVal !== void 0) {
              if (str) {
                str += ",";
              }
              str += JSON.stringify(key) + ":" + propVal;
            }
            i++;
          }
          return "{" + str + "}";
        } else {
          return JSON.stringify(val);
        }
      }
    case "function":
    case "undefined":
      return isArrayProp ? null : void 0;
    case "bigint":
      return `${val.toString()}n`;
    case "string":
      return JSON.stringify(val);
    default:
      return isFinite(val) ? val : null;
  }
}
function index_default(val) {
  const returnVal = stringify(val, false);
  if (returnVal !== void 0) {
    return "" + returnVal;
  }
}
var objToString, objKeys;
var init_index_browser28 = __esm({
  "node_modules/@solana/fast-stable-stringify/dist/index.browser.mjs"() {
    objToString = Object.prototype.toString;
    objKeys = Object.keys || function(obj) {
      const keys = [];
      for (const name in obj) {
        keys.push(name);
      }
      return keys;
    };
  }
});

// node_modules/@solana/rpc/dist/index.browser.mjs
function createSolanaJsonRpcIntegerOverflowError(methodName, keyPath, value) {
  let argumentLabel = "";
  if (typeof keyPath[0] === "number") {
    const argPosition = keyPath[0] + 1;
    const lastDigit = argPosition % 10;
    const lastTwoDigits = argPosition % 100;
    if (lastDigit == 1 && lastTwoDigits != 11) {
      argumentLabel = argPosition + "st";
    } else if (lastDigit == 2 && lastTwoDigits != 12) {
      argumentLabel = argPosition + "nd";
    } else if (lastDigit == 3 && lastTwoDigits != 13) {
      argumentLabel = argPosition + "rd";
    } else {
      argumentLabel = argPosition + "th";
    }
  } else {
    argumentLabel = `\`${keyPath[0].toString()}\``;
  }
  const path = keyPath.length > 1 ? keyPath.slice(1).map((pathPart) => typeof pathPart === "number" ? `[${pathPart}]` : pathPart).join(".") : void 0;
  const error = new SolanaError(SOLANA_ERROR__RPC__INTEGER_OVERFLOW, {
    argumentLabel,
    keyPath,
    methodName,
    optionalPathLabel: path ? ` at path \`${path}\`` : "",
    value,
    ...path !== void 0 ? { path } : void 0
  });
  safeCaptureStackTrace(error, createSolanaJsonRpcIntegerOverflowError);
  return error;
}
function createExplicitAbortToken() {
  return true ? {
    EXPLICIT_ABORT_TOKEN: "This object is thrown from the request that underlies a series of coalesced requests when the last request in that series aborts"
  } : {};
}
function getRpcTransportWithRequestCoalescing(transport, getDeduplicationKey) {
  let coalescedRequestsByDeduplicationKey;
  return async function makeCoalescedHttpRequest(request) {
    const { payload, signal } = request;
    const deduplicationKey = getDeduplicationKey(payload);
    if (deduplicationKey === void 0) {
      return await transport(request);
    }
    if (!coalescedRequestsByDeduplicationKey) {
      queueMicrotask(() => {
        coalescedRequestsByDeduplicationKey = void 0;
      });
      coalescedRequestsByDeduplicationKey = {};
    }
    if (coalescedRequestsByDeduplicationKey[deduplicationKey] == null) {
      const abortController = new o3();
      const responsePromise = (async () => {
        try {
          return await transport({
            ...request,
            signal: abortController.signal
          });
        } catch (e2) {
          if (e2 === (EXPLICIT_ABORT_TOKEN ||= createExplicitAbortToken())) {
            return;
          }
          throw e2;
        }
      })();
      coalescedRequestsByDeduplicationKey[deduplicationKey] = {
        abortController,
        numConsumers: 0,
        responsePromise
      };
    }
    const coalescedRequest = coalescedRequestsByDeduplicationKey[deduplicationKey];
    coalescedRequest.numConsumers++;
    if (signal) {
      const responsePromise = coalescedRequest.responsePromise;
      return await new Promise((resolve, reject) => {
        const handleAbort = () => {
          signal.removeEventListener("abort", handleAbort);
          coalescedRequest.numConsumers -= 1;
          queueMicrotask(() => {
            if (coalescedRequest.numConsumers === 0) {
              const abortController = coalescedRequest.abortController;
              abortController.abort(EXPLICIT_ABORT_TOKEN ||= createExplicitAbortToken());
            }
          });
          reject(signal.reason);
        };
        signal.addEventListener("abort", handleAbort);
        responsePromise.then(resolve).catch(reject).finally(() => {
          signal.removeEventListener("abort", handleAbort);
        });
      });
    } else {
      return await coalescedRequest.responsePromise;
    }
  };
}
function getSolanaRpcPayloadDeduplicationKey(payload) {
  return isJsonRpcPayload(payload) ? index_default([payload.method, payload.params]) : void 0;
}
function normalizeHeaders2(headers) {
  const out = {};
  for (const headerName in headers) {
    out[headerName.toLowerCase()] = headers[headerName];
  }
  return out;
}
function createDefaultRpcTransport(config) {
  return pipe(
    createHttpTransportForSolanaRpc({
      ...config,
      headers: {
        ...false,
        ...config.headers ? normalizeHeaders2(config.headers) : void 0,
        ...{
          // Keep these headers lowercase so they will override any user-supplied headers above.
          "solana-client": `js/${"8.2.0"}`
        }
      }
    }),
    (transport) => getRpcTransportWithRequestCoalescing(transport, getSolanaRpcPayloadDeduplicationKey)
  );
}
function createSolanaRpc(clusterUrl, config) {
  return createSolanaRpcFromTransport(createDefaultRpcTransport({ url: clusterUrl, ...config }));
}
function createSolanaRpcFromTransport(transport) {
  return createRpc({
    api: createSolanaRpcApi(DEFAULT_RPC_CONFIG),
    transport
  });
}
var DEFAULT_RPC_CONFIG, o3, EXPLICIT_ABORT_TOKEN;
var init_index_browser29 = __esm({
  "node_modules/@solana/rpc/dist/index.browser.mjs"() {
    init_index_browser26();
    init_index_browser26();
    init_index_browser24();
    init_index_browser24();
    init_index_browser();
    init_index_browser11();
    init_index_browser27();
    init_index_browser28();
    DEFAULT_RPC_CONFIG = {
      defaultCommitment: "confirmed",
      onIntegerOverflow(request, keyPath, value) {
        throw createSolanaJsonRpcIntegerOverflowError(request.methodName, keyPath, value);
      }
    };
    o3 = globalThis.AbortController;
  }
});

// node_modules/@solana/rpc-parsed-types/dist/index.browser.mjs
var init_index_browser30 = __esm({
  "node_modules/@solana/rpc-parsed-types/dist/index.browser.mjs"() {
  }
});

// node_modules/@solana/rpc-subscriptions-spec/dist/index.browser.mjs
var o4;
var init_index_browser31 = __esm({
  "node_modules/@solana/rpc-subscriptions-spec/dist/index.browser.mjs"() {
    o4 = globalThis.AbortController;
  }
});

// node_modules/@solana/rpc-subscriptions-api/dist/index.browser.mjs
var init_index_browser32 = __esm({
  "node_modules/@solana/rpc-subscriptions-api/dist/index.browser.mjs"() {
  }
});

// node_modules/@solana/rpc-subscriptions/dist/index.browser.mjs
var o5;
var init_index_browser33 = __esm({
  "node_modules/@solana/rpc-subscriptions/dist/index.browser.mjs"() {
    init_index_browser32();
    init_index_browser31();
    o5 = globalThis.AbortController;
  }
});

// node_modules/@solana/signers/dist/index.browser.mjs
var o6;
var init_index_browser34 = __esm({
  "node_modules/@solana/signers/dist/index.browser.mjs"() {
    o6 = globalThis.TextEncoder;
  }
});

// node_modules/@solana/transaction-introspection/dist/index.browser.mjs
var init_index_browser35 = __esm({
  "node_modules/@solana/transaction-introspection/dist/index.browser.mjs"() {
  }
});

// node_modules/@solana/kit/dist/index.browser.mjs
var IDLE_STATE3, MAX_LOADED_ACCOUNTS_DATA_SIZE_LIMIT;
var init_index_browser36 = __esm({
  "node_modules/@solana/kit/dist/index.browser.mjs"() {
    init_index_browser4();
    init_index_browser5();
    init_index_browser10();
    init_index_browser();
    init_index_browser11();
    init_index_browser12();
    init_index_browser18();
    init_index_browser16();
    init_index_browser19();
    init_index_browser20();
    init_index_browser21();
    init_index_browser15();
    init_index_browser29();
    init_index_browser30();
    init_index_browser33();
    init_index_browser13();
    init_index_browser34();
    init_index_browser23();
    init_index_browser35();
    init_index_browser14();
    init_index_browser17();
    IDLE_STATE3 = Object.freeze({
      data: void 0,
      error: void 0,
      status: "idle"
    });
    MAX_LOADED_ACCOUNTS_DATA_SIZE_LIMIT = 64 * 1024 * 1024;
  }
});

// node_modules/@solana-program/memo/dist/src/index.mjs
function getAddMemoInstructionDataEncoder() {
  return getStructEncoder([["memo", getUtf8Encoder()]]);
}
function getAddMemoInstruction(input, config) {
  const programAddress = config?.programAddress ?? MEMO_PROGRAM_ADDRESS;
  const args = { ...input };
  const remainingAccounts = (args.signers ?? []).map((signer) => ({
    address: signer.address,
    role: AccountRole.READONLY_SIGNER,
    signer
  }));
  return Object.freeze({
    accounts: remainingAccounts,
    data: getAddMemoInstructionDataEncoder().encode(args),
    programAddress
  });
}
var MEMO_PROGRAM_ADDRESS;
var init_src = __esm({
  "node_modules/@solana-program/memo/dist/src/index.mjs"() {
    init_index_browser36();
    MEMO_PROGRAM_ADDRESS = "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr";
  }
});

// node_modules/base-x/src/esm/index.js
function base(ALPHABET2) {
  if (ALPHABET2.length >= 255) {
    throw new TypeError("Alphabet too long");
  }
  const BASE_MAP = new Uint8Array(256);
  for (let j = 0; j < BASE_MAP.length; j++) {
    BASE_MAP[j] = 255;
  }
  for (let i = 0; i < ALPHABET2.length; i++) {
    const x = ALPHABET2.charAt(i);
    const xc = x.charCodeAt(0);
    if (BASE_MAP[xc] !== 255) {
      throw new TypeError(x + " is ambiguous");
    }
    BASE_MAP[xc] = i;
  }
  const BASE = ALPHABET2.length;
  const LEADER = ALPHABET2.charAt(0);
  const FACTOR = Math.log(BASE) / Math.log(256);
  const iFACTOR = Math.log(256) / Math.log(BASE);
  function encode(source) {
    if (source instanceof Uint8Array) {
    } else if (ArrayBuffer.isView(source)) {
      source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
    } else if (Array.isArray(source)) {
      source = Uint8Array.from(source);
    }
    if (!(source instanceof Uint8Array)) {
      throw new TypeError("Expected Uint8Array");
    }
    if (source.length === 0) {
      return "";
    }
    let zeroes = 0;
    let length = 0;
    let pbegin = 0;
    const pend = source.length;
    while (pbegin !== pend && source[pbegin] === 0) {
      pbegin++;
      zeroes++;
    }
    const size = (pend - pbegin) * iFACTOR + 1 >>> 0;
    const b58 = new Uint8Array(size);
    while (pbegin !== pend) {
      let carry = source[pbegin];
      let i = 0;
      for (let it1 = size - 1; (carry !== 0 || i < length) && it1 !== -1; it1--, i++) {
        carry += 256 * b58[it1] >>> 0;
        b58[it1] = carry % BASE >>> 0;
        carry = carry / BASE >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length = i;
      pbegin++;
    }
    let it2 = size - length;
    while (it2 !== size && b58[it2] === 0) {
      it2++;
    }
    let str = LEADER.repeat(zeroes);
    for (; it2 < size; ++it2) {
      str += ALPHABET2.charAt(b58[it2]);
    }
    return str;
  }
  function decodeUnsafe(source) {
    if (typeof source !== "string") {
      throw new TypeError("Expected String");
    }
    if (source.length === 0) {
      return new Uint8Array();
    }
    let psz = 0;
    let zeroes = 0;
    let length = 0;
    while (source[psz] === LEADER) {
      zeroes++;
      psz++;
    }
    const size = (source.length - psz) * FACTOR + 1 >>> 0;
    const b256 = new Uint8Array(size);
    while (psz < source.length) {
      const charCode = source.charCodeAt(psz);
      if (charCode > 255) {
        return;
      }
      let carry = BASE_MAP[charCode];
      if (carry === 255) {
        return;
      }
      let i = 0;
      for (let it3 = size - 1; (carry !== 0 || i < length) && it3 !== -1; it3--, i++) {
        carry += BASE * b256[it3] >>> 0;
        b256[it3] = carry % 256 >>> 0;
        carry = carry / 256 >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length = i;
      psz++;
    }
    let it4 = size - length;
    while (it4 !== size && b256[it4] === 0) {
      it4++;
    }
    const vch = new Uint8Array(zeroes + (size - it4));
    let j = zeroes;
    while (it4 !== size) {
      vch[j++] = b256[it4++];
    }
    return vch;
  }
  function decode(string) {
    const buffer = decodeUnsafe(string);
    if (buffer) {
      return buffer;
    }
    throw new Error("Non-base" + BASE + " character");
  }
  return {
    encode,
    decodeUnsafe,
    decode
  };
}
var esm_default;
var init_esm2 = __esm({
  "node_modules/base-x/src/esm/index.js"() {
    esm_default = base;
  }
});

// node_modules/bs58/src/esm/index.js
var ALPHABET, esm_default2;
var init_esm3 = __esm({
  "node_modules/bs58/src/esm/index.js"() {
    init_esm2();
    ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
    esm_default2 = esm_default(ALPHABET);
  }
});

// static/js/certificado_solana.js
var require_certificado_solana = __commonJS({
  "static/js/certificado_solana.js"() {
    init_dist();
    init_index_browser36();
    init_src();
    init_esm3();
    var SOLANA_RPC = "https://api.devnet.solana.com";
    var connector = new ConnectorClient({
      autoConnect: true,
      debug: true
    });
    function getCookie(name) {
      const cookies = document.cookie.split(";");
      for (const cookie of cookies) {
        const [key, ...value] = cookie.trim().split("=");
        if (key === name) {
          return decodeURIComponent(
            value.join("=")
          );
        }
      }
      return null;
    }
    async function getJson(url) {
      const resposta = await fetch(
        url,
        {
          method: "GET",
          headers: {
            "Accept": "application/json"
          }
        }
      );
      const dados = await resposta.json();
      if (!resposta.ok) {
        throw new Error(
          dados.erro || "N\xE3o foi poss\xEDvel obter os dados do certificado."
        );
      }
      return dados;
    }
    async function postJson(url, dados) {
      const resposta = await fetch(
        url,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie(
              "csrftoken"
            )
          },
          body: JSON.stringify(
            dados
          )
        }
      );
      const resultado = await resposta.json();
      if (!resposta.ok) {
        throw new Error(
          resultado.erro || "N\xE3o foi poss\xEDvel concluir a opera\xE7\xE3o."
        );
      }
      return resultado;
    }
    async function registrarNaSolana(botao) {
      const dados = await getJson(
        botao.dataset.solanaUrl
      );
      const state = connector.getConnectorState();
      if (!state.connected || !state.selectedWallet || !state.selectedAccount) {
        throw new Error(
          "Sua carteira Solana n\xE3o est\xE1 conectada neste navegador."
        );
      }
      if (state.selectedAccount !== dados.carteira) {
        throw new Error(
          "A carteira conectada \xE9 diferente da carteira vinculada ao AcadEvents."
        );
      }
      const accountInfo = state.accounts.find(
        (conta) => conta.address === state.selectedAccount
      );
      if (!accountInfo) {
        throw new Error(
          "N\xE3o foi poss\xEDvel localizar a conta Solana."
        );
      }
      const rpc = createSolanaRpc(
        SOLANA_RPC
      );
      const {
        value: latestBlockhash
      } = await rpc.getLatestBlockhash().send();
      const memoInstruction = getAddMemoInstruction({
        memo: dados.memo
      });
      const transactionMessage = pipe(
        createTransactionMessage({
          version: "legacy"
        }),
        (tx) => setTransactionMessageFeePayer(
          address(
            state.selectedAccount
          ),
          tx
        ),
        (tx) => setTransactionMessageLifetimeUsingBlockhash(
          latestBlockhash,
          tx
        ),
        (tx) => appendTransactionMessageInstruction(
          memoInstruction,
          tx
        )
      );
      const transaction = compileTransaction(
        transactionMessage
      );
      const transactionBytes = new Uint8Array(
        getTransactionEncoder().encode(
          transaction
        )
      );
      const wallet = state.selectedWallet;
      const recurso = wallet.features["solana:signAndSendTransaction"];
      if (!recurso) {
        throw new Error(
          "Esta carteira n\xE3o suporta envio de transa\xE7\xF5es Solana."
        );
      }
      const resultados = await recurso.signAndSendTransaction(
        {
          transaction: transactionBytes,
          account: accountInfo.raw,
          chain: "solana:devnet",
          options: {
            preflightCommitment: "confirmed"
          }
        }
      );
      const resultado = resultados[0];
      if (!resultado || !resultado.signature) {
        throw new Error(
          "A Solana n\xE3o retornou a assinatura da transa\xE7\xE3o."
        );
      }
      const assinatura = esm_default2.encode(
        resultado.signature
      );
      console.log(
        "Transa\xE7\xE3o Solana:",
        assinatura
      );
      let ultimaFalha = null;
      for (let tentativa = 1; tentativa <= 6; tentativa++) {
        try {
          const confirmacao = await postJson(
            botao.dataset.confirmUrl,
            {
              assinatura
            }
          );
          return confirmacao;
        } catch (erro) {
          ultimaFalha = erro;
          if (tentativa < 6) {
            await new Promise(
              (resolve) => setTimeout(
                resolve,
                1500
              )
            );
          }
        }
      }
      throw ultimaFalha || new Error(
        "N\xE3o foi poss\xEDvel confirmar a transa\xE7\xE3o."
      );
    }
    document.addEventListener(
      "DOMContentLoaded",
      () => {
        const botoes = document.querySelectorAll(
          ".register-solana-button"
        );
        botoes.forEach(
          (botao) => {
            botao.addEventListener(
              "click",
              async () => {
                const textoOriginal = botao.textContent;
                botao.disabled = true;
                botao.textContent = "Preparando transa\xE7\xE3o...";
                try {
                  const resultado = await registrarNaSolana(
                    botao
                  );
                  console.log(
                    resultado
                  );
                  alert(
                    "Certificado registrado na Solana com sucesso!"
                  );
                  window.location.reload();
                } catch (erro) {
                  console.error(
                    erro
                  );
                  alert(
                    erro.message
                  );
                  botao.disabled = false;
                  botao.textContent = textoOriginal;
                }
              }
            );
          }
        );
      }
    );
  }
});
export default require_certificado_solana();
/*! Bundled license information:

react/cjs/react.development.js:
  (**
   * @license React
   * react.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.development.js:
  (**
   * @license React
   * react-jsx-runtime.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
