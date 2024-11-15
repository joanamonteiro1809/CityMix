const sampleData = {
    individual: [
        { id: '1', name: 'Juliana Soares, 23', activity: 'Food, Outdoor Activities', rating: '4,0' },
        { id: '2', name: 'João Silva, 32', activity: 'Nightlife, Arts & Museums', rating: '3,5' },
        { id: '3', name: 'Francisco Coelho, 24', activity: 'Unsusual routes & Sports', rating: '3,0' },
        { id: '4', name: 'Joana Santos, 25', activity: 'Nature', rating: '4,0' },
        // Add more items here...
    ],
    group: [
        { id: '1', title: 'Day in Belém', numPeopl: '...and 5 more' },
        { id: '2', title: 'Bar hopping in Chiado', numPeopl: '...and 6 more' },
        { id: '3', title: 'Walk in Sintra', numPeopl: '...and 31 more' },
        // Add more items here...
    ],
    paidTours: [
        { id: '1', title: "St. George's Castle Tour", price: '20€', rating: '4.0', tourGuide: 'Rúben Santos', 
            description: 'Come visit the principal castle of Lisbon.', 
            imageLink: "https://cdn-imgix.headout.com/microbrands-banner-image/image/d483f23b46669db6523754a034f4d1b8-Sao%20Jorge%20Castle%201.jpeg?auto=format&w=1058.3999999999999&h=540&q=90&fit=crop&crop=faces",
            routeStops: ["St. George's Castle"],
            reviews: [
                { reviewer: 'Maria Oliveira', rating: '5,0', comment: 'Amazing tour! The guide was very knowledgeable.' },
                { reviewer: 'Carlos Silva', rating: '4,0', comment: 'Great experience, but a bit crowded.' },
                { reviewer: 'Joana Pereira', rating: '4,0', comment: "The castle is huge but it's very beautiful." },
            ],},
            
        { id: '2', title: 'Alfama Walking Tour', price: '19€', rating: '3.5', tourGuide: 'Inês Dias', 
            description: 'Walk through and enjoy the streets of Alfama.',
            imageLink: "https://images.resosys.com/destinations/10/articles/alfama-neighbourhood-lisbon_en/inline/1667827088-lisbon-alfama-2.jpg",
            routeStops: ["Santa Luzia Viewpoint", "Lisbon Cathedral", "Fado Museum"],
            reviews: [
                { reviewer: 'Ana Pereira', rating: '4,0', comment: 'Loved walking through Alfama!' },
                { reviewer: 'João Costa', rating: '3,0', comment: 'It was okay, but too hot during the day.' },
            ],},

        { id: '3', title: 'Taste of Lisbon Experience', price: '60€', rating: '4.5', tourGuide: 'Alice Pires', 
            description: 'Come taste the food of Lisbon.',
            imageLink: "https://www.tasteoflisboa.com/wp-content/uploads/sites/2712/2019/05/Taste-of-Lisboa-%C2%A9-Andreia-Mayer-60-copy.jpg?w=700&h=700&zoom=2",
            routeStops: ["Time Out Market", "Bacalhau House", "Ginjinha Bar", "Café A Brasileira"],
            reviews: [
                { reviewer: 'Luís Mendes', rating: '5,0', comment: 'The food was incredible! Highly recommend.' },
                { reviewer: 'Sara Nunes', rating: '4,0', comment: 'Great experience, but a bit pricey.' },
            ],},
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
};

export default sampleData;