import React from 'react';
import { IntlProvider } from 'react-intl';
import appStrings from '../languages';
import { Route, Redirect, BrowserRouter } from 'react-router-dom';

const AppLanguage = {
  English: 'en',
  French: 'fr',
  Chinese: 'ch'
};

export const LanguageRouter = ({
  children
}) => (<BrowserRouter>
    <Route path="/:lang([a-zA-Z]{2})">
      {({ match, location }) => {
        /**
         * Get current language
         * Set default locale to en if base path is used without a language
         */
        const params = match ? match.params : {};
        const { lang = 'en' || AppLanguage.English } = params;

        /**
         * If language is not in route path, redirect to language root
         */
        const { pathname } = location;
        if (!pathname.includes(`/${lang}/`)) {
          return <Redirect to={`/${lang}/`} />;
        }

        /**
         * Return Intl provider with default language set
         */
        return (
          <IntlProvider locale={lang} messages={appStrings[lang]}>
            {children}
          </IntlProvider>
        );
      }}
    </Route>
  </BrowserRouter>
);