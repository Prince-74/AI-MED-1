const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface ReportParameter {
  name: string;
  value: string;
  status: 'normal' | 'abnormal' | 'critical';
  unit?: string;
}

export interface Report {
  _id?: string;
  userId: string;
  fileName: string;
  fileType: string;
  uploadDate?: Date;
  extractedText: string;
  summary: string;
  parameters: ReportParameter[];
  metadata?: {
    reportDate?: Date;
    patientName?: string;
    doctorName?: string;
    labName?: string;
  };
}

export const reportService = {
  async createReport(report: Omit<Report, '_id' | 'uploadDate'>) {
    const response = await fetch(`${API_URL}/reports`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(report),
    });
    return response.json();
  },

  async getUserReports(userId: string) {
    const response = await fetch(`${API_URL}/reports/user/${userId}`);
    return response.json();
  },

  async getReport(id: string) {
    const response = await fetch(`${API_URL}/reports/${id}`);
    return response.json();
  },

  async updateReport(id: string, report: Partial<Report>) {
    const response = await fetch(`${API_URL}/reports/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(report),
    });
    return response.json();
  },

  async deleteReport(id: string) {
    const response = await fetch(`${API_URL}/reports/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  },
};
