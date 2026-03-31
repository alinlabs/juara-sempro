import fs from 'fs';

const data = JSON.parse(fs.readFileSync('public/data/ringkasan.json', 'utf8'));

for (const student of data) {
  const ringkasan = student.ringkasan;
  
  // Analisis Bab 1, 2, 3
  const bab1 = student.analisis.find(a => a.bab.includes('BAB I')) || { kelebihan: '', kelemahan: '' };
  const bab2 = student.analisis.find(a => a.bab.includes('BAB II')) || { kelebihan: '', kelemahan: '' };
  const bab3 = student.analisis.find(a => a.bab.includes('BAB III')) || { kelebihan: '', kelemahan: '' };

  const presentasiData = [
    {
      slide: "Slide 1",
      title: "Judul Penelitian",
      points: [
        ringkasan.judul,
        `Oleh: ${student.name}`,
        `Objek Penelitian: ${ringkasan.objek}`
      ]
    },
    {
      slide: "Slide 2",
      title: "Latar Belakang & Fenomena",
      points: [
        "Fenomena utama yang terjadi di lapangan:",
        bab1.kelebihan ? bab1.kelebihan : "Terdapat masalah pada objek penelitian yang perlu diselesaikan.",
        "Alasan pemilihan objek penelitian ini sangat penting dan relevan dengan kondisi saat ini."
      ]
    },
    {
      slide: "Slide 3",
      title: "Rumusan Masalah & Tujuan",
      points: [
        "Rumusan Masalah:",
        `Bagaimana pengaruh variabel independen terhadap variabel dependen pada ${ringkasan.objek}?`,
        "Tujuan Penelitian:",
        "Untuk mengetahui dan menganalisis pengaruh tersebut secara empiris."
      ]
    },
    {
      slide: "Slide 4",
      title: "Tinjauan Pustaka (Grand Theory)",
      points: [
        `Definisi X1: ${ringkasan.definisiX1}`,
        `Definisi X2: ${ringkasan.definisiX2}`,
        `Definisi Y: ${ringkasan.definisiY}`
      ]
    },
    {
      slide: "Slide 5",
      title: "Metodologi Penelitian",
      points: [
        `Metode Analisis: ${ringkasan.metodeAnalisis}`,
        `Populasi & Sampel: ${ringkasan.objek}`,
        bab3.kelebihan ? `Kelebihan Metode: ${bab3.kelebihan}` : "Menggunakan metode kuantitatif dengan kuesioner."
      ]
    },
    {
      slide: "Slide 6",
      title: "Kesimpulan & Penutup",
      points: [
        "Penelitian ini diharapkan dapat memberikan kontribusi teoritis dan praktis.",
        "Terima kasih atas perhatian Bapak/Ibu Dosen Penguji.",
        "Mohon masukan dan arahannya."
      ]
    }
  ];

  student.presentasi = presentasiData;
}

fs.writeFileSync('public/data/ringkasan.json', JSON.stringify(data, null, 2));
console.log("Updated ringkasan.json with specific presentation data");
