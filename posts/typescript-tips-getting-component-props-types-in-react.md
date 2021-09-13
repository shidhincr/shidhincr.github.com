---
layout: post
title: "TypeScript Tips: Getting Component Props Types in React"
date: 2021-09-10
author: Shidhin C R
published: true
comments: true
categories:
  - React
  - TypeScript
---

These days, React and Typescript are the perfect combo for building front-end applications. If you're from the front-end world, you may already know that. This post is about a Typescript tip that will be useful in React applications.

If you use React, you would've already created a higher order component (HoC). Sometimes, you need to create an HoC that returns another UI component, with some of the props pre-populated. Example, an IconButton component that returns a UI Button with an Icon.

<!-- more -->

Let's talk about the props types. When you define your HoC component, its props should have the exact **type** of the returning component. Otherwise, Typescript cannot do its intellisense magic on it.

Now, to fix this, one could export the UI component props types and use it from the HoC component. And, that works well -- except, if you deal with a 3rd party UI component which doesn't export its props types.

Well .. That's exactly we are going to solve today. Let's start with some example codes:

## UI Button Component

Mostly every project contains one UI Button component. Usually, we build it from scratch or get from any 3rd party libraries. Here, for the sake of this example, let's build one:

```tsx
import cx from "classnames";
import styles from "./buttonStyles.module.css";

type ButtonProps = {
  title: string;
  cta?: boolean;
  onClick: () => void;
};

export const Button = (props: ButtonProps) => {
  return (
    <div
      className={cx(styles.button, {
        [styles.cta]: props.cta,
      })}
      onClick={props.onClick}
    >
      {props.title}
    </div>
  );
};
```

Button styles

```css
.button {
  display: inline-flex;
  padding: 10px;
  border: 1px solid #333;
  border-radius: 5px;
  background-color: #ccc;
  cursor: pointer;
}

.cta {
  background-color: indigo;
  color: #fff;
  text-transform: uppercase;
}
```

In a nutshell, our Button component accepts 3 props: `title` and `onClick` are required and `cta` is optional. The button style changes based on the `cta` prop.

## An Icon Button Component

At some point, your project requires a new Component. Let's say, a Button component with an Icon -- we can call it as an IconButton component. An IconButton component is same as the Button, yet it can accept one more extra prop called `icon`. Based on this `icon`, an appropriate icon will be displayed next to the Button.

```tsx
<IconButton
  icon="arrow-down"
  title="click me"
  onClick={() => {
    console.log("clicked");
  }}
/>
```

Let's see how the implementation looks like:

```tsx
import { Button } from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type IconButtonProps = {
  icon: string;
};

export const IconButton = (props: IconButtonProps) => {
  const { icon, ...buttonProps } = props;
  return (
    <div>
      <Button {...buttonProps} />
      <FontAwesomeIcon icon={icon} />
    </div>
  );
};
```

Our IconButton looks good now. However, the TypeScript compiler started complaining. Because, we only defined the `icon` props in the `IconButtonProps` type.

![Typescript Button Error](/img/blog-images/typescript-error0.png)
![Typescript Button Error](/img/blog-images/typescript-error1.png)

## Solution

I think you all familiar with the DRY (Don't Repeat Yourself) principle. Keeping that in mind, we can re-use the `ButtonProps` from the UI button. To do that, first we need to export the ButtonProps type from the UI Button.

```tsx
export type ButtonProps = {
  title: string;
  cta?: boolean;
  onClick: () => void;
};
```

and in the IconButton.tsx:

```tsx
import { Button, ButtonProps } from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type IconButtonProps = {
  icon: string;
} & ButtonProps;

export const IconButton = (props: IconButtonProps) => {
  const { icon, ...buttonProps } = props;
  return (
    <div>
      <Button {...buttonProps} />
      <FontAwesomeIcon icon={icon} />
    </div>
  );
};
```

That should fix the Typescript error.

## Problem 2: Button component from 3rd party library

The previous solution works for us because we have the full control of the UI Button component. It's our codebase, so we can export the Props types from the Button component. However, what if you are using a 3rd party UI library and its Button component doesn't export the Button Props?

Example:

```tsx
import { Button, ButtonProps } from "some-ui-library";
// error ButtonProps doesn't exist
```

## Solution

Luckily, React comes with some utility types for these situations. The generic type `ComponentProps` can be used for accessing any React component's props (works for both function component and class component).

```tsx
const extractedPropsTypes = ComponentProps<typeof Component>
```

Let's see how to use it solve the issue. We can re-write the **IconButton** like this:

```tsx
import { ComponentProps } from "react";
import { Button } from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type IconButtonProps = {
  icon: string;
} & ComponentProps<typeof Button>;

export const IconButton = (props: IconButtonProps) => {
  const { icon, ...buttonProps } = props;
  return (
    <div>
      <Button {...buttonProps} />
      <FontAwesomeIcon icon={icon} />
    </div>
  );
};
```

Voila! No more TS errors :)

## A real world example

I had an issue like this when working with the `react-select` library. React select is an amazing library and comes with lot of customizations. In my project, I wanted to create a custom Select component with pre-defined styles (matching with our project theme). So, I created something like this:

```tsx
import BaseSelect from "react-select";
const customStyles = {
  // custom styles for the BaseSelect component
};
type SelectProps = any; // ??

const Select = (props: SelectProps) => {
  return <BaseSelect {...props} styles={customStyles} />;
};

export default Select;
```

Since `react-select` was not exporting the props types for the BaseSelect, I wanted to access it from the BaseSelect component itself.

```tsx
import { ComponentProps } from "react";
import BaseSelect from "react-select";
const customStyles = {
  // custom styles for the BaseSelect component
};
type SelectProps = ComponentProps<typeof BaseSelect>;

const Select = (props: SelectProps) => {
  return <BaseSelect {...props} styles={customStyles} />;
};

export default Select;
```

## Summary

As I told in the beginning of this article, React and Typescript are a popular choice for modern front-end applications. I guess this small Typescript tip would be helpful to you when working on a React Typescript project -- especially, dealing with component props. If you are curious, there are more utility types like this you can read here:

- https://www.typescriptlang.org/docs/handbook/react.html
- https://react-typescript-cheatsheet.netlify.app/

Thanks for reading! Comments and feedbacks are welcome.
