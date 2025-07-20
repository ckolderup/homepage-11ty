---
date: git Last Modified
---

<section class="front-page-feature">
{%- for project in collections.projects -%}
    <div>
        <a href="{{project.url}}">
            <img
                src="/sigils/empty.png"
                class="l sigil {{project.data.icon | default("blur-radial")}}"
                alt="a hand-drawn illustration of a {{project.data.icon | default("a circular dotted placeholder icon")}}"
            />
        </a>
    </div>
{%- endfor -%}
</section>

Welcome to my website! Above is a quick way to go see some of the stuff I've made. Check the menu up top for a more organized way of finding what you're looking for.
