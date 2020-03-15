---
layout: post
title: "Remote debugging localhost with weinre ( and HTTPS too ) "
date: 2015-03-17 
published: true
comments: true
permalink: 2015/03/17/remote-debugging-localhost-with-weinre/
categories: [localhost, testing, weinre]
---

Debugging mobile websites/applications is a real pain. No debuggers for Javascript, no console logs, cannot inspect html/css, and so on.
<!-- more -->
Sometimes I think that I am debugging like the old IE6 days where I had to put `alert` in every line of the code to find out where the actual issue is. If you also came across the same, you know the pain.

Lately, Google chrome came for the rescue. They relieved this pain by introducing remote debugging support in chrome mobile. Chrome remote debugging was a real life saver, where we get the same chrome devtools connected to the webpage in mobile browser. And, We can debug like the way we do it in desktop browsers.

**That is Awesome!**

But still the problem of Android browser debugging remains the same. Chrome remote debugging can be connected to the webpages loaded inside Chrome browser ( mobile ) only. If we need to debug default browsers, we have to use any other debugging tool. Here, in this post, we'll discuss about another wonderful remote debugging tool known as **Weinre**.

## Install Weinre

Weinre is available as an npm package. If you have configured npm in your system, let's install weinre globally with the below command:

```
npm -g install weinre
```

You can find more instructions installing weinre [HERE](http://people.apache.org/~pmuellr/weinre-docs/latest/Installing.html).

Now run the command `weinre --help` to see all available options.

```shell-session
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
means binding to all ip address on the current machine
```

To run weinre in default configurations, use the command `weinre -all-`.

## Access localhost in mobile browser

The easiest way of accessing the dev machine is by using the IP address and port. Let's say the application is running on port 9002. To open it in the browser, first, we have to find out the IP address of the system where the application is running. Use the command `ifconfig` in OSX/Linux and `ipconfig` in Windows to find out the IP address. Now navigate to the browser window and use the **IP_ADDRESS:PORT** to see the running application.

There are situations where we need to access the application using local hostname. These includes host header validation, solving cross domain request from JavaScript..etc. Normally these things are restricted when using the **IP_ADDRESS:PORT** combination.

Accessing the local hostname in mobile devices is our first hurdle. I have found an excellent article about how to solve this issue. I don't want to explain all of those here, so let's follow this link:

[http://egalo.com/2012/05/29/testing-mac-web-site-using-local-hostname-on-mobile-device/](http://egalo.com/2012/05/29/testing-mac-web-site-using-local-hostname-on-mobile-device/)

Once you're done, come back to check the next section.

## Let's start remote debugging

Let's run weinre using a custom port and your IP address.

```shell-session
weinre --httpPort 1234 --boundHost 192.168.2.109
```

This will start the weinre server in port 1234.

```shell-session
2015-02-19T13:56:42.520Z weinre: starting server at http://192.168.2.109:1234
```

Open the link `http://192.168.2.109:1234` in your browser. We're mainly interested in the following links:

```shell-session
Access Points
--------------
debug client user interface:    http://localhost:1234/client/#anonymous
documentation:  http://localhost:1234/doc/

Target Script
--------------
You can use this script to inject the weinre target code into your web page.
http://localhost:1234/target/target-script-min.js#anonymous
```

Add the target script to which-ever page you need to inspect and use the debug client user interface link. The debug client is very similar to the Chrome dev tools.


## HTTPS Support ?

As of now, weinre target script doesn't not support https. The problem with this is that if your site runs on https protocol and if you need to inject the weinre target script in any of the pages, the browser will block the script. Because the weinre script is loading through http protocol and the browser will not block any http resources if your website is https.

We can fix this problem by using another service called **ngrok**. Basically, ngrok is a tunneling proxy where it exposes a tunnel to any web server and port as a subdomain. Since ngrok supports https, it is fairly easy to get the weinre server tunneled through ngrok with htttps.

Let's see how this is done:

**Install ngrok**

```shell-session
npm install -g ngrok
```

**Start the weinre server**

```shell-session
weinre --httpPort 1234 --boundHost 192.168.2.109
```
**Run ngrok pointing to the weinre server**

```shell-session
ngrok 192.168.2.109:1234
```
This will output like this:

```shell-session
ngrok                                                                                            (Ctrl+C to quit)

Tunnel Status                 online
Version                       1.7/1.7
Forwarding                    http://74bd4fb7.ngrok.com -> 192.168.2.109:1234
Forwarding                    https://74bd4fb7.ngrok.com -> 192.168.2.109:1234
Web Interface                 127.0.0.1:4040
# Conn                        0
Avg Conn Time                 0.00ms
```

Now, `https://74bd4fb7.ngrok.com` is your https tunnel to weinre server. Open your browser and navigate to `192.168.2.109:1234`. Follow the set-up instructions given in that page after replacing `192.168.2.109` with `https://74bd4fb7.ngrok.com` for https support.

**Note:**

If you're having any Javascript error in the target script, you might need to modify the `target-min-script.js`. To do that, find out the weinre path first:

```shell-session
cd `which weinre`/../web/target
vi target-min-script.js
```

Now in the editor, search for the following text

```js
pattern = /(http:\/\/(.*?)\/)/;
```
Replace it with the below one and save.

```js
pattern = /(https?:\/\/(.*?)\/)/;
```

Now you can use weinre in https pages.

## Summary

Weinre is really a powerful tool for remote debugging. Here in this guide, we saw how to configure and use weinre to debug local websites. I hope this will help someone who would be struggling to work with Android browsers. I would like also mention that there is an online hosted weinre server available. You can check it out [http://debug.build.phonegap.com/](http://debug.build.phonegap.com/). The only drawback is that it will not support https pages.

Thanks for reading. Let me know the feedback and any comments.
