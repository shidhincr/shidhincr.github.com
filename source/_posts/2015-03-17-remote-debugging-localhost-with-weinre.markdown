---
layout: post
title: "Remote debugging localhost with weinre"
date: 2015-03-17 10:33
comments: true
published: false
categories: [localhost, testing, weinre]
---

- Intro 
    + Chrome has remote debugging support
    + Android remote debugging is very difficult
    + 
- Install weinre
    + Install using npm
    + Different configurations
    + What does each of them means
- Access localhost in mobile
    + Explain using IP address 
    + More detailed options: http://egalo.com/2012/05/29/testing-mac-web-site-using-local-hostname-on-mobile-device/
- Start debugging
    + Include the script in the html file
    + By using the bookmarklet 
    + Goto the remote control
    + What is green color means, blue color means, and red means
- HTTPS support
    + Included script will not work for https pages
    + Weinre has no support for https pages
    + Workaround:
        * Start a tunneling server using ngrok.com 
        * Point it to the weinre port 
        * Modify the target script code to work with https ( show the usual error message which comes for https pages )
        * Use the target script with ngrok domain and https 
        * Use the remote devtools with ngrok domain 
- Conclusion
    + Good for Android remote debugging 
    + Use the online weinre server, but wont work with https pages
    + http://debug.build.phonegap.com/

--------------------

Debugging mobile websites/applications is a real pain. No debuggers for Javascript, no console logs, cannot inspect html/css.. the list goes on. 
Sometimes we need to debug like the old IE6 days where we need to put `alert` in every line to debug a code. 

Now, Google chrome relieved this pain by introducing remote debugging support for chrome mobile. With remote debugging, we get the same chrome devtools connected to the webpage inside Chrome mobile. You can use all the devtools features with remote debugging.

The problem with Chrome remote debugging is, it will not work with other browsers. If you need to debug in default android browsers, you need to seek for alternatives. There are many, but here in this post, we'll discuss about remote debugging using a tool called **Weinre**.

## Install Weinre

Weinre is available as an npm package. Use the npm install command to install it globally.

`npm -g install weinre`

More instruction can be found [here](http://people.apache.org/~pmuellr/weinre-docs/latest/Installing.html).

Run the command `weinre --help` to see all available options.

```sh
usage:   weinre [options]
version: 2.0.0-pre-HH0SN197

options:
    --httpPort     port to run the http server on        default: 8080
    --boundHost    ip address to bind the server to      default: localhost
    --verbose      print more diagnostics                default: false
    --debug        print even more diagnostics           default: false
    --readTimeout  seconds to wait for a client message  default: 5
    --deathTimeout seconds to wait to kill client        default: 3*readTimeout

--boundHost can be an ip address, hostname, or -all-, where -all-
means binding to all ip address on the current machine'
```

To run weinre in default configurations, use the command `weinre -all-`.

## Access localhost in mobile browser

We can always access the dev machine using the IP address and port our application is running. Let's say the application is running on port 9002. First, find out the IP address ( using the command `ifconfig` in osx/linux and `ipconfig` in windows.  Using this ip and port, we can access the local server in mobile browsers.

Sometimes we need to access the application using local hostname. For example, host header validation, or solving cross domain request from JavaScript..etc. Here is an excellent article about how to get the local hostname accessible on mobile devices. Follow this [link](http://egalo.com/2012/05/29/testing-mac-web-site-using-local-hostname-on-mobile-device/).

## Let's start remote debugging

Let's run weinre using a custom port and your IP address.

```sh
weinre --httpPort 1234 --boundHost 192.168.2.109
```

This will start the weinre server in port 1234.

```sh
2015-02-19T13:56:42.520Z weinre: starting server at http://192.168.2.109:1234
```

Open the link `http://192.168.2.109:1234` in your browser. You can see different links. I'll explain the main ones here:

```sh
Access Points
--------------
debug client user interface:    http://localhost:1234/client/#anonymous
documentation:  http://localhost:1234/doc/

Target Script
--------------
You can use this script to inject the weinre target code into your web page.
http://localhost:1234/target/target-script-min.js#anonymous
```

Just add the target script in whichever page you need to inspect and use the debug client user interface link. The debug client user interface will be very familiar to you if you have used chrome dev tools.


## HTTPS Support ?

As of now, weinre target script doesnt not support https. The problem with this is that if your site runs on https protocol and if you need to inject the weinre target script in any of the pages, the browser will block this. Because the weinre script is loading through http protocol and the browser will not block any http resources if your website is https.

There is a workaround to fix this problem. For this we need to use another service called **ngrok**. Basically, ngrok is a tunneling proxy where it exposes a tunnel to any web server and port as a subdomain. Since ngrok supports https, it is fairly easy to get the weinre server tunneled through ngrok with htttps.

Let's see how this is done:

**Install ngrok**

```sh
npm install -g ngrok
```

**Start the weinre server**

```sh
weinre --httpPort 1234 --boundHost 192.168.2.109
```
**Run ngrok pointing to the weinre server**

```sh
ngrok 192.168.2.109:1234
```
This will output like this:

```sh
ngrok                                                                                            (Ctrl+C to quit)

Tunnel Status                 online
Version                       1.7/1.7
Forwarding                    http://74bd4fb7.ngrok.com -> 192.168.2.109:1234
Forwarding                    https://74bd4fb7.ngrok.com -> 192.168.2.109:1234
Web Interface                 127.0.0.1:4040
# Conn                        0
Avg Conn Time                 0.00ms
```

Now, `https://74bd4fb7.ngrok.com` is your https tunnel to weinre server. Open your browser and navigate to `192.168.2.109:1234`. Follow the set-up instructions given in that page after replacing `192.168.2.109` with ``https://74bd4fb7.ngrok.com` for https support.

**Note:**

If you're having any Javascript error in the target script, you might need to alter the `target-min-script.js` to fix the problem. For that find out the weinre path:

```sh
cd `which weinre`/../web/target
vi target-min-script.js
```

Now in the editor, search for the text

```js
pattern = /(http:\/\/(.*?)\/)/;
```
Replace it with the follwing text and save.

```js
pattern = /(https?:\/\/(.*?)\/)/;
```

Now you can use weinre in https pages.

## Summary

Weinre is really a powerful tool for remote debugging. Here in this article saw how to configure and use weinre to debug websites/applications running in dev machines. Please let me know if you have any questions.

