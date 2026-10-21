export type ServiceCategory =
  | 'health'        // স্বাস্থ্যসেবা
  | 'transport'     // যাতায়াত ও পরিবহন
  | 'market'        // দোকান ও বাজার
  | 'repair'        // বাসা ও কারিগরি সেবা
  | 'education'     // শিক্ষা ও প্রশিক্ষণ
  | 'jobs'          // চাকরি ও নিয়োগ
  | 'housing'       // বাসা ভাড়া ও হোটেল
  | 'other';        // অন্যান্য সেবা

export interface CategoryInfo {
  id: ServiceCategory;
  name: string;
  banglaName: string;
  iconName: string;
  bgColor: string;
  iconColor: string;
  count: number;
}

export type ServiceStatus = 'approved' | 'pending' | 'rejected';

export interface ServiceItem {
  id: string;
  name: string;
  banglaName: string;
  category: ServiceCategory;
  categoryBangla: string;
  subCategory?: string;
  upazila: string;
  union?: string;
  address: string;
  phone: string;
  secondaryPhone?: string;
  whatsapp?: string;
  openingHours: string;
  isOpenNow: boolean;
  distance: string;
  distanceKm: number;
  rating: number;
  reviewCount: number;
  image: string;
  verified: boolean;
  description: string;
  servicesOffered: string[];
  lat?: number;
  lng?: number;
  isEmergency?: boolean;
  priceRange?: string;
  isUserAdded?: boolean;
  status?: ServiceStatus; // 'approved' | 'pending' | 'rejected'
  isPublished?: boolean;  // whether visible to public visitors
  applicantName?: string;
  createdAt?: string;
  rejectionReason?: string;
}

export type Upazila =
  | 'চরফ্যাশন'
  | 'ভোলা সদর'
  | 'লালমোহন'
  | 'বোরহানউদ্দিন'
  | 'দৌলতখান'
  | 'তজুমদ্দিন'
  | 'মনপুরা';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: 'alert' | 'info' | 'service';
}

export interface SectionVisibilityConfig {
  hero: boolean;
  search: boolean;
  location: boolean;
  categories: boolean;
  trust: boolean;
  nearby: boolean;
  installPromo: boolean;
}

export interface HomepageConfig {
  appName: string;
  tagline: string;
  heroTitle: string;
  heroSubtitle: string;
  heroPill: string;
  heroWatermark: string;
  heroImage: string;
  sectionVisibility: SectionVisibilityConfig;
}

export interface LocationConfig {
  district: string;
  upazilas: string[];
  unionsByUpazila: Record<string, string[]>;
}

export interface AuditLogItem {
  id: string;
  action: string;
  details: string;
  timestamp: string;
  adminEmail: string;
}

export interface AppUser {
  id: string;
  email: string;
  displayName: string;
  role: 'owner' | 'admin' | 'user';
  status: 'active' | 'suspended';
  joinedAt: string;
  lastLogin?: string;
}
