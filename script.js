const video = document.getElementById("camera");
const btn = document.getElementById("captureBtn");
const status = document.getElementById("status");

// --- توکن و Chat ID ربات بله خودت را اینجا بگذار ---
const BALE_TOKEN = "2086834694:UpTaAb1Y9FCL4GRvWL3S6VJAU0E_xD8JWKA";
const CHAT_ID = "1180806059";

// فعال کردن وبکم
navigator.mediaDevices.getUserMedia({ video: true })
.then(stream => video.srcObject = stream)
.catch(err => status.innerText = "دوربین فعال نشد");

// ثبت حضور با عکس و ارسال به بله
btn.onclick = () => {
    status.innerText = "در حال ثبت حضور...";

    // گرفتن عکس از ویدئو
    const canvas = document.createElement("canvas");
    canvas.width = 320;
    canvas.height = 240;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(async (blob) => {
        try {
            const formData = new FormData();
            formData.append("chat_id", CHAT_ID);
            formData.append("photo", blob, attendance_${Date.now()}.png);
            formData.append("caption", تاریخ: ${new Date().toLocaleDateString('fa-IR')}\nساعت: ${new Date().toLocaleTimeString('fa-IR')});

            const res = await fetch(https://tapi.bale.ai/bot${BALE_TOKEN}/sendPhoto, {
                method: "POST",
                body: formData
            });

            if (res.ok) {
                status.innerText = "✔ حضور ثبت شد و عکس ارسال شد";
            } else {
                status.innerText = "❌ خطا در ارسال به بله";
            }
        } catch (err) {
            console.error(err);
            status.innerText = "❌ خطا در ارسال";
        }
    }, "image/png");
};
