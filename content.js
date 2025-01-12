export const movies = [
    {
        title: "School of Rock",
        year: 2009,
        description: "A fun and stupid movie about a wannabe rocker turned fraud substitute teacher forming a rock band with his students to win the Battle of the Bands",
        type: "fun",
        era: "new"
    },
    {
        title: "The Shawshank Redemption",
        year: 1994,
        description: "Because it taught me to never give up hope no matter how hard life gets",
        type: "serious",
        era: "classic"
    }
];

export function getMovieRecommendation(favoriteMovie, era, type) {
    // Filter movies based on user preferences
    const recommendations = movies.filter(movie => {
        return movie.era.toLowerCase() === era.toLowerCase() &&
               movie.type.toLowerCase() === type.toLowerCase() &&
               movie.title.toLowerCase() !== favoriteMovie.toLowerCase();
    });

    // Return a random movie from filtered list or null if none found
    return recommendations.length > 0 
        ? recommendations[Math.floor(Math.random() * recommendations.length)]
        : null;
}