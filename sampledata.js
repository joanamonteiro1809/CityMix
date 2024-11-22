const sampleData = {
    individual: [
        { 
            id: '1I', 
            name: 'Juliana Soares',
            age: 23, 
            activities: ['Food', 'Outdoor activities'],
            rating: '4,0',
            description: 'I love travelling and meeting new people. I am very sociable.',
            languages: ['Portuguese', 'English'],
            location: 'Lisbon, Portugal',
            locations:['Lisbon', 'Belém', 'Chiado', 'Alfama'],
            picture: require('./assets/user1.jpg'),
            reviews: [
                {
                    user: 'Maria Silva',
                    date: 'Jan 12, 2024',
                    rating: 5.0,
                    comment: 'Juliana was amazing! Super friendly and easy to talk to. I’d love to meet her again.',
                },
                {
                    user: 'João Pereira',
                    date: 'Dec 18, 2023',
                    rating: 4.0,
                    comment: 'Had a great time chatting with Juliana. She’s very kind and outgoing.',
                },
                {
                    user: 'Clara Rocha',
                    date: 'Nov 5, 2023',
                    rating: 4.5,
                    comment: 'Juliana is very fun to be around! I really appreciated her good vibes.',
                },
            ]
        },
        { 
            id: '2I',
            name: 'João Silva',
            age: 32, 
            activities: ['Nightlife', 'Arts', 'Museums'], 
            rating: '3,5',
            description: 'I love travelling and meeting new people. I am very sociable.',
            languages: ['Portuguese', 'English', 'Dutch'],
            location: 'Lisbon, Portugal',
            locations:['Lisbon', 'Belém', 'Chiado'],
            picture: require('./assets/user2.png'),
            reviews: [
                {
                    user: 'João Santos',
                    date: 'Fev, 2024',
                    rating: 3.0,
                    comment: 'João was amazing! Super friendly and easy to talk to. I’d love to meet him again.',
                },
                {
                    user: 'João Pereira',
                    date: 'Dec 18, 2023',
                    rating: 4,
                    comment: 'Had a great time chatting with João. He’s very kind and outgoing.',
                },
            ]
        },
        { 
            id: '3I', 
            name: 'Francisco Coelho',
            age: 24, 
            activities: ['Unsusual routes', 'Sports'], 
            rating: '3,0',
            description: 'I love travelling and meeting new people. I am very sociable.',
            languages: ['Portuguese', 'Spanish'],
            location: 'Lisbon, Portugal',
            locations:['Lisbon'],
            picture: require('./assets/user3.jpg'),
            reviews: [
                {
                    user: 'Maria Silva',
                    date: 'Jan 12, 2024',
                    rating: 5,
                    comment: 'Ana was amazing! Super friendly and easy to talk to. I’d love to meet her again.',
                },
                {
                    user: 'João Pereira',
                    date: 'Dec 18, 2023',
                    rating: 4,
                    comment: 'Had a great time chatting with Ana. She’s very kind and outgoing.',
                },
                {
                    user: 'Clara Rocha',
                    date: 'Nov 5, 2023',
                    rating: 4.5,
                    comment: 'Ana is very fun to be around! I really appreciated her good vibes.',
                },
            ]
        },
        { 
            id: '4I', 
            name: 'Ana Santos',
            age: 25, 
            activities: ['Nature'], 
            rating: '4,0' ,
            description: 'I love travelling and meeting new people. I am very sociable.',
            languages: ['Portuguese'],
            location: 'Lisbon, Portugal',
            locations:['Lisbon', 'Belém'],
            picture: require('./assets/user4.jpg'),
            reviews: [
                {
                    user: 'Maria Silva',
                    date: 'Jan 12, 2024',
                    rating: 5,
                    comment: 'Ana was amazing! Super friendly and easy to talk to. I’d love to meet her again.',
                },
                {
                    user: 'Diogo Moreira',
                    date: 'Jan 30, 2024',
                    rating: 5,
                    comment: 'Ana was amazing! Super friendly and easy to talk to. I’d love to meet her again.',
                },
            ]
        },
        {
            id: '5I',
            name: 'Inês Dias',
            age: 45,
            activities: ['Arts', 'Museums'],
            rating: '4,5',
            description: 'I love travelling!',
            languages: ['Portuguese', 'English', 'French', 'Spanish'],
                location: 'Lisbon, Portugal',
                locations:['Lisbon', 'Chiado', 'Belém', 'Alfama'],
                picture: require('./assets/user5.png'),
                reviews: [
                    {
                        user: 'Mariana Costa',
                        date: 'Mar, 2024',
                        rating: 5.0,
                        comment: 'Inês was fantastic! Her passion for nature is contagious.',
                    },
                    {
                        user: 'Pedro Moreira',
                        date: 'Feb, 2024',
                        rating: 4.5,
                        comment: 'Enjoyed the hike with Inês, she knows the best trails!',
                    },
                ],
        },
        {
            id: '6I',
            name: 'Alice Pires',
            age: 27,
            activities: ['Yoga', 'Painting', 'Music'],
            rating: '4.9',
            description: 'Passionate about art and mindfulness.',
            languages: ['Portuguese', 'English', 'Spanish'],
            location: 'Lisbon, Portugal',
            locations:['Lisbon', 'Chiado'],
            picture: require('./assets/user6.png'),
            reviews: [
                {
                    user: 'Carolina Nunes',
                    date: 'Feb, 2024',
                    rating: 4.9,
                    comment: 'Alice is very talented and her art sessions are inspiring!',
                },
                {
                    user: 'Diogo Ribeiro',
                    date: 'Jan, 2024',
                    rating: 4.7,
                    comment: 'Great conversation and amazing yoga session. Alice is very patient and knowledgeable.',
                },
                {
                    user: 'Beatriz Sousa',
                    date: 'Dec, 2023',
                    rating: 5.0,
                    comment: 'I loved our meeting. Alice is very creative and kind!',
                },
            ],
        },
        // Add more items here...
    ],
    group: [
        { 
            id: '1', 
            title: 'Day in Belém', 
            description: "Lets meetup at Mosteiro dos Jerónimos to spend the afternoon eating 'Pasteis de Nata' and relaxing by the river.",
            numPeopl: '10 members',
            location: "Av. Brasília, 1300-598 Lisbon, Belém",
            image: require('./assets/group1.jpg'),
            latitude: 38.69588602464495,
            longitude: -9.195402120568252,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        },
        { 
            id: '2', 
            title: 'Bar hopping in Chiado',
            description: "Let's have a drink by Lisbon famous bars and meet new people.", 
            numPeopl: '15 members',
            location: "Largo do Chiado, 1200-443 Lisbon",
            image: require('./assets/group2.jpg'),
            latitude: 38.711477586802665,
            longitude: -9.142375846542347,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        },
        { 
            id: '3', 
            title: 'Walk in Sintra', 
            numPeopl: '32 members',
            description: "Let's visit National Palace of Pena and enjoy the nature for a lit bit.",
            location: "Estrada da Pena, 2710-609 Lisbon",
            image: require('./assets/group3.jpg'),
            latitude: 38.78922817493438,
            longitude: -9.39070289804973,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        },
        { 
            id: '4', 
            title: 'Morning Yoga at Eduardo VII Park', 
            description: "Join us for a peaceful morning yoga session surrounded by nature. Suitable for all levels.",
            numPeopl: '20 members',
            location: "Parque Eduardo VII, 1070-099 Lisbon",
            image: require('./assets/group4.jpg'),
            latitude: 38.72826262536704,
            longitude: -9.15212732974097,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        },
        { 
            id: '5', 
            title: 'Art Walk at LX Factory', 
            description: "Explore the creative vibe of LX Factory, including galleries, shops, and street art.",
            numPeopl: '18 members',
            location: "Rua Rodrigues de Faria 103, 1300-501",
            image: require('./assets/group5.jpg'),
            latitude: 38.70315068722585,
            longitude: -9.178665161132812,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        },
        { 
            id: '6', 
            title: 'Cycling by the River', 
            description: "Join us for a scenic cycling tour along the Tagus River, starting at Cais do Sodré.",
            numPeopl: '25 members',
            location: "Av. Ribeira das Naus, 1200-450 Lisbon",
            image: require('./assets/group6.jpg'),
            latitude: 38.70759655108369,
            longitude: -9.142336368560791,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        },
        { 
            id: '7', 
            title: 'Day Trip to Cascais', 
            description: "Let's explore the charming seaside town of Cascais and enjoy its beaches and seafood.",
            numPeopl: '28 members',
            location: "Praça 5 de Outubro, 2750-430 Cascais",
            image: require('./assets/group7.jpeg'),
            latitude: 38.69707103573129,
            longitude: -9.421465873718262,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        },
        // Add more items here...
    ],
    paidTours: [
        { id: '1P', title: "St. George's Castle Tour", price: 20, rating: '4.0', tourGuide: 'João Silva',
            description: 'Come visit the main castle of Lisbon.',
            picture: require('./assets/paid1a.jpg'),
            routeStops: ["St. George's Castle"],
            reviews: [
                { reviewer: 'Maria Oliveira', rating: '5,0', comment: 'Amazing tour! The guide was very knowledgeable.' },
                { reviewer: 'Carlos Silva', rating: '4,0', comment: 'Great experience, but a bit crowded.' },
                { reviewer: 'Joana Pereira', rating: '4,0', comment: "The castle is huge but it's very beautiful." },
            ],
            activities: ["Famous Spots"],
            availableTimes: ["10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30", "16:00"],
            languages: ['Portuguese', 'English'],
            location: ['Lisbon'],
        },
            
        { id: '2P', title: 'Alfama Walking Tour', price: 19, rating: '3.5', tourGuide: 'Inês Dias', 
            description: 'Walk through and enjoy the streets of Alfama.',
            picture: require('./assets/paid2.jpg'),
            routeStops: ["Santa Luzia", "Lisbon Cathedral", "Fado Museum"],
            reviews: [
                { reviewer: 'Ana Pereira', rating: '4,0', comment: 'Loved walking through Alfama!' },
                { reviewer: 'João Costa', rating: '3,0', comment: 'It was okay, but too hot during the day.' },
            ],
            activities: ["Famous Spots"],
            availableTimes: ["11:00", "12:00", "13:00", "14:00", "15:00"],
            languages: ['Portuguese', 'English', 'Spanish'],
            location: ['Lisbon', 'Alfama'],
        },

        { id: '3P', title: 'Taste of Lisbon Experience', price: 60, rating: '4.5', tourGuide: 'Alice Pires', 
            description: 'Come taste the food of Lisbon.',
            picture: require('./assets/paid3.webp'),
            routeStops: ["Time Out Market", "Bacalhau House", "Ginjinha Bar", "Café A Brasileira"],
            reviews: [
                { reviewer: 'Luís Mendes', rating: '5,0', comment: 'The food was incredible! Highly recommend.' },
                { reviewer: 'Sara Nunes', rating: '4,0', comment: 'Great experience, but a bit pricey.' },
            ],
            activities: ["Food"],
            availableTimes: ["11:00", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30"],
            languages: ['Spanish', 'Portuguese'],
            location: ['Lisbon', 'Chiado'],
        },
        { 
            id: '4P', 
            title: 'Belem Historical Tour', 
            price: 25, 
            rating: '4.7', 
            tourGuide: 'Inês Dias',
            description: "Explore the famous monuments and delicious pastries of Belem.",
            picture: require('./assets/paid4.jpg'),
            routeStops: ["Mosteiro", "Belem Tower", "Pastéis de Belém Bakery"],
            reviews: [
                { reviewer: 'Rita Figueira', rating: '5,0', comment: 'The guide was fantastic, and the pastries were delicious!' },
                { reviewer: 'André Silva', rating: '4,0', comment: 'Beautiful sites, but the tour was a bit rushed.' },
            ],
            activities: ["Museums", 'Art', "Food"],
            availableTimes: ["09:00", "10:00", "11:00", "14:00", "15:00", '16:00'],
            languages: ['Portuguese', 'English', 'French'],
            location: ['Lisbon', 'Belém'],
        },
        { 
            id: '5P', 
            title: 'Sintra Palaces Trip', 
            price: 80, 
            rating: '4.9', 
            tourGuide: 'Inês Dias',
            description: "Spend a day exploring the magical palaces of Sintra.",
            picture: require('./assets/paid5.jpg'),
            routeStops: ["Pena Palace", "Quinta da Regaleira", "Sintra Village"],
            reviews: [
                { reviewer: 'Helena Costa', rating: '5,0', comment: 'Absolutely stunning! A must-do for visitors.' },
                { reviewer: 'Miguel Teixeira', rating: '4,5', comment: 'Great tour, but expect a lot of walking!' },
            ],
            activities: ["Famous Spots", "Nature"],
            availableTimes: ["08:00", "08:30", "09:00", "09:30", "10:00"],
            languages: ['Portuguese', 'English', 'Spanish', 'German'],
            location: ['Sintra', 'Lisbon'],
        },
        { 
            id: '6P', 
            title: 'Oceanário de Lisboa Experience', 
            price: 15, 
            rating: '4.8', 
            tourGuide: 'Alice Pires',
            description: "Explore the wonders of marine life in Oceanário de Lisboa.",
            picture: require('./assets/paid6.jpg'),
            routeStops: ["Oceanário", "Interactive Exhibits", "Lisbon Cable Car Ride"],
            reviews: [
                { reviewer: 'João Matos', rating: '5,0', comment: 'The ocean exhibits were incredible!' },
                { reviewer: 'Filipa Duarte', rating: '4,5', comment: 'Beautiful place, but too many kids running around.' },
            ],
            activities: ["Nature"],
            availableTimes: ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"],
            languages: ['Portuguese', 'English'],
            location: ['Lisbon', 'Parque das Nações'],
        },
        { 
            id: '7P', 
            title: 'Fado and Dinner Experience', 
            price: 50, 
            rating: '4.6', 
            tourGuide: 'Alice Pires',
            description: "Immerse yourself in Portuguese culture with Fado music and dinner.",
            picture: require('./assets/paid7.jpeg'),
            routeStops: ["Alfama Restaurant", "Fado Performance"],
            reviews: [
                { reviewer: 'Ana Lopes', rating: '5,0', comment: 'Amazing performance and delicious food!' },
                { reviewer: 'José Vieira', rating: '4,0', comment: 'Great experience, but dinner was a bit expensive.' },
            ],
            activities: ["Music", "Food"],
            availableTimes: ["19:00", "19:30", "20:00", "20:30"],
            languages: ['Portuguese', 'English', 'Spanish'],
            location: ['Lisbon', 'Alfama'],
        },
        // Add more items here...
    ],

    joaoTours: [
            { id: '1P', title: "St. George's Castle Tour", price: 20, rating: '4.0', tourGuide: 'João Silva',
                description: 'Come visit the main castle of Lisbon.',
                picture: require('./assets/paid1a.jpg'),
                routeStops: ["St. George's Castle"],
                reviews: [
                    { reviewer: 'Maria Oliveira', rating: '5,0', comment: 'Amazing tour! The guide was very knowledgeable.' },
                    { reviewer: 'Carlos Silva', rating: '4,0', comment: 'Great experience, but a bit crowded.' },
                    { reviewer: 'Joana Pereira', rating: '4,0', comment: "The castle is huge but it's very beautiful." },
                ],
                activities: ["Famous Spots"],
                availableTimes: ["10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30", "16:00"],
                languages: ['Portuguese', 'English'],
                location: ['Lisbon'],
            },
                  // Add more items here...
        ],

    markers: [
        {
            latitude: 37.7749,
            longitude: -122.4194,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
            name: 'San Francisco City Center'
        },
        {
            latitude: 37.8077,
            longitude: -122.475,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
            name: 'Golden Gate Bridge'
        }
    ],
    currentUser: {
        role: 'tour_guide',
    },

    ritaEvents: [
        {
            id: 1,
            title: 'Meetup with Alice',
            date: '2024-11-13',
            time: '11:30',
            location: 'Saldanha',            
        },
        {
            id: 2,
            title: 'Discover Monsanto',
            date: '2024-09-27',
            time: '14:00',
            location: 'Monsanto',     
        },
    ],
    joaoEvents: [
        {
            id: 1,
            title: 'Meetup with Diogo',
            date: '2024-11-01',
            time: '16:00',
            location: 'Chiado',            
        },
        {
            id: 2, 
            title: 'Meetup with Ana', 
            date: '2024-10-11', 
            time: '14:00', 
            location: 'Torre de Belém',
        },
    ],
};

export default sampleData;