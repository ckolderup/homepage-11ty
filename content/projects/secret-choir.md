---
icon: sound
title: Secret Choir
description: A blog about music, built on a new static blogging platform I'm working on!
date: 2025-01-15
---

https://secretchoir.com

I started writing Secret Choir in 2025 after thinking about how much time I was putting into posting on [Record Club](https://record.club), a website I really like and don't intend to stop posting on. It's just that in the wake of the shutdown of [Cohost](https://cohost.org) and the re-homing I had to do of a bunch of stuff I put there, I really didn't want to run into another situation where that happened. I suppose I could post more about music on my main blog [MOTD](/projects/motd-co), but this was also a good excuse to work on an idea I had for a Cohost-style blog (the design/information hierarchy of which I took heavy inspiration from Cohost directly!) that could be a PWA so it could have its own icon on my phone's home screen along with a web-based posting flow WHILE being a fully static site. This is accomplished right now via a very GitHub-focused workflow: it's an Eleventy repo that lives in a GitHub repo; the web posting form sends a request to the GitHub REST API that adds files to the repo and makes a commit; the repo is configured to notice those commits and kick off GitHub Actions flows to build the result and publish it to GitHub pages. The result is pretty slick, though I'd like to make it more agnostic to both the hosting & CI platforms eventually.
