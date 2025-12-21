export async function GET() {
  try {
    const API_KEY = process.env.YOUTUBE_API_KEY;

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&type=video&regionCode=CM&q=Cameroon&order=date&relevanceLanguage=en&key=${API_KEY}`;

    const res = await fetch(url);
    const data = await res.json();

    return Response.json(data);
  } catch (error) {
    return Response.json({ error: "Failed" }, { status: 500 });
  }
}
