import app from "./src/app";
import connection from "./src/database";

app.listen(4444, async () => {
    await connection.sync({ force: true })
        .then(() => console.log('Database connected'));

    console.log('Server started')
});