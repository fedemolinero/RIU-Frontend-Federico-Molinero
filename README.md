# RIU-Frontend-Federico-Molinero

# RiuHeroApp

_"Heroes are made by the path they choose, not the powers they are graced with."_ – Iron Man

Welcome to **RiuHeroApp**, a web application built with Angular to celebrate the spirit of heroes. This project is designed to provide a platform for exploring and interacting with hero-related content.

## Getting Started

### Prerequisites

Ensure you have the following installed:
- Node.js (v22 or later)
- Angular CLI (v18.0.0)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd riu-hero-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:4200/
   ```

## Build and Deployment

To build the project for production:
```bash
npm run build-prod
```

The build artifacts will be stored in the `dist/` directory. You can deploy these files to any web server.

## Docker Support

Build and run the application using Docker:
1. Build the Docker image:
   ```bash
   docker build -t riu-hero-app .
   ```

2. Run the Docker container:
   ```bash
   docker run -p 80:80 -p 3000:3000 riu-hero-app
   ```

Access the application at `http://localhost:8080`.

## Testing

### Unit Tests
Run unit tests with Karma:
```bash
npm test
```

## Manual / Documentation

_"With great power comes great responsibility."_ – Uncle Ben, *Spider-Man*

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

_"The best things in life are free, just like this project. 
Use it, learn from it, and let it inspire your own heroic journey."_  