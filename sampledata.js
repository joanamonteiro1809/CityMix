const sampleData = {
    individual: [
        { 
            id: '1', 
            name: 'Juliana Soares',
            age: 23, 
            activities: ['Food', 'Outdoor activities'],
            rating: '4,0',
            description: 'I love travelling and meeting new people. I am very sociable.',
            languages: ['Portuguese', 'English'],
            location: 'Lisbon, Portugal',
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
            id: '2',
            name: 'João Silva',
            age: 32, 
            activities: ['Nightlife', 'Arts', 'Museums'], 
            rating: '3,5',
            description: 'I love travelling and meeting new people. I am very sociable.',
            languages: ['Portuguese', 'English', 'Dutch'],
            location: 'Lisbon, Portugal',
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
            id: '3', 
            name: 'Francisco Coelho',
            age: 24, 
            activities: ['Unsusual routes', 'Sports'], 
            rating: '3,0',
            description: 'I love travelling and meeting new people. I am very sociable.',
            languages: ['Portuguese', 'Spanish'],
            location: 'Lisbon, Portugal',
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
            id: '4', 
            name: 'Joana Santos',
            age: 25, 
            activities: ['Nature'], 
            rating: '4,0' ,
            description: 'I love travelling and meeting new people. I am very sociable.',
            languages: ['Portuguese'],
            location: 'Lisbon, Portugal',
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
                            id: '5',
                            name: 'Inês Dias',
                            age: 45,
                            activities: ['Arts', 'Museums'],
                            rating: '4,5',
                            description: 'I love travelling!',
                            languages: ['Portuguese', 'English', 'French', 'Spanish'],
                                location: 'Porto, Portugal',
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
                                id: '6',
                                name: 'Alice Pires',
                                age: 27,
                                activities: ['Yoga', 'Painting', 'Music'],
                                rating: '4.9',
                                description: 'Passionate about art and mindfulness.',
                                languages: ['Portuguese', 'English', 'Spanish'],
                                location: 'Funchal, Madeira',
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
            location: "Av. Brasília, 1300-598 Lisbon",
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
        // Add more items here...
    ],
    paidTours: [
        { id: '1', title: "St. George's Castle Tour", price: 20, rating: '4.0', tourGuide: 'João Silva',
            description: 'Come visit the main castle of Lisbon.',
            imageLink: "https://cdn-imgix.headout.com/microbrands-banner-image/image/d483f23b46669db6523754a034f4d1b8-Sao%20Jorge%20Castle%201.jpeg?auto=format&w=1058.3999999999999&h=540&q=90&fit=crop&crop=faces",
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
            
        { id: '2', title: 'Alfama Walking Tour', price: 19, rating: '3.5', tourGuide: 'Inês Dias', 
            description: 'Walk through and enjoy the streets of Alfama.',
            imageLink: "https://images.resosys.com/destinations/10/articles/alfama-neighbourhood-lisbon_en/inline/1667827088-lisbon-alfama-2.jpg",
            routeStops: ["Santa Luzia Viewpoint", "Lisbon Cathedral", "Fado Museum"],
            reviews: [
                { reviewer: 'Ana Pereira', rating: '4,0', comment: 'Loved walking through Alfama!' },
                { reviewer: 'João Costa', rating: '3,0', comment: 'It was okay, but too hot during the day.' },
            ],
            activities: ["Famous Spots"],
            availableTimes: ["11:00", "12:00", "13:00", "14:00", "15:00"],
            languages: ['Portuguese', 'English', 'Spanish'],
            location: ['Lisbon', 'Alfama'],
        },

        { id: '3', title: 'Taste of Lisbon Experience', price: 60, rating: '4.5', tourGuide: 'Alice Pires', 
            description: 'Come taste the food of Lisbon.',
            imageLink: "https://www.tasteoflisboa.com/wp-content/uploads/sites/2712/2019/05/Taste-of-Lisboa-%C2%A9-Andreia-Mayer-60-copy.jpg?w=700&h=700&zoom=2",
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
        // Add more items here...
    ],

    joaoTours: [
           { id: '1', title: "St. George's Castle Tour", price: '20€', rating: '4.0', tourGuide: 'Rúben Santos',
                    description: 'Come visit the principal castle of Lisbon.',
                    imageLink: "https://cdn-imgix.headout.com/microbrands-banner-image/image/d483f23b46669db6523754a034f4d1b8-Sao%20Jorge%20Castle%201.jpeg?auto=format&w=1058.3999999999999&h=540&q=90&fit=crop&crop=faces",
                    routeStops: ["St. George's Castle"],
                    reviews: [
                        { reviewer: 'Maria Oliveira', rating: '5,0', comment: 'Amazing tour! The guide was very knowledgeable.' },
                        { reviewer: 'Carlos Silva', rating: '4,0', comment: 'Great experience, but a bit crowded.' },
                        { reviewer: 'Joana Pereira', rating: '4,0', comment: "The castle is huge but it's very beautiful." },
                    ],
                    activities: ["Famous Spots"],
                    availableTimes: ["10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30", "16:00"],
                    languages: ['Portuguese', 'English'],      
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