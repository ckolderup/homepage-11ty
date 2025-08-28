---
title: Projects
description: some projects I've worked on
date: git Last Modified
---

<div class="projects-intro">
I like to make stuff in some portion of my free time, usually on the open web. Here's my "portfolio", I guess, from newest to oldest.
</div>

{%- for project in collections.projects -%}

<div class="project-card">
    <a href="{{project.url}}"><img class="sigil {{project.data.icon | default("blur-radial")}}"/></a>
    <a href="{{project.url}}"><h2>{{project.data.title}}</h2></a>
    <div class="description">{{project.data.description}}
    </div>
</div>
{%- endfor -%}
