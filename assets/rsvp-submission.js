//const link = 'https://script.google.com/macros/s/AKfycbxRLSeGdwmuS61PaR_W_5_2NxhePOxPRXMOcfb2A9Dl-djeKrs1CPQUYCy0VOmA1JHtjg/exec';
const link = 'https://script.google.com/macros/s/AKfycbxkT4LZxI_Q0Ew6Y1yvVg0Sk1yZEhREceL-MBFylGQtgp3eT3OsuekkM2A8lDec1egfMA/exec';

document.getElementById("rsvp-submission").addEventListener("submit", function(e) {
    e.preventDefault();

    const form = new FormData(this);
    const formObj = Object.fromEntries(form.entries());
    const btnText = document.getElementById("btn-text");
    const btnSpinner = document.getElementById("btn-spinner");
    const submitBtn = document.getElementById("submit-btn");

    // Tunjuk loading
    btnText.style.display = "none";
    btnSpinner.style.display = "inline-block";
    submitBtn.disabled = true;

    // Gantikan URL di bawah dengan URL Web App Google Apps Script anda
    fetch(link, {
        redirect: "follow",
        method: "POST",
        headers: {
            "content-type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(formObj),
    })
    .then(response => response.text())
    .then(result => {
        Swal.fire({
            icon: 'success',
            title: 'Terima kasih!',
            text: 'Maklumat anda telah berjaya dihantar.',
            timer: 2500,
            showConfirmButton: false
        });

        // Reset borang & butang
        document.getElementById("rsvp-submission").reset();
    })
    .catch(error => {
        console.log(error),
        Swal.fire({
            icon: 'error',
            title: 'Ralat!',
            text: 'Terdapat masalah semasa menghantar borang. Sila cuba lagi.',
        });
    })
    .finally(() => {
        btnText.style.display = "inline";
        btnSpinner.style.display = "none";
        submitBtn.disabled = false;
    });
});

document.getElementById("ucapan-submission").addEventListener("submit", function(e) {
e.preventDefault();

    const form = new FormData(this);
    const formObj = Object.fromEntries(form.entries());
    const btnText = document.getElementById("btn-text-ucapan");
    const btnSpinner = document.getElementById("btn-spinner-ucapan");
    const submitBtn = document.getElementById("submit-btn-ucapan");

    // Tunjuk loading
    btnText.style.display = "none";
    btnSpinner.style.display = "inline-block";
    submitBtn.disabled = true;

    // Gantikan URL di bawah dengan URL Web App Google Apps Script anda
    fetch(link, {
        redirect: "follow",
        method: "POST",
        headers: {
            "content-type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(formObj),
    })
    .then(response => response.text())
    .then(result => {
        Swal.fire({
            icon: 'success',
            title: 'Terima kasih!',
            text: 'Maklumat anda telah berjaya dihantar.',
            timer: 2500,
            showConfirmButton: false
        });

        // Reset borang & butang
        document.getElementById("ucapan-submission").reset();
    })
    .catch(error => {
        console.log(error),
        Swal.fire({
            icon: 'error',
            title: 'Ralat!',
            text: 'Terdapat masalah semasa menghantar borang. Sila cuba lagi.',
        });
    })
    .finally(() => {
        btnText.style.display = "inline";
        btnSpinner.style.display = "none";
        submitBtn.disabled = false;
    });
});

// Fungsi untuk ambil dan papar data dari spreadsheet
function fetchUcapanData() {
  fetch(link)
    .then(response => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json(); // Jangkaan response JSON dari Apps Script
    })
    .then(data => {
      console.log("Data dari Google Sheet:", data);

      // Contoh: papar ke elemen HTML jika mahu
      const container = document.getElementById("kad-ucapan");
      if (container) {
        container.innerHTML = data.map(row => `
        <div class="ucapan">
            <b>${row.nama}</b>
            <p>${row.ucapan}</p>
            <div class="divider"></div>
        </div>
        `).join("");
      }
    })
    .catch(error => {
      console.error("Ralat semasa ambil data:", error);
    });
}

// Panggil fungsi bila dokumen sedia
document.addEventListener("DOMContentLoaded", fetchUcapanData);
