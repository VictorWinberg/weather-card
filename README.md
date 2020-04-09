# Weather Card by [@VictorWinberg](https://www.github.com/VictorWinberg)

A fullscreen canvas overlay Weather Card with animations for Home Assistant Lovelace

[![GitHub Release][releases-shield]][releases]
[![GitHub Activity][commits-shield]][commits]

[![License][license-shield]](LICENSE.md)
[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg?style=for-the-badge)](https://github.com/custom-components/hacs)

## Options

| Name       | Type   | Requirement  | Description                                   | Default        |
| ---------- | ------ | ------------ | --------------------------------------------- | -------------- |
| type       | string | **Required** | `custom:weather-card`                         |
| entity     | string | **Required** | Home Assistant entity ID.                     | `none`         |
| name       | string | **Optional** | Card name                                     | `Weather Card` |
| title      | string | **Optional** | Title                                         | `Temperature`  |
| test_state | string | **Optional** | Override entity state. See [states](#states). | `none`         |

### States

Listed below are the states which are supported, however not all are implemented.
Hence, grouped by **implemented** and **to do**:

**Implemented**

- `rainy`
- `snowy`
- `snowy-rainy`
- `sunny`

**To Do**

- `clear-night`
- `cloudy`
- `fog`
- `hail`
- `lightning`
- `lightning-rainy`
- `partlycloudy`
- `pouring`
- `windy`
- `windy-variant`
- `exceptional`

### Examples of overlays
<img src="https://user-images.githubusercontent.com/9520959/78915118-bdb4b180-7a8b-11ea-98a7-6591ca51f609.gif" height="200"/><img src="https://user-images.githubusercontent.com/9520959/78915123-bee5de80-7a8b-11ea-82e7-3fd41ff44f5b.gif" height="200"/>

[commits-shield]: https://img.shields.io/github/commit-activity/y/VictorWinberg/weather-card.svg?style=for-the-badge
[commits]: https://github.com/VictorWinberg/weather-card/commits/master
[license-shield]: https://img.shields.io/github/license/VictorWinberg/weather-card.svg?style=for-the-badge
[releases-shield]: https://img.shields.io/github/release/VictorWinberg/weather-card.svg?style=for-the-badge
[releases]: https://github.com/VictorWinberg/weather-card/releases
