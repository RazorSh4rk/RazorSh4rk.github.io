---
layout: post
title: "Nice email, mind if I spam it?"
date: 2020-03-05-11:55:00 +0100
categories: rant
author: razor
---

Hey I get it, your portfolio site turned out SUPER cool, and you only used like what,
74 npm packages? Totally reasonable bro, those percentage gauges displaying your 82% html
and 69% peepeepoopoo.js skills will absolutely catch everyone's eye and they will 
totally wait the 30 seconds it takes your site to load.

You might want to include a nice form, where they can email you as well. You know, where you
can write the entire email on the site and just hit send, and then who knows what will happen
to whatever you wrote, it's not like there's a gmail plugin or something, it's just 
`1337coderdude420`'s implementation, so cross your fingers.

Now that you are done with all this, time to lean back, and marvel at the flood of spam
emails filling your professonal email address, because obviously that's where you want 
business inquiries to be sent, right? 

```While I was writing this, youtube just jumped from sosmula to skrillex for some reason,
nice work on that recommendation engine, google.```

A big database of personal/portfolio/cv sites of course is github pages, you can host your
stuff comppletely free, you get https and it looks kinda professional. Now did you know that
github has an api? Two apis to be specific, but I will use graphql if you hold a gun to my head,
thanks.

Let's get some nice emails that could be added to tech mailing lists, considering github users 
are probably interested about tech.

---

Naturally I'm gonna use scala, with [Li Haoyi's](https://github.com/lihaoyi) excellent requests
library, play-json and redis because its easier than implementing a file lock.

Note: this got waaaaaay more complicated than I originally intended it.

{% highlight scala %}

      def getUrls(n: Int, counter: Int = 0, from_id: Int = 0): List[String] = {
        if (counter == n) List()
        else {
          val data = Json.parse(requests.get(url + from_id, auth = login).text)
          val last = (data \\ "id").last.as[Int]
          (data \\ "login").toList
            .map(_.as[String]) ::: getUrls(n, (counter + 1), last)
        }
      }

{% endhighlight %}

First I went ahead and fetched a bunch of users, I used the github api first about 3 years
ago and since then i have found no way of getting an arbitary number of records, so I just
fetch them recursively. Here comes a disclaimer: the code is gonna get VERY functional after this.

{% highlight scala %}

    getUrls(range)
        .map("https://" + _ + ".github.io")
        .toList
        .zipWithIndex
        .foreach({
          case (el, index) => {
            val mail: Future[List[String]] = Future {
              val site = requests.get(el)
              if (site.statusCode == 200) {
                index.toString :: el :: simpleEmailRegex
                  .findAllIn(site.text)
                  .toList
                  .filter(_.length < 200)
                  .map(el => el.take(el.length - 2))
                  .map(_.replace("mailto:", ""))
              } else List()
            }

            mail.onComplete({
              case Success(value) => {
                if (value.length > 2) {
                  println(s"${value.head}: ${value.length}")
                  try {
                    value.tail.foreach(redis.rpush(value.head, _))
                  } catch {
                    case t: Throwable => ()
                  }
                }
              }
              case Failure(exception) => ()
            })
          }
        })
    }

{% endhighlight %}

Come on, read it. Tell me what it does, beacuse I don't even know anymore. Nah, not really, but
I really got lost in method chains, There are no variables used other than the config vars at all.

After this I just made a separate function to dump redis into a csv, if you are smarter than me, you
could use `redis-cli --csv {command} >> out.csv`.

The regex is VERY simple, you could probably get a lot more hits with some tweaking, it's just
`val simpleEmailRegex = "mailto:.*.(\"|')>".r`. I'm not very good at coming up with regexes.

I won't show the emails I collected, with the first 500 pages of the api I already got 400+ addresses.
I just want to shame [luonet](https://luonet.github.io), because what the hell is this?

![what](/assets/2020-03-05.png)

--- 

[code](https://gist.github.com/RazorSh4rk/16e5e8e182a1a1cdd9e5d7e90bf70a98)





