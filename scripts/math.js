"use strict";

const katex = require("katex");

// Register tag for inline math.
hexo.extend.tag.register("$", (args, content) => {
    return katex.renderToString(content, { displayMode: false });
}, true);

// Display math
hexo.extend.tag.register("$$", (args, content) => {
    return katex.renderToString(content, { displayMode: true });
}, true);

