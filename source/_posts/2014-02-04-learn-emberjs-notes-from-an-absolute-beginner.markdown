---
layout: post
title: "Learn EmberJS : Notes from an absolute beginner"
date: 2014-02-04 15:19
comments: true
published: false
author: Shidhin
categories: 
- emberjs
- tutorial
---

Last couple of days, I'm really trying to understand this framework known as EmberJS. I've a fair understanding about the MVC and MVVM architecture, and i've explored some of the client side MVC/MVVM frameworks, especially AngularJS and BackboneJS. So I decided to share my experience of learning EmberJS as I know that I am not the only one who're going to follow this steep learning curve of EmberJS.
<!--more-->
I'd been working on some of the AngularJS projects ( again those I've created for learning AngularJS ) and mostly my concentration was only on getting deeper into AngularJS. Now I've got a good grip on AngularJS and decided to move on to another framework. At this moment, there're something we planned in our UI meeting ( at office ), where each of us will take a presentation on some client side frameworks. So me and my friend Rohith, decided to take session on EmberJS –– that's a good opportunity to learn.

When I started, I found it very very difficult. Especially, I couldn't able to switch from the AngularJS terms and the **"Angular way of thinking"**. Ember seems to be given more emphasis on naming conventions, and built on top of strict MVC/MVVM concepts. I could able to thing EmberJS as a highly advanced version of BackboneJS. EmberJS has hard dependencies on HandleBars tempting language and jQuery. Though I'm pretty much familiar with jQuery, learning the HandleBars templating is also a bit tough job.

## EmberJS : Basic Concepts

EmberJS is client side MVVM framework. Originally authored and maintained by Yahuda Katz and Tom dale. Yahuda Katz is the guy behind the HandleBars templating language, so now you know why HandleBars is the default templating of Ember !  

<u>These are the the early impressions about EmberJS:</u>

- It's an client side MVVM framework
- Have hard dependencies on HandleBars and jQuery
- The file size is fairly bigger compared to Angular, Backbone. EmberJS alone ( prod + gzip ) will take 69KB.
- Core parts of Ember are :
	- Routers
	- Controllers
	- Models
	- Templates (HandleBars)
	- Components
	- Two way data binding
	- HandleBars helpers
	- Support for computed properties

You see, that's a lot of list. Ember offers all these in it's core, so we don't need to install any other extensions. This is one of reason why the file size is much bigger.


## Let's Start: Build a Contact Manager Application

Frameworks/ Languages cannot be learn by reading books; We've to start coding to understand how it actually works. So to learn EmberJS, the best way is to create a real world application using it. And whenever we think about a real world application, the first thing that comes to the mind would be a **"TODO List"**. But here in this case, there're smart people out there, who created this thing called [TodoMVC](http://todomvc.com/) in each and every framework possible. So it's better we'll do some other application like a "Contact Manager". Here we go 


Since Ember has lot of new terms and conventions we need to understand, it's better to learn by piece by piece. We'll learn each concept in each **Step** and apply it to build a certain part of our application.


<u>**Files structure**</u>

Let's start with the files `index.html`, `styles.css` and `app.js` only now. We'll include the EmberJS,jQuery and HandleBars libraries from their corresponding CDN files to `index.html`. To make our application looks better,we'll be including the twitter bootstrap css too.

The initial `index.html` looks like the below. The only extra mark-up is added to display a navigational header using twitter bootstrap.

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Ember Learning: Contact Manager App</title>
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.1.0/css/bootstrap.min.css">
    <link rel="stylesheet" href="styles.css">
    <script src="http://code.jquery.com/jquery-2.0.3.min.js"></script>
    <script src="http://builds.emberjs.com/handlebars-1.0.0.js"></script>
    <script src="http://builds.emberjs.com/tags/v1.1.2/ember.js"></script>
    <script src="http://builds.emberjs.com/tags/v1.0.0-beta.3/ember-data.js"></script>
    <script src="app.js"></script>
</head>

<body>
    <nav class="navbar navbar-default" role="navigation">
        <div class="container-fluid">
            <div class="navbar-header text-center">
                <h3>EmberJS Learning: Contact Manager Application</h3>
            </div>
        </div>
    </nav>
</body>
</html>
```

In coming steps, we'll be adding required templates to `index.html` and JavaScript code to `app.js` only. ( It's better to separate the code to different files: like router.js, model.js, controller.js ..etc. But for a sample application, we'll keep it in just one file ).

<u>**Point 1:**</u> "Ember needs some bootstrapping"

Ember needs the application to be bootstrapped by the following piece of code. So add this as the first line of our `app.js`.

```javascript
	var App = Ember.Application.create();
```

<u>**Point 2:**</u> "Ember strictly follows the naming conventions instead of configutations"

**Pay good attention to this**. As a beginner, I really got struggled to understand what it actually means. Well, this means, EmberJS needs some kind of connection between a router, and it's associated controller,template..etc. To wire-up all these, EmberJS uses a naming conventions for them. For example, whenever we create any new route in Ember , say `/users` :

- Ember needs a route object called Ember.usersRoute
- Ember requires a controller object called Ember.usersController
- Finally, the template with either `id= "users"` or `data-template-name="users"`

See [Ember Naming Conventions](http://emberjs.com/guides/concepts/naming-conventions/)

**Don't worry about this now, we'll discuss more in the coming sections**


<u>**Point 3:**</u> "Ember will boot to the application template first"

When we create an Ember application using the code in **Point 1**, the first thing Ember does is look for the following :

- App.ApplicationRoute
- App.ApplicationController
- finally the `application` template

Notice again, the naming convention Ember follows. If the `ApplicationRoute` and `ApplicationController` are not present, Ember will create them of its own. Leave them for now, as there will be a separate section for them later.

Let's focus on the `application` template. This is **main** template Ember uses to render anything inside the application. That means all other views will be going to be rendered inside the `application` template always. Now let's create a simple HandleBars template with `data-template-name="application"` and add to our `index.html`.

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Ember Learning: Contact Manager App</title>
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.1.0/css/bootstrap.min.css">
    <link rel="stylesheet" href="styles.css">
    <script src="http://code.jquery.com/jquery-2.0.3.min.js"></script>
    <script src="http://builds.emberjs.com/handlebars-1.0.0.js"></script>
    <script src="http://builds.emberjs.com/tags/v1.1.2/ember.js"></script>
    <script src="http://builds.emberjs.com/tags/v1.0.0-beta.3/ember-data.js"></script>
    <script src="app.js"></script>
</head>
<body>
    <nav class="navbar navbar-default" role="navigation">
        <div class="container-fluid">
            <div class="navbar-header text-center">
                <h3>EmberJS Learning: Contact Manager Application</h3>
            </div>
        </div>
    </nav>
    <script type="text/x-handlebars" data-template-name="application">
      <h1>This is a simple Ember application</h1>
    </script>
</body>
</html>
```

We just added a simple HandleBars template with `data-template-name=
"application"`. It doesn't have any dynamic data; All it contains is a heading tag. Let's test if it's working by opening the `index.html` in browser.

























