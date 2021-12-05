import React from 'react';
import { Switch } from 'react-router';
import { useIntl } from 'react-intl';

export const LocalizedSwitch = ({ children }) => {
  /**
   * inject params and formatMessage through hooks, so we can localize the route
   */
  const { formatMessage, locale } = useIntl();

  /**
   *
   * @param path can be string, undefined or string array
   * @returns Localized string path or path array
   */
  function localizeRoutePath(path) {
    switch (typeof path) {
      case 'undefined':
        return undefined;
      case 'object':
        return path.map((key) => `/${locale}${key}`);
      default:
        const isFallbackRoute = path === '*';
        return isFallbackRoute
          ? `/${locale}/`          : `/${locale}${path}`;
    }
  }

  /**
   * Apply localization to all routes
   * Also checks if all children elements are <Route /> components
   */
  return (
    <Switch>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, {
              ...child.props,
              path: localizeRoutePath(child.props.path),
            })
          : child
      )}
    </Switch>
  );
};