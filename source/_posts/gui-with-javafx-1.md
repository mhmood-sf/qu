---
title: "GUI With JavaFX (1)"
date: 2020-04-12
draft: false
tags: 
  - tutorial
  - programming
---

For International Baccalaureate (IB) students, around 20% of their grade (i think?) depends on their Internal Assessments (IAs) in each course. Each course has its own requirements for the IA. For Computer Science students, the IA is basically finding a "client" with problem X and then building a program to solve that problem for them - an exercise in software development. Now at any given time, I usually have a list of cool ideas and programs I want to build someday to make the world a happier place - but none of them were risk-free enough for an assignment that would account for 20% of my final grade. So I decided to go with the flow and do something similar to what my fellow classmates were doing - a basic CRUD program in Java, using a MySQL database, hooked to a GUI built with Swing.

Except, that's not exactly what I did - I've already tried (and failed 🙁) on multiple occasions to build a native GUI application, so I've already looked at some of the options available out there for building GUIs. I'd heard of both Swing and JavaFX, and had been told that JavaFX is Swing's successor. So I decided to use JavaFX instead. The program itself (for my IA) is far from finished, and there's still lots that I don't understand about JavaFX - but, slowly yet surely, I'm getting the hang of it. This post is going to be part-tutorial and part-me-talking-about-what-I-achieved trying to use JavaFX.

### Setup

Here's what I'm using for my development:

- Java 8 (up to 11 should also be fine, I think)
- Visual Studio Code
- Gradle (v5.6.2)
- Gluon SceneBuilder

