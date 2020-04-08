# Weather Card by [@VictorWinberg](https://www.github.com/VictorWinberg)

A Weather Card for Home Assistant Lovelace custom cards

[![GitHub Release][releases-shield]][releases]
[![GitHub Activity][commits-shield]][commits]

[![License][license-shield]](LICENSE.md)
[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg?style=for-the-badge)](https://github.com/custom-components/hacs)

## Options

| Name              | Type    | Requirement  | Description                                 | Default             |
| ----------------- | ------- | ------------ | ------------------------------------------- | ------------------- |
| type              | string  | **Required** | `custom:weather-card`                       |
| name              | string  | **Optional** | Card name                                   | `Boilerplate`       |
| show_error        | boolean | **Optional** | Show what an error looks like for the card  | `false`             |
| show_warning      | boolean | **Optional** | Show what a warning looks like for the card | `false`             |
| entity            | string  | **Optional** | Home Assistant entity ID.                   | `none`              |
| tap_action        | object  | **Optional** | Action to take on tap                       | `action: more-info` |
| hold_action       | object  | **Optional** | Action to take on hold                      | `none`              |
| double_tap_action | object  | **Optional** | Action to take on hold                      | `none`              |

## Action Options

| Name            | Type   | Requirement  | Description                                                                                                                            | Default     |
| --------------- | ------ | ------------ | -------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| action          | string | **Required** | Action to perform (more-info, toggle, call-service, navigate url, none)                                                                | `more-info` |
| navigation_path | string | **Optional** | Path to navigate to (e.g. /lovelace/0/) when action defined as navigate                                                                | `none`      |
| url             | string | **Optional** | URL to open on click when action is url. The URL will open in a new tab                                                                | `none`      |
| service         | string | **Optional** | Service to call (e.g. media_player.media_play_pause) when action defined as call-service                                               | `none`      |
| service_data    | object | **Optional** | Service data to include (e.g. entity_id: media_player.bedroom) when action defined as call-service                                     | `none`      |
| haptic          | string | **Optional** | Haptic feedback for the [Beta IOS App](http://home-assistant.io/ios/beta) _success, warning, failure, light, medium, heavy, selection_ | `none`      |
| repeat          | number | **Optional** | How often to repeat the `hold_action` in milliseconds.                                                                                 | `non`       |

## Starting a new card from boilerplate-card

### Step 1

Clone this repository

### Step 2

Install necessary modules (verified to work in node 8.x)
`yarn install` or `npm install`

### Step 3

Do a test lint & build on the project. You can see available scripts in the package.json
`npm run build`

### Step 4

Search the repository for all instances of "TODO" and handle the changes/suggestions

### Step 5

Customize to suit your needs and contribute it back to the community

[commits-shield]: https://img.shields.io/github/commit-activity/y/VictorWinberg/weather-card.svg?style=for-the-badge
[commits]: https://github.com/VictorWinberg/weather-card/commits/master
[license-shield]: https://img.shields.io/github/license/VictorWinberg/weather-card.svg?style=for-the-badge
[releases-shield]: https://img.shields.io/github/release/VictorWinberg/weather-card.svg?style=for-the-badge
[releases]: https://github.com/VictorWinberg/weather-card/releases
