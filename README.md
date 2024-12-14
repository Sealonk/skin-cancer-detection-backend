# Skin Cancer Detection Backend

This repository provides a backend server for detecting skin cancer using a machine learning model. The server uses TensorFlow.js to load and serve the model and integrates with Google Cloud Firestore to store prediction results.

## Features

- **Image Upload**: Users can upload an image for classification.
- **Prediction**: The server predicts the type of skin condition (e.g., Melanocytic Nevus, Squamous Cell Carcinoma, Vascular Lesion) with a confidence score and provides an explanation and suggestion.
- **Data Storage**: Stores prediction results in Google Cloud Firestore for future reference.
- **Custom Error Handling**: Custom exceptions for handling client and input errors.

## Technologies Used

- [Hapi.js](https://hapi.dev/): Web framework for building the server.
- [TensorFlow.js](https://www.tensorflow.org/js): For loading and serving the ML model.
- [Google Cloud Firestore](https://cloud.google.com/firestore): NoSQL database for storing prediction data.
- [Node.js](https://nodejs.org/): JavaScript runtime for building the server.

## API Endpoints

### `POST /predict`

Submit an image for classification.

**Request**:  
Send a `multipart/form-data` request with an image file.

**Response**:
```json
{
  "status": "success",
  "message": "Model is predicted successfully.",
  "data": {
    "id": "unique-prediction-id",
    "result": "Melanocytic nevus",
    "explanation": "Melanocytic nevus adalah kondisi di mana permukaan kulit memiliki bercak warna yang berasal dari sel-sel melanosit, yakni pembentukan warna kulit dan rambut.",
    "suggestion": "Segera konsultasi dengan dokter terdekat jika ukuran semakin membesar dengan cepat, mudah luka atau berdarah.",
    "confidenceScore": 99.8,
    "createdAt": "2024-12-14T12:00:00Z"
  }
}
```

### Error Responses

- 400 Input Error:
  ```json
  {
  "status": "fail",
  "message": "Terjadi kesalahan input: <error-message> Silakan gunakan foto lain."
  }
  ```
- 500 Internal Server Error:
  ```json
  {
  "status": "fail",
  "message": "Internal server error."
  }
  ```

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Sealonk/skin-cancer-detection-backend.git
```

### 2. Install Dependencies

```bash
cd skin-cancer-detection-backend
npm install
```

### 3. Set Environment Variables

Create a `.env` file in the root directory and add the following:

```rust
MODEL_URL='https://storage.googleapis.com/<your_bucket_name>/<path_to_your_model.json>'
```

Replace the `MODEL_URL` with the URL of your TensorFlow.js model.

### 4. Start the Server

#### Development Mode (with Nodemon):

```bash
npm run start:dev
```

#### Production Mode:

```bash
npm run start
```

The server will run at http://localhost:3000.

## Folder Structure

```bash
- node_modules/
- src/
  - exceptions/
    - ClientError.js       # Base class for custom client errors
    - InputError.js        # Custom error for invalid input
  - server/
    - handler.js           # Request handler for predictions
    - routes.js            # Routes definition
    - server.js            # Hapi server initialization
  - services/
    - inferenceService.js  # TensorFlow inference logic
    - loadModel.js         # Model loading logic
    - storeData.js         # Firestore storage logic
- .gitignore               # Ignored files
- .env                     # Environment variables (e.g., MODEL_URL)
- package-lock.json
- package.json             # Project dependencies and metadata
- README.md                # Project documentation
```

## Dependencies

- Runtime:
  - `@hapi/hapi`: Web framework for server-side handling.
  - `@tensorflow/tfjs-nod`e: Machine learning library for Node.js.
  - `@google-cloud/firestore`: Firestore SDK for database interaction.
  - `dotenv`: For managing environment variables.
- Development:
  - `nodemon`: Utility to auto-restart the server during development.
