package fr.uptimr.bean;

import org.wildfly.security.password.PasswordFactory;
import org.wildfly.security.password.WildFlyElytronPasswordProvider;
import org.wildfly.security.password.interfaces.BCryptPassword;
import org.wildfly.security.password.spec.EncryptablePasswordSpec;
import org.wildfly.security.password.spec.IteratedSaltedPasswordAlgorithmSpec;

import java.security.Provider;
import java.security.SecureRandom;
import java.util.Base64;

public class Password {
    private String password;
    private String salt;
    public static int ITERATION_COUNT = 10;

    private static final Provider ELYTRON_PROVIDER = new WildFlyElytronPasswordProvider();

    public Password(String password) throws Exception {
        PasswordFactory passwordFactory = PasswordFactory.getInstance(BCryptPassword.ALGORITHM_BCRYPT, ELYTRON_PROVIDER);

        byte[] salt = new byte[BCryptPassword.BCRYPT_SALT_SIZE];
        SecureRandom random = new SecureRandom();
        random.nextBytes(salt);

        IteratedSaltedPasswordAlgorithmSpec iteratedAlgorithmSpec = new IteratedSaltedPasswordAlgorithmSpec(Password.ITERATION_COUNT, salt);
        EncryptablePasswordSpec encryptableSpec = new EncryptablePasswordSpec(password.toCharArray(), iteratedAlgorithmSpec);

        BCryptPassword original = (BCryptPassword) passwordFactory.generatePassword(encryptableSpec);

        Base64.Encoder encoder = Base64.getEncoder();
        byte[] hash = original.getHash();
        this.password = encoder.encodeToString(hash);
        this.salt = encoder.encodeToString(salt);
    }

    public String password() {
        return this.password;
    }

    public String salt() {
        return this.salt;
    }
}
