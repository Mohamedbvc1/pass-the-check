# Pass the Check

A web app that helps people in Alberta check a restaurant's food-safety record before they eat there. Users search for a restaurant by name or browse by area, then see its Alberta Health Services (AHS) inspection history, violations, and a simple "Ick-o-Meter" rating, with the restaurant shown on a Google Map.

**Team project** (5 developers) built in the InceptionU (formerly EvolveU) Full-Stack Web Development Program, Calgary, March–April 2024.

## Built with

- **Front end:** React, Vite, React Router, React Bootstrap, Chart.js, Google Maps JavaScript API
- **Back end:** Node.js, Express, MongoDB with Mongoose
- **Data collection:** Puppeteer and Axios scripts that gather restaurant, inspection, and violation data from the public AHS inspection portal

## My contributions (Mohamed Bouhadrah)

- Wrote the first Puppeteer script to collect restaurant facility IDs from the AHS website
- Built back-end API endpoints in Express and Mongoose for restaurants, inspections, and violations, and connected them to the React front end
- Prepared the data for the landing page, sorted restaurants by area, and added search by restaurant name
- Cleaned up the violation text shown to users (decoding HTML characters and removing stray symbols)

## Team

Built together with teammates Tfehr6, KachiYD, codeuhsaurus, and nassira, with guidance from our InceptionU instructors.

## Running it locally

1. Install Node.js and MongoDB.
2. Run `npm install` in the project root, in `server`, and in `client`.
3. Copy `client/.env.example` to `client/.env` and add your own Google Maps API key.
4. Start the server (`node server/server.js`) and the client (`npm run dev` inside `client`).

*Note: this is an archived student project from 2024. The AHS data scripts may need updates if the AHS website has changed.*
