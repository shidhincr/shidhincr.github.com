---
layout: post
title: "Fix: The flow server is not responding"
date: 2020-10-24
author: Shidhin C R
published: true
comments: true
categories:
  - flow
  - flow-lsp
  - osx
---

Recently, I was setting up `flow` for one of my project. Everything was running normally, but after sometime, there was this error on the screen:

<!-- more -->

![flow server is not responding](/img/blog-images/flow-server-stopped-working.png)

```shell
The flow server is not responding
```

Seems like it is because of an unhandled exception that lead to crashing the flow server.

Here is a quick fix. Go to the command prompt and run:

```shell
pkill -f flow-bin
```

After this, try to run the `flow`. The flow-server will be restarted and everything should work properly from now.

## References:

- https://github.com/facebook/flow/issues/1428
