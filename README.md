# Frida Helper

> 🔥 The Simplest & Most Beginner-Friendly Frida Utility Framework for Android

---

## 🚀 Description

**FridaHelper** is a lightweight JavaScript utility library built for Frida to simplify dynamic instrumentation on Android applications. It abstracts away the complexity of Frida’s native API and gives you a modern, minimal, and highly productive interface to hook, monitor, and manipulate Android apps — even if you're a complete beginner to Frida or JavaScript.

---

## ⚙️ Features

- 🔎 **Class Search** — Search loaded classes by keyword (`listClasses()`)
- 📜 **Method Listing** — List all declared methods (`listMethods()`)
- 🎯 **Auto Method Hooking** — Hook all overloads automatically (`hookMethod()`)
- 🔨 **Return Value Hooking** — Override any method return (`hookReturnValue()`)
- 🧵 **Stack Trace Printing** — Dump full Java stack trace (`printStackTrace()`)
- 🧙‍♂️ **Zero Frida Knowledge Required** — Full abstraction

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

// Search loaded classes containing keyword
FridaHelper.listClasses("Activity");

// Show all methods of a class
FridaHelper.listMethods("com.example.app.MainActivity");

// Hook a method (automatically hooks all overloads)
FridaHelper.hookMethod("com.example.app.MainActivity", "isUserLoggedIn", function(args, overload, that) {
    FridaHelper.log("isUserLoggedIn() called");
    FridaHelper.printStackTrace();
});

// Replace return value of a method
FridaHelper.hookReturnValue("com.example.app.MainActivity", "isUserLoggedIn", true);

  ```

Step 2 : Run script with your target app (in this case target app is `com.example.app`)
```
frida -U -f com.example.app -l FridaHelper.js -l demo.js
```

## 🎯 Use Case Examples

| Task                     | Call Example                                                              |
| ------------------------ | ------------------------------------------------------------------------- |
| Search classes           | `FridaHelper.listClasses("Activity")`                                     |
| Show class methods       | `FridaHelper.listMethods("com.example.MyClass")`                          |
| Hook any method          | `FridaHelper.hookMethod("com.example.MyClass", "methodName", callback)`   |
| Replace method return    | `FridaHelper.hookReturnValue("com.example.MyClass", "methodName", value)` |
| Print stacktrace anytime | `FridaHelper.printStackTrace()`                                           |

</br>
<hr>

<p align = "center">Made with ❤️ by <a href = "https://github.com/vishal2376-dr">@vishal2376-dr</a></p>
