export default async function handler(req, res) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.WEBHOOKSECRET) {
    return res.status(401).json({ message: "Invalid token" });
  }

  console.log("REVALIDATE", req.body.entry.slug);

  try {
    await res.unstable_revalidate(`/post/${req.body.entry.slug}`);
    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error revalidating");
  }
}
