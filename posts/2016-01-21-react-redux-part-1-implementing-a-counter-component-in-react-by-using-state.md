---
layout: post
title: "React Redux Part 1 : Implementing a counter component in react by using state"
date: 2016-01-21 
comments: true
author: Shidhin
permalink: 2016/01/21/react-redux-part-1-implementing-a-counter-component-in-react-by-using-state/
published: true
categories:
- ReactJS
- Redux
- Flux
---

The frontend world is moving so fast these days. The hottest trend is React along with the Flux pattern. Flux is a architectural pattern introduced by Facebook to solve some of the problems in large data centric applications. Facebook introduced flux as a concept, but there're number of flux libraries born from then. Today we're gonna talk about the most popular library in that category named [Redux](http://redux.js.org/).

<!-- more -->

Redux is not exactly an flux library. As per the redux tagline, it is known as a "predictable state container for Javascript apps". I don't want to state Redux as a flux framework as Redux is deviated from some of the flux principles; And, those are clearly explained in its documentation. This blog post is not about how redux works, but rather demonstrating how redux is used in a typical React application. The tutorial also divided into multiple blog posts, so that you can skip to the interested ones.

**Why this post:**

If you follow the [egghead.io videos](https://egghead.io/series/getting-started-with-redux) from [@dan_abramov](https://twitter.com/dan_abramov), you might feel that Redux is super simple. But then if you try to follow the examples from different sources, you might be overwhelmed by the terms like `connect`, `bindActionCreators` ..etc. I was trying to learn them step by step and understand what each of these try to solve. These blog posts are the outcome of my learnings and these are for absolute beginners. So, if you think you're an advanced guy, just share it to your beginner friends.

Here we'll see how to implement a Counter component with:

1. Section 1 : React with state ( not using Redux )
2. Section 2: Try to integrate Redux and using store
3. Section 3: Using React-redux library to connect between React and Redux
4. Section 4: Removing boilerplate code with redux helper methods.
5. Section 5: Async code handling with Redux

## Building a simple counter in React ( with data saved in state )

In our first section, we're going to build a simple `Counter` component with React. This section is just for the beginners and if you know how this works, feel free to skip to the next section.

Let's build the react Counter component and add a state to save the `number`. The code is given below:

``` jsx
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
let {Component} = React;

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      number: this.props.number || 0
    }
    this._increment = this._increment.bind(this);
    this._decrement = this._decrement.bind(this);
  }

  render(){
    let {number} = this.state;
    return(
      <div>
        <h2>The number is = {number} </h2>
        <div>
            <button onClick={this._increment}>Increment</button>
            <button onClick={this._decrement}>Decrement</button>
        </div>
      </div>
    );
  }

  _increment(){
    this.setState({
      number: this.state.number + 1
    });
  }
  _decrement(){
    this.setState({
      number: this.state.number - 1
    });
  }
}

App.propTypes ={
  number: React.PropTypes.number
}

ReactDOM.render(
  <App number={20}/>,
  document.querySelector('#app')
)   
```

The example code is available in this Github [repo](https://github.com/shidhincr/SimpleReactReduxCounter). Just clone the repo and switch to the branch `react-state`.

``` vim
git clone https://github.com/shidhincr/SimpleReactReduxCounter
cd SimpleReactReduxCounter
git checkout react-state
```

In the next section we'll see how to use [redux](https://www.npmjs.com/package/redux) to implement the same.
