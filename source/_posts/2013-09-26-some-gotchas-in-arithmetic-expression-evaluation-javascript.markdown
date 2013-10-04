---
layout: post
title: " Some Gotchas In Arithmetic Expression Evaluation : JavaScript"
date: 2013-09-26 16:15
comments: true
published: true
author: Shidhin
keywords: arithmetic expressions,JavaScript, parsing
description: This post explains how the JavaScript engine actually parses the arithmetic expressions.
categories: 
- JavaScript
- arithmetic expressions
---

## Solve a small problem in JavaScript

This post is just for recollecting some of the basics of JavaScript. Let's start with a small JavaScript code. Here is the code –– Solve it with out using the console.

```javascript
	var a = 5; b = 3;
	a = ( a - ( b = ( a = a + b ) - b ) );
```
	
Take your own time to come up with an answer before moving to the next section.

<!-- more -->

## Analyzing the problem

If your answer is `a = 3 and b = 5 `, this post is written for you. Open your favorite browser and fire up the console. Put the above code in the console and see the values of `a` and `b` now.

Stunned ?  Yeah, The values of `a` and `b` are `a = 0  and b = 5 ` now. Honestly I also got it wrong initially. I did ask this question to some of my friends ( who are in JavaScript circle ),  and all of them gave me wrong answer.

## Some flashback

So, here is how I arrived this to particular question. Last week I was trying to write the code for an interview problem in JavaScript  and it's a very common one –– How to swap values of 2 variables with out using a 3rd variable.

Let the variables be `a = 5` and `b = 3`. Swap the values of `a` and `b` with out using any 3rd variable .

Solution is simple . Just do the following arithmetic operations
   
	a = a + b
	b = a - b
	a = a - b
	
This will do the job.

What I was trying is to write the entire expression in one single line. I wrote it like below.

**Code 1 :** 

```javascript
	var a = 5; b = 3;
	a = ( a - ( b = ( a = a + b ) - b ) );
```
	
Cool .. I thought it's done.

But I got surpriced when I tried it in the console. I was expecting final values should be `a = 3 and b = 5` but the output was different. I got ` a = 0 and b =5 `.

WTF ? Let me change the code a bit. I modified the code like this 

**Code 2 :**

```javascript
	var a = 5; b = 3;
	a = ( ( b = ( a = a + b ) - b ) - a );
```	
This time I got the correct results `a = -3 and b = 5`. So why the hell it didn't work for the first expression ?

## The answer is :

We're evaluating it wrongly. I mean we are not doing the way JavaScript engine does. I went to the EcmaScript specification and read the section for "Arithmetic Expression".

>Expressions : Any valid unit code that resolves to some value.

**Two things to note :**
 
- Assignment operators are right to left associative. That means for the expression ` a = b = 5 `, the value ` 5 ` will be assigned to variable ` b ` and then assigned to variable ` b `.
- Arithmetic and multiplicative operators are left to right associative. For the expression ` c = a + b `, the value of `a` will be computed first, then goes to ` b ` and computes it's value.

For our problem, if I draw the parse tree roughly, it will be like below.

	   =
	 /	 \
	a	  -
		/	\
	   a	 =
		   /   \
		  b		-
		  	  /	  \
			 =      b
		   /   \
		  a	    +
		  	  /   \
			 a     b
			 
Ideally parse tree doesn't contain the `=` operator. I made it like this to understand how the parser start evaluating the expression.

In the above parse tree, all the `=` operators are evaluated from right-to left ( that means the right node will be evaluated first and the value will be assigned to the left node ). On the other hand, arithmetic/multiplicative expressions are evaluated from left to right ( that means the values will be assigned from left and the arithmetic/multiplicative operation will be carried out ).

We can identify sub-expressions in our code. Basically, we can extract the expressions containing `=` to sub-expressions. Hence the above parse tree can be re-drawn like below.

	   =
	 /	 \
	a	  -
		/	\
	   a	 X


Where `X` is the **Sub-Expression 1** given below :

			 =
		   /   \
		  b		-
		  	  /	  \
             Y	   b

Where `Y` is the **Sub-Expression 2** given below :

			 =
		   /   \
		  a	    +
		  	  /   \
			 a     b
			 
Let's see how JavaScript parser evaluate the value of `a` finally.

### Steps : 

1. Parser takes the main expression `a = a - X` and evaluated from left to right. At first, parser finds the variable`a` and finds it's value. Now the parser moves to the next variable `X` and try to calculate it's value. Since `X` is an expression, it need to be evaluated to form a primitive value.
 
    *Note: To get the value, parser internally calls the [GetValue](http://es5.github.io/#x8.7.1) of each operands*

    So, for the parser, the expression becomes  like this :

	`a = GetValue( a ) - GetValue( Evaluate( X ) )`
    
    Which is :
 
	`a = 5 - GetValue( Evaluate( X )`

2. Now it need to evaluate the expression `X` where `b = Y - b`. Here the first operand `Y` itself a sub-expression, so parser has to evaluate it first before calculating the value of the second operand `b`. 
3. Let's evaluate the expression `Y` which is `a = a + b`. This is straightforward and contains no sub expression , hence evaluated like this.
	
	`a = GetValue( a ) + GetValue( b )`
    This equals to :
    
    `a = 5 + 3`
    
    Finally the value of expression `Y` becomes `8`.

4. Coming back to step 2 where expression `X` needs to be completed. expression `X` is
	
	`b = GetValue( Y ) - GetValue( b )`

	Becomes like this :

	`b = 8 - GetValue( b )`

	Which is :

	`b = 8 - 3`
	
    Finally the value of `b` and expression `X` becomes `5`. 
	
5. So now all the sub expressions are evaluated , the main expression can be completed now.

	The main expression was :
	
	`a = 5 - GetValue( X ) and value of X = 5`

   That means final value of `a = 5 - 5`  which is `0`.
	
6. Finally the values of `a` and `b` will become `a = 0 and b = 5`

Now we're in the same direction with JS engine. We can apply what we learned for the **Code 2** also. 


## Conclusion

I didn't want to write these much long. All I wanted to recollect those basics. Thanks for reading !! 


 References : 
 
 1. [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators)
 2. [http://www.ecma-international.org/ecma-262/5.1/#sec-8.7](http://www.ecma-international.org/ecma-262/5.1/#sec-8.7)
 3. [http://es5.github.io/#x8.7.1](http://es5.github.io/#x8.7.1)
 4. [http://stackoverflow.com/questions/19045411/can-somebody-explain-how-javascript-arithmetic-expressions-work](http://stackoverflow.com/questions/19045411/can-somebody-explain-how-javascript-arithmetic-expressions-work)