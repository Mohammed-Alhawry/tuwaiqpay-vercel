// api/webhook.js
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method not allowed");

  // IMPORTANT: add verification if TuwaiqPay gives a signature header later
  // For now we accept the payload and validate important fields.
  const payload = req.body;
  console.log("Received webhook:", JSON.stringify(payload));

  // expected example fields: billId, amount, status
  const { billId, amount, status, transactionId } = payload;

  if (!billId) {
    return res.status(400).json({ error: "Missing billId" });
  }

  // Basic validation: only act on SUCCESS
  if (status === "SUCCESS") {
    // todo: save to DB, update order, send email, etc.
    console.log(`Payment SUCCESS for bill ${billId} amount ${amount} tx ${transactionId}`);
    // respond 200 quickly
    return res.status(200).send("OK");
  } else {
    console.log(`Payment status ${status} for bill ${billId}`);
    return res.status(200).send("OK"); // still return 200 so provider stops retrying
  }
}
