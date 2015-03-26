---
layout: post
title: "Improve Page Load Speed With Critical CSS"
date: 2015-03-23 06:38:57 +0400
comments: true
published: false
categories: 
- critical css
- nginx
- nodejs
---

- Problem with stylesheet and page load
	+ Problem with including stylesheet in the head
	+ Parsing time and slow page
	+ Problem with async loading the stylesheet
	+ Flash of unstyles content

Performance is one of the important area developers concentrating now. Even Google added page load speed as one of the key parameter of their ranking algorithm. Soe if websites need to optimise their page load performance along with other search engine optimisations. 

Amazon came up with the following results after page speed improvements:

> For every 1 second of improvement they experienced up to a 2% increase in conversions. For every 100 ms of improvement, they grew incremental revenue by up to 1%


## Improving page load time

Most of the time in loading the page is spent for downloading the resources. 






	
- What is Critical CSS
	+ Analysing what css is required for first render
	+ Above the fold mark-up
	+ Come up with height and width for above fold ( from Google analytics )
	+ Inline the css for above fold and async loading original css file
- Generating Critical CSS
	+ NodeJS tools
		+ critical-css
		+ pent-house
		+ find out others and update here
	+ Apache and Nginx modules
		+ pagespeed module-apache
		+ pagespeed module-nginx
		+ Note: Using nginx pagespeed module with CDN content. ( check Raven and explain here )
		+ Namshi open source code for nginx-pagespeed container. Use it
- Summary
	+ Using critical css will boost the page load performance drastically. Critical css will help you to obtain a better page rank in google pagespeed insights tool. Here in Namshi, we have achieved a better page rank using critical css combining with other best practices for page load improvements.	  	
