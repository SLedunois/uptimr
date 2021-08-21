package fr.uptimr.i18n;

import javax.enterprise.context.ApplicationScoped;
import javax.ws.rs.core.HttpHeaders;
import java.util.List;

@ApplicationScoped
public class I18N {
    static final String DEFAULT_LANGUAGE = "en";
    static final List<String> LANGUAGES = List.of(DEFAULT_LANGUAGE);

    private I18N() {
        throw new IllegalStateException("Utility class");
    }

    public static String getLocale(HttpHeaders headers) {
        var userLanguage = headers.getAcceptableLanguages().isEmpty() ? DEFAULT_LANGUAGE : headers.getAcceptableLanguages().get(0).getLanguage();
        return LANGUAGES.contains(userLanguage) ? userLanguage : DEFAULT_LANGUAGE;
    }
}
