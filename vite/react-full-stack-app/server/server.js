import { Hono } from 'hono';
import { cors } from 'hono/cors';

const handleGetNames = (context) => {
  const names = Deno.readTextFileSync("./data/names.json");
  const parsedNames = JSON.parse(names);
  return context.json(parsedNames);
};

const handleAddName = async (context) => {
  const body = await context.req.json();
  const newName = body.name;

  const names = Deno.readTextFileSync("./data/names.json");
  const parsedNames = JSON.parse(names);
  parsedNames.push(newName);

  Deno.writeTextFileSync("./data/names.json", JSON.stringify(parsedNames));

  return context.json({ message: "Name added successfully" });
}

const app = new Hono();
app.use('*', cors());
app.get('/get-names', handleGetNames);
app.post('/add-name', handleAddName);

Deno.serve({ port: 8000 }, app.fetch);