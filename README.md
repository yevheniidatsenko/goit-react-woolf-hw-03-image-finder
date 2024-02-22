# Image Search Application

This project is a React-based image search application that utilizes the Pixabay
API to fetch images based on user input. It features components such as a search
bar, image gallery, loader, button for pagination, and a modal for enlarged
images.

## Components

- **Searchbar:** Renders a search bar with a text input field and a submit
  button.
- **ImageGallery:** Displays a list of image cards fetched from the Pixabay API.
- **ImageGalleryItem:** Represents an individual image card within the gallery.
- **Button:** Renders a button for loading more images when clicked.
- **Loader:** Displays a spinner while images are being loaded.
- **Modal:** Opens a modal window displaying an enlarged image from the gallery.

## Pixabay API Integration

The application fetches images from the Pixabay API using parameters like search
query, page number, API key, image type, and number of images per page.

## How to Run

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Start the development server using `npm start`.

## Technologies Used

- React.js
- Pixabay API
- CSS
