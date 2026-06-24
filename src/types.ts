export type Role = 'guest' | 'student' | 'operator';

export interface StudentProfile {
  name: string;
  nim: string;
  nationality: string;
  passportNumber: string;
  email: string;
  avatar: string;
  NPM?: string;
}

export type ServiceType = 
  | 'Surat Izin Belajar'
  | 'Visa Pelajar'
  | 'Perpanjangan KITAS'
  | 'Perpanjangan Izin Belajar'
  | 'Mutasi Paspor'
  | 'Mutasi Alamat Domisili'
  | 'Surat Rekomendasi Beasiswa';

export type ApplicationStatus = 'Pending' | 'Verified' | 'Diproses' | 'Disetujui' | 'Ditolak';

export interface Application {
  id: string;
  studentName: string;
  nim: string;
  nationality: string;
  passportNumber: string;
  serviceType: ServiceType;
  submissionDate: string;
  status: ApplicationStatus;
  documentName: string;
  notes: string;
  operatorNotes?: string;
  verificationDate?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  country: string;
  major: string;
  content: string;
  avatar: string;
  rating: number;
}