You should probably already have Java installed, if you're reading this article. I prefer to use VSCode for most of my development, so I won't be using Eclipse or IntelliJ. If you use either of those, you probably won't need a build tool like Gradle. Gluon SceneBuilder is a GUI app for, well, building the scenes (or the interfaces) for our JavaFX application. It'll make life easier for us. You can install it [here](https://gluonhq.com/products/scene-builder/). If you also decided to use Gradle, you can find out how to install it from [here](https://gradle.org/install/).

### Creating a Gradle project

> If you're using an IDE like Eclipse or IntelliJ, you can skip the Gradle-specific parts.

Create a directory for your project, `cd` into it and run `gradle init`. It'll ask you stuff about your project:

```
λ > gradle init
Select type of project to generate:
  1: basic
  2: application
  3: library
  4: Gradle plugin
Enter selection (default: basic) [1..4] 2

Select implementation language:
  1: C++
  2: Groovy
  3: Java
  4: Kotlin
  5: Swift
Enter selection (default: Java) [1..5] 3

Select build script DSL:
  1: Groovy
  2: Kotlin
Enter selection (default: Groovy) [1..2] 1

Select test framework:
  1: JUnit 4
  2: TestNG
  3: Spock
  4: JUnit Jupiter
Enter selection (default: JUnit 4) [1..4] 1
Enter Project name (default: project): project
Enter source package (default: project): project

```

The type of project will be 'application' - option 2. This will generate some useful gradle tasks for us. The implementation language is, obviously, java. The build script DSL I'm using is Groovy - if you have no idea what this is for, then you should probably choose groovy as well because it's not very relevant here. The test framework isn't very relevant either, because tests don't matter (obviously joking - they just don't matter *right now*. Please make sure you write proper tests for all your code!).

It'll also ask for your project name and source package. The defaults should be fine.

Once that's done, it'll generate a few files and sub-directories:

```
project/
├─ .gradle/
│   └─ (... gradle stuff)
├─ gradle/
│   └─ (... more gradle stuff)
├─ src/
│   ├─ main/
│   │   ├─ java/
│   │   │   └─ App.java
│   │   └─ resources/
│   └─ test/
│       ├─ java/
│       │   └─ AppTest.java
│       └─ resources/
├─ .gitignore
├─ build.gradle
├─ gradlew
├─ gradlew.bat
└─ settings.gradle

```

There's build files and settings files and some other directories gradle uses, but we mostly won't need to concern ourselves with those. We'll be working in the `src/main` directory most of the time.


### Using the SceneBuilder

Now is probably a good time to introduce JavaFX's idea of 'stages' and 'scenes' - a 'stage', as far as I understand, represents a 'window', on top of which you have 'scenes' which describe your interface. You can use the SceneBuilder to create and edit these scenes. The SceneBuilder will then output .fxml files (XML that describes the interface, similar to HTML) for these scenes, and you can then use Java to load these scenes into your JavaFX stage, to be displayed to the user. We'll get to that part later on. Right now, we're going to create a simple scene for ourselves using the SceneBuilder.

Fire up the SceneBuilder, and choose 'New Project'. You'll see a few options you can start with - empty, basic and complex for desktop, and then empty and basic for mobile. For now, just go ahead and choose the empty option at the beginning.

![Scenebuilder Project Options](/images/gui-with-javafx-1/Layout_Options.png)

You should see two sidebars on your left and right, and then your GUI in the middle. On the left sidebar, under 'Library', you'll see lots and lots of the components that JavaFX provides for you to build your interface. This includes stuff like input fields, labels, buttons, panes, and so on. There's also a handy search bar for these at the top. After that, under 'Document' you'll see your hierarchy - basically, how your GUI components are structured in the underlying FXML. There's also a 'Controller' tab below that - this is for our Java code associated with this scene. Usually, you'll have a controller for each scene. This helps us nicely organize our UI and logic.

![Left Sidebar](/images/gui-with-javafx-1/Left_Sidebar.png)

Then, on the right sidebar, you have the 'Inspector' tab, which will show you the properties, layout and associated code for the selected component.

![Right Sidebar](/images/gui-with-javafx-1/Right_Sidebar.png)

### A simple login form

For this example, we'll build a very very simple login form. Go to the Library, look for 'VBox', and drag it to the center. It should also show up in your hierarchy on the left sidebar.

![Select VBox](/images/gui-with-javafx-1/Select_VBox.png)

One cool thing about JavaFX is that, aside from being able to use FXML to describe your interface, it also allows us to use CSS to style our elements. The Scenebuilder allows us to easily add, edit and remove the CSS rules for our elements. Let's try that out by giving our form a dark theme.

First, select the VBox element we just added to the hierarchy. You should see all its properties in the right sidebar. Go to the 'JavaFX CSS' section, and click the input field under 'Style'. Select `-fx-background-color` from the drop-down menu that pops up (if it doesn't, just type it in). Then on the right, enter the value for this property. I went with `#333333`. You should see the GUI in the middle update as well.

![Set Background Color](/images/gui-with-javafx-1/Set_Bg_Color.png)

Next, go to the library and look for 'HBox', and add it to your hierarchy. By now, you should be wondering what 'HBox' and 'VBox' are. I'm pretty sure the V and H stand for vertical and horizontal, and they're both really really useful for aligning stuff in your interface. In this example, we used 'VBox' at the root because all our elements are going to be stacked vertically in the form. Each element in this 'stack' is going to be wrapped inside an 'HBox' element, which will easily let us handle the horizontal alignment for that element.

Right now, our hierarchy contains just one VBox, and an HBox inside that. Go look for a 'Label' in the library and add it under the 'HBox'. Select the newly added label, go to its properties and change the text content to 'Login', the font size to 56, the text fill to white, and choose a font family for it (I'm using Consolas). Then, select the HBox element that the label is wrapped inside, and set its 'Alignment' property to 'CENTER'.

![HBox Alignment](/images/gui-with-javafx-1/HBox_Alignment.png)

This should center the 'Login' text horizontally. While we're at it, why don't we properly align our VBox element as well: select the VBox at the root, go to properties and set its alignment to 'CENTER' as well.

Now you'll notice we have a lot of empty space at the top and bottom. Let's fix that: select the VBox, go to 'Layout' on the right sidebar, scroll down to the 'Size' section, and set the 'Pref Width' and 'Pref Height' properties to 'USE_COMPUTED_SIZE'. This way, its height and width will be set to however much is needed by the elements nested inside it.

![VBox Layout](/images/gui-with-javafx-1/VBox_Layout.png)

Enough about that, let's move on with our form. Add another HBox element under VBox. Set its alignment to 'CENTER' as well. Then, add a Label element and a TextField element inside it. Set the Label content to 'Username: ', change its color to white, and choose an appropriate font size and family. Then, select the label and go to 'Layout' on the right sidebar. In the 'VBox Constraints' section at the top, you'll see a 'Margin' property. Edit the values to set the distance between the label and the TextField. Then, go to hierarchy, open the context menu for the HBox and duplicate it for a 'Password' field (change the text content of the second label to 'Password: '). Set the margins as appropriate. After that, add another HBox element, and then two Button elements under that. Set the HBox alignment to 'CENTER_RIGHT' this time. Change the content of one Button to 'Cancel' and the other to 'Submit'. Again, set the margins for the buttons as appropriate.

Here's what mine looks like:
![Final interface](/images/gui-with-javafx-1/Final_Interface.png)

That's it for our interface! The toolbar at the top has an option to preview the window (or use the shortcut Ctrl+P). Now, save the file into the `./src/main/resources` directory as 'Login.fxml'. The `src/main/resources` directory is where we'll be storing the .fxml file(s) for our program.

This turned out to be longer than I had expected, so I'm just gonna split this into two parts. In the next part, we'll get to setting up a controller for our scene, and using it to glue together our application logic with the interface.

# 👋

