import dbConnect from "../../../../lib/connect";
import Place from "../../../../lib/models/Place";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const place = await Place.findById(id);

    if (!place) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(place);
  }

  if (request.method === "POST") {
    try {
      const placeData = request.body;
      await Place.create(placeData);

      response.status(201).json({ status: "Place created" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
  if (request.method === "PUT") {
    await Place.findByIdAndUpdate(id, {
      $set: request.body,
    });

    response.status(200).json({ status: `Place ${id} updated!` });
  }
  if (request.method === "DELETE") {
    await Place.findByIdAndDelete(id);

    response.status(200).json({ status: `Place ${id} successfully deleted.` });
  }
}
