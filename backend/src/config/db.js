import mongoose from 'mongoose';

// Tracks the live connection state so /api/health can report it to the frontend.
export const dbState = {
  connected: false,
  message: 'Not connected',
  host: null,
  name: null,
};

const READY_STATE_LABELS = {
  0: 'disconnected',
  1: 'connected',
  2: 'connecting',
  3: 'disconnecting',
};

export const getReadyStateLabel = () =>
  READY_STATE_LABELS[mongoose.connection.readyState] ?? 'unknown';

export async function connectDB(uri) {
  mongoose.connection.on('disconnected', () => {
    dbState.connected = false;
    dbState.message = 'MongoDB disconnected';
    console.warn('⚠️  MongoDB disconnected');
  });

  mongoose.connection.on('reconnected', () => {
    dbState.connected = true;
    dbState.message = 'MongoDB connected successfully';
    console.log('✅ MongoDB connected successfully');
  });

  mongoose.connection.on('error', (err) => {
    dbState.connected = false;
    dbState.message = `MongoDB error: ${err.message}`;
    console.error('❌ MongoDB error:', err.message);
  });

  const conn = await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 8000,
  });

  dbState.connected = true;
  dbState.message = 'MongoDB connected successfully';
  dbState.host = conn.connection.host;
  dbState.name = conn.connection.name;

  console.log('✅ MongoDB connected successfully');
  console.log(`   host: ${conn.connection.host}  db: ${conn.connection.name}`);

  return conn;
}
