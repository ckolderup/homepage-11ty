---
icon: music-circle
title: Backtracks
---

There are two websites you have to know in order to fully understand Backtracks and why I made it.

The first is last.fm, the final form of Audioscrobbler, the website you can log your music listening habits to so they can use it for consumer preference data (I guess?) and in exchange they've kept track of like 80% of songs I've listened to, in my life, for the past 20 years.

The second is Timehop, which is only sort of a website (though they did build a web version at some point) but is really an "app" from possibly the golden age of "apps" AND simultaneously an "email service" from like... way before email services were a thing. But yes: Timehop notified you every day of your social media behavior from the same day in previous years. The thing was, it was very carefully determined which services you could fetch data from-- understandably; it's a big commitment to decide that there are enough users that would benefit from it to agree to acquire data, no matter the method, from various services that may or may not be amenable to the concept. So Timehop mostly supported things that were undeniably popular like Instagram or Twitter.

Backtracks provides a Timehop service for users of Last.fm. Once a week, you get an email that tells you what music you were "scrobbling" at the same time of the calendar year in previous years. For me, music listening is frequently very seasonal, so being reminded that I like to listen to [Overmono](https://overmono.bandcamp.com) in the summer is a very nice thing.

Building Backtracks taught me about being the solo author on a Ruby on Rails app, running jobs via Resque, deploying a Rails/Postgres/Redis setup to a VPS, using (multiple) email API providers, a little bit about abuse mitigation, and... it still works, more than ten years after launching it, at least when I don't crash my VPS from other projects I'm running on the same operating system.
