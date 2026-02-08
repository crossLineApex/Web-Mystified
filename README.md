# Task List Project - Level 1.1

This is a server-rendered static HTML + client scripting project with MPA (Multi Page Application)

## Why Not Client-Side Rendering (CSR)?

Initial HTML rendering does not depend on JavaScript execution. JS is augmenting, not rendering. There is no initial blank page here.

# Multi-Page Application (MPA) Architecture

## Overview

This document explains how traditional Multi-Page Applications work, where each route triggers a full page reload and document lifecycle.

## How MPA Navigation Works

### 1. Every Route = Full Document Lifecycle

When you click:
```html
<a href="./about/about.html">
```

The browser executes the following sequence:
```
destroy current DOM
destroy JS context
destroy memory
request new HTML
parse HTML
download CSS
download JS
execute JS
build DOM
paint
```

**Key Point:** Each navigation is a cold start.

### 2. Every Route Reloads HTML + CSS + JS

There is NO reuse by default.

Each page has:

- Its own HTML
- Its own styles
- Its own scripts

The browser treats each page as a completely new application.

### 3. No JS State Survives Navigation

This is critical to understand.

**Example:**

If you had:
```javascript
let count = 5;
```

On the Home page, then navigate to About, then navigate back - `count` is gone.

**Why?**

The JS runtime is destroyed on navigation.

**State Persistence Options:**

Unless you persist manually using:

- localStorage
- Cookies
- Server-side storage

State is ephemeral and does not survive navigation.

### 4. Routing is Handled by Browser + Filesystem/Server

Routing is NOT handled by JavaScript.

**How it works:**

Browser asks:
```
give me /about.html
```

Server (or filesystem) responds with the file.

That's routing in an MPA.

## Mental Model

**Clean MPA Architecture:**

Each route is a new document, new DOM, new JS context, and new memory allocation.


This is just a very crude way to explain MPA to get some better understanding on how critical path is performed by browser and the steps