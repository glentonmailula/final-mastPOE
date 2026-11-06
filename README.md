# Chef's Menu Manager

## Part 3 Changelog

The following changes were implemented since Part 2:

### Menu Item Management
- Added the ability to edit existing menu items.
- Added functionality to update menu item information.
- Added the ability to delete menu items.
- Added a confirmation message before deleting a menu item.
- Changes to menu items are reflected immediately in the application.

### Search and Filter
- Added a search bar to allow users to search for menu items by name.
- Added course filters to help users view menu items by category.
- Added a clear search and filters option to return to the full menu.
- The displayed menu items update based on the search and selected filter.

### Menu Statistics
- Added the total number of menu items.
- Added the average price of all menu items.
- Added the number of menu items available in each course.
- Statistics update when menu items are added or removed.

### User Experience Improvements
- Added success messages when menu items are added, updated, deleted, or when availability is changed.
- Added validation to ensure that users enter valid menu item information.
- Improved navigation between the menu list, item details, add item, and edit item screens.
- Maintained a consistent design and layout throughout the application.

## Refactoring

The following changes were made to improve the quality and organisation of the code:

- Created reusable components, including MenuCard, StatisticCard, StatTile, and Field.
- Created reusable functions to reduce repeated code, such as showNotice and clearFilters.
- Organised the application into separate components for the menu list, menu form, menu details, and wireframe gallery.
- Used meaningful variable and function names to make the code easier to understand.
- Used shared category information and labels from the types file.
- Improved form validation and error feedback.
- Reused styling and components where possible to maintain a consistent user interface.

## How to Run the Application

1. Open the project folder in Visual Studio Code.
2. Open the terminal.
3. Install the required dependencies by running:

npm install

4. Start the application by running:

npm run dev

5. Open the local link displayed in the terminal to view the application.

## Technologies Used

- React
- TypeScript
- HTML
- CSS

## Summary

Part 3 focused on improving the functionality, code quality, and user experience of the Chef's Menu Manager application. The application now allows users to manage menu items, search and filter the menu, view useful statistics, and receive clear feedback when performing actions.