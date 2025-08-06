---
date: git Last Modified
title: My Personal Homepage
description: it's where I keep all my stuff!
---

<section class="front-page-feature">
{%- for project in collections.projectsWithFuzzing -%}
    <div>
        {%- if project.url %}
        <a href="{{project.url }}">
        {% endif -%}
            <img
                src="/sigils/empty.png"
                class="l sigil {{project.data.icon | default("blur-radial")}}"
                alt="a hand-drawn illustration of a {{project.data.icon | default("a circular dotted placeholder icon")}}"
            />
        {%- if project.url %}
        </a>
        {% endif -%}
    </div>
{%- endfor -%}
</section>

Welcome to my website! Above is a quick way to go see some of the stuff I've made. Check the menu up top for a more organized way of finding what you're looking for.
