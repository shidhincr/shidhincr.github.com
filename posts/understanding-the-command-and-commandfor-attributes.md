---
layout: post
title: "Understanding the Command and CommandFor Attributes"
date: 2025-07-03
author: Shidhin C R
published: true
comments: true
categories:
- CommandFor
- Command
- Chrome
---

Chrome 135, released on April 1st, 2025, introduces an important addition to HTML buttons with the new command and commandfor attributes. These attributes allow developers to assign behavior to buttons in a more accessible and declarative way. In this blog post, we'll explore how these attributes work, their benefits, and provide examples of implementation.

<!-- more -->

## What are the Command and CommandFor Attributes?

The command and commandfor attributes represent a significant improvement in how we handle button interactions. These new attributes enhance and replace the previous popovertargetaction and popovertarget attributes, enabling developers to create declarative relationships between buttons and the elements they control.

The commandfor attribute is used to specify the ID of the popover, dialog, or other element to be controlled, while the command attribute specifies the action to be performed when the button is pressed.

## Built-in Commands
The command attribute supports several built-in values for common interactions:

### For dialogs:

`show-modal`: Opens a dialog as modal
`close`: Closes a dialog
`request-close`: Requests to close a dialog


### For popovers:

`show-popover`: Shows a hidden popover
`hide-popover`: Hides a shown popover
`toggle-popover`: Toggles a popover between shown and hidden states



## Benefits of the Command and CommandFor Attributes
Using these attributes offers several advantages:

- No JavaScript required: Buttons become interactive without waiting for JavaScript to download and execute.
- Improved accessibility: The browser automatically handles ARIA states and relationships.
- Declarative approach: Eliminates the need for event listeners and DOM traversal code.
- Simplified code: Reduces boilerplate and makes intentions clearer.

### The CommandEvent
When a button with command and commandfor attributes is activated, a CommandEvent is dispatched on the target element. The CommandEvent interface represents an event notifying the user when a button element with valid commandForElement and command attributes is about to invoke an interactive element.

It's important to note that command events fire on the element being invoked, not on the button itself. If the button's click event is canceled, the command event will not fire, and the default behavior will not run.

### Custom Commands
Beyond the built-in commands, you can also create custom commands by using identifiers that start with two dashes (--). This approach allows you to build your own component APIs directly in HTML.

Custom commands let you provide an API within HTML for your components, giving you flexibility for building components that can react to buttons in various ways.

### Browser Support

As of Chrome 135's release on April 1st, 2025, these attributes are officially supported in Chrome. For browsers that don't yet support these attributes, you can implement fallback mechanisms using JavaScript.

### Additional Resources

- [HTML Specification](https://html.spec.whatwg.org/multipage/semantics.html#the-command-and-commandfor-attributes)
- [Chrome Status](https://www.chromestatus.com/feature/5694542152657664)
- [MDN Web Docs: Invoker Commands API](https://developer.mozilla.org/en-US/docs/Web/API/Invoker_Commands_API)
- [MDN Web Docs: CommandEvent](https://developer.mozilla.org/en-US/docs/Web/API/CommandEvent)

Now, let's create some code examples to demonstrate how to use these new attributes effectively.

#### Example 1: Dialogs
```html
<!-- Dialog Example -->
<button command="show-modal" commandfor="example-dialog">Open Dialog</button>

<dialog id="example-dialog">
  <h2>Dialog Title</h2>
  <p>This is a modal dialog example using the command attributes.</p>
  <button command="close" commandfor="example-dialog">Close</button>
</dialog>
```

#### Example 2: Popovers
```html
<!-- Popover Example -->
<button command="toggle-popover" commandfor="example-popover">Toggle Popover</button>

<div id="example-popover" popover>
  <h3>Popover Content</h3>
  <p>This popover is controlled by command attributes.</p>
  <button command="hide-popover" commandfor="example-popover">Close</button>
</div>
```

#### Example 3: Custom Commands
```html
<!-- Custom Command Example -->
<div id="theme-controller">
  <button commandfor="theme-controller" command="--set-theme" value="light">Light Theme</button>
  <button commandfor="theme-controller" command="--set-theme" value="dark">Dark Theme</button>
  <button commandfor="theme-controller" command="--set-theme" value="system">System Theme</button>
</div>

<script>
  const themeController = document.getElementById('theme-controller');

  themeController.addEventListener('command', (event) => {
    if (event.command === '--set-theme') {
      const theme = event.source.value;
      document.documentElement.setAttribute('data-theme', theme);
      console.log(`Theme changed to: ${theme}`);
    }
  });
</script>
```

#### Example 4: JavaScript API
```javascript
// Getting and setting command properties via JavaScript
const button = document.getElementById('myButton');
const target = document.getElementById('myTarget');

// Set the target element
button.commandForElement = target;

// Set the command to perform
button.command = 'toggle-popover';

// Add a command event listener to the target
target.addEventListener('command', (event) => {
  console.log(`Command "${event.command}" triggered by:`, event.source);
});
```

## Demo Page

You can find a demo page [here](/command-for-demo/index.html).

## Summary

The command and commandfor attributes are a new way to handle button interactions in HTML. They provide a declarative approach to creating interactive elements and improve accessibility by automatically handling ARIA states and relationships.
