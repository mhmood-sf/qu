---
title: "Theming With CSS Variables"
date: 2020-05-12
tags: 
- tutorial
- programming
---

A few months ago I thought to myself, "I should make a real-time chatting web application". So I added that to my growing list of ongoing projects, and started working on it after convincing a few other friends to join me. I started this project partly because after learning programming for so long, I wanted to give myself a bigger challenge, and test my skills by trying to build a proper (like a *proper*) application. The rest of it was because I was itching to try out [Elixir](https://elixir-lang.org), the hip new concurrency-based functional programming language that runs on the BEAM VM (might make a post on it sometime). With Elixir comes the excellent web framework [Phoenix](https://www.phoenixframework.org). While trying to figure out my way around Phoenix and its [MVC pattern](http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller), I kept struggling with the layouts and HTML templates and the static js/css assets. I realized how little I knew about front-end web development and design. 🙁

Now I *have* done some of the exercises and lessons on freecodecamp, but that was a long time ago and I'd forgotten most of it. So I went back to freecodecamp, did a few lessons on HTML and CSS, then tried this website and that blog-post and other tutorials while trying to familiarize myself with latest best practices. And then I stumbled across variables in CSS! *Native* variables in CSS!

This means we can make our CSS even more DRY. This means more maintainable code. It also makes development and testing easier, and makes it easy to do cool stuff like adding themes to our webpage. Yes, that's what this blog post is about. Finally.

---

For this tutorial, we're going to make a simple sign-up page with a button at the top that let's the user switch from the default light-mode to a dark-mode theme, using CSS variables. First, the html (I'm just throwing all of the html here so there's less back and forth between this and the css):

```html
<!DOCTYPE html>
<html>
<head>
    <title>Sign up!</title>
    <link rel="stylesheet" type="text/css" href="./style.css"/>
</head>

<body>
    <div class="container">
        <div id="toggle-theme">🌓</div>

        <form class="border-primary">
            <div id="formheading">
                <h2>👋 Sign up</h2>
            </div>
            <div id="formdata">
                <input placeholder="Username">
                <input type="password" placeholder="Password">
                <input type="email" placeholder="Email">
                <button class="border-primary">Sign up</button>
            </div>
            <h5>Already have an account? <a href="#">Sign in!</a></h5>
        </form>
    </div>

    <script src="./index.js" type="text/javascript"></script>

</body>
</html>
```

It's basic stuff, we're just defining the layout.

I've also been learning Flexbox and how to make stuff responsive, so we'll use flex to align our content, and `vh`/`vw` for size units in our CSS.

> If you're in a hurry, you can just copy/paste all the css and html given below, and move on to the [CSS Variables](#css-variables) section to learn about CSS variables.

For now, we're just going to start off by adding some basic CSS, so create a `style.css` file next to your html file:

```css
body {
    margin: 0;
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: white;
}

```

We use flexbox to center our container both vertically (align-items) and horizontally (justify-content).

After that, we style the form element:

```css
form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 2vh 2vw 4vh 2vw;
    min-width: 25vw;
    min-height: 30vh;
    border-width: 1vh;
    border-radius: 5vh;
}

```

Again, we use flexbox to align its contents, set the borders and padding for it, and the min-height and min-width to make sure it resizes properly.

Next, we have the two `#formheading` and `#formdata` elements inside our form:

```css
#formheading {
    display: flex;
    flex-direction: row;
    padding-bottom: 2vh;
}

#formdata {
    display: flex;
    flex-direction: column;
}

```

For the `#formheading`, the flex-direction is set to row so that any other text elements added will show horizontally. For `#formdata`, it's set to column so that our input fields show up stacked properly.

Now the input fields:

```css
input {
    padding: 1vh 1vw;
    margin-bottom: 1vh;
    font-family: sans-serif;
    background-color: transparent;
    color: #333;
    border-style: solid;
    border-width: 0 0 0.5vh 0;
    border-color: lightgrey;
}

input:focus {
    border-color: lightgreen;
}

```

We set their padding and borders, and have the border change colors when it's focused.

Next we'll style the button:

```css
button {
    padding: 1vh 1vw;
    margin-top: 2vh;
    font-weight: bold;
    max-width: 30%;
    font-family: sans-serif;
    color: #333;
    background-color: transparent;
    border-radius: 1.5vh;
    cursor: pointer;
}

button:active {
    background-color: lightgreen;
}

```

Very similar to the input fields - we style the borders, add some padding, colors, make it change colors when clicked and so on.

If you noticed in the html, our button element and our form element both have a `border-primary` class too, for styling their borders, so let's do that too:

```css
.border-primary {
    border-style: solid;
    border-color: lightgreen;
}

```

Let's also style the text content of our page, and give it some colors:

```css
h2,
h5 {
    color: lightgreen;
    font-family: sans-serif;
}

a {
    color: green;
    text-decoration: none;
}

```

Finally, the CSS for our `#toggle-theme` button:

```css
#toggle-theme {
    position: fixed;
    top: 1vh;
    left: 1vw;
    font-size: 4vh;
    cursor: pointer;
}

```

Alright! That's our HTML and CSS done. Now we can start adding CSS variables and, with a few lines of javascript, we'll be able to click our toggle theme button and switch between light-mode and dark-mode.

### CSS Variables

Variables in CSS are, of course, a little different from variables in other *programming* languages. They're prefixed with two hyphens, like so: `--my-variable`. The syntax for defining variables is easy enough:

```css
html {
    --my-variable: value;
}
```

The value can be any standard CSS value, like a font family or size or color and so on.

After defining your variables, you need to use the `var()` function to access them:

```css
html {
    property: var(--my-variable);
}
```

> I know, it's pretty funky syntax, especially when you've got lots of variables in your css (and even more so when you're using variables as fallbacks to variables), but at least the usefulness far outweighs this.

You'll notice in the first example that the variable has been defined inside the block for the `html` element. This is important, because, like other programming languages, variables in CSS also have scopes. Variables need to be defined in a certain scope, and then they can be used anywhere within that scope. In the example above, the scope is `html`, and so `--my-variable` can be used within that element and all its children as well.

Since you'll often be using the same variables throughout your entire stylesheet, it is common to ([according to MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)) define them on the `:root` pseudo-class:

```css
:root {
    --font: Roboto;
}

h1 {
    font-family: var(--font);
}

```

The `var()` function also lets you define fallback values in case something goes wrong with applying the actual value of the variable, which is pretty useful:

```css
:root {
    --font: Roboto;
}

h1 {
    font-family: var(--font, sans-serif);
}

h2 {
    font-family: var(--font, serif);
}

```

In this example, if the font `Roboto` isn't available, then it will fall back to the values we've given - `sans-serif` for h1, and `serif` for h2.

Now let's use all this to (finally) start adding the dark-mode theme to our sign up page. First we define some variables on the `:root` pseudo-class:

```css
:root {
    /* Default theme variables */
    --bg-color: white;
    --inactive-border: lightgrey;
    --font-color: #333;

    --primary-color: lightgreen;
    --secondary-color: green;
    --primary-font: Roboto;
    --secondary-font: Roboto;
}

```

Using this, we've defined the variables for our "default" theme - light-mode in this case. Aside from the default theme variables, I also decided to define variables for the primary, secondary colors and fonts on our page. This is also really useful because it lets you easily test different color schemes and see which ones work, or even create multiple color schemes for different themes.

Now that we've defined our variables for the default theme, we need to apply these variables throughout our stylesheet. Replace all the `lightgreen`s with `var(--primary-color)`, all the `green`s with `var(--secondary-color)`, and so on. If you're a lazy programmer, you can use your editor's Find and Replace function to do this quickly for all the variables we've defined, or if you're a hard-working programmer, you can do it one by one for each rule.

Once that's done, open the html page in your browser to make sure it looks the same as before. If it does, good job, the variables work properly. If it doesn't, then you've probably made some typo that needs to be fixed.

### Adding the dark-mode

The way our dark-mode will work is that our variable definitions for dark-mode colors will go inside the scope of the `.dark-mode` class. This way, when we add the `dark-mode` class to our page container, all the elements using the "default" light-mode values from variables defined in the `:root` scope will switch to the values defined in the `.dark-mode` scope.

Here's the CSS for that:

```css
/* Dark theme variables */
.dark-mode {
    --bg-color: #333;
    --inactive-border: darkgrey;
    --font-color: #ddd;
}

```

If you go back to your html and add the `.dark-mode` class to the container div and open the page in your browser, you should be able to see the page in our newly-defined dark-mode theme. Cool!

The last thing left now is the javascript that allows us to toggle the theme with the button on the top-left corner. Here's the js for that:

```js
const themeBtn = document.querySelector("#toggle-theme");

themeBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
});

```

It's pretty simple: we select the toggle-theme button, and add a listener for the click event which toggles the dark-mode theme from its classList. Open up the page in your browser again and test it out!

The full code for this is on codepen.io:
https://codepen.io/quantomistro/pen/RwWpEmO

# 👋

