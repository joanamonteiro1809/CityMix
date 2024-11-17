const sampleData = {
    individual: [
        { 
            id: '1', 
            name: 'Juliana Soares',
            age: 23, 
            activities: ['Food', 'Outdoor Activities'], 
            rating: '4,0'
        },
        { 
            id: '2',
            name: 'João Silva',
            age: '32', 
            activities: ['Nightlife', 'Arts', 'Museums'], 
            rating: '3,5' 
        },
        { 
            id: '3', 
            name: 'Francisco Coelho',
            age: 24, 
            activities: ['Unsusual routes', 'Sports'], 
            rating: '3,0' 
        },
        { 
            id: '4', 
            name: 'Joana Santos',
            age: 25, 
            activities: ['Nature'], 
            rating: '4,0' 
        },
        // Add more items here...
    ],
    group: [
        { 
            id: '1', 
            title: 'Day in Belém', 
            numPeopl: 'and 5 more...',
            location: "Av. Brasília, 1300-598 Lisboa",
            latitude: 38.69588602464495,
            longitude: -9.195402120568252,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        },
        { 
            id: '2', 
            title: 'Bar hopping in Chiado', 
            numPeopl: 'and 6 more...',
            location: "Largo do Chiado, 1200-443 Lisboa",
            latitude: 38.711477586802665,
            longitude: -9.142375846542347,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        },
        { 
            id: '3', 
            title: 'Walk in Sintra', 
            numPeopl: 'and 31 more...',
            location: "Estrada da Pena, 2710-609 Sintra",
            latitude: 38.78922817493438,
            longitude: -9.39070289804973,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        },
        // Add more items here...
    ],
    paidTours: [
        { id: '1', title: "St. George's Castle Tour", price: 20, rating: '4.0', tourGuide: 'Rúben Santos', 
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
                       ],},
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
    ]
};

export default sampleData;