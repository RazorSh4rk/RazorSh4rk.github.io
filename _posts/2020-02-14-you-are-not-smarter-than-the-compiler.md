---
layout: post
title: "You are not smarter than the compiler"
date: 2020-02-14-13:35:00 +0100
categories: rant
author: razor
---

Note: this post was heavily inspired by [Nick White's video](https://www.youtube.com/watch?v=4eWKHLSRHPY), that I
recommend you watch. This does not mean that I disagree with anything he says, I think videos like this are really helpful for people trying 
to get through the corporate interview process (which deserves a post by itself honestly).

---

Imagine this: it's your college class, whatever "intro to java" was called for you, it was programming 1 for me. The kid with the heavy ass gaming
laptop enters the classroom, sits down and starts complaining about how "java is so slow why do we even need to use it". When asked to be more specific
he usually says something along the lines of "vm slow" or "pointer good".
Usually these are the same people who get an assignment in a group and at the end of the semester all their contribution is a half finished .java file
with std functions reimplemented in 7 nested for loops.

Now the thing with these interview/ranking type of coding challenges (think hackerrank) is that they kinda WANT you to reinvent the wheel. God help you
if you want to import anything but stdio.h, go be a good boy and use the 12 provided functions in the stdlib.
If you were smart back in college (I know I wasn't), you asked the previously mentioned guy if `his code is faster than java`. Plot twist: it usually 
isn't.

Let's see the coding challenge in the video. You have a list, it contains both negative and positive numbers. Square them and return an ordered list.
Sounds simple enough, right? `Collections.sort(list.map(el -> el * el))` and you are done. He even mentions this as a quick and easy way to go about it and he is perfectly
right, it is quick and easy. Then he goes ahead and makes the algorithm you are probably expected to present in an interview.
Now my problem is, does it make a difference if you write a 1000 line algorithm instead of using whatever the language provides? I did a small test with
this one specific case and it turns out, yes, it does. Negatively.

Quick note, I used scala, but it compiles to jvm bytecode, so the performance is similar to java.

{% highlight scala %}
	def _1(l: List[Int]): List[Double] = {
		l.map(el => pow(el, 2)).sorted
	}
{% endhighlight %}

First of course was what I, and every sane person would do. It might look a little different in your language but the idea is the same. Except if
you use C, in which case just jump to the end.

{% highlight scala %}

	def _2(l: List[Int], accum: List[Double]): List[Double] = {
		if(l.length == 0) accum
		else {
			val first = pow(l.head, 2)
			val last = pow(l.last, 2)
			if(first > last)
				_2(l.tail, ( List(first):::accum ))
			else 
				_2(l.dropRight(1), ( List(last):::accum ))
		}
	}
{% endhighlight %}

Next I felt adventurous and did a recursive implementation.

{% highlight scala %}
	def _3(l: List[Int]): List[Double] = {
		var ret = List.tabulate(LEN)(el => 0d)
		var targetIndex = ret.length - 1
		var firstIndex = 0
		var lastIndex = ret.length - 1

		while(targetIndex != -1) {
			if(l(firstIndex) > l(lastIndex)) {
				ret = ret.updated(targetIndex, pow(l(firstIndex), 2))
				firstIndex += 1
				targetIndex -= 1
			} else {
				ret = ret.updated(targetIndex, pow(l(lastIndex), 2))
				lastIndex -= 1
				targetIndex -= 1				
			}
		}

		ret
	}
{% endhighlight %}

Last was Nick's implementation, and if you start complaining that it's not 1:1, I will personally leave a mean review about you on yelp.

Before I go into any details, let's see the benchmark.

```
$ scala test.scala 

starting method 1...
starting method 2...
starting method 3...
method 1: 5 ms, method 2: 708 ms, method 3: 911 ms

```

Let's examine the code to understand why does this happen.
First, modifying memory is slow. It's the second slowest, after using persistent memory. In the last method we modified it extensively
which probably held back our program a lot.
Second, if you really want, you can calculate `O` for each method, the first is gonna be `O(N logN)`, the second and third will be better, `O(n)`
I think, but remember, I'm not very smart.
Now this would matter. If we did the same thing in the body. Because guess what, going to the moon N times is not faster than tossing
a coin N*N times.

## It's almost like... you are not smarter than the compiler.

---

code:

<script src="https://gist.github.com/RazorSh4rk/b54cec99acea0a4b4ae05f428f3e33a4.js"></script>

