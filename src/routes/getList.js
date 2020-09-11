import { getAll } from '../db';

export default async (req, res) => {
  try {
    const dbResponse = await getAll();
    res.send(dbResponse.Items);
  } catch (err) {
    res.send(err);
  }
};
