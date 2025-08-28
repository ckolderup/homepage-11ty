const { DateTime } = require("luxon");
const markdownIt = require("markdown-it");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginBundle = require("@11ty/eleventy-plugin-bundle");
const pluginNavigation = require("@11ty/eleventy-navigation");
const pluginCacheBuster = require("@mightyplow/eleventy-plugin-cache-buster");

const pluginDrafts = require("./eleventy.config.drafts.js");
const pluginImages = require("./eleventy.config.images.js");

const embeds = require("eleventy-plugin-embed-everything");
const slugify = require("slugify");
const he = require("he");
const fs = require("fs");
const path = require("node:path");

const OUTPUT_DIR = "build";

/** @param {import('@11ty/eleventy').UserConfig} eleventyConfig */
module.exports = async function (eleventyConfig) {
    const { EleventyHtmlBasePlugin } = await import("@11ty/eleventy");

    // Copy the contents of the `public` folder to the output folder
    // For example, `./public/css/` ends up in `_site/css/`
    eleventyConfig.addPassthroughCopy({
        "./public/": "/"
    });

    // Watch content images for the image pipeline.
    eleventyConfig.addWatchTarget("content/**/*.{svg,webp,png,jpeg}");

    // App plugins
    eleventyConfig.addPlugin(pluginDrafts);
    eleventyConfig.addPlugin(pluginImages);

    // Official plugins
    eleventyConfig.addPlugin(pluginRss);
    eleventyConfig.addPlugin(pluginSyntaxHighlight, {
        preAttributes: { tabindex: 0 },
    });
    eleventyConfig.addPlugin(pluginNavigation);
    eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
    eleventyConfig.addPlugin(pluginBundle);
    eleventyConfig.addPlugin(pluginCacheBuster({ outputDirectory: OUTPUT_DIR }));

    const { default: EleventyPluginOgImage } = (await import('eleventy-plugin-og-image'));

    eleventyConfig.addNunjucksAsyncShortcode('inlineImage', async (imagePath, imageMimetype) => {
        const base64Image = fs.readFileSync(path.join(eleventyConfig.directories.input, imagePath), { encoding: 'base64' });

        return `data:${imageMimetype};base64,${base64Image}`;
    });


    eleventyConfig.addPlugin(EleventyPluginOgImage, {
        previewMode: false, // reenable in order to test in dev
        satoriOptions: {
            width: 667,
            height: 350,
            fonts: [
                {
                    name: 'Public Sans',
                    data: fs.readFileSync('./public/fonts/PublicSans-Regular.woff'),
                    weight: 400,
                    style: 'normal',
                },
                {
                    name: 'Public Sans Bold',
                    data: fs.readFileSync('./public/fonts/PublicSans-Bold.woff'),
                    weight: 700,
                    style: 'normal',
                },
                {
                    name: 'Public Sans Italic',
                    data: fs.readFileSync('./public/fonts/PublicSans-Italic.woff'),
                    weight: 400,
                    style: 'italic',
                },
                {
                    name: 'Public Sans Bold Italic',
                    data: fs.readFileSync('./public/fonts/PublicSans-BoldItalic.woff'),
                    weight: 700,
                    style: 'italic',
                },
            ],
        }
    });

    // Bundle js snippets
    eleventyConfig.addBundle("js");
    // Bundle js tags
    eleventyConfig.addBundle("jstags");

    // Third party plugins
    eleventyConfig.addPlugin(embeds, {
        twitter: {
            options: {
                cacheText: true,
            },
        },
    });

    // Collections
    eleventyConfig.addCollection("writing", function (collectionApi) {
        return collectionApi.getFilteredByGlob("content/writing/*.md").reverse();
    });

    eleventyConfig.addCollection("projects", function (collectionApi) {
        return collectionApi.getFilteredByGlob("content/projects/*.md").reverse();
    });

    eleventyConfig.addCollection("projectsWithFuzzing", function (collectionApi) {
        const projects = collectionApi.getFilteredByGlob("content/projects/*.md");

        const result = new Array();
        while (projects.length > 0) {
            if (Math.random() > .33) {
                result.push(projects.pop());
            } else {
                result.push(null);
            }
        }

        return result;
    })

    // Filters
    eleventyConfig.addFilter("slug", (str) => {
        return slugify(he.decode(str), { remove: /[&,+()$~%.'":*?<>{}]/g });
    });

    eleventyConfig.addFilter(
        "urlEncodedTextOrPlaceholder",
        (templateProvidedText, placeholderText) => {
            return encodeURIComponent(
                templateProvidedText?.length > 0
                    ? templateProvidedText
                    : placeholderText
            );
        }
    );

    // Get the first `n` elements of a collection.
    eleventyConfig.addFilter("head", (array, n) => {
        if (!Array.isArray(array) || array.length === 0) {
            return [];
        }
        if (n < 0) {
            return array.slice(n);
        }

        return array.slice(0, n);
    });

    eleventyConfig.addFilter("default", (value, fallback) => {
        if (value) {
            return value;
        }

        return fallback;
    });

    // Return the smallest number argument
    eleventyConfig.addFilter("min", (...numbers) => {
        return Math.min.apply(null, numbers);
    });

    eleventyConfig.addFilter("truncate", (text, words, ellipsis) => {
        const wordsArray = text.split(" ").filter((token) => {
            return !(
                token.startsWith("<") ||
                token.startsWith(">") ||
                token.startsWith("http://") ||
                token.startsWith("https://")
            );
        });
        const wordCount = wordsArray.length;
        const ellipsisNeeded = ellipsis && wordCount > words;

        const startingText = wordsArray.slice(0, words).join(" ");
        if (startingText.length == 0) {
            return "(No text)";
        } else {
            return `${startingText}${ellipsisNeeded ? "…" : ""}`;
        }
    });

    eleventyConfig.addFilter("arrayLength", (collection) => collection.length);

    eleventyConfig.addFilter("stripTags", function (content) {
        let result = content;

        result = result
            .replace(/<\/(p|div|h[1-6]||ul|ol)>/gi, '\n')
            .replace(/<br\/?>/gi, '\n')
            .replace(/<li>/gi, '• ');

        result = result.replace(/<[^>]*>/g, '');

        result = result.replace(/&nbsp;/g, ' ');
        result = result.replace(/&amp;/g, '&');

        return result;
    });

    eleventyConfig.addFilter("writingDateFormat", (date) => {
        return DateTime.fromFormat(date, "yyyy-MM-dd").toFormat("dd MMMM yyyy");
    })

    const mdLib = markdownIt({
        breaks: true,
        html: true,
        xhtmlOut: true,
        linkify: true,
    })
        .enable(["newline"])
        .disable("code")
        .use(require('markdown-it-anchor'));



    eleventyConfig.addFilter("markdown", (text) => {
        return mdLib.render(text);
    });

    eleventyConfig.setLibrary("md", {
        render: (content) => {
            return he.decode(mdLib.render(he.decode(content || "")));
        },
    }); // run he.decode on content before markdown processing

    eleventyConfig.addShortcode("currentBuildDate", () => {
        return new Date().toISOString();
    });

    eleventyConfig.addLayoutAlias("default", "layouts/default.njk");

    return {
        // Control which files Eleventy will process
        // e.g.: *.md, *.njk, *.html, *.liquid
        templateFormats: ["md", "njk", "html", "liquid"],

        // Pre-process *.md files with: (default: `liquid`)
        markdownTemplateEngine: "njk",

        // Pre-process *.html files with: (default: `liquid`)
        htmlTemplateEngine: "njk",

        // These are all optional:
        dir: {
            input: "content", // default: "."
            includes: "../src", // default: "_includes"
            data: "../data", // default: "_data"
            output: OUTPUT_DIR,
        },

        // -----------------------------------------------------------------
        // Optional items:
        // -----------------------------------------------------------------

        // If your site deploys to a subdirectory, change `pathPrefix`.
        // Read more: https://www.11ty.dev/docs/config/#deploy-to-a-subdirectory-with-a-path-prefix

        // When paired with the HTML <base> plugin https://www.11ty.dev/docs/plugins/html-base/
        // it will transform any absolute URLs in your HTML to include this
        // folder name and does **not** affect where things go in the output folder.
        pathPrefix: "/",
    };
}
