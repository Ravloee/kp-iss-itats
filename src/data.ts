import { Application, Testimonial, ServiceType } from './types';

export interface ServiceDetail {
  id: string;
  category: 'baru' | 'dokumen' | 'mutasi' | 'khusus';
  title: ServiceType;
  titleEn: string;
  description: string;
  descriptionEn: string;
  requirements: string[];
  processingTime: string;
  importantNotes: string[];
}

export const CAMPUS_SERVICES: ServiceDetail[] = [
  {
    id: 's1',
    category: 'baru',
    title: 'Surat Izin Belajar',
    titleEn: 'Study Permit Reference',
    description: 'Permohonan surat rekomendasi izin belajar bagi mahasiswa asing baru ke kementerian terkait.',
    descriptionEn: 'Application for a study permit reference letter for new international students to the ministry.',
    requirements: ['Passport Scan (Paspor)', 'Admission Letter (LoA)', 'Academic Transcript', 'Student ID Card'],
    processingTime: '3-5 Working Days',
    importantNotes: ['The study permit is mandatory for obtaining a student visa and staying legal.', 'Academic achievements must be maintained during studies at ITATS.']
  },
  {
    id: 's2',
    category: 'baru',
    title: 'Visa Pelajar',
    titleEn: 'Student Visa Recommendation',
    description: 'Surat rekomendasi visa pelajar (Telex Visa) untuk kelancaran masuk wilayah Indonesia secara legal.',
    descriptionEn: 'Student visa recommendation letter (Telex Visa) for legal entry into the territory of Indonesia.',
    requirements: ['Statement of Financial Support', 'Health Certificate', 'LoA ITATS', 'Passport Cover Page'],
    processingTime: '5-7 Working Days',
    importantNotes: ['The recommendation letter is only sent if the financial guarantee is clear.', 'It is highly advised to apply at least 4 weeks before arrival.']
  },
  {
    id: 's3',
    category: 'dokumen',
    title: 'Perpanjangan KITAS',
    titleEn: 'KITAS Extension Support',
    description: 'Layanan administrasi pendukung untuk perpanjangan Kartu Izin Tinggal Terbatas (KITAS) mahasiswa.',
    descriptionEn: 'Support administrative services for extending the students Limited Stay Permit (KITAS).',
    requirements: ['Passport', 'Existing KITAS', 'Student Card', 'Study Permit'],
    processingTime: '7-14 Working Days',
    importantNotes: ['Passport validity must exceed 6 months.', 'KITAS extension should be initiated 30-45 days prior to expiration.']
  },
  {
    id: 's4',
    category: 'dokumen',
    title: 'Perpanjangan Izin Belajar',
    titleEn: 'Study Permit Extension',
    description: 'Surat pengajuan perpanjangan izin belajar dari Kementerian Pendidikan untuk mahasiswa aktif.',
    descriptionEn: 'Application for extending the study permit from the Ministry of Education for active students.',
    requirements: ['Current Study Permit', 'Academic Progress Report', 'Covering letter from Rector', 'Passport Scan'],
    processingTime: '3-5 Working Days',
    importantNotes: ['Required as prerequisite before extending actual KITAS permits.', 'Delay in Study Permit extension can lead to study suspension.']
  },
  {
    id: 's5',
    category: 'mutasi',
    title: 'Mutasi Paspor',
    titleEn: 'Passport Mutation Note',
    description: 'Pelaporan dan pembuatan surat keterangan mutasi paspor baru atau perubahan data paspor mahasiswa.',
    descriptionEn: 'Reporting and issuance of statement letters regarding passport replacement or data alterations.',
    requirements: ['Old Passport Scan', 'New Passport Scan', 'Current KITAS'],
    processingTime: '2-4 Working Days',
    importantNotes: ['Report must be filed within 14 days after the new passport is issued.', 'Required for coordinating immigration and civil lists.']
  },
  {
    id: 's6',
    category: 'mutasi',
    title: 'Mutasi Alamat Domisili',
    titleEn: 'Address Mutation Report',
    description: 'Pelaporan pergantian alamat tempat tinggal (domisili) mahasiswa asing ke kantor Imigrasi Surabaya.',
    descriptionEn: 'Reporting the change of residential address of international students to Surabaya Immigration.',
    requirements: ['Letter of Domicile (Rt/Rw)', 'Passport Copy', 'KITAS Copy'],
    processingTime: '2-4 Working Days',
    importantNotes: ['A certificate from local sub-district administration is required.', 'Failure to report residential changes is subject to local penalties.']
  },
  {
    id: 's7',
    category: 'khusus',
    title: 'Surat Rekomendasi Beasiswa',
    titleEn: 'Scholarship Recommendation',
    description: 'Surat rekomendasi resmi dari Rektorat / Kantor Urusan Internasional ITATS untuk apply beasiswa.',
    descriptionEn: 'Official recommendation letter from ITATS International Office or Rectorate for scholarship application.',
    requirements: ['GPA Transcript > 3.00', 'Recommendation request from Sponsor', 'Student ID Card'],
    processingTime: '2-5 Working Days',
    importantNotes: ['Available only for active international students with outstanding academic records.', 'Must be signed off by KUI office and approved by Dean/Rector.']
  }
];

