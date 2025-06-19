/*
 * File: FridaHelper.js
 * Author: Vishal Singh
 * Created: 2025-06-19
 */

var FridaHelper = (function () {
  const DEFAULT_TIMEOUT_MS = 500;

  function log(msg) {
    console.log("[*] " + msg);
  }

  function error(msg) {
    console.log("[!] " + msg);
  }

  function waitForJava(callback, timeoutMs = DEFAULT_TIMEOUT_MS) {
    var waited = 0;
    var interval = 100;
    var timer = setInterval(function () {
      if (Java.available) {
        clearInterval(timer);
        Java.perform(callback);
      } else {
        waited += interval;
        if (waited >= timeoutMs) {
          clearInterval(timer);
          error("Java runtime not available after timeout.");
        }
      }
    }, interval);
  }

  /**
   * ================================
   * REPL Utility Helpers
   * ================================
   */

  function listClasses(keyword) {
    waitForJava(function () {
      Java.enumerateLoadedClasses({
        onMatch: function (className) {
          if (!keyword || className.indexOf(keyword) !== -1) {
            log(className);
          }
        },
        onComplete: function () {
          log("Class listing complete.");
        },
      });
    });
  }

  function listMethods(className) {
    waitForJava(function () {
      try {
        var clazz = Java.use(className);
        clazz.class.getDeclaredMethods().forEach(function (method) {
          log(method.toString());
        });
      } catch (err) {
        error("Class not found: " + className);
      }
    });
  }

  /**
   * ================================
   * Hooking Helpers
   * ================================
   */

  function hookMethod(className, methodName, callback) {
    waitForJava(function () {
      try {
        var clazz = Java.use(className);
        clazz[methodName].overloads.forEach(function (overload) {
          overload.implementation = function () {
            log(`${methodName} called`);
            if (callback) {
              callback(arguments, overload, this);
            }
            return overload.call(this, ...arguments);
          };
        });
        log(`Hooked all overloads of ${className}.${methodName}`);
      } catch (err) {
        error("Error hooking method: " + err);
      }
    });
  }

  function hookReturnValue(className, methodName, newReturnValue) {
    waitForJava(function () {
      try {
        var clazz = Java.use(className);
        clazz[methodName].overloads.forEach(function (overload) {
          overload.implementation = function () {
            log(`Returning custom value for ${methodName}`);
            return newReturnValue;
          };
        });
        log(`Hooked return value for ${className}.${methodName}`);
      } catch (err) {
        error(err);
      }
    });
  }

  function printStackTrace() {
    waitForJava(function () {
      var ex = Java.use("java.lang.Exception").$new();
      log(ex.getStackTrace().toString());
    });
  }

  return {
    log: log,
    listClasses: listClasses,
    listMethods: listMethods,
    hookMethod: hookMethod,
    hookReturnValue: hookReturnValue,
    printStackTrace: printStackTrace,
  };
})();
