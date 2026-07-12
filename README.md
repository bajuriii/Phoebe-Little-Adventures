# Phoebe Little Adventures

Phoebe Little Adventures is a simple, responsive story-reading website for young readers. It uses plain HTML, CSS, and vanilla JavaScript, with Firebase Hosting for deployment.

## Features

- Landing page for the project.
- Bookshelf with story cards.
- Story reader with Previous and Next navigation.
- Favorites saved in `localStorage`.
- Favorites page showing only saved stories.
- Continue Reading support.
- Live search on the bookshelf.
- Per-story reading progress saved by story ID.
- Reading status badges and progress bars.
- Responsive design for desktop and mobile screens.

## Installation

1. Clone or download the project.
2. Open the project folder:

   ```bash
   cd Phoebe-Little-Adventures
   ```

3. Open `website/index.html` in a browser.

For Firebase Hosting, use the Firebase CLI from the project root:

```bash
firebase deploy
```

## Project Structure

```text
Phoebe-Little-Adventures/
|-- firebase.json
|-- README.md
|-- documents/
|-- prompts/
`-- website/
    |-- index.html
    |-- books.html
    |-- story.html
    |-- favorites.html
    |-- 404.html
    |-- css/
    |   `-- style.css
    |-- js/
    |   |-- books.js
    |   |-- story.js
    |   |-- story-data.js
    |   `-- app.js
    `-- images/
```

## Roadmap

- Add more Phoebe stories.
- Improve story artwork and covers.
- Add parent or teacher notes for each story.
- Prepare production content review before v1.0 release.
- Continue improving accessibility and mobile polish.
