const story07Metadata = {
    id: 7,
    slug: "the-lost-little-star",

    title: "The Lost Little Star",
    subtitle: "A bedtime story about kindness and friendship.",

    series: "Phoebe Little Adventures",
    version: "1.0.0",

    author: "Nefrando Taurus",
    illustrator: "AI Assisted",

    language: "en",

    publishedDate: "2026-07-13",

    status: "published",

    targetAge: {
        min: 3,
        max: 6
    },

    readingLevel: "Level 1",

    pages: 12,

    readingTime: "5 minutes",

    assetPath: "images/stories/story-07-the-lost-little-star",

    cover: "cover.webp",

    thumbnail: "cover.webp",

    images: [
        "page-01.webp",
        "page-02.webp",
        "page-03.webp",
        "page-04.webp",
        "page-05.webp",
        "page-06.webp",
        "page-07.webp",
        "page-08.webp",
        "page-09.webp",
        "page-10.webp",
        "page-11.webp",
        "page-12.webp"
    ],

    category: [
        "Adventure",
        "Bedtime"
    ],

    theme: [
        "Kindness",
        "Friendship",
        "Helping Others"
    ],

    tags: [
        "phoebe",
        "star",
        "bedtime",
        "kindness",
        "friendship"
    ],

    moral: "Even the smallest act of kindness can light up someone's world."
};

function getStoryAssetPath(metadata, fileName) {
    return `${metadata.assetPath}/${fileName}`;
}

const storyPages = [

    {
        chapter: "Chapter 1",
        title: "Phoebe Meets The Rainbow",
        image: "images/covers/chapter1.png",
        content:
        "One sunny morning, Phoebe saw a beautiful rainbow after the rain. She became curious and wondered where rainbows come from."
    },

    {       
        chapter: "Chapter 2",
        title: "Following The Colors",
        image: "images/covers/chapter2.png",
        content:
        "Phoebe followed the rainbow with excitement. She learned that every color has its own beauty and meaning."
    },

    {
        chapter: "Chapter 3",
        title: "The Rainbow Lesson",
        image: "images/covers/chapter3.png",
        content:
        "Phoebe learned that every color is special, just like every person in the world."
    },

    {
        chapter: "Chapter 4",
        title: "Phoebe and the Magic Cloud",
        image: "images/covers/chapter4.png",
        content:
        "One afternoon, Phoebe met a fluffy little cloud floating above the hills. The cloud taught her that helping others can make everyone happier."
    },

    {
        chapter: "Chapter 5",
        title: "Phoebe and the Friendly Bird",
        image: "images/covers/chapter5.png",
        content:
        "One morning, Phoebe met a little bird that had lost its way home. Phoebe helped the bird find its family and learned that kindness always comes back to us."
    },

    {
        chapter: "Chapter 6",
        title: "Phoebe Visits Grandma",
        image: "images/covers/chapter6.png",
        content:
        "Phoebe visited Grandma's little cottage. Grandma taught her that family is a treasure that should always be loved and appreciated."
    },

    {
        chapter: "Chapter 7",
        title: story07Metadata.title,
        subtitle: story07Metadata.subtitle,
        metadata: story07Metadata,
        image: getStoryAssetPath(
            story07Metadata,
            story07Metadata.thumbnail
        ),
        content:
        "One peaceful evening, Phoebe looked up at the sparkling night sky. Hundreds of little stars twinkled above her.",
        pages: [
            {
                image: story07Metadata.images[0],
                content:
                "One peaceful evening, Phoebe looked up at the sparkling night sky. Hundreds of little stars twinkled above her."
            },
            {
                image: story07Metadata.images[1],
                content:
                "Suddenly, one tiny star slipped from the sky. It landed softly beside Phoebe."
            },
            {
                image: story07Metadata.images[2],
                content:
                "The little star was crying. \"I can't find my way home.\" Phoebe smiled kindly."
            },
            {
                image: story07Metadata.images[3],
                content:
                "\"Don't worry,\" said Phoebe. \"I'll help you.\" The little star smiled again."
            },
            {
                image: story07Metadata.images[4],
                content:
                "Together, they walked into the magical forest. Fireflies danced around them."
            },
            {
                image: story07Metadata.images[5],
                content:
                "A wise old owl watched from a tree. \"I know the way,\" the owl said."
            },
            {
                image: story07Metadata.images[6],
                content:
                "The owl pointed toward a glowing hill. \"Follow the light.\" Phoebe thanked the owl."
            },
            {
                image: story07Metadata.images[7],
                content:
                "Phoebe climbed the hill. The little star began shining brighter and brighter."
            },
            {
                image: story07Metadata.images[8],
                content:
                "At the top of the hill, the little star slowly floated into the sky. A beautiful beam of light surrounded it."
            },
            {
                image: story07Metadata.images[9],
                content:
                "The little star found its family. The whole night sky sparkled brightly. Phoebe smiled happily."
            },
            {
                image: story07Metadata.images[10],
                content:
                "The little star twinkled as if saying, \"Thank you, Phoebe.\" Phoebe waved goodbye."
            },
            {
                image: story07Metadata.images[11],
                content:
                "Phoebe walked home with a happy heart. She knew that helping others made the world brighter. The End."
            }
        ]
    },

    {
        chapter: "Chapter 8",
        title: "The Kindness Garden",
        image: "images/covers/chapter8.png",
        content:
        "Phoebe planted flowers with her friends. She discovered that acts of kindness grow just like beautiful flowers in a garden."
    },

    {
        chapter: "Chapter 9",
        title: "The Picnic Adventure",
        image: "images/covers/chapter9.png",
        content:
        "Phoebe and her family enjoyed a picnic in the park. She learned that simple moments together create wonderful memories."
    },

    {
        chapter: "Chapter 10",
        title: "Phoebe's Big Surprise",
        image: "images/covers/chapter10.png",
        content:
        "Phoebe prepared a special surprise for her friends. She learned that sharing joy makes celebrations even more meaningful."
    },
];

