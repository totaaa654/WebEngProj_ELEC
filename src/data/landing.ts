export type BaseLandingSectionData = {
  id: string;
  title: string;
  assignedGroup: string;
  statusLabel: string;
};

export type MissionVisionSectionData = BaseLandingSectionData & {
  missionText: string;
  visionText: string;
};

export type DepartmentGridSectionData = BaseLandingSectionData & {
  introText: string;
};

export type NewsItem = {
  title: string;
  date: string;
};

export type NewsSectionData = BaseLandingSectionData & {
  items: NewsItem[];
};

export type FacilitiesSectionData = BaseLandingSectionData & {
  highlights: string[];
};

export type StatisticItem = {
  label: string;
  value: string;
};

export type StatisticsSectionData = BaseLandingSectionData & {
  stats: StatisticItem[];
};

export type ContactSectionData = BaseLandingSectionData & {
  email: string;
  phone: string;
  address: string;
};

export type FooterLink = {
  label: string;
  href: string;
};

export type FooterSectionData = BaseLandingSectionData & {
  links: FooterLink[];
};

export type LandingHeroData = {
  eyebrow: string;
  title: string;
  description: string;
  primaryButtonLabel: string;
  primaryButtonHref: string;
};

export type LandingPageData = {
  hero: LandingHeroData;
  sections: {
    missionVision: MissionVisionSectionData;
    departmentGrid: DepartmentGridSectionData;
    news: NewsSectionData;
    facilities: FacilitiesSectionData;
    statistics: StatisticsSectionData;
    contact: ContactSectionData;
    footer: FooterSectionData;
  };
};

export const landingPageData: LandingPageData = {
  hero: {
    eyebrow: "LANDING PAGE • HERO SECTION",
    title: "Bulacan State University\nCollege of Engineering",
    description:
      "This hero block is active for your group. Other landing sections are placeholders and should be implemented by their assigned groups.",
    primaryButtonLabel: "Enter Department Pages",
    primaryButtonHref: "/departments",
  },
  sections: {
    missionVision: {
      id: "mission-vision",
      title: "Mission & Vision",
      assignedGroup: "Roxas, Aiam Airron L",
      statusLabel: "RESERVED SECTION",
      missionText: "Placeholder mission statement.",
      visionText: "Placeholder vision statement.",
    },
    departmentGrid: {
      id: "department-grid",
      title: "Department Grid",
      assignedGroup: "Pagdanganan, Arviella S",
      statusLabel: "RESERVED SECTION",
      introText: "Placeholder description for department grid section.",
    },
    news: {
      id: "news",
      title: "News",
      assignedGroup: "Dela Cruz, Richter Vhon C",
      statusLabel: "RESERVED SECTION",
      items: [
        { title: "Placeholder News 1", date: "2026-03-05" },
        { title: "Placeholder News 2", date: "2026-03-05" },
      ],
    },
    facilities: {
      id: "facilities",
      title: "Facilities",
      assignedGroup: "Jones, Colleen Iris P",
      statusLabel: "RESERVED SECTION",
      highlights: ["Placeholder Facility 1", "Placeholder Facility 2"],
    },
    statistics: {
      id: "statistics",
      title: "Statistics",
      assignedGroup: "Pascual, Alyssa S.",
      statusLabel: "RESERVED SECTION",
      stats: [
        { label: "Programs", value: "8" },
        { label: "Students", value: "0" },
      ],
    },
    contact: {
      id: "contact",
      title: "Contact",
      assignedGroup: "Pagayunan, Lhara Mei R",
      statusLabel: "RESERVED SECTION",
      email: "coe@example.edu",
      phone: "+63 000 000 0000",
      address: "Bulacan State University",
    },
    footer: {
      id: "footer",
      title: "Footer",
      assignedGroup: "Villareal, Trisha Mae",
      statusLabel: "RESERVED SECTION",
      links: [
        { label: "Privacy", href: "#" },
        { label: "Contact", href: "#contact" },
      ],
    },
  },
};