export const INITIAL_APPLICATIONS: Application[] = [
  {
    id: 'APP-0941',
    studentName: 'Jean-Luc Picard',
    nim: '12.2025.1.00042',
    nationality: 'Prancis (France)',
    passportNumber: 'FR8491029',
    serviceType: 'Perpanjangan KITAS',
    submissionDate: '2026-06-01',
    status: 'Disetujui',
    documentName: 'kitas_jean_luc.pdf',
    notes: 'KITAS expired in 30 days. Need fast recommendation letter.',
    operatorNotes: 'Verified with immigration sponsor status. Approved.',
    verificationDate: '2026-06-03'
  },
  {
    id: 'APP-0942',
    studentName: 'Yuki Tanaka',
    nim: '14.2024.1.00010',
    nationality: 'Jepang (Japan)',
    passportNumber: 'JP3371902',
    serviceType: 'Surat Izin Belajar',
    submissionDate: '2026-06-08',
    status: 'Diproses',
    documentName: 'study_permit_tanaka.pdf',
    notes: 'New student enrolling in Informatics Department.',
    verificationDate: '2026-06-09'
  },
  {
    id: 'APP-0943',
    studentName: 'Ahmed Al-Mansoor',
    nim: '06.2023.2.00085',
    nationality: 'Mesir (Egypt)',
    passportNumber: 'EG5231998',
    serviceType: 'Surat Rekomendasi Beasiswa',
    submissionDate: '2026-06-09',
    status: 'Pending',
    documentName: 'gpa_transcript_ahmed.pdf',
    notes: 'Applying for ITATS Outstanding Foreign Student Scholarship.',
  },
  {
    id: 'APP-0944',
    studentName: 'Chao Xing',
    nim: '02.2024.1.04211',
    nationality: 'Tiongkok (China)',
    passportNumber: 'CN9912042',
    serviceType: 'Mutasi Paspor',
    submissionDate: '2026-05-20',
    status: 'Ditolak',
    documentName: 'passport_scan_chao.pdf',
    notes: 'Renewed passport at Chinese Consulate in Surabaya.',
    operatorNotes: 'Scan of new passport was blurry. Please re-submit with high-resolution scan.',
    verificationDate: '2026-05-22'
  }
];

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Jean-Luc Picard',
    country: 'Prancis (France)',
    major: 'Informatika ITATS (Informatics)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    content: 'KWI (Kantor Urusan Internasional) ITATS sangat ramah membantu pengurusan KITAS saya. Proses online lewat portal ini sangat cepat dan transparan!',
    rating: 5
  },
  {
    id: 't2',
    name: 'Yuki Tanaka',
    country: 'Jepang (Japan)',
    major: 'Teknik Sipil (Civil Engineering)',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    content: 'Applying for study permit reference used to take days of waiting. This smart portal shortens the process into simple forms. Thank you ITATS!',
    rating: 5
  },
  {
    id: 't3',
    name: 'Ahmed Al-Mansoor',
    country: 'Mesir (Egypt)',
    major: 'Teknik Mesin (Mechanical Eng.)',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    content: 'Sangat terbantu untuk beasiswa. Saya bisa mendownload draf rekomendasi langsung setelah disetujui operator. Website yang modern dan responsif.',
    rating: 4
  }
];
