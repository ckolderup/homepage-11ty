---
title: Writing
description: some things I've written
date: git Last Modified
---

<div class="writing-intro">
<a href="https://motd.co">motd.co</a> is the website where most of the blogging I've done over the past ~15 years is consolidated, but below are links to mirrored copies of some of the bigger things I've written.
</div>

{%- for post in collections.writing -%}

<div class="writing-card">
    <div class="title"><a href="{{post.url}}"><h2>{{post.data.title}}</h2></a></div>
    <div class="date">{{post.data.date | writingDateFormat }}</div>
    <div class="description">{{post.data.description}}</div>
</div>
{%- endfor -%}
