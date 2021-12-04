import React from 'react';
import { Menu, MenuButton, MenuList, MenuItem, Button} from '@chakra-ui/react';
import { useLocation, useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';


const AppLanguage = {
  English: 'en',
  French: 'fr'
};

const Mapping = {
  'en': 'English',
  'fr': 'French'
}

export const LanguageSwitcher = () => {
  const { pathname } = useLocation();

  const history = useHistory();

  const { locale } = useIntl();

  function getMatchingRoute(language) {
    /**
     * Get the key of the route the user is currently on
     */
    const matchingRoute = pathname.substring(3); // remove local part '/en' from the pathname /en/contact

    /**
     * Find the matching route for the new language
     */

    /**
     * Return localized route
     */
    return `/${language}` + matchingRoute;
  }

  return (
    <Menu>
  {({ isOpen }) => (
    <>
      <MenuButton colorScheme="green" variant="outline" isActive={isOpen} as={Button}>
        {Mapping[locale]}
      </MenuButton>
      <MenuList>
        {Object.keys(AppLanguage).map((lang) =>(
          <MenuItem key={lang} onClick={() => history.push(getMatchingRoute(AppLanguage[lang]))}>{lang}</MenuItem>
        ))}
      </MenuList>
    </>
  )}
</Menu>
  );
};