export type PrinterVersion = {
  id: string;
  label: string;
  desc: string;
  priceAdd: number;
};

export type SpecRow = { label: string; value: string };

export type FAQ = { q: string; a: string };

export type Review = {
  name: string;
  company: string;
  rating: number;
  text: string;
  date: string;
};

export type Printer = {
  slug: string;
  name: string;
  brand: string;
  category: 'desktop' | 'office' | 'enterprise';
  spec: string;
  price: string;
  priceNote: string;
  images: string[];
  tagline: string;
  description: string;
  features: string[];
  specs: SpecRow[];
  fullSpecs: { group: string; rows: SpecRow[] }[];
  idealFor: string[];
  versions: PrinterVersion[];
  whatsIncluded: string[];
  rentalTerms: { label: string; value: string }[];
  availability: string[];
  setupTimeline: string;
  sla: string;
  faqs: FAQ[];
  reviews: Review[];
};

export const printers: Printer[] = [
  {
    slug: 'brother-hl-l5200dw',
    name: 'Brother HL-L5200DW',
    brand: 'Brother',
    category: 'desktop',
    spec: 'A4 | Black & White',
    price: '₹1,200',
    priceNote: 'per printer per month',
    images: ['/printers/brother-hl-l5200dw.png'],
    tagline: 'Fast, compact, no-nonsense office workhorse.',
    description:
      'The Brother HL-L5200DW is a high-speed monochrome laser printer built for small to medium workgroups. With built-in Wi-Fi and automatic duplex printing, it delivers sharp, professional documents at remarkable speed — all in a compact footprint that fits any desk.',
    features: [
      'Speed 35 PPM – A4 / Legal',
      'Automatic Duplex Printing',
      '250 sheet input tray + 50 sheet multi-purpose tray',
      'Built-in Wi-Fi & Ethernet',
      '8,000 page monthly duty cycle',
      '1200 dpi effective output',
      'Standard Memory 128 MB',
    ],
    specs: [
      { label: 'Print Speed', value: '35 PPM' },
      { label: 'Resolution', value: '1200 dpi' },
      { label: 'Paper Size', value: 'A4 / Legal / Letter' },
      { label: 'Paper Capacity', value: '300 sheets' },
      { label: 'Monthly Duty Cycle', value: '8,000 pages' },
      { label: 'Connectivity', value: 'Wi-Fi, Ethernet, USB' },
      { label: 'Duplex', value: 'Automatic' },
      { label: 'Weight', value: '10.9 kg' },
    ],
    fullSpecs: [
      {
        group: 'Print',
        rows: [
          { label: 'Print Speed (A4)', value: '35 PPM' },
          { label: 'Print Speed (Duplex)', value: '16 sides per minute' },
          { label: 'First Page Out', value: 'Under 8.5 seconds' },
          { label: 'Resolution', value: '1200 × 1200 dpi' },
          { label: 'Print Language', value: 'PCL6, BR-Script3 (PostScript 3)' },
          { label: 'Monthly Duty Cycle', value: '8,000 pages' },
          { label: 'Recommended Monthly Volume', value: '500–3,500 pages' },
        ],
      },
      {
        group: 'Paper Handling',
        rows: [
          { label: 'Standard Paper Capacity', value: '250 sheet tray + 50 sheet MP tray' },
          { label: 'Max Paper Capacity', value: 'Up to 800 sheets with optional tray' },
          { label: 'Paper Sizes', value: 'A4, A5, A6, Letter, Legal, Executive, Envelope' },
          { label: 'Paper Weight', value: '60–163 g/m²' },
          { label: 'Duplex', value: 'Automatic (standard)' },
        ],
      },
      {
        group: 'Connectivity',
        rows: [
          { label: 'Network', value: '10/100/1000 BASE-TX Ethernet' },
          { label: 'Wireless', value: '802.11 b/g/n Wi-Fi' },
          { label: 'USB', value: 'USB 2.0 Hi-Speed' },
          { label: 'Mobile Print', value: 'AirPrint, Mopria, Brother iPrint&Scan' },
        ],
      },
      {
        group: 'Physical',
        rows: [
          { label: 'Dimensions (W×D×H)', value: '365 × 360 × 227 mm' },
          { label: 'Weight', value: '10.9 kg' },
          { label: 'Noise Level (printing)', value: '52 dB(A)' },
          { label: 'Noise Level (standby)', value: '30 dB(A)' },
          { label: 'Power Consumption (printing)', value: '520 W' },
          { label: 'Power Consumption (standby)', value: '5.4 W' },
          { label: 'Toner Type', value: 'TN-3448 / TN-3478 (High Yield)' },
          { label: 'Drum Unit', value: 'DR-3435 (30,000 pages)' },
        ],
      },
    ],
    idealFor: ['Small offices', 'Finance teams', 'Admin desks', 'Startups', 'Legal firms'],
    versions: [
      { id: 'standard', label: 'Standard', desc: 'Base model, 35 PPM, Wi-Fi + Ethernet', priceAdd: 0 },
      { id: 'extra-tray', label: '+ Extra Paper Tray', desc: 'Adds 250 sheet lower tray (total 550 sheets)', priceAdd: 200 },
      { id: 'priority', label: '+ Priority Support', desc: '4-hour on-site SLA instead of same-day', priceAdd: 350 },
    ],
    whatsIncluded: [
      'Printer unit (brand new or A-grade refurbished)',
      'Toner cartridge — full starter + replacements as needed',
      'Drum unit replacement when due',
      'Free delivery to your office',
      'Professional installation & network setup',
      'GST invoice every month',
      'Free pickup at end of rental period',
      'Dedicated support executive',
    ],
    rentalTerms: [
      { label: 'Minimum Duration', value: '3 months' },
      { label: 'Lock-in Period', value: 'None after 3 months' },
      { label: 'Cancellation Notice', value: '30 days written notice' },
      { label: 'Security Deposit', value: '1 month rental (refundable)' },
      { label: 'Billing Cycle', value: 'Monthly, GST invoice provided' },
      { label: 'Upgrade Policy', value: 'Free upgrade anytime to higher model' },
      { label: 'Damage Policy', value: 'Normal wear covered. Physical damage charged at cost' },
      { label: 'Ownership', value: 'Printer remains property of Kwality Enterprise' },
    ],
    availability: ['Mumbai', 'Pune', 'Bangalore', 'Hyderabad', 'Chennai', 'Delhi NCR'],
    setupTimeline: 'Delivered & installed within 24–48 hours of order confirmation in metro cities.',
    sla: 'Same-day on-site response for all hardware issues. Temporary replacement printer provided if repair exceeds 4 hours.',
    faqs: [
      { q: 'Is toner included in the monthly rent?', a: 'Yes. Toner, drum replacements, and all consumables are fully included. You only pay the monthly rental — no hidden costs.' },
      { q: 'What if the printer breaks down?', a: 'Call or WhatsApp us and our technician will be on-site the same day. If the repair takes more than 4 hours, we provide a temporary replacement printer at no charge.' },
      { q: 'Can I upgrade to a faster printer mid-rental?', a: 'Absolutely. You can upgrade to any higher model at any time. We will swap the printer within 48 hours and adjust your billing from the next cycle.' },
      { q: 'Is there a minimum rental period?', a: 'The minimum is 3 months. After that, you can continue month-to-month or cancel with 30 days notice.' },
      { q: 'Do you provide networking / setup?', a: 'Yes. Our team installs the printer, connects it to your office network, configures print drivers on your computers, and tests everything before leaving.' },
      { q: 'Is the printer new or refurbished?', a: 'We provide either brand-new printers or thoroughly tested A-grade refurbished units. Both come with the same service guarantee.' },
      { q: 'Can I rent multiple printers for different floors?', a: 'Yes. Fleet rentals of 5+ printers get a 10% discount, and 10+ get 15% off. We manage all of them under one contract.' },
    ],
    reviews: [
      { name: 'Rohit Sharma', company: 'TechSoft Solutions', rating: 5, text: 'Setup was done in less than 2 hours. The printer has been running flawlessly for 8 months. Support team is very responsive.', date: 'Jan 2025' },
      { name: 'Priya Nair', company: 'Apex Finance Ltd', rating: 5, text: 'Switching from owning to renting saved us a huge amount. No more worrying about toner or maintenance — Kwality handles everything.', date: 'Nov 2024' },
      { name: 'Kiran Mehta', company: 'Urban Law Associates', rating: 4, text: 'Very reliable. Had one issue in 6 months and it was fixed the same afternoon. Would recommend to any office.', date: 'Oct 2024' },
    ],
  },
  {
    slug: 'hp-color-m455dw',
    name: 'HP Color LaserJet Pro M455dw',
    brand: 'HP',
    category: 'desktop',
    spec: 'A4 | Color',
    price: '₹1,800',
    priceNote: 'per printer per month',
    images: ['/printers/hp-color-m455dw.png'],
    tagline: 'Sharp color output in a small footprint.',
    description:
      'The HP Color LaserJet Pro M455dw delivers vibrant, professional-quality color prints at up to 27 ppm. Built for small workgroups, it combines fast speed, wireless connectivity and automatic duplex printing in a space-saving design perfect for any office desk.',
    features: [
      'Speed 27 PPM – Color & B&W',
      'Automatic Duplex Printing',
      'Wi-Fi, Ethernet & USB',
      '250 sheet input tray',
      '50,000 page monthly duty cycle',
      'HP Smart App compatible',
      '2.7" colour touchscreen display',
    ],
    specs: [
      { label: 'Print Speed', value: '27 PPM Color' },
      { label: 'Resolution', value: '600 × 600 dpi' },
      { label: 'Paper Size', value: 'A4 / Legal / Letter' },
      { label: 'Paper Capacity', value: '250 sheet tray' },
      { label: 'Monthly Duty Cycle', value: '50,000 pages' },
      { label: 'Connectivity', value: 'Wi-Fi, Ethernet, USB' },
      { label: 'Duplex', value: 'Automatic' },
      { label: 'Weight', value: '18.1 kg' },
    ],
    fullSpecs: [
      {
        group: 'Print',
        rows: [
          { label: 'Print Speed Color (A4)', value: '27 PPM' },
          { label: 'Print Speed B&W (A4)', value: '27 PPM' },
          { label: 'First Page Out Color', value: 'Under 14 seconds' },
          { label: 'Resolution', value: '600 × 600 dpi (up to 38,400 × 600 enhanced)' },
          { label: 'Monthly Duty Cycle', value: '50,000 pages' },
          { label: 'Recommended Monthly Volume', value: '750–4,000 pages' },
        ],
      },
      {
        group: 'Paper Handling',
        rows: [
          { label: 'Standard Capacity', value: '250 sheet input + 50 sheet MP tray' },
          { label: 'Output Capacity', value: '150 sheets' },
          { label: 'Paper Sizes', value: 'A4, A5, Letter, Legal, Executive, Envelopes, Labels' },
          { label: 'Paper Weight', value: '60–200 g/m²' },
          { label: 'Duplex', value: 'Automatic' },
        ],
      },
      {
        group: 'Connectivity',
        rows: [
          { label: 'Network', value: 'Gigabit Ethernet (10/100/1000)' },
          { label: 'Wireless', value: '802.11 b/g/n Wi-Fi Direct' },
          { label: 'USB', value: 'USB 2.0 Host + USB 2.0 Device' },
          { label: 'Mobile Print', value: 'HP ePrint, AirPrint, Mopria' },
          { label: 'Display', value: '2.7" Colour Touchscreen' },
        ],
      },
      {
        group: 'Physical',
        rows: [
          { label: 'Dimensions (W×D×H)', value: '395 × 438 × 254 mm' },
          { label: 'Weight', value: '18.1 kg' },
          { label: 'Noise Level (printing)', value: '53 dB(A)' },
          { label: 'Power Consumption (printing)', value: '540 W' },
          { label: 'Power Consumption (standby)', value: '5 W' },
          { label: 'Toner Type', value: 'HP 215A / 215X (CMYK)' },
        ],
      },
    ],
    idealFor: ['Design teams', 'Marketing offices', 'Client-facing cabins', 'Presentation-heavy teams'],
    versions: [
      { id: 'standard', label: 'Standard Color', desc: 'Base model, color + B&W, 27 PPM', priceAdd: 0 },
      { id: 'high-yield', label: 'High-Yield Toner', desc: '+ Extended toner cartridges for heavy users', priceAdd: 300 },
      { id: 'priority', label: '+ Priority Support', desc: '4-hour on-site SLA', priceAdd: 350 },
    ],
    whatsIncluded: [
      'HP Color LaserJet unit',
      'CMYK toner set — starter + replacements as needed',
      'Free delivery & professional setup',
      'Network configuration on all computers',
      'GST invoice monthly',
      'Free pickup at rental end',
      'Dedicated support executive',
    ],
    rentalTerms: [
      { label: 'Minimum Duration', value: '3 months' },
      { label: 'Cancellation Notice', value: '30 days' },
      { label: 'Security Deposit', value: '1 month rental (refundable)' },
      { label: 'Billing Cycle', value: 'Monthly, GST invoice' },
      { label: 'Upgrade Policy', value: 'Free anytime' },
      { label: 'Damage Policy', value: 'Normal wear covered' },
    ],
    availability: ['Mumbai', 'Pune', 'Bangalore', 'Hyderabad', 'Chennai'],
    setupTimeline: 'Delivered & installed within 24–48 hours in metro cities.',
    sla: 'Same-day on-site support. Replacement printer if repair exceeds 4 hours.',
    faqs: [
      { q: 'Are all 4 colors (CMYK) included?', a: 'Yes. Cyan, Magenta, Yellow and Black toners are all included in the rental. We replace them whenever they run out at no extra cost.' },
      { q: 'How good is the color quality?', a: 'The M455dw delivers professional-grade color suitable for presentations, marketing materials and client documents.' },
      { q: 'Can it print on thick paper or envelopes?', a: 'Yes. It handles paper up to 200 g/m² including envelopes, labels and cardstock via the manual feed tray.' },
      { q: 'Is Wi-Fi setup included?', a: 'Yes. Our technician connects the printer to your Wi-Fi network and installs print drivers on all required computers.' },
    ],
    reviews: [
      { name: 'Ananya Iyer', company: 'Creative Studio Bangalore', rating: 5, text: 'Color quality is excellent. Pitch decks and brochures print beautifully. Very happy with the rental setup.', date: 'Feb 2025' },
      { name: 'Suresh Patel', company: 'Patel & Associates', rating: 5, text: 'We needed color printing for client reports. This printer does the job perfectly and the monthly cost is very reasonable.', date: 'Dec 2024' },
    ],
  },
  {
    slug: 'canon-g6070',
    name: 'Canon PIXMA G6070',
    brand: 'Canon',
    category: 'desktop',
    spec: 'A4 | Color Ink Tank',
    price: '₹1,200',
    priceNote: 'per printer per month',
    images: ['/printers/canon-g6070.png'],
    tagline: 'Low-cost, high-volume color printing.',
    description:
      'The Canon PIXMA G6070 is a MegaTank ink tank printer designed for businesses that print large volumes of color at the lowest possible cost per page. Its refillable ink tanks eliminate expensive cartridge replacements, making it the most economical color printer in our fleet.',
    features: [
      'Speed 13 PPM – Color / 18 PPM – B&W',
      'MegaTank refillable ink system',
      'Wi-Fi, Ethernet & USB connectivity',
      'Automatic Duplex Printing',
      '12,000 page monthly duty cycle',
      'Print, Scan, Copy',
      'Extremely low cost per page',
    ],
    specs: [
      { label: 'Print Speed', value: '13 PPM Color / 18 PPM B&W' },
      { label: 'Resolution', value: '4800 × 1200 dpi' },
      { label: 'Paper Capacity', value: '350 sheets' },
      { label: 'Monthly Duty Cycle', value: '12,000 pages' },
      { label: 'Connectivity', value: 'Wi-Fi, Ethernet, USB' },
      { label: 'Functions', value: 'Print, Scan, Copy' },
      { label: 'Duplex', value: 'Automatic' },
      { label: 'Ink System', value: 'MegaTank (refillable)' },
    ],
    fullSpecs: [
      {
        group: 'Print',
        rows: [
          { label: 'Print Speed Color (A4)', value: '13 PPM' },
          { label: 'Print Speed B&W (A4)', value: '18 PPM' },
          { label: 'Resolution', value: '4800 × 1200 dpi' },
          { label: 'Monthly Duty Cycle', value: '12,000 pages' },
          { label: 'Ink System', value: 'MegaTank refillable — PGBK, C, M, Y' },
        ],
      },
      {
        group: 'Paper Handling',
        rows: [
          { label: 'Standard Capacity', value: '350 sheet cassette' },
          { label: 'Paper Sizes', value: 'A4, A5, B5, Letter, Legal, 4×6", Envelopes' },
          { label: 'Paper Weight', value: '64–275 g/m²' },
          { label: 'Duplex', value: 'Automatic' },
          { label: 'Scan Area', value: 'A4 / Letter flatbed' },
        ],
      },
      {
        group: 'Connectivity',
        rows: [
          { label: 'Network', value: '100 BASE-TX Ethernet' },
          { label: 'Wireless', value: '802.11 b/g/n Wi-Fi' },
          { label: 'USB', value: 'USB 2.0' },
          { label: 'Mobile Print', value: 'Canon PRINT app, AirPrint, Mopria' },
        ],
      },
      {
        group: 'Physical',
        rows: [
          { label: 'Dimensions (W×D×H)', value: '435 × 329 × 221 mm' },
          { label: 'Weight', value: '6.6 kg' },
          { label: 'Noise Level', value: '44.5 dB(A)' },
          { label: 'Power Consumption', value: '24 W printing / 0.9 W standby' },
        ],
      },
    ],
    idealFor: ['High-volume color printing', 'Schools & education', 'Small businesses', 'Invoice-heavy offices'],
    versions: [
      { id: 'standard', label: 'Standard', desc: 'Base MegaTank model', priceAdd: 0 },
      { id: 'priority', label: '+ Priority Support', desc: '4-hour on-site SLA', priceAdd: 250 },
    ],
    whatsIncluded: [
      'Canon PIXMA G6070 unit',
      'Full MegaTank ink bottles — replaced as needed',
      'Free delivery & installation',
      'Wi-Fi & network driver setup',
      'GST invoice monthly',
      'Free pickup at rental end',
    ],
    rentalTerms: [
      { label: 'Minimum Duration', value: '3 months' },
      { label: 'Cancellation Notice', value: '30 days' },
      { label: 'Security Deposit', value: '1 month rental (refundable)' },
      { label: 'Billing Cycle', value: 'Monthly, GST invoice' },
    ],
    availability: ['Mumbai', 'Pune', 'Bangalore', 'Hyderabad', 'Chennai'],
    setupTimeline: '24–48 hours in metro cities.',
    sla: 'Same-day on-site support.',
    faqs: [
      { q: 'How does the ink tank system work?', a: 'Instead of cartridges, the G6070 uses large refillable ink tanks. When ink runs low, we refill or replace the bottles at no extra charge as part of your rental.' },
      { q: 'Is the color quality good enough for professional prints?', a: 'Yes for general office documents, invoices, reports and everyday color printing. For high-end brochures or photo-quality prints we recommend the HP Color LaserJet.' },
      { q: 'What is the cost per page?', a: 'The MegaTank system delivers among the lowest cost-per-page of any color printer. Since consumables are included in your rental, you pay nothing extra per page.' },
    ],
    reviews: [
      { name: 'Meera Joshi', company: 'Bright Future Academy', rating: 5, text: 'We print hundreds of pages daily. This printer handles everything and we never worry about ink. Excellent value.', date: 'Mar 2025' },
    ],
  },
  {
    slug: 'xerox-b405',
    name: 'Xerox VersaLink B405',
    brand: 'Xerox',
    category: 'office',
    spec: 'A4 | B&W MFP',
    price: '₹2,500',
    priceNote: 'per printer per month',
    images: ['/printers/xerox-b405.png'],
    tagline: 'Touchscreen, secure, enterprise-ready.',
    description:
      'The Xerox VersaLink B405 is a powerful A4 monochrome multifunction printer designed for demanding office environments. With a large colour touchscreen, robust security features and Xerox ConnectKey technology, it streamlines complex document workflows effortlessly.',
    features: [
      'Speed 45 PPM – A4',
      'Print, Copy, Scan, Fax',
      '5" Colour Touchscreen',
      'Secure Print & User Authentication',
      'Duplex Print, Copy & Scan',
      'Wi-Fi, Gigabit Ethernet, USB',
      '110,000 page monthly duty cycle',
    ],
    specs: [
      { label: 'Print Speed', value: '45 PPM' },
      { label: 'Resolution', value: '1200 × 1200 dpi' },
      { label: 'Paper Capacity', value: '700 sheets standard' },
      { label: 'Monthly Duty Cycle', value: '110,000 pages' },
      { label: 'Display', value: '5" Colour Touchscreen' },
      { label: 'Functions', value: 'Print, Copy, Scan, Fax' },
      { label: 'Connectivity', value: 'Wi-Fi, Ethernet, USB' },
      { label: 'Security', value: 'User Auth, Secure Print' },
    ],
    fullSpecs: [
      {
        group: 'Print',
        rows: [
          { label: 'Print Speed (A4)', value: '45 PPM' },
          { label: 'First Page Out', value: 'Under 5.9 seconds' },
          { label: 'Resolution', value: '1200 × 1200 dpi' },
          { label: 'Monthly Duty Cycle', value: '110,000 pages' },
          { label: 'Recommended Monthly', value: '3,000–20,000 pages' },
          { label: 'Print Language', value: 'PCL5e, PCL6, PostScript 3, PDF 1.7, XPS' },
        ],
      },
      {
        group: 'Paper Handling',
        rows: [
          { label: 'Standard Capacity', value: '700 sheets (2 × 250 + 150 sheet bypass)' },
          { label: 'Max Capacity', value: 'Up to 2,140 sheets with optional trays' },
          { label: 'Paper Sizes', value: 'A4, A5, A6, B5, Letter, Legal, Executive, Envelopes' },
          { label: 'Paper Weight', value: '60–220 g/m²' },
          { label: 'DADF Capacity', value: '50 sheets' },
          { label: 'Duplex', value: 'Automatic standard' },
        ],
      },
      {
        group: 'Connectivity & Security',
        rows: [
          { label: 'Network', value: 'Gigabit Ethernet (10/100/1000)' },
          { label: 'Wireless', value: '802.11 b/g/n Wi-Fi + Wi-Fi Direct' },
          { label: 'USB', value: 'USB 3.0 Host + USB 2.0 Device' },
          { label: 'Display', value: '5" Capacitive Colour Touchscreen' },
          { label: 'Security', value: 'PIN Print, User Authentication, Data Encryption, FIPS 140-2' },
          { label: 'Cloud', value: 'Dropbox, Google Drive, OneDrive, Salesforce' },
        ],
      },
      {
        group: 'Physical',
        rows: [
          { label: 'Dimensions (W×D×H)', value: '420 × 450 × 470 mm' },
          { label: 'Weight', value: '22.2 kg' },
          { label: 'Noise Level', value: '53 dB(A)' },
          { label: 'Power Consumption', value: '775 W printing / 1.1 W off' },
          { label: 'Toner', value: 'Xerox VersaLink B405 Toner Cartridge' },
        ],
      },
    ],
    idealFor: ['Mid-size offices', 'Legal firms', 'Finance departments', 'Secure environments', 'HR departments'],
    versions: [
      { id: 'standard', label: 'Standard', desc: 'Base VersaLink B405, 700 sheet capacity', priceAdd: 0 },
      { id: 'extra-tray', label: '+ Extra Tray (550 sheet)', desc: 'Total 1,250 sheet capacity', priceAdd: 350 },
      { id: 'finisher', label: '+ Finisher', desc: 'Stapling & hole punch finisher unit', priceAdd: 700 },
    ],
    whatsIncluded: [
      'Xerox VersaLink B405 unit',
      'Toner cartridge — included and replaced as needed',
      'Free delivery & professional installation',
      'Network & user authentication setup',
      'Driver installation on all office computers',
      'GST invoice monthly',
      'Free pickup at rental end',
    ],
    rentalTerms: [
      { label: 'Minimum Duration', value: '3 months' },
      { label: 'Lock-in Period', value: 'None after 3 months' },
      { label: 'Cancellation Notice', value: '30 days written notice' },
      { label: 'Security Deposit', value: '1 month rental (refundable)' },
      { label: 'Billing Cycle', value: 'Monthly, GST invoice' },
      { label: 'Upgrade Policy', value: 'Free upgrade anytime' },
      { label: 'Fleet Discount', value: '10% off for 5+ units, 15% for 10+' },
    ],
    availability: ['Mumbai', 'Pune', 'Bangalore', 'Hyderabad', 'Chennai', 'Delhi NCR'],
    setupTimeline: '24–48 hours in metro cities. Same-day possible in Mumbai & Pune.',
    sla: 'Same-day on-site response. Replacement unit if repair exceeds 4 hours.',
    faqs: [
      { q: 'How does the user authentication work?', a: 'The B405 supports PIN-based printing, card-based authentication and user-specific access control. We configure this during setup based on your office requirements.' },
      { q: 'Can it connect to cloud storage?', a: 'Yes. The VersaLink B405 connects natively to Google Drive, Dropbox, OneDrive and Salesforce for direct scan-to-cloud workflows.' },
      { q: 'How many users can share one printer?', a: 'Comfortably supports 20–40 users. For larger teams we recommend 2 units or the Xerox enterprise models.' },
      { q: 'Does it support mobile printing?', a: 'Yes — AirPrint, Mopria and Wi-Fi Direct are all supported out of the box.' },
    ],
    reviews: [
      { name: 'Vikram Singh', company: 'Singh & Partners Law', rating: 5, text: 'The secure print feature is exactly what a law firm needs. Documents only print when you physically authenticate at the machine. Excellent.', date: 'Feb 2025' },
      { name: 'Deepika Rao', company: 'FinServ Capital', rating: 5, text: 'Fast, reliable and the touchscreen makes it incredibly easy for everyone in the office to use. Setup was seamless.', date: 'Jan 2025' },
    ],
  },
  {
    slug: 'hp-m578dn',
    name: 'HP LaserJet Enterprise MFP M578dn',
    brand: 'HP',
    category: 'office',
    spec: 'A4 | B&W MFP',
    price: '₹2,800',
    priceNote: 'per printer per month',
    images: ['/printers/hp-m578dn.png'],
    tagline: 'Built for speed, security, and scale.',
    description:
      'The HP LaserJet Enterprise MFP M578dn is engineered for high-demand enterprise environments. It delivers fast, professional-quality output with enterprise-grade security and seamless integration with your existing IT infrastructure and document management systems.',
    features: [
      'Speed 38 PPM – A4/Legal',
      'Print, Copy, Scan, Fax',
      'Automatic Duplex Printing',
      'Gigabit Ethernet',
      'Scan to Email / PC / Folder',
      'Password Protection & Secure Print',
      '150,000 page monthly duty cycle',
    ],
    specs: [
      { label: 'Print Speed', value: '38 PPM' },
      { label: 'Resolution', value: '1200 × 1200 dpi' },
      { label: 'Paper Capacity', value: '650 sheets standard' },
      { label: 'Monthly Duty Cycle', value: '150,000 pages' },
      { label: 'Functions', value: 'Print, Copy, Scan, Fax' },
      { label: 'Connectivity', value: 'Gigabit Ethernet, USB' },
      { label: 'Duplex', value: 'Automatic' },
      { label: 'Security', value: 'Secure Print, PIN Auth' },
    ],
    fullSpecs: [
      {
        group: 'Print',
        rows: [
          { label: 'Print Speed (A4)', value: '38 PPM' },
          { label: 'First Page Out', value: 'Under 6.9 seconds' },
          { label: 'Resolution', value: '1200 × 1200 dpi' },
          { label: 'Monthly Duty Cycle', value: '150,000 pages' },
          { label: 'Recommended Monthly', value: '5,000–25,000 pages' },
        ],
      },
      {
        group: 'Paper Handling',
        rows: [
          { label: 'Standard Capacity', value: '650 sheets (2 × 250 + 100 sheet bypass)' },
          { label: 'Max Capacity', value: 'Up to 1,150 sheets with optional tray' },
          { label: 'Paper Sizes', value: 'A4, A5, B5, Letter, Legal, Executive, Envelopes' },
          { label: 'Paper Weight', value: '60–220 g/m²' },
          { label: 'DADF', value: '100-sheet ADF, duplex scan' },
        ],
      },
      {
        group: 'Connectivity',
        rows: [
          { label: 'Network', value: 'Gigabit Ethernet (10/100/1000)' },
          { label: 'USB', value: 'USB 2.0 Host + USB 2.0 Device' },
          { label: 'Security', value: 'HP Sure Start, Secure Boot, Whitelisting, PIN Print' },
          { label: 'Scan To', value: 'Email, Network Folder, USB, SharePoint, FTP' },
        ],
      },
      {
        group: 'Physical',
        rows: [
          { label: 'Dimensions (W×D×H)', value: '465 × 474 × 507 mm' },
          { label: 'Weight', value: '24.4 kg' },
          { label: 'Noise Level', value: '55 dB(A)' },
          { label: 'Power Consumption', value: '900 W printing / 1.6 W off' },
          { label: 'Toner', value: 'HP CF237A / CF237X LaserJet Toner' },
        ],
      },
    ],
    idealFor: ['Enterprise offices', 'IT departments', 'Large teams', 'High-volume printing'],
    versions: [
      { id: 'standard', label: 'Standard', desc: 'Base M578dn, Gigabit Ethernet, 650 sheet', priceAdd: 0 },
      { id: 'extra-tray', label: '+ Extra Paper Tray', desc: 'Adds 550 sheet tray', priceAdd: 400 },
      { id: 'priority', label: '+ Priority 4hr SLA', desc: '4-hour guaranteed on-site response', priceAdd: 450 },
    ],
    whatsIncluded: [
      'HP LaserJet Enterprise M578dn unit',
      'Toner — included and replaced as needed',
      'Free delivery & installation',
      'Full network and security configuration',
      'Scan-to-email and folder setup',
      'GST invoice monthly',
      'Free pickup at rental end',
    ],
    rentalTerms: [
      { label: 'Minimum Duration', value: '3 months' },
      { label: 'Cancellation Notice', value: '30 days' },
      { label: 'Security Deposit', value: '1 month rental (refundable)' },
      { label: 'Billing Cycle', value: 'Monthly, GST invoice' },
      { label: 'Fleet Discount', value: '10% for 5+, 15% for 10+ units' },
    ],
    availability: ['Mumbai', 'Pune', 'Bangalore', 'Hyderabad', 'Chennai', 'Delhi NCR'],
    setupTimeline: '24–48 hours in metro cities.',
    sla: 'Same-day on-site. Replacement unit if repair exceeds 4 hours.',
    faqs: [
      { q: 'Does it integrate with our document management system?', a: 'Yes. The M578dn supports scan-to-SharePoint, scan-to-FTP, and most major DMS platforms. We configure this during installation.' },
      { q: 'Can we set user-based printing limits?', a: 'Yes. HP Access Control allows you to set per-user or per-department print quotas and permissions.' },
      { q: 'Is it suitable for high-volume daily use?', a: 'Absolutely. With a 150,000 page duty cycle and recommended monthly volume of 25,000 pages, it handles the busiest enterprise environments.' },
    ],
    reviews: [
      { name: 'Aditya Kumar', company: 'InfoTech Systems', rating: 5, text: 'We have 3 of these across our office. Zero downtime in 10 months. HP quality plus Kwality service is a winning combination.', date: 'Mar 2025' },
    ],
  },
  {
    slug: 'canon-2643if',
    name: 'Canon imageRUNNER 2643iF',
    brand: 'Canon',
    category: 'office',
    spec: 'A4 | B&W MFP',
    price: '₹2,200',
    priceNote: 'per printer per month',
    images: ['/printers/canon-2643if.png'],
    tagline: 'Reliable, clean design, very popular in India.',
    description:
      'The Canon imageRUNNER 2643iF is a versatile A4 monochrome multifunction printer that balances performance with simplicity. Widely trusted across Indian corporate offices, it handles heavy daily print workloads with ease, minimal downtime, and intuitive touchscreen operation.',
    features: [
      'Speed 43 PPM – A4',
      'Print, Copy, Scan, Fax',
      'Touch-Screen LCD Panel',
      'User-wise Copies Counter',
      '500 × 2 + 1000 sheet paper trays',
      'Password Protection',
      'Scan to Email / USB / Folder',
    ],
    specs: [
      { label: 'Print Speed', value: '43 PPM' },
      { label: 'Resolution', value: '1200 × 1200 dpi' },
      { label: 'Paper Capacity', value: '500 × 2 + 1000 sheet' },
      { label: 'Monthly Duty Cycle', value: '100,000 pages' },
      { label: 'Functions', value: 'Print, Copy, Scan, Fax' },
      { label: 'Display', value: 'Touch-Screen LCD' },
      { label: 'Connectivity', value: 'Ethernet, USB' },
      { label: 'Duplex', value: 'Automatic' },
    ],
    fullSpecs: [
      {
        group: 'Print',
        rows: [
          { label: 'Print Speed (A4)', value: '43 PPM' },
          { label: 'Resolution', value: '1200 × 1200 dpi' },
          { label: 'Monthly Duty Cycle', value: '100,000 pages' },
          { label: 'Recommended Monthly', value: '4,000–20,000 pages' },
        ],
      },
      {
        group: 'Paper Handling',
        rows: [
          { label: 'Standard Capacity', value: '500 × 2 cassettes + 1000 sheet deck' },
          { label: 'Max Paper Capacity', value: '6,350 sheets with full options' },
          { label: 'Paper Sizes', value: 'A3, A4, A5, B4, B5, Letter, Legal, Envelopes' },
          { label: 'Paper Weight', value: '52–220 g/m²' },
          { label: 'ADF Capacity', value: '100 sheets' },
        ],
      },
      {
        group: 'Connectivity',
        rows: [
          { label: 'Network', value: '1000 BASE-T Ethernet' },
          { label: 'USB', value: 'USB 2.0' },
          { label: 'Scan To', value: 'Email, SMB, FTP, USB, WebDAV' },
          { label: 'Security', value: 'User Authentication, Department ID, Secure Print' },
        ],
      },
      {
        group: 'Physical',
        rows: [
          { label: 'Dimensions (W×D×H)', value: '586 × 633 × 761 mm' },
          { label: 'Weight', value: '54.5 kg' },
          { label: 'Noise Level', value: '54 dB(A)' },
          { label: 'Power Consumption', value: '1,500 W max / 1.4 W sleep' },
          { label: 'Toner', value: 'Canon NPG-59 Toner' },
        ],
      },
    ],
    idealFor: ['Corporate offices', 'Government departments', 'Banks', 'Busy admin teams', 'Manufacturing companies'],
    versions: [
      { id: 'standard', label: 'Standard', desc: '2000 sheet total paper capacity', priceAdd: 0 },
      { id: 'fax', label: '+ Fax Module', desc: 'Add dedicated Super G3 fax unit', priceAdd: 300 },
      { id: 'finisher', label: '+ Inner Finisher', desc: 'Stapling up to 50 sheets', priceAdd: 600 },
    ],
    whatsIncluded: [
      'Canon imageRUNNER 2643iF unit',
      'Canon NPG-59 toner — included and replaced as needed',
      'Free delivery & floor installation',
      'Network & department ID setup',
      'Scan-to-email configuration',
      'GST invoice monthly',
      'Free pickup at rental end',
    ],
    rentalTerms: [
      { label: 'Minimum Duration', value: '3 months' },
      { label: 'Cancellation Notice', value: '30 days' },
      { label: 'Security Deposit', value: '1 month rental (refundable)' },
      { label: 'Billing Cycle', value: 'Monthly, GST invoice' },
      { label: 'Fleet Discount', value: '10% for 5+, 15% for 10+' },
    ],
    availability: ['Mumbai', 'Pune', 'Bangalore', 'Hyderabad', 'Chennai', 'Delhi NCR', 'Ahmedabad'],
    setupTimeline: '24–48 hours in metro cities. Floor installation team provided.',
    sla: 'Same-day on-site support. Temporary replacement if repair exceeds 4 hours.',
    faqs: [
      { q: 'Why is this the most popular model in India?', a: 'The imageRUNNER range has been the standard for Indian corporate offices for over a decade. Canon\'s service network is extensive and spare parts are always available.' },
      { q: 'Can it handle 2000+ pages per day?', a: 'Yes. With a duty cycle of 100,000 pages per month and robust paper trays, it comfortably handles high daily volumes.' },
      { q: 'Does the department ID feature track usage per team?', a: 'Yes. You can set up individual department IDs to track and limit usage per team — useful for cost allocation.' },
    ],
    reviews: [
      { name: 'Ramesh Gupta', company: 'Gupta Manufacturing', rating: 5, text: 'We have used Canon imageRUNNER for years. Kwality provides the same reliable machine with the added benefit of full service included. Perfect.', date: 'Jan 2025' },
      { name: 'Shalini Verma', company: 'State Bank Branch', rating: 5, text: 'Handles our daily banking document load without any issues. Team at Kwality is professional and service is fast.', date: 'Dec 2024' },
    ],
  },
  {
    slug: 'konica-c50i',
    name: 'Konica Minolta bizhub C50i',
    brand: 'Konica Minolta',
    category: 'enterprise',
    spec: 'A3 | Color MFP',
    price: '₹4,500',
    priceNote: 'per printer per month',
    images: ['/printers/konica-c50i.png'],
    tagline: 'Modern UI, premium look, balanced performance.',
    description:
      'The Konica Minolta bizhub C50i is a flagship A3 colour multifunction printer with an intuitive 10.1" touchscreen interface. It delivers high-quality colour at 50 PPM, making it the ideal centrepiece for any busy enterprise print room that demands both speed and colour accuracy.',
    features: [
      'Speed 50 PPM – A4 Color & B&W',
      'A3 Color Printing',
      'Print, Copy, Scan, Fax',
      '10.1" Touchscreen Display',
      'Duplex Print & Scan',
      'Wi-Fi, Ethernet, USB',
      '150,000 page monthly duty cycle',
    ],
    specs: [
      { label: 'Print Speed', value: '50 PPM A4 Color' },
      { label: 'Resolution', value: '1200 × 1200 dpi' },
      { label: 'Paper Size', value: 'A3 / A4 / Legal' },
      { label: 'Paper Capacity', value: '1,150 sheets standard' },
      { label: 'Monthly Duty Cycle', value: '150,000 pages' },
      { label: 'Display', value: '10.1" Colour Touchscreen' },
      { label: 'Functions', value: 'Print, Copy, Scan, Fax' },
      { label: 'Connectivity', value: 'Wi-Fi, Ethernet, USB' },
    ],
    fullSpecs: [
      {
        group: 'Print',
        rows: [
          { label: 'Print Speed A4 Color', value: '50 PPM' },
          { label: 'Print Speed A4 B&W', value: '50 PPM' },
          { label: 'Print Speed A3 Color', value: '25 PPM' },
          { label: 'First Page Out', value: 'Under 6 seconds' },
          { label: 'Resolution', value: '1200 × 1200 dpi' },
          { label: 'Monthly Duty Cycle', value: '150,000 pages' },
          { label: 'Recommended Monthly', value: '10,000–40,000 pages' },
        ],
      },
      {
        group: 'Paper Handling',
        rows: [
          { label: 'Standard Capacity', value: '1,150 sheets' },
          { label: 'Max Capacity', value: 'Up to 6,650 sheets with options' },
          { label: 'Paper Sizes', value: 'A3, A4, A5, B4, B5, SRA3, Envelopes' },
          { label: 'Paper Weight', value: '52–300 g/m²' },
          { label: 'ADF Capacity', value: '100 sheets, duplex scan' },
        ],
      },
      {
        group: 'Connectivity & Display',
        rows: [
          { label: 'Network', value: 'Gigabit Ethernet, Wi-Fi 802.11 a/b/g/n/ac' },
          { label: 'USB', value: 'USB 3.0 Host × 2, USB 2.0 Device' },
          { label: 'Display', value: '10.1" Colour Touchscreen (capacitive)' },
          { label: 'Cloud', value: 'Google Drive, Dropbox, OneDrive, Sharepoint' },
          { label: 'Mobile', value: 'AirPrint, Mopria, NFC, Konica Minolta Mobile Print' },
        ],
      },
      {
        group: 'Physical',
        rows: [
          { label: 'Dimensions (W×D×H)', value: '587 × 640 × 916 mm' },
          { label: 'Weight', value: '75 kg' },
          { label: 'Noise Level', value: '52 dB(A)' },
          { label: 'Power Consumption', value: '1,800 W max / 0.5 W off' },
          { label: 'Toner', value: 'Konica Minolta TN-328 CMYK' },
        ],
      },
    ],
    idealFor: ['Large corporates', 'Architecture firms', 'Production houses', 'Marketing agencies', 'Print-heavy offices'],
    versions: [
      { id: 'standard', label: 'Standard A3 Color', desc: 'Base C50i, 1150 sheet, 10.1" screen', priceAdd: 0 },
      { id: 'finisher', label: '+ Saddle Stitch Finisher', desc: 'Booklet making + stapling unit', priceAdd: 1000 },
      { id: 'fax', label: '+ Fax Module', desc: 'Dedicated Super G3 fax unit', priceAdd: 500 },
      { id: 'banner', label: '+ Banner Tray', desc: 'Up to 900mm long media support', priceAdd: 400 },
    ],
    whatsIncluded: [
      'Konica Minolta bizhub C50i unit',
      'Full CMYK toner set — replaced as needed',
      'Drum and developer units — replaced as per schedule',
      'Free delivery & floor installation by trained team',
      'Full network, Wi-Fi & cloud integration setup',
      'NFC & mobile print configuration',
      'GST invoice monthly',
      'Free pickup at rental end',
    ],
    rentalTerms: [
      { label: 'Minimum Duration', value: '3 months' },
      { label: 'Cancellation Notice', value: '30 days' },
      { label: 'Security Deposit', value: '2 months rental (refundable)' },
      { label: 'Billing Cycle', value: 'Monthly, GST invoice' },
      { label: 'Fleet Discount', value: '10% for 3+, 15% for 5+' },
      { label: 'Upgrade Policy', value: 'Free anytime' },
    ],
    availability: ['Mumbai', 'Pune', 'Bangalore', 'Hyderabad', 'Chennai', 'Delhi NCR'],
    setupTimeline: '48–72 hours for enterprise floor installation in metro cities.',
    sla: '4-hour on-site response for enterprise units. Replacement machine within 8 hours if needed.',
    faqs: [
      { q: 'Can it print A3 colour?', a: 'Yes. The bizhub C50i handles full A3 colour printing at 25 PPM and A4 at 50 PPM.' },
      { q: 'Does it support NFC printing from phones?', a: 'Yes. Touch your phone to the NFC panel and print directly without Wi-Fi or any app setup.' },
      { q: 'What cloud storage can it connect to?', a: 'Google Drive, Dropbox, OneDrive and SharePoint are all natively supported. Our team configures these during installation.' },
      { q: 'How many users can it support?', a: 'Comfortably handles 50–100 users. For larger teams we recommend multiple units or the higher-capacity bizhub range.' },
    ],
    reviews: [
      { name: 'Nitin Agarwal', company: 'Agarwal Architecture Studio', rating: 5, text: 'A3 color printing at this speed and quality is exactly what we needed for architectural drawings and client presentations.', date: 'Mar 2025' },
      { name: 'Sonal Mehta', company: 'Creative Productions Pvt Ltd', rating: 5, text: 'The touchscreen makes it so easy. Staff needed zero training. And the color output is stunning for our production needs.', date: 'Feb 2025' },
    ],
  },
  {
    slug: 'canon-dx4745i',
    name: 'Canon imageRUNNER ADVANCE DX 4745i',
    brand: 'Canon',
    category: 'enterprise',
    spec: 'A3 | B&W MFP',
    price: '₹3,800',
    priceNote: 'per printer per month',
    images: ['/printers/canon-dx4745i.png'],
    tagline: 'High-volume document powerhouse.',
    description:
      'The Canon imageRUNNER ADVANCE DX 4745i is built for organisations with the highest document demands. With advanced workflow automation, intelligent scan routing and robust security, it is the definitive enterprise-grade document management solution.',
    features: [
      'Speed 45 PPM – A4 B&W',
      'A3 Monochrome Printing',
      'Print, Copy, Scan, Fax',
      'User-wise Copies Counter',
      'Large paper capacity configuration',
      'Password & Secure Print',
      'Advanced Workflow Integration',
    ],
    specs: [
      { label: 'Print Speed', value: '45 PPM A4' },
      { label: 'Resolution', value: '1200 × 1200 dpi' },
      { label: 'Paper Size', value: 'A3 / A4 / Legal' },
      { label: 'Paper Capacity', value: 'Up to 6,350 sheets' },
      { label: 'Monthly Duty Cycle', value: '200,000 pages' },
      { label: 'Functions', value: 'Print, Copy, Scan, Fax' },
      { label: 'Connectivity', value: 'Ethernet, USB' },
      { label: 'Security', value: 'Secure Print, User Auth' },
    ],
    fullSpecs: [
      {
        group: 'Print',
        rows: [
          { label: 'Print Speed A4', value: '45 PPM' },
          { label: 'Print Speed A3', value: '22 PPM' },
          { label: 'Resolution', value: '1200 × 1200 dpi' },
          { label: 'Monthly Duty Cycle', value: '200,000 pages' },
          { label: 'Recommended Monthly', value: '15,000–60,000 pages' },
          { label: 'Print Language', value: 'PCL5e, PCL6, PostScript3, PDF, XPS' },
        ],
      },
      {
        group: 'Paper Handling',
        rows: [
          { label: 'Standard Capacity', value: '2,300 sheets' },
          { label: 'Max Capacity', value: 'Up to 6,350 sheets' },
          { label: 'Paper Sizes', value: 'A3, A4, A5, B4, B5, SRA3, 12×18", Custom' },
          { label: 'Paper Weight', value: '52–300 g/m²' },
          { label: 'ADF Capacity', value: '150 sheets, duplex scan' },
        ],
      },
      {
        group: 'Connectivity',
        rows: [
          { label: 'Network', value: 'Gigabit Ethernet' },
          { label: 'USB', value: 'USB 2.0 Host + Device' },
          { label: 'Security', value: 'Dept. ID, Secure Print, Card Auth, HDD encryption' },
          { label: 'Scan To', value: 'Email, SMB, FTP, USB, WebDAV, SharePoint, Box' },
          { label: 'Workflow', value: 'uniFLOW, MEAP platform apps, OCR scan routing' },
        ],
      },
      {
        group: 'Physical',
        rows: [
          { label: 'Dimensions (W×D×H)', value: '620 × 665 × 960 mm' },
          { label: 'Weight', value: '88 kg' },
          { label: 'Noise Level', value: '57 dB(A)' },
          { label: 'Power Consumption', value: '2,000 W max / 1.5 W off' },
          { label: 'Toner', value: 'Canon NPG-67 Toner' },
        ],
      },
    ],
    idealFor: ['Legal firms', 'Logistics companies', 'Government offices', 'Banks', 'High-volume document centers'],
    versions: [
      { id: 'standard', label: 'Standard', desc: '2300 sheet capacity, base workflow', priceAdd: 0 },
      { id: 'finisher', label: '+ Inner Finisher', desc: 'Stapling & hole-punch unit', priceAdd: 700 },
      { id: 'saddle', label: '+ Saddle Stitch Finisher', desc: 'Booklet making capability', priceAdd: 1200 },
      { id: 'ocr', label: '+ OCR Scan Routing', desc: 'Intelligent document classification & routing', priceAdd: 800 },
    ],
    whatsIncluded: [
      'Canon imageRUNNER ADVANCE DX 4745i unit',
      'Canon NPG-67 toner — replaced as needed',
      'Drum & developer units — scheduled replacement included',
      'Floor installation by specialist team',
      'Full network, security & workflow configuration',
      'GST invoice monthly',
      'Dedicated enterprise support executive',
    ],
    rentalTerms: [
      { label: 'Minimum Duration', value: '6 months' },
      { label: 'Cancellation Notice', value: '60 days written notice' },
      { label: 'Security Deposit', value: '2 months rental (refundable)' },
      { label: 'Billing Cycle', value: 'Monthly, GST invoice' },
      { label: 'Fleet Discount', value: 'Custom pricing for 3+ units' },
    ],
    availability: ['Mumbai', 'Pune', 'Bangalore', 'Hyderabad', 'Chennai', 'Delhi NCR'],
    setupTimeline: '3–5 days for full enterprise deployment including workflow configuration.',
    sla: '4-hour guaranteed on-site response. Backup unit deployed within 8 hours if repair is not possible same day.',
    faqs: [
      { q: 'Can it handle 10,000+ pages per day?', a: 'Yes. With a 200,000 page monthly duty cycle, it handles the heaviest document environments comfortably.' },
      { q: 'Does it support uniFLOW or similar workflow software?', a: 'Yes. The DX 4745i is fully compatible with Canon uniFLOW and the MEAP platform for advanced print management and cost tracking.' },
      { q: 'Can it scan directly to our DMS?', a: 'Yes. It scans to SharePoint, Box, network folders, FTP and WebDAV. OCR scan routing is available as an add-on.' },
    ],
    reviews: [
      { name: 'Arjun Sharma', company: 'Sharma Legal Associates', rating: 5, text: 'Handles thousands of pages daily without a single jam or issue. The secure print feature ensures confidential documents are protected.', date: 'Feb 2025' },
    ],
  },
  {
    slug: 'ricoh-imc3000',
    name: 'Ricoh IM C3000',
    brand: 'Ricoh',
    category: 'enterprise',
    spec: 'A3 | Color MFP',
    price: '₹4,200',
    priceNote: 'per printer per month',
    images: ['/printers/ricoh-imc3000.png'],
    tagline: 'Smart workflow, consistent color, corporate favourite.',
    description:
      'The Ricoh IM C3000 combines outstanding colour output with smart workflow automation. Built for the modern digital office, it integrates seamlessly with cloud services, business applications and document management systems to drive productivity across your entire organisation.',
    features: [
      'Speed 30 PPM – A4 Color',
      'A3 Color Printing',
      'Print, Copy, Scan, Fax',
      'Smart Workflow Automation',
      'Duplex Print & Scan',
      'Cloud: Google Drive, OneDrive, Dropbox',
      '150,000 page monthly duty cycle',
    ],
    specs: [
      { label: 'Print Speed', value: '30 PPM A4 Color' },
      { label: 'Resolution', value: '1200 × 1200 dpi' },
      { label: 'Paper Size', value: 'A3 / A4 / Legal' },
      { label: 'Paper Capacity', value: '1,200 sheets standard' },
      { label: 'Monthly Duty Cycle', value: '150,000 pages' },
      { label: 'Functions', value: 'Print, Copy, Scan, Fax' },
      { label: 'Cloud', value: 'Google Drive, OneDrive, Dropbox' },
      { label: 'Connectivity', value: 'Wi-Fi, Ethernet, USB' },
    ],
    fullSpecs: [
      {
        group: 'Print',
        rows: [
          { label: 'Print Speed A4 Color', value: '30 PPM' },
          { label: 'Print Speed A4 B&W', value: '30 PPM' },
          { label: 'Print Speed A3', value: '15 PPM' },
          { label: 'Resolution', value: '1200 × 1200 dpi' },
          { label: 'Monthly Duty Cycle', value: '150,000 pages' },
          { label: 'Recommended Monthly', value: '8,000–35,000 pages' },
        ],
      },
      {
        group: 'Paper Handling',
        rows: [
          { label: 'Standard Capacity', value: '1,200 sheets' },
          { label: 'Max Capacity', value: 'Up to 4,700 sheets' },
          { label: 'Paper Sizes', value: 'A3, A4, A5, B4, B5, Custom, Envelopes' },
          { label: 'Paper Weight', value: '52–300 g/m²' },
          { label: 'ADF Capacity', value: '100 sheets, duplex' },
        ],
      },
      {
        group: 'Connectivity & Cloud',
        rows: [
          { label: 'Network', value: 'Gigabit Ethernet, Wi-Fi 802.11 a/b/g/n' },
          { label: 'USB', value: 'USB 2.0 Host + Device' },
          { label: 'Cloud Integration', value: 'Google Drive, Dropbox, OneDrive, Evernote, Salesforce' },
          { label: 'Mobile', value: 'AirPrint, Mopria, Ricoh Smart Device Connector' },
          { label: 'Security', value: 'User Auth, Secure Print, HDD Encryption, IEEE 802.1X' },
        ],
      },
      {
        group: 'Physical',
        rows: [
          { label: 'Dimensions (W×D×H)', value: '587 × 600 × 960 mm' },
          { label: 'Weight', value: '68 kg' },
          { label: 'Noise Level', value: '53 dB(A)' },
          { label: 'Power Consumption', value: '1,500 W max / 0.5 W off' },
          { label: 'Toner', value: 'Ricoh IM C3000 CMYK Toner' },
        ],
      },
    ],
    idealFor: ['Corporate teams', 'Marketing agencies', 'Finance companies', 'Consulting firms', 'Education institutions'],
    versions: [
      { id: 'standard', label: 'Standard A3 Color', desc: '1200 sheet, full cloud integration', priceAdd: 0 },
      { id: 'finisher', label: '+ Booklet Finisher', desc: 'Saddle stitch booklet making', priceAdd: 1000 },
      { id: 'ocr', label: '+ OCR & Workflow', desc: 'Smart document routing with OCR', priceAdd: 700 },
    ],
    whatsIncluded: [
      'Ricoh IM C3000 unit',
      'Full CMYK toner — replaced as needed',
      'Drum & developer — scheduled replacement included',
      'Floor installation & network setup',
      'Cloud integration configuration (Drive, OneDrive etc.)',
      'Mobile print setup',
      'GST invoice monthly',
      'Free pickup at rental end',
    ],
    rentalTerms: [
      { label: 'Minimum Duration', value: '3 months' },
      { label: 'Cancellation Notice', value: '30 days' },
      { label: 'Security Deposit', value: '2 months rental (refundable)' },
      { label: 'Billing Cycle', value: 'Monthly, GST invoice' },
      { label: 'Fleet Discount', value: '10% for 3+, 15% for 5+ units' },
    ],
    availability: ['Mumbai', 'Pune', 'Bangalore', 'Hyderabad', 'Chennai'],
    setupTimeline: '48–72 hours for full installation and cloud setup.',
    sla: '4-hour on-site response. Replacement machine within 8 hours if needed.',
    faqs: [
      { q: 'How does the cloud integration work?', a: 'From the touchscreen you can scan directly to Google Drive, Dropbox or OneDrive without a PC. Similarly you can print from cloud storage directly. We configure all accounts during installation.' },
      { q: 'Is the color consistent across large print runs?', a: 'Yes. The IM C3000 uses Ricoh\'s precision color engine which maintains consistent output across long runs — critical for marketing and financial report printing.' },
      { q: 'Can it print thick cardstock or envelopes?', a: 'Yes. It handles up to 300 g/m² paper weight, including cardstock, envelopes and thick media via the bypass tray.' },
    ],
    reviews: [
      { name: 'Pooja Kapoor', company: 'Kapoor Marketing Agency', rating: 5, text: 'The cloud integration is a game changer. We scan from the machine directly to our Google Drive. Color output is consistently excellent.', date: 'Mar 2025' },
      { name: 'Vijay Reddy', company: 'Reddy Consulting Group', rating: 4, text: 'Great machine for our consulting firm. Handles color reports and presentations perfectly. Service from Kwality is very prompt.', date: 'Jan 2025' },
    ],
  },
];

export function getPrinterBySlug(slug: string): Printer | undefined {
  return printers.find((p) => p.slug === slug);
}

export function getPrintersByCategory(category: string): Printer[] {
  if (!category || category === 'all') return printers;
  return printers.filter((p) => p.category === category);
}