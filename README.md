# Frida Helper

> 🔥 The Simplest & Most Beginner-Friendly Frida Utility Framework for Android

---

## 🚀 Description

**FridaHelper** is a lightweight JavaScript utility library built for Frida to simplify dynamic instrumentation on Android applications. It abstracts away the complexity of Frida’s native API and gives you a modern, minimal, and highly productive interface to hook, monitor, and manipulate Android apps — even if you're a complete beginner to Frida or JavaScript.

---

## ⚙️ Features

- 🔎 **Class Search** — Find loaded classes by keyword
- 🔧 **Auto Method Hooking** — Hook all overloads automatically
- 🔨 **Return Value Replacement** — Change method return values easily
- 🧵 **Stack Trace Printing** — Dump full Java stack traces
- 📦 **Object Dumping** — Print fields of any Java object
- 📜 **Method Listing** — List all declared methods of any class
- 🧙‍♂️ **Zero Frida Knowledge Required**

---

## 📦 Installation

1️⃣ Clone the repository:

```bash
git clone https://github.com/vishal2376-dr/frida-helper.git
```

## 🔧 Script Usage
Step 1 : Write Custom hook function and save as `demo.js`
  ```javascript
  // demo.js
  Java.perform(function() {

    // Search for classes containing a keyword
    FridaHelper.searchClasses("Activity");

    // Print all methods of a class
    FridaHelper.showMethods("com.example.app.MainActivity");

    // Hook all overloads of a method
    FridaHelper.hookMethod("com.example.app.MainActivity", "isUserLoggedIn", function(args, overload, that) {
        FridaHelper.log("isUserLoggedIn() called");
        FridaHelper.printStackTrace();
    });

    // Replace return value of a method
    FridaHelper.replaceReturnValue("com.example.app.MainActivity", "isUserLoggedIn", true);
  });
  ```

Step 2 : Run script with your target app (in this case target app is `com.example.app`)
```
frida -U -f com.example.app -l FridaHelper.js -l demo.js
```

## 🎯 Use Case Examples

| Task                     | One-Liner Call                                                               |
| ------------------------ | ---------------------------------------------------------------------------- |
| Search classes           | `FridaHelper.searchClasses("Activity")`                                      |
| Show class methods       | `FridaHelper.showMethods("com.example.MyClass")`                             |
| Hook any method          | `FridaHelper.hookMethod("com.example.MyClass", "methodName", callback)`      |
| Replace method return    | `FridaHelper.replaceReturnValue("com.example.MyClass", "methodName", value)` |
| Print stacktrace anytime | `FridaHelper.printStackTrace()`                                              |
| Dump object fields       | `FridaHelper.dumpObject(objectInstance)`                                     |

</br>
<hr>

<p align = "center">Made with ❤️ by <a href = "https://github.com/vishal2376-dr">@vishal2376-dr</a></p>
