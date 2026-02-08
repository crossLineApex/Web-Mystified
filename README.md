# Task List Project - Level 1

This is a server-rendered static HTML + client scripting project.

## Why Not Client-Side Rendering (CSR)?

Initial HTML rendering does not depend on JavaScript execution. JS is augmenting, not rendering. There is no initial blank page here.

## What is "Server" Here?

Your OS file system acts as a server, following a resource request model. You can confirm this by checking network calls.

## Script Placement and Loading Strategies

### Script Placement

Script placement is important. It is always recommended to add scripts just before the body tag ends, as they are render-blocking scripts. This is especially dangerous since we are dealing with a single thread.

### Defer Attribute

Instead of inline blocking scripts, `defer` is used.

**What defer does:**

- Ensures that HTML is parsed first
- Preserves execution order
- Downloads scripts in parallel to HTML rendering

**Important:** Deferred scripts execute after DOM construction but before `DOMContentLoaded`, because `DOMContentLoaded` signals that both DOM and application scripts are ready.

### Async Attribute

**Characteristics:**

- No guaranteed order
- Executes immediately when ready
- May interrupt parsing
- Used for analytics
- Order is nondeterministic

### Important Notes

**Remember:** Inline scripts IGNORE defer.

Also, `type="module"` seen in modern code means that defer behavior is used by default.

## Why Was This Not Enough? Why Did We Need Frameworks and Libraries?

### 1. State ↔ UI Synchronization Hell (Core Problem)

UI logic scattered everywhere. Bugs grow quadratically. This is also called **implicit state coupling**.

**Framework Solution:**

UI should be a function of state, not manual syncing.

### 2. DOM Mutation Complexity Explodes

You become a human garbage collector.

**Framework Solution:**

- Recompute UI from state
- You don't delete nodes
- Framework does

### 3. Layout Thrashing

**Problem:**
```javascript
el.style.height = "200px";
console.log(el.offsetHeight);
el.style.width = "300px";
```

This causes: reflow → paint → reflow → paint (repeated), leading to CPU spikes and scroll jank.

**Framework Solution:**

Frameworks batch updates:

1. Collect changes
2. Apply together

React Fiber literally exists for this purpose.

### 4. DOM Recreation vs DOM Diffing

**Problem:**

Every time we do:
```javascript
taskList.innerHTML = '';
```

This destroys:

- Nodes
- Listeners (easy to miss destroying listeners properly)
- Scroll position
- Focus state

**Framework Solution:**

Frameworks introduced Virtual DOM and diffing algorithms to compute minimal changes instead of recreating everything.

### 5. Mental Model Collapse

**Biggest Issue:**

You lose the global picture. Logic is scattered across:

- Click handlers
- Timeouts
- AJAX callbacks

This makes it impossible to reason about the application.

**Framework Solution:**

Frameworks enforce structure and predictable patterns.