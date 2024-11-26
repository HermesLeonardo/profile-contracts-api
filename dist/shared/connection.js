import { Sequelize } from "sequelize";
// Configurando o Sequelize para SQLite
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./dist/database/database.sqlite",
    logging: false,
});
export default sequelize;
