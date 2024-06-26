---
layout: post
title: "An impromptu ScalaFXML tutorial"
date: 2021-09-04-22:26:00 +0100
categories: tutorial
author: razor
---

I've been working on a thingy to listen to spotify without needing to use my phone. I've been
cycling a lot lately and my phone paired with my jbl dirtybuds is fine enough for that, but it
always feels unsafe when i open the screen to fiddle around with a UI that was obviously not made
for using one handed on a steering wheel mount while trying to not kill pedestrians and not get killed
by cars.

So anyway, I'm now building [aoede](https://github.com/RazorSh4rk/aoede), after seeing the video of an
 [ipod spotify client](https://github.com/dupontgu/retro-ipod-spotify-client), except I hate python, so
I needed a way to make nice GIUs in scala. Swing is out of the question, it's good enough for quick
tools but I wanted this thing to look presentable. Thankfully Scala has bindings to JavaFX, and there
is a library for using [FXML](https://github.com/vigoo/scalafxml) for layouts. I used to do Android 
and got very used to its drag and drop layout editor, so I was happy.

---

# This is where it starts if you are coming from google

- create a controller class and decorate it with `@sfxml`
- to your root node in your fxml file, add `fx:controller="pac.kage.ControllerClass"`
- in your controller, get the references to the nodes as `class Controller(private val leDog: Label)`
- to your nodes, add `fx:id="leDog"` (see the code tab if you are using scene builder)
- add callback functions as normal functions
- refer to them in fxml as `onMouseClicked="#launchRocket"`
- now bind everything together by 

{% highlight scala %}

object Main extends JFXApp {
  val view = getClass().getClassLoader().getResource("layout/main.fxml")
  // put your layout in the resources folder!!!
  val controller = new ControllerClass(null)
  val root = FXMLView(view, new DependenciesByType(Map(
    typeOf[ControllerClass] -> controller
  )))

  stage = new JFXApp.PrimaryStage {
    title = "whee"
    scene = new Scene(root)
  }
}

{% endhighlight %}

That's it, I found a tutorial for explaining how everything works on the class level but not for getting a single page running. I am now back to ranting about the spotify api.
