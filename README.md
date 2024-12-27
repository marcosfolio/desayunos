# Breakfast Generator 🍳

A fun and interactive breakfast generator built with React and TypeScript. This application helps you decide what to eat for breakfast by randomly combining proteins, carbohydrates, and fruits with a delightful animation.

## Features

- 🎲 Random breakfast combination generator
- ✨ Smooth animations
- 🎨 Beautiful gradient text effects
- 📱 Responsive design
- 🔄 Reset functionality

## Technologies Used

- React
- TypeScript
- CSS3 with animations
- Google Fonts (Matemasie, Sacramento, Passion One)

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button/         # Button component and tests
│   └── HeaderMenu/     # Navigation menu component
├── hooks/              # Custom React hooks
│   ├── useFetch.ts     # Data fetching hook
│   └── useFetch.test.ts
├── views/              # Page components
│   ├── Home/
│   ├── Food/
│   ├── MenuComposer/
│   └── Shopping/
├── db/                 # Database setup and migrations
│   ├── initDb.ts      # Database initialization
│   └── schema.sql     # Database schema
├── server.ts          # Express backend server
├── App.tsx            # Main application component
└── index.tsx          # Application entry point
```

## Environment Variables

Create a `.env` file in the root directory:

```bash
# Server Configuration
PORT=3001

# Database
DB_PATH=./database.sqlite

# Frontend
REACT_APP_API_URL=http://localhost:3001

# Development
NODE_ENV=development
```

Note: Never commit `.env` file to version control. A `.env.example` file is provided as a template.

## Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/desayunos-generator.git
   ```

2. Install dependencies:
   ```bash
   npm i
   ```

3. Initialize the database:
   ```bash
   npm run init-db
   ```

4. Start the backend server:
    ```bash
   npm run dev
   ```

5. Start the frontend development server:
    ```bash
   npm start
   ```

6. Open your browser and visit:
   ```bash
   http://localhost:3000
   ```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## API Endpoints

- `GET /api/proteins` - Get all proteins
- `POST /api/proteins` - Add a new protein
- `PUT /api/proteins/:id` - Update a protein
- `DELETE /api/proteins/:id` - Delete a protein

## Custom Hooks

### useFetch

A custom hook for handling API requests:

```ts
const { data, loading, error } = useFetch<Protein[]>('http://localhost:3001/api/proteins');
```
## Testing

Our testing strategy includes:

### Component Tests
- Visual and interaction testing of UI components
- Navigation and routing tests
- Accessibility testing (keyboard navigation)

### Hook Tests
- Custom hooks testing with @testing-library/react
- API integration testing with mocked fetch

### Unit Tests
- Database operations
- API endpoints
- Utility functions

### Test Examples
```typescript
// Component test
it('renders navigation links', () => {
    render(<HeaderMenu />);
    expect(screen.getByText('Home')).toBeInTheDocument();
});

// Hook test
it('handles API data fetching', async () => {
    const { result } = renderHook(() => useFetch<Protein[]>('/api/proteins'));
    await waitFor(() => expect(result.current.loading).toBe(false));
});
```

Run the test suite:

```bash
npm test
```

Run tests with coverage:

```bash
npm test -- --coverage
```

## Development

- Frontend runs on port 3000
- Backend API runs on port 3001
- SQLite database is stored in `database.sqlite`

## Troubleshooting

### Database Issues

**Error: Database file not found**
```bash
# Ensure database is initialized
npm run init-db

# Check database file exists
ls database.sqlite
```

**Error: SQLITE_BUSY: database is locked**
```bash
# Stop all running processes and restart the server
npm run dev
```

### API Connection Issues

**Error: Failed to fetch proteins**
- Verify backend is running on port 3001
- Check browser console for CORS errors
- Ensure database has proteins table: `npm run init-db`

### Frontend Development

**Error: Module not found**
```bash
# Clear node modules and reinstall
rm -rf node_modules
npm install
```

**Warning: React Router warnings**
- Update to latest dependencies: `npm update`
- Clear browser cache and reload

## Technologies

- React
- TypeScript
- Express
- SQLite
- React Router
- Testing Library

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by healthy breakfast combinations
- Built with ❤️ using React and TypeScript
