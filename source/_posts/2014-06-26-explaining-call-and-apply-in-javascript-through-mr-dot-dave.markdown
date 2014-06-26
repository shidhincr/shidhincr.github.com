---
layout: post
title: "Explaining Call and Apply in JavaScript, through Mr.Dave"
date: 2014-06-26 10:41:07 +0400
comments: true
published: true
categories: 
- javascript

---

### Call and Apply, makes sense. Who is Mr.Dave ?

First, I admit the title looks bit weird. I know this topic has been explained a thousand times in many JavaScript blogs, and I don't want to repeat the same here too. So I am gonna explain this through a person '**Dave**'. 

Yesterday I got a chance to explain the call and apply methods in JavaScript to some of my friends. I had to pick a real world scenario to make them properly understand how it works. Here I am going to explain the same. Excuse me if this is going to be dumb story.
<!--more-->
### Real world scenario

Let's assume, you've got a friend called Dave, and he is very smart. An interesting thing about him is, he has developed a **method** for booking flight tickets for cheap and easily. Basically how he has done this is by creating lot of contacts in this field, so that he can get more offers while flight booking. It took him many months to get it done.

Whenever Dave wants to make a flight booking, he calls his friends ( the contacts he made ) and tells them a secret code. They verifies the code and returns good offer details to him. After that, he provides the details of his travel and payment ..etc. He gets the tickets printed on his name, age, and id card number. Till now, all is well !

**Now, if you want to a book a flight ticket using the same method, what will you do ?**

- You can build the same method as Dave built. 
	- No ! that's gonna take lot of time
- You can ask Dave to use this method.
	- This is okay, but the ticket will have always Dave's name, age and id card number
- Fool Dave's friends by impersonating as Dave and provide your details
	- Whaaaaat ? 

Yeah, you are going to do the third step now. That's the exact need of `call` and `apply` in JavaScript.

### Structure of Dave in Code

Dave looks more like this in the code :

```javascript
var Dave = {
	name : 'Dave',
	age    : '30',
	getIdNumber: function(){
		return 'id number of dave';	},
	bookCheapFlightTickets: function( place, numberOfPeople, paymentDetails ){
		function sendSecretCode(){
			// Dave's own logic for generating secret code
			// and sending to his friends
			// ...		}
		function bookTickets(){
			// book the tickets using the given details
			// the ticket will be printed always in this.name , this.age, this.getIdNumber() and here **this** is pointing to Dave
			return "Ticket is booked for "+ this.name + ", " + this.age +", "+ this.getIdNumber();
		}
		var isVerified = sendSecretCode();
		return isVerified ? bookTickets() : false;	}};

```

Do you see any problem here ? The `bookCheapFlightTickets()` is complex. Also you cannot just execute it with `Dave.bookCheapFlightTickets()` by giving the **place**, **numberOfPeople**, and **paymentDetails** as parameters. Yes, the problem is the ticket is going to be printed on Dave's  details ( here the  details are his name, age and idNumber ).

### What are Call and Apply

In simple, `call` and `apply` are two methods of the Function object. Normally you can execute a function by appending '()' to its name. Say, a function `foo`, can be invoked by calling `foo()`. Alternately, using call or apply : 

```javascript
	foo.call( context, param1, param2, param3 );
	foo.apply( context, [param1, param2, param3 ]);
```
<div class='info'>
Note: Only difference between the 'call' and 'apply' is the way to you pass the parameters to them. The former takes parameters as comma separated while the latter takes only array of parameters. Honestly, I don't know why there are two implementations.
</div><br>

Now you may ask, what is this `context` parameter. Yeah, this is the only special thing about call and apply. The `context` is used for changing the execution context of the function. So when provided, it will replace all `this` references in the function with itself. Remember, if the `context` object is null/undefined, the execution context will be defaulted to global window object. i.e., `this` will reference to the window object. ( this will be changed in [ES5](http://es5.github.io/) ). 

So the main point is anything points to `this` inside a function can be changed to this `context` object. Voila,  that's what we're looking for !

### Let's Apply What You Learnt

So now you know how to fool Dave's friends by impersonating as Dave. You will be mostly look like below:

```javascript
var You = {
	name: 'You',
	age:    '29',
	getIdNumber: function(){
		return 'your id number';	} }
```

Now you can borrow Dave's **method** using `call` or `apply`.

```javascript
	var davesMethodForFlightBooking = Dave.bookCheapFlightTickets;
	// using call
	var bookedTicket = davesMethodForFlightBooking.call(You, place, numberOfPeople, paymentDetails);
	// using apply
	var bookedTicket = davesMethodForFlightBooking.apply(You, [place, numberOfPeople, paymentDetails]);
```

### tl;dr

`Call` and `Apply` are two important tools of advanced JavaScript programming. In JavaScript, a function always have an execution context, called as `this`. When the function is executed normally, like this `foo()` the execution context points to the global window object. If the function is a method of an object, the execution context points to that object. For example, in the code `obj.foo()` the execution context `this` points to `obj`. 

`Call` and `Apply` are the only way to change the execution context when a function is invoked. You can pass an object as the first parameter of the `Call` and `Apply` and the `this` reference will point to the object passed the function.

The only difference between the `call` and `apply` is the way to you pass the parameters to them. The former takes parameters as comma separated while the latter takes only array of parameters. Honestly, I don't know why there are two implementations.



### That's it

Thanks for reading ! Please correct me if I made any mistakes in the post.




