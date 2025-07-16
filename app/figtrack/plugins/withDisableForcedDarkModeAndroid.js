

const {createRunOncePlugin, withAndroidStyles, AndroidConfig } = require('expo/config-plugins')

function setForceDarkModeToFalse(styles) {
  const newStyles = AndroidConfig.Styles.assignStylesValue(styles, {
    add: true,
    // TODO: AndroidConfig.Styles.getAppThemeGroup() will be available in SDK 52 (or expo/config-plugins 9+), for now I just hardcoded AppTheme
    // parent: AndroidConfig.Styles.getAppThemeGroup(),
    parent: { name: 'AppTheme' },
    name: `android:forceDarkAllowed`,
    value: 'false',
  })

  return newStyles
}

const withDisableForcedDarkModeAndroid = (config) => {
  return withAndroidStyles(config, (config) => {
    config.modResults = setForceDarkModeToFalse(config.modResults)
    return config
  })
}

module.exports = createRunOncePlugin(
  withDisableForcedDarkModeAndroid,
  'disable-forced-dark-mode',
  '1.0.0'
)