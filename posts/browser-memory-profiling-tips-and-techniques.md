---
layout: post
title: "Browser memory profiling tips and techniques"
date: 2024-10-07
author: Shidhin C R
published: true
comments: true
categories:
- Web performance
- Core Web Vitals
- Performance Insights
- Memory profiling
- Devtools
---

Since I joined Atlan, I have focused on improving the performance of our web app built with VueJS and related libraries. The first bug I fixed at Atlan was a memory leak in the front-end. Instead of detailing the specifics of the bug, this post will discuss the techniques I used to identify the memory leak in the browser and enhance the app's performance.
<!-- more -->

## First steps

When the browser crashes or reports high memory usage, check the browser task manager first. The task manager displays the total memory consumed by the web page along with the associated JavaScript memory. The JavaScript memory represents the sum of all live objects on the page.

![Browser task manager](/img/blog-images/browser-task-manager.png)
![Browser task manager report](/img/blog-images/browser-task-manager-report.png)

You can also use the Performance Monitor tool in DevTools. This tool provides a live view of memory usage and DOM nodes. It is available in Chrome and Edge browsers.

![Performance monitor](/img/blog-images/performance-monitor.png)

## Finding memory leaks using heap snapshots

The heap snapshot tool lets you capture a snapshot of a web page's memory usage. It helps identify memory leaks and optimize the web page to reduce memory consumption. You can access this feature from the memory panel in the DevTools.

Always select the correct JavaScript VM before taking the snapshot. Click on the VM icon in the top right corner of the DevTools window to do this. Then, click the `Start` button to take the snapshot.

![Heap snapshot](/img/blog-images/heap-snapshot.png)

After you take the snapshot, view it in the Memory panel. Always check the retained heap size to see if it is high. This serves as the starting point for optimizing your web page.

![Heap snapshot report](/img/blog-images/heap-snapshot-report.png)

## Using the performance panel to identify memory issues

The performance panel serves as another useful tool for identifying memory issues. It offers a detailed view of the web page's memory usage. To begin, navigate to the performance panel and start a new recording session, as shown in the screenshot below.

![Performance panel](/img/blog-images/performance-panel.png)

After you hit the record button, interact with the page to isolate the memory issue. For example, click on a button that allocates a large amount of memory. Once you have done that, stop the recording session by clicking the stop button.

## Finding DOM memory leaks

Most of the time, the detached DOM tree (DOM nodes that are referenced from JavaScript memory but removed from the render tree) causes memory leaks. Modern browsers provide an easy way to view the detached DOM nodes. You can also use the three-way heap snapshot technique to identify the detached DOM nodes, which we will explain below. See the screenshots.

![Detached elements](/img/blog-images/detached-elements.png)

### Three-way Heap Snapshots

To begin the three-way heap snapshot process, load the page without performing any actions and take the first heap snapshot. This initial snapshot serves as a baseline for memory usage. Next, interact with the page by performing various actions, and then take the second heap snapshot to capture the memory state after these interactions. Afterward, press the force garbage collect button to clear any unreferenced memory, and take a third heap snapshot. This sequence of snapshots will help you analyze how memory is allocated and retained during user interactions.

Once you have the three snapshots, you can utilize the filtering options to identify memory leaks. Change the filter on the third heap snapshot to “Objects retained by detached DOM nodes” to view all detached DOM elements that are still being referenced in memory. Additionally, to identify VM objects that have not been garbage collected, adjust the filter to “Objects allocated between snapshot1 and snapshot 2.” This comparison allows you to see what has changed between the snapshots and helps pinpoint potential memory leaks in your application.


![3 way heap snapshot 1](/img/blog-images/heap-snapshot-1.png)
![3 way heap snapshot 2](/img/blog-images/heap-snapshot-2.png)
![3 way heap snapshot 3](/img/blog-images/heap-snapshot-3.png)

## You can also use the comparison


![3 way heap snapshot comparison](/img/blog-images/heap-snapshot-comparison.png)