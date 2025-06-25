const hargaMobil = [500000, 700000, 600000, 450000];
const namaMobil = [
  "Toyota Avanza",
  "Kijang Innova",
  "Honda HRV",
  "Daihatsu Sigra",
];

function hitungTotal() {
  const ringkasan = document.getElementById("ringkasanSewa");
  ringkasan.innerHTML = "";
  let total = 0;

  document.querySelectorAll(".checkbox").forEach((cb, i) => {
    if (cb.checked) {
      const durasi =
        parseInt(document.querySelector(`.durasi[data-index="${i}"]`).value) ||
        1;
      const subtotal = hargaMobil[i] * durasi;
      total += subtotal;

      const item = document.createElement("li");
      item.textContent = `${
        namaMobil[i]
      } (${durasi} hari) - Rp ${subtotal.toLocaleString()}`;
      ringkasan.appendChild(item);
    }
  });

  document.getElementById(
    "totalHarga"
  ).textContent = `Total: Rp ${total.toLocaleString()}`;
}

function simpanPemesanan() {
  const nama = document.getElementById("namaPelanggan").value.trim();
  if (!nama) return alert("Nama pelanggan harus diisi.");

  let pesanan = {
    nama,
    waktu: new Date().toLocaleString(),
    data: [],
    total: 0,
  };

  document.querySelectorAll(".checkbox").forEach((cb, i) => {
    if (cb.checked) {
      const durasi =
        parseInt(document.querySelector(`.durasi[data-index="${i}"]`).value) ||
        1;
      const subtotal = hargaMobil[i] * durasi;
      pesanan.data.push({
        mobil: namaMobil[i],
        durasi,
        subtotal,
      });
      pesanan.total += subtotal;
    }
  });

  if (pesanan.data.length === 0)
    return alert("Pilih minimal satu mobil untuk disewa.");

  let daftar = JSON.parse(localStorage.getItem("pemesanan")) || [];
  daftar.push(pesanan);
  localStorage.setItem("pemesanan", JSON.stringify(daftar));

  alert("Pemesanan berhasil disimpan.");
  tampilkanPemesanan();
  document.getElementById("ringkasanSewa").innerHTML = "";
  document.getElementById("totalHarga").textContent = "Total: Rp 0";
}

function tampilkanPemesanan() {
  const daftar = document.getElementById("daftarPemesanan");
  daftar.innerHTML = "";
  const list = JSON.parse(localStorage.getItem("pemesanan")) || [];

  list.forEach((p, i) => {
    const item = document.createElement("li");
    item.innerHTML = `
      <strong>${p.nama}</strong> (${p.waktu})<br>
      ${p.data
        .map(
          (d) =>
            `${d.mobil} (${d.durasi} hari) - Rp ${d.subtotal.toLocaleString()}`
        )
        .join("<br>")}
      <br><strong>Total: Rp ${p.total.toLocaleString()}</strong>
      <br><button onclick="hapusPemesanan(${i})">Hapus</button>
    `;
    daftar.appendChild(item);
  });
}

function hapusPemesanan(index) {
  let list = JSON.parse(localStorage.getItem("pemesanan")) || [];
  list.splice(index, 1);
  localStorage.setItem("pemesanan", JSON.stringify(list));
  tampilkanPemesanan();
}

window.onload = tampilkanPemesanan;
