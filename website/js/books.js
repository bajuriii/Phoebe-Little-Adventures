const booksGrid =
    document.getElementById("books-grid");

storyPages.forEach((story, index) => {

    booksGrid.innerHTML += `

        <a href="story.html?id=${index}"
           class="book-card">

            <img
                src="${story.image}"
                alt="${story.title}">

            <h2>

                ${story.chapter}

            </h2>

            <p>

                ${story.title}

            </p>

        </a>

    `;

});

// Coming Soon Card
booksGrid.innerHTML += `

    <div class="book-card coming-soon">

        <h2>
            Coming Soon
        </h2>

        <p>
            More adventures are on the way!
        </p>

    </div>

`;