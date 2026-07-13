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
		content: `
		One peaceful evening, Phoebe stood on a grassy hill and gazed up at the sparkling night sky. Hundreds of tiny stars twinkled like little diamonds above the quiet valley. The bright moon smiled gently from the sky as a cool breeze danced through the colorful flowers. Phoebe loved looking at the stars because they always made her feel calm, happy, and full of wonder.
		`	,
		pages: [
        {
            image: story07Metadata.images[0],
            content: `
		One peaceful evening, Phoebe stood on a grassy hill and gazed up at the sparkling night sky. Hundreds of tiny stars twinkled like little diamonds above the quiet valley. The bright moon smiled gently from the sky as a cool breeze danced through the colorful flowers. Phoebe loved looking at the stars because they always made her feel calm, happy, and full of wonder.
		`
        },
        {
            image: story07Metadata.images[1],
            content: `
		As Phoebe admired the beautiful night sky, something amazing happened. One tiny golden star suddenly slipped away from the others, leaving behind a trail of sparkling light. It floated gently through the air like a glowing feather before landing softly on the grass beside her. Phoebe's eyes grew wide with surprise as she carefully stepped closer to see what had happened.
		`
        },
        {
            image: story07Metadata.images[2],
            content: `
		The little star looked very sad. Tiny glowing tears rolled down its shining face as its soft light flickered gently. "I can't find my way home," the little star whispered in a trembling voice. Phoebe knelt beside her new little friend and gave the star the warmest smile she could. She wanted the little star to know that it did not have to face this problem alone.
		`
        },
        {
            image: story07Metadata.images[3],
            content: `
		"Don't worry," Phoebe said kindly. "We'll find your home together." The little star looked up with hopeful eyes, and its gentle glow became a little brighter. A cheerful smile slowly appeared on its tiny face, filling the night with warm golden light. Hand in hand, Phoebe and the little star began their magical adventure beneath the sparkling sky.
		`
        },
        {
            image: story07Metadata.images[4],
            content: `
		Phoebe and the little star walked deeper into the magical forest. Tiny fireflies floated through the air like glowing lanterns, lighting the winding path before them. Friendly trees smiled as they passed, while little rabbits peeked out to watch their journey. Holding the little star safely in her hands, Phoebe felt brave because she knew every adventure was easier with a friend.
	`
        },
        {
            image: story07Metadata.images[5],
            content: `
		Soon they met a wise old owl sitting quietly on a strong tree branch. The owl wore tiny round glasses and looked as though it had read every story in the forest. "Welcome, little travelers," the owl said with a gentle smile. "I may know the way to help your little friend find its home."
		`
        },
        {
            image: story07Metadata.images[6],
            content: `
		The wise owl stretched out one wing and pointed toward a glowing hill far beyond the trees. A golden path of light shimmered through the forest, leading all the way to the top. "Follow that shining trail," the owl explained. "When the little star reaches the highest place, it will remember the way back to the sky." Phoebe smiled happily and thanked the owl for the wonderful advice.
		`
        },
        {
            image: story07Metadata.images[7],
            content: `
		Phoebe and the little star climbed the gentle hill together. Step by step they followed the glowing path as the sky became brighter with thousands of sparkling stars. The little star's light grew warmer and stronger with every step they took. It laughed with excitement because it could finally feel that home was getting closer.
		`
        },
        {
            image: story07Metadata.images[8],
            content: `
		At the very top of the hill, the little star suddenly sparkled brighter than ever before. A beautiful beam of golden light stretched all the way into the night sky, like a magical bridge leading home. Phoebe lifted her hand and watched with joyful eyes as the little star floated higher and higher. "You found your way!" she whispered happily.
		`
        },
        {
            image: story07Metadata.images[9],
            content: `
		The little star reached the sky and was welcomed by hundreds of shining stars. They twinkled happily together, making the whole night brighter than ever before. The little star danced among its family, glowing with happiness once again. Phoebe smiled from the hill, knowing that kindness had helped bring a family back together.
		`
        },
        {
            image: story07Metadata.images[10],
            content: `
		That night, Phoebe sat by her bedroom window and looked up at the sparkling sky. One bright little star twinkled a little brighter than all the others, almost as if it were waving just for her. Phoebe smiled and waved back with all her heart. She knew her tiny friend would never forget their wonderful adventure together.
		`
        },
        {
            image: story07Metadata.images[11],
            content: `
		As Phoebe walked home beneath the glowing moon, the little star shined brightly above her, safely back where it belonged. The night felt warmer, the flowers seemed brighter, and even the gentle breeze carried a happy song. Phoebe learned that even the smallest act of kindness can light up someone's whole world. With a grateful heart and a big smile, she whispered, "Good night, little star."

		The End.
        `
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

