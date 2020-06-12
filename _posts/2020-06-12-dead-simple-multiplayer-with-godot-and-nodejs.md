---
layout: post
title: "Dead simple multiplayer with Godot and NodeJS"
date: 2020-06-12-11:55:00 +0100
categories: tutorial
author: razor
---

Hello it is I, the person who sucks at using non-functional languages and I just realized this is a sick shade at the latter B)

I was studying for my finals so naturally I has a lot of free time to pass and wanted to make some games. When looking up mutiplayer tutorials for godot, I only found ones that either use [Nakama](https://heroiclabs.com/), or a p2p kinda connection with the server written in gdscript.

Now those are fine, but the problem with a gdscript server is, you have to buy a vps or host your own server to get it online because no saas sites offer to run your binary (at least Heroku doesn't and I'm lazy to look up other ones). I wanted to make one that I could slap on Heroku and be done with it.

Of course I made it in scal, but that one was kinda complicated and really only geared towards my specific game. I wanted to make one where I could prototype my game without needing to modify server code.

Queue nodejs. I should have used python but I was lazy to look up websockets in Flask. The downside of a non-gdscript server is, that you either calculate all the physics on the server manually, or just let the client do the heavy lifting and only relay messages to the players. The second one sounds easier, so guess which one we will be making.

## Setup

If you are on arch `pacman -S node npm && yay -S godot-bin`. If you are on another distro (or, God save you, Win*ows), just download all these things. next, make a 

```
game
  - server
  - client
```

folder structure, cd into server and `npm init && npm i ws`. Yes we are using ws instead of socket.io, we really don't need much in terms of functionality here.

{% highlight javascript %}
const WebSocket = require('ws')

const port = 9001
const wss = new WebSocket.Server({ port: port })

let gameState = []

console.log(`running on ws://127.0.0.1:${port}`)

wss.on('connection', ws => {

  ws.on('message', message => {
    let data = JSON.parse(message)
    
    if(gameState.filter(el => el.id == data.id).length > 0) {
    	gameState = gameState.map(el => {
    		if(el.id == data.id) return data
    		else return el
    	})
    } else {
    	console.log(`new player, id: ${data.id}`)
	  	gameState.push(data)
    }

    ws.send(JSON.stringify(gameState))
  })

  ws.on('close', (code, reason) => {
  	gameState = gameState.filter(el => el.id != parseInt(reason))
  	console.log(`player ${reason} disconnected`)
  })
 
})
{% endhighlight %}

The server is like 25 lines. Set the port to your liking, it doesn't matter. We keep track of all the players in the game, whenever we get a message, we update the state or add a player. Most of the work is done ingame.

I won't post all of the game code here, you can get it from github, just explain the important parts.

{% highlight gdscript %}
var URL = "ws://localhost:9001/"

var data = {
	"x": 0,
	"y": 0,
	"id": 0
}
{% endhighlight %}

We set the url to whatever was our server's address. The data is going to be our player data, you can add whatever other field you want, the important thing is that every player gets a different id.

{% highlight gdscript %}
func _on_data():
	var payload = JSON.parse(ws.get_peer(1).get_packet().get_string_from_utf8()).result
	for player in payload:
		if player.id != data["id"]:
			for enemy in enemies:
				enemy.queue_free()
			enemies = []
			var e = enemy.instance()
			e.position = Vector2(player["x"], player["y"])
			enemies.append(e)
			add_child(e)
{% endhighlight %}

`_on_data` is connected to the websocket callback, so every time the server sends the game state this gets called. We parse the json into a gdscript dictionary and loop through the entities, spawning enemies at their own coordinates. Every other field you added to `data` is also returned, so you can spawn bullets for example.

{% highlight gdscript %}
func _process(delta):
	data["x"] = $Player.position.x
	data["y"] = $Player.position.y
	ws.get_peer(1).put_packet(JSON.print(data).to_utf8())
	ws.poll()
{% endhighlight %}

It's important that we set our own position to the current one on every frame because it gets sent in an async manner, so it wouldn't make sense to only update it before websocket communication.

{% highlight gdscript %}
func _on_Button_pressed():
	ws.disconnect_from_host(1000, str(data["id"]))
	get_tree().quit()
{% endhighlight %}

Finally, make sure to disable the default exit button in `project->project settings->config->auto accept quit` and instead add a button (or override default quit behaviour) with this code, so we disconnect from the server and don't just terminate the connection. We hijack the message field here to send our id, so the server can clear out the game state.

If we run the server with `npm start` and start 2 instances of the game (with different player ids!!!) we can see our multiplayer game in action. Now it's just a matter of a Procfile, and we can easily host it on Heroku, giving us a 024 server for a multiplayer game.

Fair warning. This code does not take care of lobbies and multiple games, it's just a single, multiplayer game. Also, it's fairly slow after a lot of players, nodejs is single threaded and gets clogged pretty fast. You can test your game logic, even play with your friends, but if you plan on releasing a game, maybe look into speeding it up a bit (with scala for example :v (scala server tutorial with lobbies soon(?)))

[github](https://github.com/RazorSh4rk/godot-multiplayer)

