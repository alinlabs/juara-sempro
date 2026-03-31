export type AnalisisBab = {
  bab: string;
  kelebihan: string;
  kelemahan: string;
  potensiKritik: string;
  solusiKritik?: string;
};

export type TitikRawan = {
  title: string;
  attack: string;
  defense: string;
};

export type QnA = {
  level: string;
  question: string;
  answer: string;
  tips?: string;
};

export type PengujiSection = {
  title: string;
  subtitle: string;
  qna: QnA[];
};

export type RingkasanCepat = {
  judul: string;
  objek: string;
  definisiX1: string;
  definisiX2: string;
  definisiY: string;
  metodeAnalisis: string;
};

export type SimulasiMenjebak = {
  question: string;
  answer: string;
};

export type StrategiSidang = {
  title: string;
  content: string[];
};

export type SlidePresentasi = {
  slide: string;
  title: string;
  points: string[];
};

export type KamusIstilah = {
  term: string;
  definition: string;
};

export type FlashcardData = {
  front: string;
  back: string;
};

export type StudentData = {
  id: string;
  name: string;
  topic: string;
  analisis: AnalisisBab[];
  titikRawan: TitikRawan[];
  penguji1: PengujiSection;
  penguji2: PengujiSection;
  penguji3: PengujiSection;
  ringkasan: RingkasanCepat;
  simulasi: SimulasiMenjebak[];
  strategi: StrategiSidang[];
  tugas: string[];
  presentasi?: SlidePresentasi[];
  kamus?: KamusIstilah[];
  flashcards?: FlashcardData[];
};
