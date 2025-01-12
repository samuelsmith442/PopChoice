# PopChoice 🍿

PopChoice is an AI-powered movie recommendation app that uses OpenAI's embeddings and Supabase's vector database to provide personalized movie suggestions based on your preferences.

## Features

- 🎬 Smart movie recommendations based on your favorite movies
- 🤖 AI-powered semantic search using OpenAI embeddings
- 🎯 Personalized suggestions considering era and mood preferences
- 💾 Vector database storage using Supabase
- 🎨 Modern, responsive UI with dark theme

## Tech Stack

- Frontend: Vanilla JavaScript with Vite
- AI: OpenAI API for embeddings
- Database: Supabase with pgvector
- Styling: Custom CSS with CSS Variables
- Dependencies: LangChain for text processing

## Setup

1. Clone the repository:
```bash
git clone [your-repo-url]
cd PopChoice
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your API keys:
```env
VITE_OPENAI_API_KEY=your_openai_api_key
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Set up Supabase:
   - Create a new Supabase project
   - Run the following SQL in the SQL editor:
```sql
-- Create the embeddings table
CREATE TABLE popchoice_embeddings (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  embedding vector(1536) NOT NULL
);

-- Create the matching function
CREATE OR REPLACE FUNCTION match_popchoice (
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
RETURNS TABLE (
  content text,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN query
  SELECT
    popchoice_embeddings.content,
    1 - (popchoice_embeddings.embedding <=> query_embedding) as similarity
  FROM popchoice_embeddings
  WHERE 1 - (popchoice_embeddings.embedding <=> query_embedding) > match_threshold
  ORDER BY popchoice_embeddings.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
```

5. Initialize the database:
```bash
node create-embeddings.js
```

6. Start the development server:
```bash
npm run dev
```

## Usage

1. Enter your favorite movie and why you like it
2. Choose between new releases or classics
3. Specify if you want something fun or serious
4. Click "Let's Go" to get personalized recommendations

## Project Structure

```
PopChoice/
├── index.html           # Main HTML file
├── index.js            # Main JavaScript file
├── index.css           # Styles
├── config.js           # API configurations
├── movies.txt          # Movie database
├── utils/
│   └── embeddings.js   # Embedding creation and querying
└── images/
    └── popcorn.png     # App logo
```

## Development

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenAI for providing the embeddings API
- Supabase for the vector database functionality
- The amazing open-source community