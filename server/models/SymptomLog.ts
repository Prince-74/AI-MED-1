import mongoose, { Schema, Document } from 'mongoose';

export interface ISymptomLog extends Document {
  userId: mongoose.Types.ObjectId;
  symptoms: string[];
  severity: 'Mild' | 'Moderate' | 'Severe';
  temperature?: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SymptomLogSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  symptoms: [{
    type: String,
    required: true
  }],
  severity: {
    type: String,
    enum: ['Mild', 'Moderate', 'Severe'],
    required: true
  },
  temperature: {
    type: Number
  },
  notes: {
    type: String
  }
}, {
  timestamps: true
});

export default mongoose.model<ISymptomLog>('SymptomLog', SymptomLogSchema);
