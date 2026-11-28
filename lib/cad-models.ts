export type CadModel = {
  id: string;
  name: string;
  /** The best isometric/3D thumbnail for the card. */
  thumbnail: string;
  /** All available views for a gallery or lightbox. */
  views: { src: string; alt: string }[];
  /** Onshape shareable link — opens in a new tab. */
  link: string;
  /** Dominant colour of the model, used to tint the card background. */
  color: string;
};

export const cadModels: CadModel[] = [
  {
    id: "clamp-base",
    name: "Clamp Base",
    thumbnail: "/cad/clamp-base/iso.png",
    views: [
      { src: "/cad/clamp-base/iso.png", alt: "Isometric view" },
      { src: "/cad/clamp-base/front.png", alt: "Front view" },
      { src: "/cad/clamp-base/top.png", alt: "Top view" },
    ],
    link: "https://cad.onshape.com/document-redirect.html?d=/documents/5e50512694a562049385af69/w/a0818ce35de5ea1bc6b34570/e/72984191cb3813e52eb35db1",
    color: "#c0392b",
  },
  {
    id: "table-tray",
    name: "Table Tray",
    thumbnail: "/cad/table-tray/iso.png",
    views: [
      { src: "/cad/table-tray/iso.png", alt: "Isometric view" },
      { src: "/cad/table-tray/front.png", alt: "Front view" },
      { src: "/cad/table-tray/side.png", alt: "Side view" },
    ],
    link: "https://cad.onshape.com/documents/13cf71edf229dc2236aa290f/w/142687e6840c91b113a4d037/e/accf076572cf62e18260d1f6?renderMode=1&uiState=6b0afef034bd05f76e8685fe",
    color: "#4a4a4a",
  },
  {
    id: "phone-stand",
    name: "Phone Stand",
    thumbnail: "/cad/phone-stand/iso.png",
    views: [
      { src: "/cad/phone-stand/iso.png", alt: "Isometric view" },
      { src: "/cad/phone-stand/front.png", alt: "Front shaded view" },
      { src: "/cad/phone-stand/side.png", alt: "Side shaded view" },
      { src: "/cad/phone-stand/wireframe.png", alt: "Wireframe side view" },
    ],
    link: "https://cad.onshape.com/documents/c988468a5efa27b29548ef77/w/bb78ce0fd16796269b7bd524/e/3aea0630394a113a7892cdaf?renderMode=0&leftPanel=false&uiState=6b0b00055c27b1f97183f6b7",
    color: "#b87333",
  },
  {
    id: "letter-t",
    name: "Letter T",
    thumbnail: "/cad/letter-t/iso.png",
    views: [
      { src: "/cad/letter-t/iso.png", alt: "Isometric view" },
      { src: "/cad/letter-t/front.png", alt: "Front view" },
    ],
    link: "https://cad.onshape.com/documents/073d929b9ee631620af581e4/w/b7e433c4c3f96a3b3e82f233/e/65f12ef683e8b74e8352cd70?renderMode=0&uiState=6b0b005396fef1e94580b920",
    color: "#1abc9c",
  },
  {
    id: "spray-bottle-lid",
    name: "Lid For Spray Bottle",
    thumbnail: "/cad/spray-bottle-lid/iso.png",
    views: [
      { src: "/cad/spray-bottle-lid/iso.png", alt: "Shaded isometric with ring" },
      { src: "/cad/spray-bottle-lid/iso2.png", alt: "Shaded isometric smooth" },
      { src: "/cad/spray-bottle-lid/wireframe.png", alt: "Wireframe front" },
      { src: "/cad/spray-bottle-lid/top.png", alt: "Wireframe top-down" },
    ],
    link: "https://cad.onshape.com/documents/dce91b043ce7f1b368cf4bcc/w/4f8ba4e599de20c3fb0b968e/e/ed0802ddeff5b56db3a88772?renderMode=0&uiState=6b0b01170350daf43050933d",
    color: "#2c3e8c",
  },
  {
    id: "sink-drain-washer",
    name: "Sink Drain Washer",
    thumbnail: "/cad/sink-drain-washer/iso.png",
    views: [
      { src: "/cad/sink-drain-washer/iso.png", alt: "Shaded isometric" },
      { src: "/cad/sink-drain-washer/front.png", alt: "Shaded front profile" },
      { src: "/cad/sink-drain-washer/wireframe.png", alt: "Wireframe isometric" },
      { src: "/cad/sink-drain-washer/wireframe-front.png", alt: "Wireframe front" },
    ],
    link: "https://cad.onshape.com/documents/1bdbbb9588b1c215de89a653/w/07524c1d3a735923e83a55d7/e/3316c583b4602d8beacc76ce?renderMode=3&uiState=6b0b02113996579b33605fdb",
    color: "#b87040",
  },
  {
    id: "horse-shoe",
    name: "Horse Shoe",
    thumbnail: "/cad/horse-shoe/iso.png",
    views: [
      { src: "/cad/horse-shoe/iso.png", alt: "Shaded isometric" },
      { src: "/cad/horse-shoe/front.png", alt: "Shaded front" },
      { src: "/cad/horse-shoe/wireframe.png", alt: "Wireframe isometric" },
      { src: "/cad/horse-shoe/wireframe-front.png", alt: "Wireframe front" },
    ],
    link: "https://cad.onshape.com/documents/525f630bb02a0b19941f3201/w/546bda0c0cf96829dcd1addb/e/c6e572f82f703952f5192524?renderMode=0&uiState=6b0b022ca3af4a0fa64dbcd2",
    color: "#7f8c8d",
  },
  {
    id: "simple-pin",
    name: "Simple Pin",
    thumbnail: "/cad/simple-pin/iso.png",
    views: [
      { src: "/cad/simple-pin/iso.png", alt: "Shaded isometric" },
      { src: "/cad/simple-pin/front.png", alt: "Shaded front" },
      { src: "/cad/simple-pin/iso2.png", alt: "Isometric with cap detail" },
      { src: "/cad/simple-pin/wireframe.png", alt: "Wireframe isometric" },
    ],
    link: "https://cad.onshape.com/documents/7cfd0222b522440bdea785e1/w/70617e9105699906ffd294c9/e/fbc03ccb19423c850efbbc87?renderMode=1&uiState=6b0b0340e2ab6704c7bcec6d",
    color: "#3d3d3d",
  },
  {
    id: "curved-stack",
    name: "Curved Stack",
    thumbnail: "/cad/curved-stack/iso.png",
    views: [
      { src: "/cad/curved-stack/iso.png", alt: "Shaded isometric" },
      { src: "/cad/curved-stack/front.png", alt: "Front profile" },
      { src: "/cad/curved-stack/wireframe.png", alt: "Wireframe isometric" },
    ],
    link: "https://cad.onshape.com/documents/09f8fe063147303884b98fbe/w/c2171cde4d1b441b9eb7bfef/e/472360a6c41c229f0a482941?renderMode=0&leftPanel=false&uiState=6b0b03c37bc1d466f7b5a752",
    color: "#95a5a6",
  },
];
