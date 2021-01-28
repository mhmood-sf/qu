---
title: "GUI With JavaFX (2)"
date: 2020-04-24
draft: false
tags: 
  - tutorial
  - programming
---

This is part 2 of my tutorial on making a GUI application with JavaFX. [Part 1](/posts/gui-with-javafx-1) was mostly about setting up the project and using the Scenebuilder to create our interface. In this part, we're going to create a controller for our scene and use it to connect our application logic with the UI.

Right now, this is what my `./src` directory looks like:
```
src/
├─ main/
│   ├─ java/
│   │   └─ App.java
│   └─ resources/
│       └─ Login.fxml
└─ test/
    ├─ java/
    │   └─ AppTest.java
    └─ resources/

```

Open up the `App.java` file, and slap this code in:

```java
package project; // 1

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.stage.Stage;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;

// 2
public class App extends Application {
    
    // 3
    public static void main(String[] args) {
        launch(args);
    }

    // 4
    @Override
    public void start(Stage stage) throws Exception {        
        
        // 5
        FXMLLoader loader = new FXMLLoader();
        loader.setLocation(getClass().getResource("/Login.fxml"));
        Parent content = loader.load();

        // 6
        Scene scene = new Scene(content);
        stage.setScene(scene);
        stage.show();
    }
}

```

I'll quickly go over the code:

1. Package declaration (the name, of course, will be whatever you chose) followed by our imports.
2. Our App class must extend `javafx.application.Application`.
3. Our main method will call the launch method from `Application`, which then handles initializing and executing our code.
4. We override the start method from `Application`, which takes a `Stage` argument. This Stage is going to be the "main" window of our application.
5. We use the `FXMLLoader` class to load our Login.fxml file so that we can display its contents. Note the path given to the `getResource` method in this bit: `getClass().getResource("/Login.fxml")`. The slash at the beginning is important! It determines how and where JavaFX will look for our fxml file. I made a mistake here and spent a lot of time trying to fix it, so be careful! 
6. We take the contents we loaded in the last step, wrap them inside a `Scene`, set that scene onto our stage, and use `stage.show()` to finally display our GUI.

Now, use `./gradlew run` to compile and execute the program. If everything went well, you should see the window we built using the Scenebuilder. Nice.

![Login Form](/images/gui-with-javafx-2/LoginForm.png)

> Note: Depending on the version of Java you are using, you might see warnings like this in your console:
> `WARNING: Loading FXML document with JavaFX API of version 11.0.1 by JavaFX runtime of version 8.0.211`.
> It can probably be solved by updating Java or something, but even without that, everything so far has been 
> working as expected, at least for me.

Try typing in the input fields. Pretty nice, no? Now try pressing the Cancel and Submit buttons. Pretty neat, right? No, not neat. They don't do anything. Pressing cancel doesn't cancel it, and pressing submit doesn't submit it. Let's add a Controller and make that happen, then!

### Controllers

As I mentioned in the last post, Controllers are basically Java classes that can connect to our GUI and actually make stuff happen. It's best to try it out and see for yourself.

Go ahead and create a new java file alongside `App.java`. I've named mine `LoginController.java`. Here's the code for it:

```java
package project;

import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.TextField;
import javafx.application.Platform;

public class LoginController {

    @FXML private Button cancelBtn;
    @FXML private Button submitBtn;
    @FXML private TextField usernameField;
    @FXML private TextField passwordField;

    @FXML
    protected void handleCancelBtnAction() {

    }

    @FXML
    protected void handleSubmitBtnAction() {

    }

}

```

Note that our controller class does not need to extend or implement anything. You'll also notice that the bodies for our two methods are empty - that's because before we do that, we need to go back to our Login.fxml file in the Scenebuilder and assign IDs to the elements we're going to be needing access to in these methods. These IDs must match the names of the four fields we've declared in our controller - `cancelBtn`, `submitBtn`, `usernameField` and `passwordField`. JavaFX will then bind these to the corresponding elements in our GUI, allowing us to easily and directly access them when needed.

So go ahead and open up the fxml file in the Scenebuilder again. First, in the left sidebar, open up the "Controller" tab at the bottom. Then in the controller class field, write down the (full) name of our controller class. For me, it's `project.LoginController`. Then, select the TextField next to the "Username: " label, and in the right sidebar, open the Code tab at the bottom. The first field is its id. Enter "usernameField" into it. Make sure it matches the name of the field in our Controller class. Do the same for the password field, and the cancel and submit buttons.

![Username Field ID](/images/gui-with-javafx-2/UsernameFieldId.png)

With that, we've attached our controller class and its fields with the corresponding components in our GUI. Next, we need to implement the methods in the controller class, and attach them to the GUI as well. Here's the body for those methods:

```java
    @FXML
    protected void handleCancelBtnAction() {
        Platform.exit();
        System.exit(0);
    }

    @FXML
    protected void handleSubmitBtnAction() {
        String user = usernameField.getText();
        String pass = passwordField.getText();

        System.out.println("Username: " + user);
        System.out.println("Password: " + pass);

        usernameField.clear();
        passwordField.clear();
    }

```

For the `cancelBtn` action, I just decided to have it close and exit the program. For `submitBtn`, I'm going to have it simply print the username and password to the console, and then clear both fields.

> Of course, I realize now that passwords are supposed to be hidden and we're not supposed to treat them like this, but this is just an example so shhh!

Now that we've implemented the methods, we need to attach them to the GUI. The two actions we're going to implement occur with our two buttons, Submit and Cancel, so that's where we'll attach these methods. Open the Scenebuilder, select the Cancel button, open the Code tab, and scroll down to "Mouse" section. There, in the "On Mouse Clicked" field, enter the name of our method: `handleCancelBtnAction`. Do the same for the Submit button, and enter the name `handleSubmitBtnAction` for it.

![Submit Button Action](/images/gui-with-javafx-2/SubmitButtonAction.png)

That's it! If everything went well, you should see the Login form when you run `./gradlew run`, the app should close when you click the Cancel button, and when you click the Submit button, it should print out the contents of the two text fields, and then clear them (note: if you're using Gradle, the console might not show anything until you exit the program. I don't know why that happens, but there's probably a way to configure Gradle and fix that).

That's it for the tutorial as well! I'm also still learning how to use JavaFX, but I hope this'll prove useful to other beginners like me!

# 👋

