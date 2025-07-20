---
title: Projects
date: git Last Modified
---

{%- for project in collections.projects -%}

<section class="project-card">
    <img class="sigil {{project.data.icon | default("blur-radial")}}"/>
    <h2>{{project.data.title}}</h2>
    <div class="description">
    </div>
</section>
{%- endfor -%}
