export interface Contact {
  id: string;
  name: string;
  nameSinhala?: string;
  nameTamil?: string;
  department: string;
  hotline: string;
  extension?: string;
  operatingHours: string;
  location: string;
  type: string;
  keywords: string[];
}

export const dummyContacts: Contact[] = [
  {
    id: "1",
    name: "Regional Telecom Office (RTO) - Kandy",
    nameSinhala: "මහනුවර ප්‍රාදේශීය විදුලි සංදේශ කාර්යාලය",
    nameTamil: "கண்டி பிராந்திய தொலைத்தொடர்பு அலுவலகம்",
    department: "Customer Care & Billing",
    hotline: "+94 81 222 2222",
    extension: "1212",
    operatingHours: "08:30 AM - 05:00 PM",
    location: "No. 15, Peradeniya Road, Kandy",
    type: "RTO",
    keywords: ["kandy", "rto", "billing", "mahanuwara", "bill", "hotline", "nuwara", "ekak", "ona", "section"]
  },
  {
    id: "2",
    name: "Customer Experience Center - Kandy (City Centre)",
    department: "Customer Support",
    hotline: "081 2 222 333",
    operatingHours: "09:00 AM - 06:00 PM",
    location: "KCC, Kandy",
    type: "CEC",
    keywords: ["kandy", "cec", "city centre", "support", "experience"]
  },
  {
    id: "3",
    name: "Peradeniya Teleshop",
    department: "Sales & Support",
    hotline: "081 2 388 444",
    operatingHours: "08:30 AM - 05:00 PM",
    location: "Peradeniya",
    type: "Teleshop",
    keywords: ["peradeniya", "teleshop", "sales", "support"]
  },
  {
    id: "4",
    name: "Colombo Head Office",
    department: "Main Administration",
    hotline: "+94 11 2 428 123",
    operatingHours: "08:30 AM - 05:00 PM",
    location: "Lotus Road, Colombo 01",
    type: "Head Office",
    keywords: ["colombo", "head office", "main", "admin"]
  },
  {
    id: "5",
    name: "Kurunegala RTO",
    department: "Customer Care & Billing",
    hotline: "037 2 222 111",
    operatingHours: "08:30 AM - 05:00 PM",
    location: "Kurunegala",
    type: "RTO",
    keywords: ["kurunegala", "rto", "billing", "bill"]
  },
  {
    id: "6",
    name: "Gehan Jayawardana",
    department: "IT Infrastructure",
    hotline: "+94 71 234 5678",
    operatingHours: "08:30 AM - 05:00 PM",
    location: "Colombo Head Office",
    type: "Employee",
    keywords: ["gehan", "jayawardanage", "jayawardana", "num", "eka", "denna", "number"]
  },
  {
    id: "7",
    name: "SLT Regional Office - Colombo",
    department: "General Administration",
    hotline: "+94 11 2 269 269",
    operatingHours: "08:30 AM - 05:00 PM",
    location: "269, Colombo, Sri Lanka",
    type: "Regional Office",
    keywords: ["269", "colombo", "srilanka", "sri", "lanka", "269,colombo"]
  }
];
