---
layout: post
title: "Injecting Custom JavaScript into React Native's Webview"
date: 2015-12-27 22:11:28 +0400
comments: true
published: true
author: Shidhin C R
categories: 
- React Native
- Webview
---

![react native webview](https://lh3.googleusercontent.com/-3JWl2Mvff3w/VoApfwiv1TI/AAAAAAAAssU/UJRZsSvHHpo/s800/Screen+Shot+2015-12-27+at+10.09.12+PM.png "Screen Shot 2015-12-27 at 10.09.12 PM.png")

I was playing around with [React native](https://facebook.github.io/react-native/) these days. Ever since they added the support for the webview in React native for Android ( which happened in their last [release](https://github.com/facebook/react-native/releases/tag/v0.17.0) ), I was eager to try it out. So, today's post is about React native webview.
<!-- more -->
First, checkout the [documentation](https://facebook.github.io/react-native/docs/webview.html#content) about webview component in React native. I was experimenting with the prop named `"injectedJavaScript"`. Since it's not explained in detail in their documentation, I'll explain with the code.

The `injectedJavaScript` is a custom **prop** of the React native Webview component. You can pass any JavaScript code ( as string ) to this prop, and React native will inject this JavaScript code into the Webview. The injected JavaScript will get executed once the Webview is finished loading.

Set up your react-native project as per their documentation. Now it's time to see some code:

```js index.android.js
    /**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React from 'react-native';
let { AppRegistry, View, WebView, StyleSheet} = React;

let MyApp extends React.Component {
    constructor(props){
      super(props);
    }
    render() {
        let html = `
            <div id="myContent">
                This is my name
            </div>
        `;
        let jsCode = `
            document.querySelector('#myContent').style.backgroundColor = 'red';
        `;
        return (
            <View style={styles.container}>
                <WebView
                    style={styles.webView}
                    ref="myWebView"
                    html={html}
                    injectedJavaScript={jsCode}
                    javaScriptEnabledAndroid={true}
                >
                </WebView>
            </View>
        );
    }
});

let styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    webView: {
        backgroundColor: '#fff',
        height: 350,
    }
});

AppRegistry.registerComponent('MyApp', () => MyApp);
```

You should be able to see the background color of the **DIV** changes to red now.

