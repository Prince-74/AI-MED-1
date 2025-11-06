import mongoose, { Schema, Document } from 'mongoose';

export interface IReport extends Document {
  userId: string;
  fileName: string;
  fileType: string;
  uploadDate: Date;
  extractedText: string;
  summary: string;
  parameters: Array<{
    name: string;
    value: string;
    status: 'normal' | 'abnormal' | 'critical';
    unit?: string;
  }>;
  metadata?: {
    reportDate?: Date;
    patientName?: string;
    doctorName?: string;
    labName?: string;
  };
}

const ReportSchema: Schema = new Schema({
  userId: { type: String, required: true, index: true },
  fileName: { type: String, required: true },
  fileType: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
  extractedText: { type: String, required: true },
  summary: { type: String, required: true },
  parameters: [{
    name: { type: String, required: true },
    value: { type: String, required: true },
    status: { type: String, enum: ['normal', 'abnormal', 'critical'], required: true },
    unit: { type: String }
  }],
  metadata: {
    reportDate: { type: Date },
    patientName: { type: String },
    doctorName: { type: String },
    labName: { type: String }
  }
}, { timestamps: true });

export default mongoose.model<IReport>('Report', ReportSchema);
