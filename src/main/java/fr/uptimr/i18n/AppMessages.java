package fr.uptimr.i18n;

import io.quarkus.qute.i18n.Message;
import io.quarkus.qute.i18n.MessageBundle;

@MessageBundle
public interface AppMessages {

    @Message("Welcome back")
    String welcomeBack();

    @Message("Enter your credentials to access your account")
    String enterCredentials();

    @Message("Enter your username")
    String enterUsername();

    @Message("Enter your password")
    String enterPassword();

    @Message("Sign in")
    String signIn();
}
