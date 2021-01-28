---
title: "Starting a blog"
date: 2019-07-15
draft: false
tags: 
  - meta
---

Sometime during 2018 I had the very original idea of starting my own blog. So, I started one, and then forgot about it, and now I've started another one. Thankfully, my previous experience had taught me just how hard it can be to think of new ideas for blog posts, which is why I came prepared this time.

### For my first blog post, I'll be talking about how I set up this blog.

My *first* blog was made with [WordPress](https://wordpress.com). It wasn't the most pleasant experience for me. Don't get me wrong, WP has its benefits. A simple interface, plenty of themes, and lots of other bells and whistles for your blogging site. But WP didn't seem right to me. It's very easy to get carried away with all those plugins, themes, stats and whatnot. Oftentimes it also felt rather slow and limiting. All I wanted was a place to put my opinions, quickly and easily, without sacrificing too much flexibility or control.

### Enter GitHub Pages

Around that time I was also getting myself familiar with GitHub so that I could show off my spaghetti code to the rest of the world. That's when I found out about [GitHub Pages](https://pages.github.com/), a static site hosting service. Not having to mess with databases and being able to edit my site locally sounded cool, so I decided to give blogging another try, using GitHub Pages this time.

### Static site generators

Static site generators are just that: programs to generate your static site for you, ready to be published to your hosting service. There are several good ones out there, with [Jekyll](https://jekyllrb.com/) being the one that sticks out most. It's popular and recommended by GitHub Pages, and I'm sure it's nice and all but it's built on Ruby and I didn't feel like installing Ruby on my machine so I decided to use [Pelican](https://blog.getpelican.com/) instead, which is built on Python (which I had already installed). I was admittedly a bit confused at first, but managed to pull together a nice-looking static site after going through some good tutorials like [this one](https://fedoramagazine.org/make-github-pages-blog-with-pelican/) and [this one](https://www.fullstackpython.com/blog/generating-static-websites-pelican-jinja2-markdown.html).

Everything was nice for a few days until I wanted to change my theme and get a better one. You can find lots of themes for pelican [here](http://pelicanthemes.com/), but none of them clicked for me, so I decided to switch to [Hugo](https://gohugo.io) after hearing good things about it from a friend. Hugo's praise was well-deserved. It comes as a standalone binary, is extremely fast and configurable, and has a ton of pretty themes you can browse over [here](https://themes.gohugo.io). I went through plenty of them and picked out [hermit](https://themes.gohugo.io/hermit/) as my favorite, which is the current theme for this blog (as of the writing of this post).

You can learn how to set up your blog using Hugo [over here](https://blog.appernetic.io/2016/04/09/how-to-set-up-a-static-hugo-website-on-github-pages-in-2-minutes/), and you can learn more about using GitHub Pages [over here](https://guides.github.com/features/pages/). Here's another handy link if you feel like [switching from WordPress to Hugo](https://www.smashingmagazine.com/2019/05/switch-wordpress-hugo/)!

(I'm not being paid by Hugo or anything, I just really like using it)

---

Hugo was great, but the templating language was a bit wonky and I didn't find it very user-friendly when trying to create my own custom theme. I have switched to [Hexo](https://hexo.io) now; it's not as fast, and support is not as readily available as for Hugo or Jekyll, but it is still quite good and is based on JS which is more familiar to me.

# 👋

