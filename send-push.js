import admin from "firebase-admin";

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
const databaseURL = process.env.FIREBASE_DB_URL;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL
});

const db = admin.database();
const queueSnap = await db.ref("notificationQueue").get();

if (!queueSnap.exists()) {
  console.log("No queued notifications.");
  process.exit(0);
}

const entries = Object.entries(queueSnap.val());

for (const [key, item] of entries) {
  if (!item || !item.toUser) {
    await db.ref(`notificationQueue/${key}`).remove();
    continue;
  }

  const tokenSnap = await db.ref(`users/${item.toUser}/device/token`).get();
  const token = tokenSnap.val();

  if (token) {
    try {
      await admin.messaging().send({
        token,
        notification: {
          title: item.title || "দূরে থেকেও কাছে ❤️",
          body: item.body || `${item.fromUser || "কেউ"} আপনাকে খুব স্মরণ করছেন!`
        },
        webpush: {
          notification: {
            title: item.title || "দূরে থেকেও কাছে ❤️",
            body: item.body || `${item.fromUser || "কেউ"} আপনাকে খুব স্মরণ করছেন!`,
            vibrate: [200, 100, 200],
            renotify: true,
            tag: "miss-you-pulse"
          }
        }
      });
      console.log(`Sent push to ${item.toUser}`);
    } catch (e) {
      console.error("Push error:", e.message);
    }
  }

  await db.ref(`notificationQueue/${key}`).remove();
}

process.exit(0);
