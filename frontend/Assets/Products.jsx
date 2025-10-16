import { VscCoverage } from "react-icons/vsc";
import logo from "./logo.png";

 

// Product Icons
import aditya from "./ProductIcons/aditya.png";
import bajaj from "./ProductIcons/bajaj.png";
import manipal from "./ProductIcons/manipal.png";
import niva from "./ProductIcons/niva.png";
import hdfc from "./ProductIcons/hdfc.png";
import maxlife from "./ProductIcons/maxlife.png";
import icici from "./ProductIcons/icici.png";
import tata from "./ProductIcons/tata.png";
import sbicar from "./ProductIcons/sbicar.png";
import ackocar from "./ProductIcons/ackocar.png";
import hdfccar from "./ProductIcons/hdfccar.png";
import maxbupa from "./ProductIcons/maxbupa.png";
import religare from "./ProductIcons/religare.png";
import starhealth from "./ProductIcons/starhealth.png";
import CPP from "./ProductIcons/CPP.png";

export const Products = [
  {
    id: '0',
    category: "termlife",
    image: hdfc,
    name: "HDFC Life Click 2 Protect",
    head: "Term Life Plan",
    sub_name: "HDFC Life Insurance",
    type: "Individual",
    premium: 4500,
    coverage: 10000000, // ₹ 1 Crore
    desc: {
      desc1: "Offers life cover with critical illness rider.",
      desc2: "Flexible payout options with lump sum",
      desc3: "Accidental death benefit for added protection."
    },
    rating: 4
  },
  {
    id: '1',
    category: "termlife",
    image: maxlife,
    name: "Max Life Smart Term Plan",
    head: "Term Life Plan",
    sub_name: "Max Life Insurance",
    type: "Individual",
    premium: 5200,
    coverage: 12500000, // ₹ 1.25 Crore
    desc: {
      desc1: "Provides coverage up to 85 years of age.",
      desc2: "Option to return premiums on policy maturity.",
      desc3: "Tax benefits under Section 80C and 10D."
    },
    rating: 4.5
  },
  {
    id: '2',
    category: "termlife",
    image: icici,
    name: "ICICI Pru iProtect Smart",
    head: "Term Life Plan",
    sub_name: "ICICI Prudential Life Insurance",
    type: "Individual",
    premium: 4800,
    coverage: 20000000, // ₹ 2 Crore
    desc: {
      desc1: "Comprehensive protection including terminal.",
      desc2: "Special premium rates for non-smokers",
      desc3: "Covers 34 critical illnesses with add-ons."
    },
    rating: 5
  },
  {
    id: '3',
    category: "termlife",
    image: tata,
    name: "Tata Sampoorna Raksha",
    head: "Term Life Plan",
    sub_name: "Tata AIA Life Insurance",
    type: "Individual",
    premium: 4000,
    coverage: 7500000, // ₹ 75 Lakhs
    desc: {
      desc1: "Dual payout options of lump sum and monthly.",
      desc2: "Option to increase life cover during key events.",
      desc3: "Includes terminal illness cover with no extra."
    },
    rating: 4
  },
  {
    id: '4',
    category: "health",
    image: aditya,
    name: "Aditya Birla Group Active",
    head: "Health Plan",
    sub_name: "Adity Birla Health Insurance",
    type: "Group",
    premium: 8182,
    coverage: 500000, // ₹ 5 Lakh
    desc: {
      desc1: "10,000+ cashless hospitals",
      desc2: "Covers asthma, blood pressure, cholesterol",
      desc3: "Covers 527 daycare procedures"
    },
    rating: 4
  },
  {
    id: '5',
    category: "health",
    image: bajaj,
    name: "Bajaj Allianz Health Guard",
    head: "Insurance Plan",
    sub_name: "Bajaj Allianz General Insurance",
    type: "RETAIL",
    premium: 6962,
    coverage: 500000,
    desc: {
      desc1: "Provides mental health and wellness support.",
      desc2: "Includes ambulance charges for emergency.",
      desc3: "Offers cashless claim facility at 6500+."
    },
    rating: 3
  },
  {
    id: '6',
    category: "health",
    image: manipal,
    name: "Pro Health Senior Citizen",
    head: "Super Topup",
    sub_name: "ManipalCigna Health Insurance",
    type: "GROUP",
    premium: 12453,
    coverage: 500000,
    desc: {
      desc1: "Coverage for senior citizens up to ₹ 5 lakh.",
      desc2: "Cashless treatment at 6000+ hospitals.",
      desc3: "Pre- and post-hospitalisation coverage."
    },
    rating: 3
  },
  {
    id: '7',
    category: "health",
    image: niva,
    name: "Niva Bupa Health Plus Plan",
    head: "",
    sub_name: "Niva Bupa Health Insurance",
    type: "GROUP",
    premium: 2649,
    coverage: 10000,
    desc: {
      desc1: "Includes annual health check-ups for all members",
      desc2: "Extensive network of hospitals with cashless.",
      desc3: "Daycare treatment coverage for various procedures."
    },
    rating: 3
  },
  {
    id: '8',
    category: "car",
    image: sbicar,
    name: "SBI General Car Insurance",
    head: "",
    sub_name: "SBI General Insurance",
    type: "RETAIL",
    premium: 3043,
    coverage: 50000,
    desc: {
      desc1: "Covers damages due to accidents or collisions.",
      desc2: "Protection against theft and vandalism.",
      desc3: "Natural calamity coverage included."
    },
    rating: 4
  },
  {
    id: '9',
    category: "car",
    image: bajaj,
    name: "Bajaj Allianz Car Insurance",
    head: "",
    sub_name: "Bajaj Allianz General Insurance",
    type: "RETAIL",
    premium: 3031,
    coverage: 50000,
    desc: {
      desc1: "Provides coverage for third-party liability.",
      desc2: "Includes protection for accidental damages.",
      desc3: "Offers cashless claim facility at 6500+ garages."
    },
    rating: 3
  },
  {
    id: '10',
    category: "car",
    image: ackocar,
    name: "ACKO Car Insurance",
    head: "",
    sub_name: "ACKO General Insurance",
    type: "RETAIL",
    premium: 2762,
    coverage: 50000,
    desc: {
      desc1: "Covers accidental damage and vehicle repair.",
      desc2: "Third-party liability protection for accidents.",
      desc3: "Cashless facility at over 5000 garages."
    },
    rating: 3
  },
  {
    id: '11',
    category: "car",
    image: hdfccar,
    name: "HDFC ERGO Car Insurance",
    head: "",
    sub_name: "HDFC ERGO General Insurance",
    type: "RETAIL",
    premium: 2094,
    coverage: 50000,
    desc: {
      desc1: "Covers damages from accidents, natural calamities.",
      desc2: "Extensive network of garages offering service.",
      desc3: "Add-on coverage options for engine protection."
    },
    rating: 3
  },
  {
    id: '12',
    category: "bike",
    image: bajaj,
    name: "Bajaj Allianz Bike Insurance",
    head: "",
    sub_name: "Bajaj Allianz General Insurance",
    type: "RETAIL",
    premium: 850,
    coverage: 100000,
    desc: {
      desc1: "Covers accidental damage",
      desc2: "24/7 roadside assistance",
      desc3: "No claim bonus available"
    },
    rating: 4
  },
  {
    id: '13',
    category: "bike",
    image: icici,
    name: "ICICI Lombard Bike Insurance",
    head: "",
    sub_name: "ICICI Lombard General Insurance",
    type: "RETAIL",
    premium: 1020,
    coverage: 200000,
    desc: {
      desc1: "Protection against theft",
      desc2: "Cashless network of garages",
      desc3: "Personal accident cover"
    },
    rating: 4
  },
  {
    id: '14',
    category: "bike",
    image: hdfc,
    name: "HDFC ERGO Bike Insurance",
    head: "",
    sub_name: "HDFC ERGO General Insurance",
    type: "RETAIL",
    premium: 900,
    coverage: 150000,
    desc: {
      desc1: "Comprehensive protection",
      desc2: "Fast claim process",
      desc3: "Wide garage network"
    },
    rating: 3.5
  },
  {
    id: '15',
    category: "bike",
    image: tata,
    name: "Tata AIG Bike Insurance",
    head: "",
    sub_name: "Tata AIG General Insurance",
    type: "RETAIL",
    premium: 950,
    coverage: 125000,
    desc: {
      desc1: "Accidental damage cover",
      desc2: "24/7 claim assistance",
      desc3: "Third-party liability"
    },
    rating: 4
  },
  {
    id: '16',
    category: "family",
    image: starhealth,
    name: "Star Health Family Health Optima",
    head: "",
    sub_name: "Star Health and Allied Insurance",
    type: "RETAIL",
    premium: 15000,
    coverage: 100000,
    desc: {
      desc1: "Complete family health cover",
      desc2: "Cashless hospitalization",
      desc3: "Pre and post-hospitalization"
    },
    rating: 4
  },
  {
    id: '17',
    category: "family",
    image: religare,
    name: "Religare Health Family Floater",
    head: "",
    sub_name: "Religare Health Insurance",
    type: "RETAIL",
    premium: 12000,
    coverage: 500000,
    desc: {
      desc1: "Comprehensive medical cover",
      desc2: "No age limit for policyholders",
      desc3: "Network hospitals for cashless claims"
    },
    rating: 4
  },
  {
    id: '18',
    category: "family",
    image: maxbupa,
    name: "Max Bupa Health Companion",
    head: "",
    sub_name: "Max Bupa Health Insurance",
    type: "RETAIL",
    premium: 13500,
    coverage: 800000,
    desc: {
      desc1: "Family floater plan",
      desc2: "Free health check-ups",
      desc3: "Cashless treatment across hospitals"
    },
    rating: 4
  },
  {
    id: '19',
    category: "family",
    image: hdfc,
    name: "HDFC ERGO Health Protect",
    head: "",
    sub_name: "HDFC ERGO Health Insurance",
    type: "RETAIL",
    premium: 12500,
    coverage: 750000,
    desc: {
      desc1: "Affordable health plan for family",
      desc2: "Daily hospital cash benefit",
      desc3: "Pre and post-hospitalization covered"
    },
    rating: 3.5
  },
  {
    id: '20',
    category: "travel",
    image: bajaj,
    name: "Mumbai Local Train Insurance Cover",
    head: "",
    sub_name: "Bajaj Allianz General Insurance",
    type: "GROUP",
    premium: 416,
    coverage: 100000, // ₹ 1,00,000
    desc: {
      desc1: "Family health cover",
      desc2: "Cashless hospitalization",
      desc3: "Pre and post-hospitalization"
    },
    rating: 4
  },
  {
    id: '21',
    category: "travel",
    image: CPP,
    name: "Leh Ladakh Road Trip Cover",
    head: "",
    sub_name: "CPP Group India",
    type: "ASSISTANCE",
    premium: 599,
    coverage: 100000, // ₹ 1,00,000
    desc: {
      desc1: "Comprehensive medical cover",
      desc2: "No age limit",
      desc3: "Cashless claim network"
    },
    rating: 4
  },
  {
    id: '22',
    category: "travel",
    image: CPP,
    name: "Mumbai Pune Road Trip Cover",
    head: "",
    sub_name: "CPP Group India",
    type: "ASSISTANCE",
    premium: 599,
    coverage: 300000, // ₹ 3,00,000
    desc: {
      desc1: "Medical coverage",
      desc2: "No age restrictions",
      desc3: "Cashless hospital treatment"
    },
    rating: 4
  },
  {
    id: '23',
    category: "travel",
    image: CPP,
    name: "Pune Goa Road Trip Cover",
    head: "",
    sub_name: "CPP Group India",
    type: "ASSISTANCE",
    premium: 599,
    coverage: 3000000, // ₹ 30,00,000
    desc: {
      desc1: "Medical cover included",
      desc2: "Unlimited age coverage",
      desc3: "Cashless claims available"
    },
    rating: 4
  },
  {
    id: '24',
    category: "home",
    image: hdfc,
    name: "Household Protection Plan",
    head: "Basic Home Insurance",
    sub_name: "HDFC Ergo Home Insurance",
    type: "RETAIL",
    premium: 2799,
    coverage: 5000000, // ₹ 50,00,000
    desc: {
      desc1: "Covers fire, lightning, and explosion",
      desc2: "Protection against theft and burglary",
      desc3: "Loss of household goods and valuables"
    },
    rating: 4
  },
  {
    id: '25',
    category: "home",
    image: bajaj,
    name: "HomeSecure In",
    head: "Comprehensive Home Inc",
    sub_name: "Bajaj Allianz General Insurance",
    type: "RETAIL",
    premium: 3499,
    coverage: 800000, // ₹ 8,00,000
    desc: {
      desc1: "Coverage for damage due to natural calamities",
      desc2: "Theft, burglary, and vandalism protection",
      desc3: "Coverage for accidental damage to property"
    },
    rating: 5
  },
  {
    id: '26',
    category: "home",
    image: icici,
    name: "HomeCare Plus Plan",
    head: "Secure Your Home",
    sub_name: "ICICI Lombard General Insurance",
    type: "RETAIL",
    premium: 1599,
    coverage: 400000, // ₹ 4,00,000
    desc: {
      desc1: "Fire and lightning damage protection",
      desc2: "Covers accidental damage and theft",
      desc3: "Liability coverage for accidents at home"
    },
    rating: 3
  },
  {
    id: '27',
    category: "home",
    image: tata,
    name: "Total Home Care Plan",
    head: "All-Inclusive Coverage",
    sub_name: "Tata AIG General Insurance",
    type: "RETAIL",
    premium: 4299,
    coverage: 1000000, // ₹ 10,00,000
    desc: {
      desc1: "Complete protection against fire and floods",
      desc2: "Covers home contents and valuables",
      desc3: "Accident, theft, and burglary cover"
    },
    rating: 4
  },
  {
    id: '28',
    category: "Corp",
    image: hdfc,
    name: "Business Liability Insurance",
    head: "General Liability Coverage",
    sub_name: "HDFC Ergo Corporate Insurance",
    type: "GROUP",
    premium: 8999,
    coverage: 10000000, // ₹ 1 Crore
    desc: {
      desc1: "Protection against third-party claims",
      desc2: "Covers employee injuries on the job",
      desc3: "Business interruption coverage"
    },
    rating: 4
  },
  {
    id: '29',
    category: "Corp",
    image: bajaj,
    name: "Employee Health Insurance",
    head: "Corporate Health Insurance",
    sub_name: "Bajaj Allianz Corporate Insurance",
    type: "GROUP",
    premium: 4999,
    coverage: 500000, // ₹ 5 Lakh
    desc: {
      desc1: "Comprehensive health coverage for employees",
      desc2: "Cashless treatment at network hospitals",
      desc3: "Pre and post-hospitalization cover"
    },
    rating: 5
  },
  {
    id: '30',
    category: "Corp",
    image: icici,
    name: "Property Damage Insurance",
    head: "Property Protection",
    sub_name: "ICICI Lombard Corporate Insurance",
    type: "GROUP",
    premium: 8499,
    coverage: 5000000, // ₹ 50 Lakh
    desc: {
      desc1: "Covers damage due to fire and floods",
      desc2: "Protection against theft and vandalism",
      desc3: "Business interruption due to property damage"
    },
    rating: 3
  },
  {
    id: '31',
    category: "Corp",
    image: tata,
    name: "Workers Compensation Insurance",
    head: "Employee Injury Coverage",
    sub_name: "Tata AIG Corporate Insurance",
    type: "GROUP",
    premium: 7999,
    coverage: 2000000, // ₹ 20 Lakh
    desc: {
      desc1: "Coverage for employee work-related injuries",
      desc2: "Medical expenses and rehabilitation costs",
      desc3: "Legal expenses for employer defense"
    },
    rating: 4
  }
];

