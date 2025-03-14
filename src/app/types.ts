export interface Nonprofit {
  name: string;
  description: string;
  coverImageCloudinaryId?: string;
  logoUrl?: string;
  coverImageUrl?: string;
  ein: string;
  profileUrl?: string;
  websiteUrl?: string;
  location?: string;
  tags?: string[];
}

export interface Fundraiser {
  title: string;
  description: string;
  goalAmount: number;
  raised: number;
  currency: string;
  coverImageCloudinaryId: string;
  logoUrl: string;
  coverImageUrl: string;
  profileUrl: string;
  websiteUrl: string;
  location: string;
  tags: string[];
}

export interface Charity {
  ein: string;
  name: string;
  description?: string;
  coverImageCloudinaryId?: string;
  logoUrl?: string;
  coverImageUrl?: string;
  profileUrl?: string;
  websiteUrl?: string;
  location?: string;
  tags?: string[];
}

export const mapCharityToFundraiser = (charity: Charity): Fundraiser => ({
  title: charity.name,
  description: charity.description || "No description available",
  goalAmount: 100000, // Placeholder value
  raised: Math.floor(Math.random() * 8000) + 10000, // Placeholder for raised amount
  currency: "ISK",
  coverImageCloudinaryId: charity.coverImageCloudinaryId || "",
  logoUrl: charity.logoUrl || "",
  coverImageUrl: charity.coverImageUrl || "",
  profileUrl: charity.profileUrl || "",
  websiteUrl: charity.websiteUrl || "",
  location: charity.location || "",
  tags: charity.tags || [],
});

export const mapCharityToNonProfit = (charity: Charity): Nonprofit => ({
  name: charity.name,
  description: charity.description || "No description available",
  coverImageCloudinaryId: charity.coverImageCloudinaryId || "",
  logoUrl: charity.logoUrl || "",
  coverImageUrl: charity.coverImageUrl || "",
  profileUrl: charity.profileUrl || "",
  websiteUrl: charity.websiteUrl || "",
  location: charity.location || "",
  tags: charity.tags || [],
  ein: charity.ein,
});
