### https://barindebnath.github.io/spacex/

# JS logic

## Get API call

- Created a funtion to get data from API.
- Passed filtering options as parameters.
- Updated URL query params every time get function is called.

## API call at first fold

- Used useEffect hook with empty array to call the get function on page load.
- Checked URL for query params and passed the same as parameters.

## Using filters

- Used useState hook to store filtering values.
- Used separate useEffect hook to check change in the filering values and called get function acordingly.

## Clear filter option

- Added an extra option that was not mentioned in the assignment, i.e to clear all the filters.
- The Clear Filter button can be located at the bottom of filter panel.

# CSS styles

- CSS module system is used for styling.
- The layout is same as the screenshots provided.
- The color scheme is changed.
- Grid and Flex are used with media query for responsiveness.
- Card skeleton is shown during API call.
